import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

import {
  getGitHubContributions,
  parseGitHubContributions,
} from "../src/lib/github-contributions.ts";

const days = Array.from({ length: 365 }, (_, index) => ({
  date: new Date(Date.UTC(2025, 10, 9 + index)).toISOString().slice(0, 10),
  level: index % 5,
}));
const html = `<h2>1,234 contributions</h2>${days
  .map((day) => `<td data-date="${day.date}" data-level="${day.level}"></td>`)
  .join("")}`;
const snapshot = (fetchedAt, total = 1234, username = "ZoeySigel") => ({
  username,
  fetchedAt,
  days,
  total,
});

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "portfolio-contributions-"));
  const directories = {
    cache: join(root, "cache"),
    snapshots: join(root, "seed"),
  };
  await Promise.all(Object.values(directories).map((path) => mkdir(path)));
  t.after(async () => {
    assert(
      resolve(root).startsWith(resolve(tmpdir()) + "/") ||
        resolve(root).startsWith(resolve(tmpdir()) + "\\")
    );
    await rm(root, { recursive: true, force: true });
  });
  t.mock.method(console, "warn", () => {});
  t.mock.method(console, "info", () => {});
  t.mock.method(console, "error", () => {});
  return directories;
}

test("parses a full calendar, and rejects partial or malformed data", () => {
  assert.deepEqual(parseGitHubContributions(html), { days, total: 1234 });
  assert.throws(() => parseGitHubContributions("<html>Rate limited</html>"));
  assert.throws(() =>
    parseGitHubContributions(html.replace(/<td[^>]+><\/td>$/, ""))
  );
  assert.throws(() =>
    parseGitHubContributions(html.replace('data-level="0"', 'data-level="9"'))
  );
  assert.throws(() =>
    parseGitHubContributions(html.replace(days[0].date, "2025-02-30"))
  );
  assert.throws(() =>
    parseGitHubContributions(html.replace(days[0].date, days[1].date))
  );
});

test("retries an HTTP error, then saves a complete successful response", async (t) => {
  const directories = await fixture(t);
  let attempts = 0;
  const urls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    urls.push(url);
    assert.equal(options.cache, "force-cache");
    return ++attempts === 1
      ? new Response("Busy", { status: 503 })
      : new Response(html);
  });
  const result = await getGitHubContributions("ZoeySigel", directories);
  assert.equal(attempts, 2);
  assert.notEqual(urls[0], urls[1]);
  assert.equal(result.source, "live");
  const saved = JSON.parse(
    await readFile(join(directories.cache, "zoeysigel.json"), "utf8")
  );
  assert.deepEqual(saved.days, days);
  assert.equal(saved.total, 1234);
  assert.equal(saved.fetchedAt, result.fetchedAt);
  assert.equal(console.warn.mock.calls.length, 1);
});

test("timeouts fall back to the newest snapshot without overwriting it", async (t) => {
  const directories = await fixture(t);
  const cached = snapshot("2026-11-08T10:00:00Z", 20);
  await writeFile(
    join(directories.cache, "zoeysigel.json"),
    JSON.stringify(cached)
  );
  await writeFile(
    join(directories.snapshots, "zoeysigel.json"),
    JSON.stringify(snapshot("2026-11-07T10:00:00Z"))
  );
  const fetch = t.mock.method(globalThis, "fetch", async () => {
    throw new DOMException("Request timed out", "TimeoutError");
  });
  const result = await getGitHubContributions("ZoeySigel", directories);
  assert.equal(fetch.mock.calls.length, 3);
  assert.equal(result.source, "cache");
  assert.equal(result.total, 20);
  assert.equal(result.fetchedAt, cached.fetchedAt);
  assert.deepEqual(
    JSON.parse(
      await readFile(join(directories.cache, "zoeysigel.json"), "utf8")
    ),
    cached
  );
  assert.match(
    console.warn.mock.calls[0].arguments[0],
    /attempt 1\/3.*timed out/
  );
});

test("fresh checkout uses the repository snapshot when GitHub is unavailable", async (t) => {
  const directories = await fixture(t);
  await writeFile(
    join(directories.snapshots, "zoeysigel.json"),
    JSON.stringify(snapshot("2026-11-08T10:00:00Z"))
  );
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("Too many requests", { status: 429 })
  );
  const result = await getGitHubContributions("ZoeySigel", directories);
  assert.equal(result.source, "cache");
  assert.deepEqual(result.days, days);
});

test("malformed HTML and corrupted cache cannot replace the valid repository snapshot", async (t) => {
  const directories = await fixture(t);
  await writeFile(join(directories.cache, "zoeysigel.json"), "truncated JSON{");
  const seed = snapshot("2026-11-08T10:00:00Z");
  await writeFile(
    join(directories.snapshots, "zoeysigel.json"),
    JSON.stringify(seed)
  );
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("<html>Unexpected response</html>")
  );
  const result = await getGitHubContributions("ZoeySigel", directories);
  assert.equal(result.source, "cache");
  assert.equal(result.fetchedAt, seed.fetchedAt);
  assert.equal(
    await readFile(join(directories.cache, "zoeysigel.json"), "utf8"),
    "truncated JSON{"
  );
});

test("rejects snapshots belonging to another user and keeps the empty-state fallback", async (t) => {
  const directories = await fixture(t);
  await writeFile(
    join(directories.snapshots, "zoeysigel.json"),
    JSON.stringify(snapshot("2026-11-08T10:00:00Z", 1234, "someone-else"))
  );
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Offline");
  });
  const result = await getGitHubContributions("ZoeySigel", directories);
  assert.deepEqual(result, {
    days: [],
    total: null,
    source: "unavailable",
    fetchedAt: null,
  });
  assert.equal(console.error.mock.calls.length, 1);
});

test("zero contributions is valid data", async (t) => {
  const directories = await fixture(t);
  t.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        html
          .replace("1,234 contributions", "0 contributions")
          .replaceAll(/data-level="[0-4]"/g, 'data-level="0"')
      )
  );
  const result = await getGitHubContributions("ZoeySigel", directories);
  assert.equal(result.source, "live");
  assert.equal(result.total, 0);
  assert(result.days.every((day) => day.level === 0));
});
