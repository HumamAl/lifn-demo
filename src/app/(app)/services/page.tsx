"use client";

import { useState, useMemo } from "react";
import {
  serviceHealth,
  tasks,
  calendarEvents,
  emailDrafts,
} from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  ListTodo,
  CalendarDays,
  Mail,
  CheckSquare,
  Square,
} from "lucide-react";
import type { Task, CalendarEvent, EmailDraft, ServiceHealth, ServiceType } from "@/lib/types";

// ── Status Badge ─────────────────────────────────────────────────────────────

function ServiceStatusBadge({ status }: { status: ServiceHealth["status"] }) {
  const config: Record<ServiceHealth["status"], { label: string; className: string; icon: React.ReactNode }> = {
    healthy:  {
      label: "Healthy",
      className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    degraded: {
      label: "Degraded",
      className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
      icon: <AlertTriangle className="w-3 h-3" />,
    },
    down:     {
      label: "Down",
      className: "text-destructive bg-destructive/10 border-destructive/20",
      icon: <XCircle className="w-3 h-3" />,
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border rounded-full flex items-center gap-1", c.className)}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

function EmailStatusBadge({ status }: { status: EmailDraft["status"] }) {
  const config: Record<EmailDraft["status"], { label: string; className: string }> = {
    draft:     { label: "Draft",     className: "text-muted-foreground bg-muted border-muted-foreground/20" },
    confirmed: { label: "Confirmed", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20" },
    sent:      { label: "Sent",      className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20" },
    failed:    { label: "Failed",    className: "text-destructive bg-destructive/10 border-destructive/20" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-[10px] font-medium border rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

function EventStatusBadge({ status }: { status: CalendarEvent["status"] }) {
  const config: Record<CalendarEvent["status"], { label: string; className: string }> = {
    scheduled: { label: "Scheduled", className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/20" },
    tentative: { label: "Tentative", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20" },
    cancelled: { label: "Cancelled", className: "text-muted-foreground bg-muted border-muted-foreground/20" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-[10px] font-medium border rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

// ── Formatters ───────────────────────────────────────────────────────────────

function formatLastCheck(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

function formatEventDate(date: string, time: string, tz: string): string {
  const short = tz.split("/")[1]?.replace(/_/g, " ") ?? tz;
  return `${date} ${time} ${short}`;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h${minutes % 60 > 0 ? ` ${minutes % 60}m` : ""}`;
}

// ── Priority badge ────────────────────────────────────────────────────────────

function PriorityDot({ priority }: { priority: Task["priority"] }) {
  const color =
    priority === "high"
      ? "bg-destructive"
      : priority === "medium"
      ? "bg-[color:var(--warning)]"
      : "bg-muted-foreground/40";
  return <span className={cn("inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-1", color)} />;
}

// ── Service Card component ────────────────────────────────────────────────────

interface ServiceCardProps {
  health: ServiceHealth;
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
}

function ServiceCard({ health, children, icon, label }: ServiceCardProps) {
  const borderAccent =
    health.status === "healthy"
      ? "border-[color:var(--success)]/20"
      : health.status === "degraded"
      ? "border-[color:var(--warning)]/30"
      : "border-destructive/30";

  return (
    <div className={cn("aesthetic-card overflow-hidden", borderAccent)}>
      {/* Service Header */}
      <div className="px-5 py-4 border-b border-border/60">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {icon}
            </div>
            <div>
              <h2 className="text-sm font-semibold">{health.service}</h2>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{label}</p>
            </div>
          </div>
          <ServiceStatusBadge status={health.status} />
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Latency</p>
            <p className={cn(
              "font-mono text-sm font-semibold mt-0.5",
              health.latencyMs > 400 ? "text-[color:var(--warning)]" : "text-foreground"
            )}>
              {health.latencyMs}ms
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Uptime (30d)</p>
            <p className={cn(
              "font-mono text-sm font-semibold mt-0.5",
              health.uptime >= 99 ? "text-[color:var(--success)]" : "text-[color:var(--warning)]"
            )}>
              {health.uptime}%
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Last Check</p>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">{formatLastCheck(health.lastCheck)}</p>
          </div>
        </div>
      </div>

      {/* Service content */}
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(
    () => new Set(tasks.filter((t) => t.completed).map((t) => t.id))
  );

  function toggleTask(id: string) {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const taskHealthIndex = serviceHealth.findIndex((s) => s.service === "TaskService");
  const calendarHealthIndex = serviceHealth.findIndex((s) => s.service === "CalendarService");
  const emailHealthIndex = serviceHealth.findIndex((s) => s.service === "EmailService");

  const taskHealth = serviceHealth[taskHealthIndex];
  const calendarHealth = serviceHealth[calendarHealthIndex];
  const emailHealth = serviceHealth[emailHealthIndex];

  const taskList = useMemo(() => tasks.slice(0, 6), []);
  const upcomingEvents = useMemo(
    () => calendarEvents.filter((e) => e.status !== "cancelled").slice(0, 5),
    []
  );
  const recentEmails = useMemo(() => emailDrafts.slice(0, 5), []);

  const completedCount = taskList.filter((t) => completedTasks.has(t.id)).length;

  return (
    <div className="page-container space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Modules</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time health and recent activity for each execution service
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--success)]" />
          </span>
          Health checks every 60s
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* TaskService */}
        {taskHealth && (
          <ServiceCard
            health={taskHealth}
            icon={<ListTodo className="w-5 h-5" />}
            label="task creation and completion"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Task Queue
              </p>
              <span className="text-xs text-muted-foreground font-mono">
                {completedCount}/{taskList.length} done
              </span>
            </div>
            <div className="space-y-2">
              {taskList.map((task) => {
                const isChecked = completedTasks.has(task.id);
                return (
                  <div
                    key={task.id}
                    className="flex items-start gap-2.5 py-2 px-2 rounded-md hover:bg-[color:var(--surface-hover)] transition-colors duration-100 cursor-pointer group"
                    onClick={() => toggleTask(task.id)}
                    role="checkbox"
                    aria-checked={isChecked}
                  >
                    <div className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-100">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[color:var(--success)]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </div>
                    <PriorityDot priority={task.priority} />
                    <span
                      className={cn(
                        "text-xs leading-snug flex-1 transition-colors duration-100",
                        isChecked ? "line-through text-muted-foreground/50" : "text-foreground/90"
                      )}
                    >
                      {task.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 px-2">
              Click any task to toggle completion
            </p>
          </ServiceCard>
        )}

        {/* CalendarService */}
        {calendarHealth && (
          <ServiceCard
            health={calendarHealth}
            icon={<CalendarDays className="w-5 h-5" />}
            label="event scheduling and calendar sync"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Upcoming Events
              </p>
              <span className="text-xs text-muted-foreground font-mono">
                {upcomingEvents.length} scheduled
              </span>
            </div>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="py-2 px-2 rounded-md hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground/90 truncate">{event.title}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                        {formatEventDate(event.date, event.time, event.timezone)}
                        <span className="ml-1.5 text-muted-foreground/60">· {formatDuration(event.duration)}</span>
                      </p>
                    </div>
                    <EventStatusBadge status={event.status} />
                  </div>
                </div>
              ))}
            </div>
          </ServiceCard>
        )}

        {/* EmailService */}
        {emailHealth && (
          <ServiceCard
            health={emailHealth}
            icon={<Mail className="w-5 h-5" />}
            label="email drafting, confirmation gate, send"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Email Drafts
              </p>
              <span className="text-xs text-muted-foreground font-mono">
                {emailDrafts.filter((e) => e.status === "sent").length} sent
              </span>
            </div>
            <div className="space-y-2">
              {recentEmails.map((email) => (
                <div
                  key={email.id}
                  className="py-2 px-2 rounded-md hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                >
                  <div className="flex items-start gap-2 justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground/90 truncate">{email.subject}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5 truncate">
                        → {email.to}
                      </p>
                    </div>
                    <EmailStatusBadge status={email.status} />
                  </div>
                </div>
              ))}
            </div>
          </ServiceCard>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1.5">
          <Server className="w-3 h-3" />
          <span>All services report health every 60 seconds</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[color:var(--success)]" /> Healthy
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[color:var(--warning)]" /> Degraded
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-destructive" /> Down
          </span>
        </div>
      </div>
    </div>
  );
}
