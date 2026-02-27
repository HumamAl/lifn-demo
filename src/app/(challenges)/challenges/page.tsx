"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { challenges, executiveSummary } from "@/data/challenges";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { DispatcherFlow } from "@/components/challenges/dispatcher-flow";
import { IntentArchitecture } from "@/components/challenges/intent-architecture";
import { TimezoneComparison } from "@/components/challenges/timezone-comparison";

// Map challenge IDs to their visualization components
const visualizations: Record<string, ReactNode> = {
  "challenge-dispatcher": <DispatcherFlow />,
  "challenge-intent": <IntentArchitecture />,
  "challenge-timezone": <TimezoneComparison />,
};

export default function ChallengesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">

        {/* Page heading */}
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            My Approach
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            How I would architect the three hardest problems in this project
          </p>
        </div>

        {/* Executive summary — dark banner */}
        <div
          className="relative overflow-hidden rounded-xl p-6 md:p-8"
          style={{
            background: "oklch(0.06 0.02 var(--primary-h, 260))",
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 65%)",
          }}
        >
          {/* Back link */}
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.40)" }}>
            <Link
              href="/"
              className="hover:text-white/60 transition-colors duration-200 underline underline-offset-2"
            >
              ← See the live demo
            </Link>
          </p>

          {/* Common approach */}
          <p
            className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {executiveSummary.commonApproach}
          </p>

          <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Different approach — with accent word highlighted */}
          <p
            className="text-base md:text-lg leading-relaxed font-medium mt-4"
            style={{ color: "rgba(255,255,255,0.90)" }}
          >
            {executiveSummary.accentWord
              ? executiveSummary.differentApproach
                  .split(
                    new RegExp(
                      `(${executiveSummary.accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                      "i"
                    )
                  )
                  .map((part, i) =>
                    part.toLowerCase() ===
                    executiveSummary.accentWord?.toLowerCase() ? (
                      <span
                        key={i}
                        className="font-semibold"
                        style={{ color: "var(--primary)" }}
                      >
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )
              : executiveSummary.differentApproach}
          </p>
        </div>

        {/* Challenge cards */}
        <div className="flex flex-col gap-4">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              index={index}
              title={challenge.title}
              description={challenge.description}
              outcome={challenge.outcome}
            >
              {visualizations[challenge.id]}
            </ChallengeCard>
          ))}
        </div>

        {/* CTA closer */}
        <div
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: "color-mix(in oklch, var(--primary) 5%, var(--card))",
            borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3
                className="text-base font-semibold mb-1"
                style={{ color: "var(--foreground)" }}
              >
                Ready to discuss the architecture?
              </h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                I&apos;ve thought through the dispatcher, intent schema, and timezone threading.
                Happy to walk through any of this on a call.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/proposal"
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--muted-foreground)" }}
              >
                See the proposal →
              </Link>
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                style={{
                  background:
                    "color-mix(in oklch, var(--primary) 12%, var(--card))",
                  borderColor:
                    "color-mix(in oklch, var(--primary) 30%, transparent)",
                  color: "var(--primary)",
                }}
              >
                Reply on Upwork to start
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
