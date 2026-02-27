"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  dashboardStats,
  dailyMetrics,
  voiceCommands,
  intentBreakdown,
  serviceHealth,
} from "@/data/mock-data";
import type { ExecutionStatus, IntentType, ServiceType } from "@/lib/types";
import { APP_CONFIG } from "@/lib/config";
import { Badge } from "@/components/ui/badge";

// ─── SSR-safe chart imports ───────────────────────────────────────────────────
const ExecutionTimelineChart = dynamic(
  () =>
    import("@/components/dashboard/execution-timeline-chart").then(
      (m) => m.ExecutionTimelineChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] rounded-lg bg-white/5 animate-pulse" />
    ),
  }
);

const IntentBreakdownChart = dynamic(
  () =>
    import("@/components/dashboard/intent-breakdown-chart").then(
      (m) => m.IntentBreakdownChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] rounded-lg bg-white/5 animate-pulse" />
    ),
  }
);

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stat card component ───────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  change: number;
  changeLabel: string;
  invertChange?: boolean; // true = lower is better (latency)
  index: number;
  formatValue?: (n: number) => string;
}

function StatCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  invertChange = false,
  index,
  formatValue,
}: StatCardProps) {
  const { count, ref } = useCountUp(value, 1000 + index * 100);
  const displayValue = formatValue ? formatValue(count) : count.toString();
  // For latency: negative change means faster = good
  const isPositive = invertChange ? change <= 0 : change >= 0;
  const changeAbs = Math.abs(change);
  const changeColor = isPositive ? "text-success" : "text-destructive";
  const changeSign = change >= 0 && !invertChange ? "+" : change < 0 && invertChange ? "" : change >= 0 && invertChange ? "+" : "";

  return (
    <div
      ref={ref}
      className="aesthetic-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "200ms",
      }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </p>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-3xl font-bold font-mono tabular-nums text-primary">
          {displayValue}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground font-mono">{unit}</span>
        )}
      </div>
      <p className={`text-xs font-mono ${changeColor}`}>
        {changeSign}{changeAbs}
        {invertChange && change < 0 ? "ms faster" : invertChange && change > 0 ? "ms slower" : change !== 0 ? "%" : ""}
        {" · "}<span className="text-muted-foreground">{changeLabel}</span>
      </p>
    </div>
  );
}

// ─── Status badge helpers ──────────────────────────────────────────────────────
function statusBadgeClass(status: ExecutionStatus): string {
  switch (status) {
    case "executed":
    case "confirmed":
      return "bg-success/15 text-success border-success/20";
    case "failed":
      return "bg-destructive/15 text-destructive border-destructive/20";
    case "awaiting_confirmation":
      return "bg-warning/15 text-warning border-warning/20";
    case "pending":
      return "bg-muted text-muted-foreground border-border/50";
    default:
      return "bg-muted text-muted-foreground border-border/50";
  }
}

function statusLabel(status: ExecutionStatus): string {
  switch (status) {
    case "executed": return "Executed";
    case "confirmed": return "Confirmed";
    case "failed": return "Failed";
    case "awaiting_confirmation": return "Awaiting Confirm";
    case "pending": return "Pending";
    default: return status;
  }
}

function serviceColor(service: ServiceType): string {
  switch (service) {
    case "TaskService": return "text-chart-1";
    case "CalendarService": return "text-chart-2";
    case "EmailService": return "text-chart-3";
    default: return "text-muted-foreground";
  }
}

function intentLabel(intent: IntentType): string {
  switch (intent) {
    case "create_task": return "create_task";
    case "complete_task": return "complete_task";
    case "schedule_event": return "schedule_event";
    case "send_email": return "send_email";
    case "draft_email": return "draft_email";
    default: return intent;
  }
}

function serviceHealthColor(status: "healthy" | "degraded" | "down"): string {
  if (status === "healthy") return "text-success";
  if (status === "degraded") return "text-warning";
  return "text-destructive";
}

function serviceHealthDot(status: "healthy" | "degraded" | "down"): string {
  if (status === "healthy") return "bg-success";
  if (status === "degraded") return "bg-warning";
  return "bg-destructive";
}

