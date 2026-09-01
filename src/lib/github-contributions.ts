export type GitHubContributionDay = {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubContributions = {
  days: GitHubContributionDay[];
  total: number | null;
};

const CONTRIBUTION_CELL_PATTERN =
  /<(?:td|rect)\b[^>]*\bdata-date="[^"]+"[^>]*>/g;

export async function getGitHubContributions(
  username: string
): Promise<GitHubContributions> {
  try {
    const response = await fetch(
      `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      {
        cache: "force-cache",
        headers: {
          Accept: "text/html",
          "User-Agent": "ZoeySigel.github.io static site build",
        },
        signal: AbortSignal.timeout(8_000),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const html = await response.text();
    const days = [...html.matchAll(CONTRIBUTION_CELL_PATTERN)]
      .map(([cell]) => {
        const date = cell.match(/\bdata-date="([^"]+)"/)?.[1];
        const level = Number(cell.match(/\bdata-level="([0-4])"/)?.[1]);

        if (!date || !Number.isInteger(level) || level < 0 || level > 4) {
          return null;
        }

        return { date, level: level as GitHubContributionDay["level"] };
      })
      .filter((day): day is GitHubContributionDay => day !== null)
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalMatch = html.match(
      /([\d,]+)\s*(?:<!--.*?-->\s*)*contributions/i
    );
    const total = totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : null;

    return { days, total };
  } catch {
    return { days: [], total: null };
  }
}
