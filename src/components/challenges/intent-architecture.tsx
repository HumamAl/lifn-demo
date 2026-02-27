"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";

type ViewMode = "typed" | "freetext";

const typedSchemaLines = [
  '  "intent": "schedule_event",',
  '  "title": "Dentist Appointment",',
  '  "datetime": "2026-03-03T15:00:00",',
  '  "timezone": "America/New_York",',
  '  "confidence": 0.97',
];

const freeTextLines = [
  '"Schedule dentist appointment for',
  " Tuesday at 3 in the afternoon",
  ' eastern time or something"',
];

const layers = [
  {
    id: "ui",
    label: "UI",
    description: "React Native component",
    type: "frontend" as const,
  },
  {
    id: "dispatcher",
    label: "Dispatcher",
    description: "IntentPayload router",
    type: "core" as const,
  },
  {
    id: "validator",
    label: "Schema Validator",
    description: "Zod / JSON Schema",
    type: "core" as const,
  },
  {
    id: "service",
    label: "CalendarService",
    description: "Google Calendar API",
    type: "service" as const,
  },
];

export function IntentArchitecture() {
  const [view, setView] = useState<ViewMode>("typed");
  const isTyped = view === "typed";

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center gap-2">
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
          GPT-4 output mode:
        </p>
        <div
          className="flex rounded-md overflow-hidden border"
          style={{ borderColor: "var(--border)" }}
        >
          {(["typed", "freetext"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className="px-3 py-1 text-xs font-medium transition-colors duration-200"
              style={
                view === mode
                  ? {
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }
                  : {
                      backgroundColor: "var(--card)",
                      color: "var(--muted-foreground)",
                    }
              }
            >
              {mode === "typed" ? "Typed JSON Schema" : "Free Text (problem)"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* GPT Output panel */}
        <div
          className="rounded-lg p-3 border font-mono text-xs"
          style={{
            backgroundColor: isTyped
              ? "color-mix(in oklch, var(--primary) 5%, var(--card))"
              : "color-mix(in oklch, var(--destructive) 5%, var(--card))",
            borderColor: isTyped
              ? "color-mix(in oklch, var(--primary) 25%, transparent)"
              : "color-mix(in oklch, var(--destructive) 25%, transparent)",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-wide mb-2"
            style={{
              color: isTyped ? "var(--primary)" : "var(--destructive)",
            }}
          >
            {isTyped ? "IntentPayload (typed)" : "GPT free-text output"}
          </p>
          <div className="space-y-0.5">
            {isTyped ? (
              <>
                <p style={{ color: "var(--muted-foreground)" }}>{"{"}</p>
                {typedSchemaLines.map((line, i) => (
                  <p key={i} style={{ color: "var(--foreground)" }}>
                    {line}
                  </p>
                ))}
                <p style={{ color: "var(--muted-foreground)" }}>{"}"}</p>
              </>
            ) : (
              freeTextLines.map((line, i) => (
                <p key={i} style={{ color: "var(--foreground)" }}>
                  {line}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Execution path */}
        <div className="flex flex-col gap-2">
          {layers.map((layer, i) => {
            const isBlocked = !isTyped && i >= 1;
            const isValidator = layer.id === "validator";

            return (
              <div key={layer.id} className="flex items-center gap-2">
                <div
                  className="flex-1 rounded px-3 py-2 border flex items-center justify-between transition-all duration-200"
                  style={
                    isBlocked
                      ? {
                          backgroundColor: "color-mix(in oklch, var(--destructive) 5%, transparent)",
                          borderColor: "color-mix(in oklch, var(--destructive) 20%, transparent)",
                          opacity: 0.6,
                        }
                      : isValidator && isTyped
                      ? {
                          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
                          borderColor: "color-mix(in oklch, var(--success) 25%, transparent)",
                        }
                      : {
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)",
                        }
                  }
                >
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                      {layer.label}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                      {layer.description}
                    </p>
                  </div>
                  {isBlocked ? (
                    <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
                  ) : isValidator && isTyped ? (
                    <CheckCircle
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: "var(--success)" }}
                    />
                  ) : null}
                </div>
                {i < layers.length - 1 && (
                  <ChevronRight
                    className="w-3 h-3 shrink-0"
                    style={{
                      color: isBlocked ? "var(--destructive)" : "var(--muted-foreground)",
                      opacity: isBlocked ? 0.4 : 1,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status line */}
      <div
        className="text-xs rounded-md px-3 py-1.5 flex items-center gap-2 transition-all duration-200"
        style={
          isTyped
            ? {
                backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
                color: "color-mix(in oklch, var(--success) 80%, var(--foreground))",
              }
            : {
                backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
                color: "var(--destructive)",
              }
        }
      >
        {isTyped ? (
          <>
            <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--success)" }} />
            Schema validated — dispatcher routes to CalendarService with correct parameters
          </>
        ) : (
          <>
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            Dispatcher blocked — cannot route without validated intent schema
          </>
        )}
      </div>
    </div>
  );
}