// ─── Main dashboard ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [period, setPeriod] = useState<"7d" | "14d" | "30d">("30d");
  const [commandFilter, setCommandFilter] = useState<"all" | ExecutionStatus>("all");

  const chartData = useMemo(() => {
    if (period === "7d") return dailyMetrics.slice(-7);
    if (period === "14d") return dailyMetrics.slice(-14);
    return dailyMetrics;
  }, [period]);

  const filteredCommands = useMemo(() => {
    const all = voiceCommands.slice(0, 10);
    if (commandFilter === "all") return all;
    return voiceCommands.filter((c) => c.status === commandFilter).slice(0, 10);
  }, [commandFilter]);

  const stats = dashboardStats;

  return (
    <div className="space-y-6 pb-6">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ letterSpacing: "var(--heading-tracking)" }}
        >
          Execution Monitor
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Voice command dispatch pipeline · Today, Feb 27 2026
        </p>
      </div>

      {/* ── KPI Stat Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Commands Dispatched"
          value={stats.totalCommandsToday}
          change={stats.commandsChange}
          changeLabel="vs yesterday"
          index={0}
        />
        <StatCard
          title="Intent Parse Rate"
          value={stats.executionSuccessRate}
          unit="%"
          change={stats.successRateChange}
          changeLabel={`SLA target 97.0%`}
          index={1}
          formatValue={(n) => n.toFixed(n === stats.executionSuccessRate ? 1 : 0)}
        />
        <StatCard
          title="Avg Dispatch Latency"
          value={stats.avgDispatchLatencyMs}
          unit="ms"
          change={stats.latencyChange}
          changeLabel="lower is better"
          invertChange={true}
          index={2}
        />
        <StatCard
          title="Active Threads"
          value={stats.activeThreads}
          change={stats.threadsChange}
          changeLabel={`${stats.tasksCreatedToday} tasks created today`}
          index={3}
          formatValue={(n) => n.toString()}
        />
      </div>

      {/* ── Execution Timeline Chart ──────────────────────────────────── */}
      <div className="aesthetic-card" style={{ padding: 0 }}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <h2 className="text-sm font-semibold">Execution Timeline</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Commands dispatched · Intent parse success rate
            </p>
          </div>
          {/* Period filter */}
          <div className="flex gap-1.5">
            {(["7d", "14d", "30d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors`}
                style={{
                  transitionDuration: "var(--dur-fast)",
                  backgroundColor:
                    period === p ? "var(--primary)" : "transparent",
                  color:
                    period === p ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  borderColor:
                    period === p ? "var(--primary)" : "color-mix(in oklch, var(--border), transparent 30%)",
                }}
              >
                {p === "7d" ? "7 days" : p === "14d" ? "14 days" : "30 days"}
              </button>
            ))}
          </div>
        </div>
        <div className="px-2 pb-4">
          <ExecutionTimelineChart data={chartData} />
        </div>
      </div>

      {/* ── Two-column: Intent Breakdown + Service Health ─────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Intent Breakdown */}
        <div className="aesthetic-card" style={{ padding: 0 }}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-sm font-semibold">Intent Distribution</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Last 30 days · 2,358 commands parsed
            </p>
          </div>
          <div className="px-2 pb-4">
            <IntentBreakdownChart data={intentBreakdown} />
          </div>
        </div>

        {/* Service Health */}
        <div className="aesthetic-card" style={{ padding: "var(--card-padding)" }}>
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Service Health</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live · Checked 09:30 UTC
            </p>
          </div>
          <div className="space-y-3">
            {serviceHealth.map((svc) => (
              <div
                key={svc.service}
                className="flex items-center justify-between py-2.5 px-3 rounded-md"
                style={{ backgroundColor: "var(--surface-hover)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${serviceHealthDot(svc.status)}`}
                    style={
                      svc.status === "healthy"
                        ? {
                            boxShadow: "0 0 6px var(--success)",
                          }
                        : svc.status === "degraded"
                        ? { boxShadow: "0 0 6px var(--warning)" }
                        : {}
                    }
                  />
                  <span className="text-xs font-mono text-foreground">
                    {svc.service}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-muted-foreground">
                    {svc.latencyMs}
                    <span className="text-muted-foreground/60">ms</span>
                  </span>
                  <span className="text-muted-foreground">
                    {svc.uptime}
                    <span className="text-muted-foreground/60">% up</span>
                  </span>
                  <span className={`font-medium ${serviceHealthColor(svc.status)}`}>
                    {svc.status === "healthy"
                      ? "Healthy"
                      : svc.status === "degraded"
                      ? "Degraded"
                      : "Down"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Today's dispatch summary */}
          <div
            className="mt-4 pt-4 grid grid-cols-3 gap-2 text-center"
            style={{ borderTop: "1px solid color-mix(in oklch, var(--border), transparent 40%)" }}
          >
            <div>
              <p className="text-lg font-bold font-mono text-foreground">
                {stats.tasksCreatedToday}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Tasks</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-foreground">
                {stats.eventsScheduledToday}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Events</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-foreground">
                {stats.emailsSentToday}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Emails</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Command Feed ─────────────────────────────────────────── */}
      <div className="aesthetic-card" style={{ padding: 0 }}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ boxShadow: "0 0 8px var(--primary)" }}
            />
            <h2 className="text-sm font-semibold">Live Command Feed</h2>
            <span className="text-xs text-muted-foreground ml-1">
              · recent dispatch log
            </span>
          </div>
          {/* Status filter */}
          <div className="flex gap-1.5 flex-wrap">
            {(
              [
                "all",
                "executed",
                "awaiting_confirmation",
                "failed",
                "pending",
              ] as const
            ).map((f) => (
              <button
                key={f}
                onClick={() => setCommandFilter(f)}
                className="px-2 py-1 text-xs rounded border transition-colors"
                style={{
                  transitionDuration: "var(--dur-fast)",
                  backgroundColor:
                    commandFilter === f ? "var(--primary)" : "transparent",
                  color:
                    commandFilter === f
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                  borderColor:
                    commandFilter === f
                      ? "var(--primary)"
                      : "color-mix(in oklch, var(--border), transparent 30%)",
                }}
              >
                {f === "all"
                  ? "All"
                  : f === "executed"
                  ? "Executed"
                  : f === "awaiting_confirmation"
                  ? "Awaiting"
                  : f === "failed"
                  ? "Failed"
                  : "Pending"}
              </button>
            ))}
          </div>
        </div>

        {/* Feed table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid color-mix(in oklch, var(--border), transparent 40%)" }}>
                <th className="text-left px-5 py-2.5 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
                  Raw Input
                </th>
                <th className="text-left px-3 py-2.5 text-muted-foreground font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">
                  Parsed Intent
                </th>
                <th className="text-left px-3 py-2.5 text-muted-foreground font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">
                  Dispatched To
                </th>
                <th className="text-left px-3 py-2.5 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
                  Status
                </th>
                <th className="text-right px-5 py-2.5 text-muted-foreground font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">
                  Latency
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCommands.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No commands match the selected filter
                  </td>
                </tr>
              ) : (
                filteredCommands.map((cmd, i) => (
                  <tr
                    key={cmd.id}
                    className="aesthetic-hover"
                    style={{
                      borderBottom:
                        i < filteredCommands.length - 1
                          ? "1px solid color-mix(in oklch, var(--border), transparent 60%)"
                          : undefined,
                    }}
                  >
                    <td className="px-5 py-3 max-w-[260px]">
                      <p className="text-foreground truncate">{cmd.rawInput}</p>
                      <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">
                        {cmd.id} · conf {(cmd.confidence * 100).toFixed(0)}%
                      </p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                        {intentLabel(cmd.intent)}
                      </span>
                    </td>
                    <td className={`px-3 py-3 whitespace-nowrap font-mono ${serviceColor(cmd.service)}`}>
                      {cmd.service}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${statusBadgeClass(cmd.status)}`}
                      >
                        {statusLabel(cmd.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-muted-foreground whitespace-nowrap">
                      {cmd.executionTimeMs > 0 ? (
                        <span
                          className={
                            cmd.executionTimeMs > 500
                              ? "text-warning"
                              : cmd.executionTimeMs > 1000
                              ? "text-destructive"
                              : "text-foreground"
                          }
                        >
                          {cmd.executionTimeMs}ms
                        </span>
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Proposal Banner ───────────────────────────────────────────── */}
      <div
        className="rounded-lg border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          borderColor: "color-mix(in oklch, var(--primary), transparent 80%)",
          background:
            "linear-gradient(to right, color-mix(in oklch, var(--primary), transparent 93%), transparent)",
        }}
      >
        <div>
          <p className="text-sm font-medium text-foreground">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            My Approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
