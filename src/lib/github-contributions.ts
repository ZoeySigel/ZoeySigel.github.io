import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

export type GitHubContributionDay = {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionData = {
  days: GitHubContributionDay[];
  total: number | null;
};

type Snapshot = ContributionData & { username: string; fetchedAt: string };

export type GitHubContributions = ContributionData & {
  source: "live" | "cache" | "unavailable";
  fetchedAt: string | null;
};

const ATTEMPTS = 3;
const CONTRIBUTION_CELL_PATTERN =
  /<(?:td|rect)\b[^>]*\bdata-date="[^"]+"[^>]*>/g;

function validDays(days: GitHubContributionDay[]) {
  // GitHub returns a complete year even for accounts with no contributions.
  if (days.length < 365 || days.length > 371) return false;
  return days.every((day, index) => {
    if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day.date)) return false;
    const timestamp = Date.parse(`${day.date}T00:00:00Z`);
    return (
      Number.isFinite(timestamp) &&
      new Date(timestamp).toISOString().slice(0, 10) === day.date &&
      Number.isInteger(day.level) &&
      day.level >= 0 &&
      day.level <= 4 &&
      (index === 0 ||
        timestamp - Date.parse(`${days[index - 1].date}T00:00:00Z`) ===
          86_400_000)
    );
  });
}

export function parseGitHubContributions(html: string): ContributionData {
  const days = [...html.matchAll(CONTRIBUTION_CELL_PATTERN)]
    .map(([cell]) => ({
      date: cell.match(/\bdata-date="([^"]+)"/)?.[1] ?? "",
      level: Number(
        cell.match(/\bdata-level="([0-4])"/)?.[1]
      ) as GitHubContributionDay["level"],
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!validDays(days))
    throw new Error(`Invalid contribution calendar: ${days.length} cells`);
  const totalMatch = html.match(/([\d,]+)\s*(?:<!--.*?-->\s*)*contributions/i);
  return {
    days,
    total: totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : null,
  };
}

function errorMessage(error: unknown) {
  if (!(error instanceof Error)) return String(error);
  return error.cause instanceof Error
    ? `${error.message}: ${error.cause.message}`
    : error.message;
}

async function readSnapshot(path: string, username: string) {
  try {
    const snapshot: Snapshot = JSON.parse(await readFile(path, "utf8"));
    if (
      snapshot?.username?.toLowerCase() !== username.toLowerCase() ||
      !Number.isFinite(Date.parse(snapshot.fetchedAt)) ||
      !Array.isArray(snapshot.days) ||
      !validDays(snapshot.days) ||
      (snapshot.total !== null &&
        (!Number.isSafeInteger(snapshot.total) || snapshot.total < 0))
    )
      throw new Error("Invalid snapshot");
    return snapshot;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn(
        `[github-contributions] Cannot read ${path}: ${errorMessage(error)}`
      );
    }
    return null;
  }
}

export async function getGitHubContributions(
  username: string,
  directories: { cache?: string; snapshots?: string } = {}
): Promise<GitHubContributions> {
  if (!/^[a-z\d][a-z\d-]{0,38}$/i.test(username))
    throw new Error("Invalid GitHub username");
  const cacheDirectory =
    directories.cache ?? join(process.cwd(), ".cache/github-contributions");
  const snapshotDirectory =
    directories.snapshots ??
    join(process.cwd(), "src/content/github-contributions");
  const filename = `${username.toLowerCase()}.json`;
  const cachePath = join(cacheDirectory, filename);
  const requestId = randomUUID();

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const response = await fetch(
        `https://github.com/users/${encodeURIComponent(username)}/contributions?request=${requestId}&attempt=${attempt}`,
        {
          // Static export requires force-cache. Distinct URLs ensure each build
          // and retry makes a fresh request instead of reusing a failed response.
          cache: "force-cache",
          headers: {
            Accept: "text/html",
            "User-Agent": "ZoeySigel.github.io static site build",
          },
          signal: AbortSignal.timeout(10_000),
        }
      );
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const data = parseGitHubContributions(await response.text());
      const snapshot: Snapshot = {
        ...data,
        username,
        fetchedAt: new Date().toISOString(),
      };
      try {
        await mkdir(cacheDirectory, { recursive: true });
        // Never replace a valid snapshot with a partial write.
        const temporaryPath = `${cachePath}.${randomUUID()}.tmp`;
        await writeFile(temporaryPath, JSON.stringify(snapshot), "utf8");
        await rename(temporaryPath, cachePath);
      } catch (error) {
        console.warn(
          `[github-contributions] Cannot save snapshot: ${errorMessage(error)}`
        );
      }
      console.info(
        `[github-contributions] Fetched ${data.days.length} days for ${username}`
      );
      return { ...data, source: "live", fetchedAt: snapshot.fetchedAt };
    } catch (error) {
      console.warn(
        `[github-contributions] ${username}, attempt ${attempt}/${ATTEMPTS}: ${errorMessage(error)}`
      );
      if (attempt < ATTEMPTS)
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * 2 ** (attempt - 1))
        );
    }
  }

  const snapshots = await Promise.all([
    readSnapshot(cachePath, username),
    readSnapshot(join(snapshotDirectory, filename), username),
  ]);
  const snapshot = snapshots
    .filter((entry): entry is Snapshot => entry !== null)
    .sort((a, b) => Date.parse(b.fetchedAt) - Date.parse(a.fetchedAt))[0];
  if (snapshot) {
    console.warn(
      `[github-contributions] Using snapshot for ${username} from ${snapshot.fetchedAt}`
    );
    return {
      days: snapshot.days,
      total: snapshot.total,
      source: "cache",
      fetchedAt: snapshot.fetchedAt,
    };
  }
  console.error(
    `[github-contributions] No valid snapshot available for ${username}`
  );
  return { days: [], total: null, source: "unavailable", fetchedAt: null };
}
