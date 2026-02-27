"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Globe } from "lucide-react";

type ComparisonView = "before" | "after";

interface TimelineRow {
  stage: string;
  beforeValue: string;
  afterValue: string;
  beforeOk: boolean;
  afterOk: boolean;
}

const timelineRows: TimelineRow[] = [
  {
    stage: "User speaks",
    beforeValue: '"dentist Tuesday 3pm ET"',
    afterValue: '"dentist Tuesday 3pm ET"',
    beforeOk: true,
    afterOk: true,
  },
  {
    stage: "Whisper transcription",
    beforeValue: "timezone dropped",
    afterValue: 'timezone: "ET" extracted',
    beforeOk: false,
    afterOk: true,
  },
  {
    stage: "GPT-4 parse",
    beforeValue: "datetime: 2026-03-03T15:00:00",
    afterValue: 'datetime: "2026-03-03T15:00:00"\ntimezone: "America/New_York"',
    beforeOk: false,
    afterOk: true,
  },
  {
    stage: "CalendarService",
    beforeValue: "stored as UTC: 2026-03-03T15:00:00Z",
    afterValue: "stored with IANA: 2026-03-03T20:00:00Z (ET→UTC)",
    beforeOk: false,
    afterOk: true,
  },
  {
    stage: "Calendar display",
    beforeValue: "shows 3:00 PM UTC — wrong for ET user",
    afterValue: "shows 3:00 PM ET — correct",
    beforeOk: false,
    afterOk: true,
  },
];

export function TimezoneComparison() {
  const [view, setView] = useState<ComparisonView>("before");
  const isBefore = view === "before";

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center gap-3">
        <div
          className="flex rounded-md overflow-hidden border"
          style={{ borderColor: "var(--border)" }}
        >
          {(["before", "after"] as ComparisonView[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-1.5 text-xs font-medium transition-colors duration-200"
              style={
                view === v
                  ? v === "before"
                    ? {
                        backgroundColor: "color-mix(in oklch, var(--destructive) 15%, var(--card))",
                        color: "var(--destructive)",
                      }
                    : {
                        backgroundColor: "color-mix(in oklch, var(--success) 15%, var(--card))",
                        color: "color-mix(in oklch, var(--success) 90%, var(--foreground))",
                      }
                  : {
                      backgroundColor: "var(--card)",
                      color: "var(--muted-foreground)",
                    }
              }
            >
              {v === "before" ? "Without IANA threading" : "With IANA threading"}
            </button>
          ))}
        </div>
        <div
          className="flex items-center gap-1.5 text-xs transition-colors duration-200"
          style={{
            color: isBefore ? "var(--destructive)" : "color-mix(in oklch, var(--success) 80%, var(--foreground))",
          }}
        >
          {isBefore ? (
            <AlertTriangle className="w-3.5 h-3.5" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5" style={{ color: "var(--success)" }} />
          )}
          {isBefore ? "Timezone lost at transcription" : "Timezone threaded end-to-end"}
        </div>
      </div>

      {/* Execution path table */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        {timelineRows.map((row, i) => {
          const value = isBefore ? row.beforeValue : row.afterValue;
          const isOk = isBefore ? row.beforeOk : row.afterOk;
          const isFirst = i === 0;

          return (
            <div
              key={row.stage}
              className="flex items-start gap-3 px-3 py-2.5 transition-colors duration-200"
              style={{
                borderBottom: i < timelineRows.length - 1 ? "1px solid var(--border)" : "none",
                backgroundColor:
                  isFirst
                    ? "transparent"
                    : isBefore && !isOk
                    ? "color-mix(in oklch, var(--destructive) 4%, transparent)"
                    : !isBefore && isOk
                    ? "color-mix(in oklch, var(--success) 4%, transparent)"
                    : "transparent",
              }}
            >
              {/* Stage label */}
              <div className="w-32 shrink-0 pt-0.5">
                <div className="flex items-center gap-1.5">
                  {row.stage === "User speaks" ? (
                    <Clock className="w-3 h-3 shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  ) : (
                    <Globe className="w-3 h-3 shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  )}
                  <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
                    {row.stage}
                  </span>
                </div>
              </div>

              {/* Value */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-mono whitespace-pre-line transition-colors duration-200"
                  style={{
                    color: isFirst
                      ? "var(--foreground)"
                      : isBefore && !isOk
                      ? "var(--destructive)"
                      : !isBefore && isOk
                      ? "color-mix(in oklch, var(--success) 80%, var(--foreground))"
                      : "var(--foreground)",
                  }}
                >
                  {value}
                </p>
              </div>

              {/* Status icon */}
              <div className="shrink-0 pt-0.5">
                {isFirst ? null : isOk ? (
                  <CheckCircle
                    className="w-3.5 h-3.5 transition-colors duration-200"
                    style={{ color: "var(--success)" }}
                  />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive transition-colors duration-200" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <p className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
        IANA timezone identifier (<span className="font-mono">America/New_York</span>,{" "}
        <span className="font-mono">Europe/London</span>) must be extracted at the Whisper layer and
        carried through every field of the <span className="font-mono">IntentPayload</span>.
      </p>
    </div>
  );
}
