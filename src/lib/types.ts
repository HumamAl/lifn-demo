import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─────────────────────────────────────────────
// LIFN — Voice-Forward AI Execution Engine Types
// ─────────────────────────────────────────────

/** The parsed structured intent extracted by GPT-4 from raw user input */
export type IntentType =
  | "create_task"
  | "complete_task"
  | "schedule_event"
  | "draft_email"
  | "send_email";

/** The modular service the dispatcher routes an intent to */
export type ServiceType = "TaskService" | "CalendarService" | "EmailService";

/** Lifecycle status of a voice command as it moves through the execution pipeline */
export type ExecutionStatus =
  | "pending"
  | "confirmed"
  | "executed"
  | "failed"
  | "awaiting_confirmation";

/** A single parsed voice or text command — the core entity of the LIFN execution engine */
export interface VoiceCommand {
  id: string;
  rawInput: string;
  intent: IntentType;
  /** GPT-4 confidence in the parsed intent, 0–1 */
  confidence: number;
  service: ServiceType;
  status: ExecutionStatus;
  timestamp: string; // ISO date-time
  executionTimeMs: number;
  requiresConfirmation: boolean;
  /** Structured parameters extracted from the raw input */
  parsedParams: Record<string, string>;
}

/** A task created or completed via the execution dispatcher */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  /** ID of the VoiceCommand that created this task */
  sourceCommand: string;
  priority: "low" | "medium" | "high";
}

/** A calendar event created or modified through the CalendarService */
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date "2026-02-28"
  time: string; // "14:00"
  timezone: string;
  duration: number; // minutes
  /** ID of the VoiceCommand that created this event */
  sourceCommand: string;
  status: "scheduled" | "tentative" | "cancelled";
}

/** An email draft or sent email managed through the EmailService */
export interface EmailDraft {
  id: string;
  to: string;
  subject: string;
  body: string;
  /** ID of the VoiceCommand that created this draft */
  sourceCommand: string;
  status: "draft" | "confirmed" | "sent" | "failed";
  sentAt?: string;
}

/** An ongoing conversation session with the LIFN assistant */
export interface AssistantThread {
  id: string;
  startedAt: string;
  messages: ThreadMessage[];
  commandCount: number;
  status: "active" | "idle" | "closed";
}

/** A single message in a persistent assistant thread */
export interface ThreadMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  /** Present when this message triggered or confirmed a VoiceCommand */
  commandId?: string;
}

/** Real-time health status of a modular execution service */
export interface ServiceHealth {
  service: ServiceType;
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  lastCheck: string;
  /** Percentage uptime over the last 30 days, 0–100 */
  uptime: number;
}

/** Aggregated daily execution metrics for charts and KPI cards */
export interface DailyMetrics {
  date: string; // ISO date "2026-02-01"
  commands: number;
  successRate: number; // percentage 0–100
  avgLatencyMs: number;
  tasksCreated: number;
  eventsScheduled: number;
  emailsSent: number;
}

/** A single dispatcher routing entry in the execution audit log */
export interface DispatcherLog {
  id: string;
  timestamp: string;
  commandId: string;
  service: ServiceType;
  /** Method called on the service: e.g. "createTask", "scheduleEvent" */
  action: string;
  durationMs: number;
  success: boolean;
  errorMessage?: string;
}

/** Aggregated intent distribution for the breakdown chart */
export interface IntentBreakdown {
  intent: IntentType;
  count: number;
  successRate: number; // percentage
  avgLatencyMs: number;
}

/** Hourly activity data point for the 24-hour activity chart */
export interface HourlyActivity {
  hour: number; // 0–23
  label: string; // "12 AM", "2 PM"
  commands: number;
  successRate: number;
}

/** KPI card stats for the main dashboard */
export interface DashboardStats {
  totalCommandsToday: number;
  commandsChange: number; // % change vs yesterday
  executionSuccessRate: number; // percentage
  successRateChange: number;
  avgDispatchLatencyMs: number;
  latencyChange: number; // positive = slower (worse), negative = faster (better)
  activeThreads: number;
  threadsChange: number;
  tasksCreatedToday: number;
  eventsScheduledToday: number;
  emailsSentToday: number;
}
