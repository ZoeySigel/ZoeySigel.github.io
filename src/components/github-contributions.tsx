import type { CSSProperties } from "react";

import { getGitHubContributions } from "@/lib/github-contributions";

const MONTH_FORMATTER = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});

const LEVEL_LABELS = [
  "No contributions",
  "Low activity",
  "Medium-low activity",
  "Medium-high activity",
  "High activity",
] as const;

function dateValue(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export async function GitHubContributions({
  username,
  profileUrl,
}: {
  username: string;
  profileUrl: string;
}) {
  const contributions = await getGitHubContributions(username);
  const firstDay = contributions.days[0]
    ? dateValue(contributions.days[0].date)
    : null;
  const weeks = firstDay
    ? Math.max(
        ...contributions.days.map((day) =>
          Math.floor(
            (dateValue(day.date).getTime() - firstDay.getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          )
        )
      ) + 1
    : 53;
  const visibleMonthCounts = contributions.days.reduce((counts, day) => {
    const month = day.date.slice(0, 7);
    counts.set(month, (counts.get(month) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());
  const monthLabels = contributions.days.reduce<
    Array<{ label: string; week: number }>
  >((labels, day) => {
    if (!firstDay) return labels;

    const date = dateValue(day.date);
    if ((visibleMonthCounts.get(day.date.slice(0, 7)) ?? 0) < 7) {
      return labels;
    }

    const label = MONTH_FORMATTER.format(date);
    if (labels.at(-1)?.label === label) return labels;

    labels.push({
      label,
      week: Math.floor(
        (date.getTime() - firstDay.getTime()) / (7 * 24 * 60 * 60 * 1000)
      ),
    });
    return labels;
  }, []);

  return (
    <section
      className="github-contributions"
      aria-labelledby="github-contributions-title"
    >
      <h2 className="visually-hidden" id="github-contributions-title">
        GitHub Contributions
      </h2>

      {contributions.days.length > 0 && firstDay ? (
        <>
          <div className="contribution-scroll">
            <div
              className="contribution-calendar"
              style={{ "--contribution-weeks": weeks } as CSSProperties}
              aria-hidden="true"
            >
              <div className="contribution-months">
                {monthLabels.map((month, index) => (
                  <span
                    key={`${month.label}-${index}`}
                    style={{ "--month-week": month.week } as CSSProperties}
                  >
                    {month.label}
                  </span>
                ))}
              </div>
              <div className="contribution-grid">
                {contributions.days.map((day) => {
                  const date = dateValue(day.date);
                  const week = Math.floor(
                    (date.getTime() - firstDay.getTime()) /
                      (7 * 24 * 60 * 60 * 1000)
                  );

                  return (
                    <span
                      className="contribution-day"
                      data-level={day.level}
                      key={day.date}
                      style={{
                        gridColumn: week + 1,
                        gridRow: date.getUTCDay() + 1,
                      }}
                      title={`${day.date} · ${LEVEL_LABELS[day.level]}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="contribution-footer">
            <p>
              {contributions.total ?? "Public"} contributions in the last year
              on{" "}
              <a href={profileUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
              .
            </p>
            <div className="contribution-legend" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <i data-level={level} key={level} />
              ))}
              <span>More</span>
            </div>
          </div>
        </>
      ) : (
        <p className="contribution-unavailable">
          GitHub contribution data is temporarily unavailable.{" "}
          <a href={profileUrl} target="_blank" rel="noreferrer">
            View profile
          </a>
          .
        </p>
      )}
    </section>
  );
}
