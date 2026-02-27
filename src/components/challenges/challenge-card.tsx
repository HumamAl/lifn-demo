import { TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface ChallengeCardProps {
  index: number;
  title: string;
  description: string;
  outcome?: string;
  children: ReactNode;
}

export function ChallengeCard({
  index,
  title,
  description,
  outcome,
  children,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="rounded-xl p-5 space-y-4 transition-all duration-200 border"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "color-mix(in oklch, var(--border) 100%, transparent)",
        boxShadow: "var(--card-shadow, none)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          className="font-mono text-sm font-medium shrink-0 w-6 tabular-nums pt-0.5"
          style={{ color: "color-mix(in oklch, var(--primary) 70%, transparent)" }}
        >
          {stepNumber}
        </span>
        <div className="space-y-1">
          <h2
            className="text-base font-semibold leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {description}
          </p>
        </div>
      </div>

      {/* Visualization slot */}
      <div className="pl-9">{children}</div>

      {/* Outcome statement */}
      {outcome && (
        <div
          className="ml-9 flex items-start gap-2 rounded-md px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <TrendingUp
            className="h-4 w-4 mt-0.5 shrink-0"
            style={{ color: "var(--success)" }}
          />
          <p className="text-sm font-medium" style={{ color: "var(--success)" }}>
            {outcome}
          </p>
        </div>
      )}
    </div>
  );
}
