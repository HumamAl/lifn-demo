"use client";

import type { ElementType } from "react";
import { Mic, Brain, GitMerge, Layers, CheckCircle } from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  sublabel: string;
  icon: ElementType;
  highlight?: boolean;
  accent?: boolean;
}

const nodes: FlowNode[] = [
  { id: "voice", label: "Voice Input", sublabel: "Whisper API", icon: Mic },
  { id: "gpt", label: "GPT-4 Parse", sublabel: "JSON schema", icon: Brain },
  {
    id: "dispatcher",
    label: "Dispatcher",
    sublabel: "validates + routes",
    icon: GitMerge,
    highlight: true,
    accent: true,
  },
  {
    id: "service",
    label: "Service Module",
    sublabel: "Task / Calendar / Email",
    icon: Layers,
    highlight: true,
  },
  {
    id: "result",
    label: "Thread Result",
    sublabel: "normalized response",
    icon: CheckCircle,
  },
];

export function DispatcherFlow() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
        Execution pipeline
      </p>

      {/* Horizontal flow — wraps gracefully on mobile */}
      <div className="flex flex-wrap items-center gap-1.5">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-1.5">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 border transition-colors duration-200"
              style={
                node.accent
                  ? {
                      borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)",
                      backgroundColor: "color-mix(in oklch, var(--primary) 10%, transparent)",
                    }
                  : node.highlight
                  ? {
                      borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
                      backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
                    }
                  : {
                      borderColor: "var(--border)",
                      backgroundColor: "var(--card)",
                    }
              }
            >
              <node.icon
                className="w-4 h-4 shrink-0"
                style={
                  node.accent
                    ? { color: "var(--primary)" }
                    : { color: "var(--muted-foreground)" }
                }
              />
              <div>
                <p
                  className="text-xs font-medium leading-tight"
                  style={
                    node.accent
                      ? { color: "var(--primary)" }
                      : { color: "var(--foreground)" }
                  }
                >
                  {node.label}
                </p>
                <p className="text-[10px] leading-tight" style={{ color: "var(--muted-foreground)" }}>
                  {node.sublabel}
                </p>
              </div>
            </div>

            {i < nodes.length - 1 && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="shrink-0 hidden sm:block"
                style={{ color: "var(--muted-foreground)" }}
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Key constraint callout */}
      <div
        className="rounded-md px-3 py-2 text-xs"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 6%, transparent)",
          borderLeft: "2px solid color-mix(in oklch, var(--primary) 50%, transparent)",
          color: "var(--muted-foreground)",
        }}
      >
        <span className="font-mono text-primary">Rule:</span> No service is called directly from
        any UI component. All execution paths pass through the Dispatcher.
      </div>
    </div>
  );
}
