/**
 * LIFN — Voice-Forward AI Execution Engine
 * Mock data for the proposal demo. All dates relative to 2026-02-27.
 *
 * Vocabulary note: LIFN is an execution engine, not a chatbot.
 * Entities speak the language of the dispatcher, not a chat interface.
 *   - "structured intent"  (not "message intent")
 *   - "execution pipeline" (not "chat flow")
 *   - "persistent thread"  (not "conversation")
 *   - "dispatched to"      (not "handled by")
 */

import type {
  VoiceCommand,
  Task,
  CalendarEvent,
  EmailDraft,
  AssistantThread,
  ServiceHealth,
  DailyMetrics,
  DispatcherLog,
  IntentBreakdown,
  HourlyActivity,
  DashboardStats,
} from "@/lib/types";

// ─────────────────────────────────────────────────────────────────
// 1. VOICE COMMANDS — 20 items
//    The primary entity: raw input parsed into structured intents
//    routed through the centralized dispatcher.
// ─────────────────────────────────────────────────────────────────

export const voiceCommands: VoiceCommand[] = [
  {
    id: "CMD-8821",
    rawInput: "Schedule a meeting with Sarah tomorrow at 2pm",
    intent: "schedule_event",
    confidence: 0.97,
    service: "CalendarService",
    status: "executed",
    timestamp: "2026-02-27T09:14:32Z",
    executionTimeMs: 312,
    requiresConfirmation: false,
    parsedParams: {
      title: "Meeting with Sarah",
      date: "2026-02-28",
      time: "14:00",
      timezone: "America/New_York",
    },
  },
  {
    id: "CMD-8819",
    rawInput: "Create a task to review the Q1 budget proposal",
    intent: "create_task",
    confidence: 0.99,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-27T09:02:17Z",
    executionTimeMs: 187,
    requiresConfirmation: false,
    parsedParams: { title: "Review Q1 budget proposal", priority: "high" },
  },
  {
    id: "CMD-8817",
    rawInput: "Send an email to Mike about the project status update",
    intent: "send_email",
    confidence: 0.91,
    service: "EmailService",
    status: "awaiting_confirmation",
    timestamp: "2026-02-27T08:51:44Z",
    executionTimeMs: 428,
    requiresConfirmation: true,
    parsedParams: {
      to: "mike.okafor@axiomtech.com",
      subject: "Project Status Update",
      bodyHint: "Weekly status summary for current sprint",
    },
  },
  {
    id: "CMD-8814",
    rawInput: "Mark the Figma review task as done",
    intent: "complete_task",
    confidence: 0.94,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-27T08:33:09Z",
    executionTimeMs: 203,
    requiresConfirmation: false,
    parsedParams: { taskTitle: "Figma review", action: "complete" },
  },
  {
    id: "CMD-8811",
    rawInput: "Block out Friday afternoon for deep work — no meetings",
    intent: "schedule_event",
    confidence: 0.88,
    service: "CalendarService",
    status: "executed",
    timestamp: "2026-02-26T16:47:22Z",
    executionTimeMs: 298,
    requiresConfirmation: false,
    parsedParams: {
      title: "Deep Work — Do Not Disturb",
      date: "2026-02-28",
      time: "13:00",
      duration: "240",
      timezone: "America/New_York",
    },
  },
  {
    id: "CMD-8807",
    rawInput: "Draft an email to the design team about the new brand guidelines",
    intent: "draft_email",
    confidence: 0.96,
    service: "EmailService",
    status: "executed",
    timestamp: "2026-02-26T14:22:58Z",
    executionTimeMs: 541,
    requiresConfirmation: true,
    parsedParams: {
      to: "design-team@company.com",
      subject: "New Brand Guidelines — Review Required",
      bodyHint: "Announce updated brand guidelines, request team review by EOW",
    },
  },
  {
    id: "CMD-8804",
    rawInput: "Add a task to prepare the onboarding doc for Nexora Systems",
    intent: "create_task",
    confidence: 0.98,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-26T11:08:41Z",
    executionTimeMs: 171,
    requiresConfirmation: false,
    parsedParams: {
      title: "Prepare onboarding doc for Nexora Systems",
      priority: "medium",
    },
  },
  {
    id: "CMD-8801",
    rawInput: "Schedule a 30-minute standup with the engineering team every morning at 9",
    intent: "schedule_event",
    confidence: 0.85,
    service: "CalendarService",
    status: "awaiting_confirmation",
    timestamp: "2026-02-26T09:31:07Z",
    executionTimeMs: 389,
    requiresConfirmation: true,
    parsedParams: {
      title: "Engineering Standup",
      time: "09:00",
      duration: "30",
      recurrence: "daily",
      timezone: "America/New_York",
    },
  },
  {
    id: "CMD-8798",
    rawInput: "Remind me to follow up with Priya about the API integration next Monday",
    intent: "create_task",
    confidence: 0.92,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-25T17:14:53Z",
    executionTimeMs: 195,
    requiresConfirmation: false,
    parsedParams: {
      title: "Follow up with Priya — API integration",
      dueDate: "2026-03-02",
      priority: "medium",
    },
  },
  {
    id: "CMD-8795",
    rawInput: "Send the sprint retrospective notes to the team",
    intent: "send_email",
    confidence: 0.89,
    service: "EmailService",
    status: "executed",
    timestamp: "2026-02-25T15:44:29Z",
    executionTimeMs: 467,
    requiresConfirmation: true,
    parsedParams: {
      to: "team@company.com",
      subject: "Sprint Retrospective Notes — Feb 24",
      bodyHint: "Attach retrospective doc, summarize key decisions",
    },
  },
  {
    id: "CMD-8792",
    rawInput: "Create a high priority task to fix the auth bug in production",
    intent: "create_task",
    confidence: 0.99,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-25T11:27:16Z",
    executionTimeMs: 168,
    requiresConfirmation: false,
    parsedParams: {
      title: "Fix auth bug in production",
      priority: "high",
    },
  },
  {
    id: "CMD-8789",
    rawInput: "Schedule a call with the Vaulted.io team for next Wednesday at 10am",
    intent: "schedule_event",
    confidence: 0.95,
    service: "CalendarService",
    status: "executed",
    timestamp: "2026-02-25T10:02:34Z",
    executionTimeMs: 341,
    requiresConfirmation: false,
    parsedParams: {
      title: "Call with Vaulted.io team",
      date: "2026-03-04",
      time: "10:00",
      duration: "60",
      timezone: "America/New_York",
    },
  },
  {
    id: "CMD-8785",
    rawInput: "Draft an email thanking Rachel from Fenwick Creative for the intro",
    intent: "draft_email",
    confidence: 0.97,
    service: "EmailService",
    status: "confirmed",
    timestamp: "2026-02-24T16:19:47Z",
    executionTimeMs: 512,
    requiresConfirmation: true,
    parsedParams: {
      to: "rachel@fenwickco.com",
      subject: "Re: Intro — Thank You",
      bodyHint: "Thank Rachel for the introduction, express interest in collaboration",
    },
  },
  {
    id: "CMD-8782",
    rawInput: "Mark the database migration task done",
    intent: "complete_task",
    confidence: 0.93,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-24T14:08:22Z",
    executionTimeMs: 184,
    requiresConfirmation: false,
    parsedParams: { taskTitle: "Database migration", action: "complete" },
  },
  {
    id: "CMD-8779",
    rawInput: "Block 2 hours tomorrow morning for writing the technical spec",
    intent: "schedule_event",
    confidence: 0.91,
    service: "CalendarService",
    status: "executed",
    timestamp: "2026-02-24T11:37:54Z",
    executionTimeMs: 276,
    requiresConfirmation: false,
    parsedParams: {
      title: "Technical Spec — Writing Block",
      date: "2026-02-25",
      time: "09:00",
      duration: "120",
      timezone: "America/New_York",
    },
  },
  {
    id: "CMD-8773",
    rawInput: "Add a task to update the README with deployment instructions",
    intent: "create_task",
    confidence: 0.98,
    service: "TaskService",
    status: "executed",
    timestamp: "2026-02-23T15:51:08Z",
    executionTimeMs: 179,
    requiresConfirmation: false,
    parsedParams: {
      title: "Update README with deployment instructions",
      priority: "low",
    },
  },
  {
    id: "CMD-8770",
    rawInput: "Send an email to david at nexora with the revised pricing deck",
    intent: "send_email",
    confidence: 0.87,
    service: "EmailService",
    status: "failed",
    timestamp: "2026-02-23T13:44:31Z",
    executionTimeMs: 1247,
    requiresConfirmation: true,
    parsedParams: {
      to: "d.nakamura@nexora.com",
      subject: "Revised Pricing Deck",
      bodyHint: "Attach updated pricing PDF, note changes since last version",
    },
  },
  {
    id: "CMD-8767",
    rawInput: "Schedule the Q1 planning session for next Thursday at 1pm for 3 hours",
    intent: "schedule_event",
    confidence: 0.96,
    service: "CalendarService",
    status: "executed",
    timestamp: "2026-02-22T10:24:17Z",
    executionTimeMs: 318,
    requiresConfirmation: false,
    parsedParams: {
      title: "Q1 Planning Session",
      date: "2026-03-05",
      time: "13:00",
      duration: "180",
      timezone: "America/New_York",
    },
  },
  // Edge case: very low confidence — dispatcher held for review
  {
    id: "CMD-8762",
    rawInput: "um email someone about the thing we talked about last week",
    intent: "draft_email",
    confidence: 0.43,
    service: "EmailService",
    status: "failed",
    timestamp: "2026-02-21T09:07:53Z",
    executionTimeMs: 892,
    requiresConfirmation: true,
    parsedParams: {},
  },
  // Edge case: pending — dispatcher queue backed up
  {
    id: "CMD-8759",
    rawInput: "Create a task to prepare the investor update for Q4 results",
    intent: "create_task",
    confidence: 0.99,
    service: "TaskService",
    status: "pending",
    timestamp: "2026-02-27T09:18:04Z",
    executionTimeMs: 0,
    requiresConfirmation: false,
    parsedParams: {
      title: "Prepare investor update — Q4 results",
      priority: "high",
    },
  },
];

// ─────────────────────────────────────────────────────────────────
// 2. TASKS — 15 items
//    Created or completed via the TaskService dispatcher route.
// ─────────────────────────────────────────────────────────────────

export const tasks: Task[] = [
  {
    id: "TSK-0441",
    title: "Prepare investor update — Q4 results",
    completed: false,
    createdAt: "2026-02-27T09:18:12Z",
    sourceCommand: "CMD-8759",
    priority: "high",
  },
  {
    id: "TSK-0439",
    title: "Review Q1 budget proposal",
    completed: false,
    createdAt: "2026-02-27T09:02:24Z",
    sourceCommand: "CMD-8819",
    priority: "high",
  },
  {
    id: "TSK-0437",
    title: "Fix auth bug in production",
    completed: true,
    createdAt: "2026-02-25T11:27:23Z",
    completedAt: "2026-02-26T14:38:47Z",
    sourceCommand: "CMD-8792",
    priority: "high",
  },
  {
    id: "TSK-0435",
    title: "Prepare onboarding doc for Nexora Systems",
    completed: false,
    createdAt: "2026-02-26T11:08:48Z",
    sourceCommand: "CMD-8804",
    priority: "medium",
  },
  {
    id: "TSK-0433",
    title: "Follow up with Priya — API integration",
    completed: false,
    createdAt: "2026-02-25T17:14:59Z",
    sourceCommand: "CMD-8798",
    priority: "medium",
  },
  {
    id: "TSK-0431",
    title: "Update README with deployment instructions",
    completed: true,
    createdAt: "2026-02-23T15:51:14Z",
    completedAt: "2026-02-24T11:22:31Z",
    sourceCommand: "CMD-8773",
    priority: "low",
  },
  {
    id: "TSK-0428",
    title: "Figma review",
    completed: true,
    createdAt: "2026-02-21T10:14:07Z",
    completedAt: "2026-02-27T08:33:15Z",
    sourceCommand: "CMD-8814",
    priority: "medium",
  },
  {
    id: "TSK-0424",
    title: "Database migration to PostgreSQL 16",
    completed: true,
    createdAt: "2026-02-19T09:42:38Z",
    completedAt: "2026-02-24T14:08:29Z",
    sourceCommand: "CMD-8782",
    priority: "high",
  },
  {
    id: "TSK-0421",
    title: "Write unit tests for dispatcher router",
    completed: false,
    createdAt: "2026-02-18T14:27:52Z",
    sourceCommand: "CMD-8748",
    priority: "medium",
  },
  {
    id: "TSK-0418",
    title: "Set up Sentry error tracking in staging",
    completed: false,
    createdAt: "2026-02-17T11:08:19Z",
    sourceCommand: "CMD-8741",
    priority: "medium",
  },
  {
    id: "TSK-0415",
    title: "Refactor intent parser for multi-step commands",
    completed: false,
    createdAt: "2026-02-16T09:33:44Z",
    sourceCommand: "CMD-8734",
    priority: "high",
  },
  {
    id: "TSK-0412",
    title: "Create documentation for EmailService API",
    completed: true,
    createdAt: "2026-02-14T15:47:21Z",
    completedAt: "2026-02-20T10:14:58Z",
    sourceCommand: "CMD-8727",
    priority: "low",
  },
  {
    id: "TSK-0408",
    title: "Audit confirmation flow for destructive commands",
    completed: false,
    createdAt: "2026-02-12T13:19:04Z",
    sourceCommand: "CMD-8718",
    priority: "high",
  },
  {
    id: "TSK-0405",
    title: "Integrate GPT-4o for faster intent parsing",
    completed: true,
    createdAt: "2026-02-11T10:02:47Z",
    completedAt: "2026-02-18T16:51:33Z",
    sourceCommand: "CMD-8712",
    priority: "medium",
  },
  // Edge case: overdue high-priority task — no completedAt
  {
    id: "TSK-0402",
    title: "Migrate CalendarService to Google Calendar API v3",
    completed: false,
    createdAt: "2026-01-29T09:14:22Z",
    sourceCommand: "CMD-8688",
    priority: "high",
  },
];

// ─────────────────────────────────────────────────────────────────
// 3. CALENDAR EVENTS — 12 items
//    Events created via the CalendarService execution route.
// ─────────────────────────────────────────────────────────────────

export const calendarEvents: CalendarEvent[] = [
  {
    id: "EVT-2294",
    title: "Meeting with Sarah",
    date: "2026-02-28",
    time: "14:00",
    timezone: "America/New_York",
    duration: 60,
    sourceCommand: "CMD-8821",
    status: "scheduled",
  },
  {
    id: "EVT-2292",
    title: "Deep Work — Do Not Disturb",
    date: "2026-02-28",
    time: "13:00",
    timezone: "America/New_York",
    duration: 240,
    sourceCommand: "CMD-8811",
    status: "scheduled",
  },
  {
    id: "EVT-2289",
    title: "Technical Spec — Writing Block",
    date: "2026-02-25",
    time: "09:00",
    timezone: "America/New_York",
    duration: 120,
    sourceCommand: "CMD-8779",
    status: "scheduled",
  },
  {
    id: "EVT-2287",
    title: "Call with Vaulted.io team",
    date: "2026-03-04",
    time: "10:00",
    timezone: "America/New_York",
    duration: 60,
    sourceCommand: "CMD-8789",
    status: "scheduled",
  },
  {
    id: "EVT-2284",
    title: "Q1 Planning Session",
    date: "2026-03-05",
    time: "13:00",
    timezone: "America/New_York",
    duration: 180,
    sourceCommand: "CMD-8767",
    status: "scheduled",
  },
  {
    id: "EVT-2281",
    title: "Engineering Standup",
    date: "2026-02-28",
    time: "09:00",
    timezone: "America/New_York",
    duration: 30,
    sourceCommand: "CMD-8801",
    status: "tentative",
  },
  {
    id: "EVT-2278",
    title: "Product Demo — Quantra AI",
    date: "2026-03-06",
    time: "15:30",
    timezone: "America/Los_Angeles",
    duration: 45,
    sourceCommand: "CMD-8752",
    status: "scheduled",
  },
  {
    id: "EVT-2274",
    title: "Board Prep Review",
    date: "2026-03-10",
    time: "11:00",
    timezone: "America/New_York",
    duration: 90,
    sourceCommand: "CMD-8744",
    status: "scheduled",
  },
  {
    id: "EVT-2271",
    title: "1:1 with Carlos — Performance Review",
    date: "2026-02-26",
    time: "10:00",
    timezone: "America/Chicago",
    duration: 45,
    sourceCommand: "CMD-8738",
    status: "scheduled",
  },
  {
    id: "EVT-2268",
    title: "Investor Call — Helix Analytics partnership",
    date: "2026-02-24",
    time: "16:00",
    timezone: "America/New_York",
    duration: 60,
    sourceCommand: "CMD-8731",
    status: "scheduled",
  },
  // Edge case: cancelled event
  {
    id: "EVT-2265",
    title: "Sprint Planning — February",
    date: "2026-02-23",
    time: "14:00",
    timezone: "America/New_York",
    duration: 120,
    sourceCommand: "CMD-8724",
    status: "cancelled",
  },
  {
    id: "EVT-2261",
    title: "Hiring Panel — Senior Engineer",
    date: "2026-03-12",
    time: "13:00",
    timezone: "America/New_York",
    duration: 90,
    sourceCommand: "CMD-8717",
    status: "scheduled",
  },
];

// ─────────────────────────────────────────────────────────────────
// 4. EMAIL DRAFTS — 10 items
//    Emails in various pipeline stages managed by EmailService.
// ─────────────────────────────────────────────────────────────────

export const emailDrafts: EmailDraft[] = [
  {
    id: "EML-7721",
    to: "mike.okafor@axiomtech.com",
    subject: "Project Status Update — Week of Feb 24",
    body: "Hi Mike,\n\nHere's the weekly status update for our current sprint. We're on track with the dispatcher refactor and expect to ship the intent confidence threshold improvements by Thursday.\n\nKey items:\n- Auth bug resolved (TSK-0437)\n- Nexora onboarding doc in progress\n- Q1 planning session scheduled for March 5\n\nLet me know if you have questions.\n\nBest,\nJordan",
    sourceCommand: "CMD-8817",
    status: "draft",
  },
  {
    id: "EML-7718",
    to: "design-team@company.com",
    subject: "New Brand Guidelines — Review Required",
    body: "Team,\n\nThe updated brand guidelines are now live in Figma. Please review by end of week and flag any conflicts with existing component library.\n\nKey changes:\n- Primary palette shifted to a cooler blue-slate\n- Type scale updated for improved readability\n- Icon set migrated to Lucide\n\nReview link: [attached]\n\nThanks,\nJordan",
    sourceCommand: "CMD-8807",
    status: "sent",
    sentAt: "2026-02-26T14:48:12Z",
  },
  {
    id: "EML-7715",
    to: "team@company.com",
    subject: "Sprint Retrospective Notes — Feb 24",
    body: "Hi everyone,\n\nAttached are the notes from today's retrospective. Key action items:\n\n1. Improve dispatcher error logging (Owner: Priya)\n2. Add confirmation prompts for bulk operations (Owner: Carlos)\n3. Reduce average intent parse latency below 200ms (Owner: Jordan)\n\nNext retrospective: March 10.\n\nJordan",
    sourceCommand: "CMD-8795",
    status: "sent",
    sentAt: "2026-02-25T16:02:37Z",
  },
  {
    id: "EML-7712",
    to: "rachel@fenwickco.com",
    subject: "Re: Intro — Thank You",
    body: "Hi Rachel,\n\nThank you for the warm introduction — I really appreciate you making the connection. I've already had a great initial call with the team and we're exploring a few collaboration ideas.\n\nWould love to catch up soon and update you on how things are progressing.\n\nBest,\nJordan",
    sourceCommand: "CMD-8785",
    status: "confirmed",
  },
  {
    id: "EML-7709",
    to: "d.nakamura@nexora.com",
    subject: "Revised Pricing Deck",
    body: "Hi David,\n\nPlease find attached the revised pricing deck reflecting the updated enterprise tier structure we discussed.\n\nThe main changes are on slides 4 and 7 — let me know if you'd like to walk through them on a call.\n\nBest,\nJordan",
    sourceCommand: "CMD-8770",
    status: "failed",
  },
  {
    id: "EML-7706",
    to: "investors@luminarycloud.com",
    subject: "Q4 Performance Summary",
    body: "Dear Luminary Cloud team,\n\nAttached is the Q4 performance summary. Highlights include a 34% improvement in dispatcher throughput and a reduction of average execution latency from 487ms to 312ms.\n\nWe're on track for our Q1 milestones and will schedule a follow-up call next month.\n\nJordan",
    sourceCommand: "CMD-8744",
    status: "sent",
    sentAt: "2026-02-20T11:17:44Z",
  },
  {
    id: "EML-7703",
    to: "sofia.andersen@bytecraft.io",
    subject: "Integration Proposal — LIFN + Bytecraft",
    body: "Hi Sofia,\n\nFollowing our call last week, I've put together a brief integration proposal outlining how LIFN's execution dispatcher could fit into Bytecraft's workflow automation stack.\n\nI've kept it to one page — happy to expand any section.\n\nLooking forward to your thoughts,\nJordan",
    sourceCommand: "CMD-8731",
    status: "sent",
    sentAt: "2026-02-18T09:44:22Z",
  },
  {
    id: "EML-7700",
    to: "omar.farouk@axiom.ai",
    subject: "GPT-4o Intent Parser — Benchmark Results",
    body: "Hi Omar,\n\nSharing the benchmark results from last week's GPT-4o migration. Parse confidence improved by 8.3 percentage points on ambiguous inputs, and p95 latency dropped from 820ms to 541ms.\n\nFull report attached.\n\nJordan",
    sourceCommand: "CMD-8712",
    status: "sent",
    sentAt: "2026-02-14T15:31:08Z",
  },
  // Edge case: draft with no body content yet — early stage
  {
    id: "EML-7697",
    to: "priya.chen@luminarycloud.com",
    subject: "API Integration — Status Check",
    body: "",
    sourceCommand: "CMD-8798",
    status: "draft",
  },
  {
    id: "EML-7694",
    to: "legal@coretek.io",
    subject: "DPA Review Request — LIFN Data Processing Agreement",
    body: "Hi,\n\nPlease find attached the draft Data Processing Agreement for your review. We've highlighted sections 4.2 and 7.1 which have changed from the standard template.\n\nPlease return comments within 5 business days.\n\nJordan",
    sourceCommand: "CMD-8704",
    status: "sent",
    sentAt: "2026-02-10T13:08:55Z",
  },
];

// ─────────────────────────────────────────────────────────────────
// 5. ASSISTANT THREAD — 1 active persistent thread, 18 messages
//    Demonstrates the dispatcher pattern: user input → intent
//    parsing → service routing → execution confirmation.
// ─────────────────────────────────────────────────────────────────

export const assistantThread: AssistantThread = {
  id: "THR-0093",
  startedAt: "2026-02-27T08:45:00Z",
  commandCount: 5,
  status: "active",
  messages: [
    {
      id: "MSG-001",
      role: "system",
      content: "Persistent thread initialized. Execution dispatcher ready. Services: TaskService ✓  CalendarService ✓  EmailService ✓",
      timestamp: "2026-02-27T08:45:00Z",
    },
    {
      id: "MSG-002",
      role: "user",
      content: "Mark the Figma review task as done",
      timestamp: "2026-02-27T08:33:09Z",
      commandId: "CMD-8814",
    },
    {
      id: "MSG-003",
      role: "assistant",
      content: "Parsed structured intent: `complete_task` → dispatching to TaskService.\n\n**Matched task:** Figma review (TSK-0428)\n**Action:** mark completed\n\nExecuted in 203ms. Task marked complete.",
      timestamp: "2026-02-27T08:33:12Z",
      commandId: "CMD-8814",
    },
    {
      id: "MSG-004",
      role: "user",
      content: "Create a task to review the Q1 budget proposal",
      timestamp: "2026-02-27T09:02:17Z",
      commandId: "CMD-8819",
    },
    {
      id: "MSG-005",
      role: "assistant",
      content: "Parsed structured intent: `create_task` → dispatching to TaskService.\n\n**New task:** Review Q1 budget proposal\n**Priority:** high (inferred from Q1 context)\n\nExecuted in 187ms. Task created (TSK-0439).",
      timestamp: "2026-02-27T09:02:18Z",
      commandId: "CMD-8819",
    },
    {
      id: "MSG-006",
      role: "user",
      content: "Schedule a meeting with Sarah tomorrow at 2pm",
      timestamp: "2026-02-27T09:14:32Z",
      commandId: "CMD-8821",
    },
    {
      id: "MSG-007",
      role: "assistant",
      content: "Parsed structured intent: `schedule_event` → dispatching to CalendarService.\n\n**Event:** Meeting with Sarah\n**Date:** Feb 28, 2026 at 2:00 PM ET\n**Duration:** 60 min (default)\n\nExecuted in 312ms. Event created (EVT-2294). No conflicts detected.",
      timestamp: "2026-02-27T09:14:35Z",
      commandId: "CMD-8821",
    },
    {
      id: "MSG-008",
      role: "user",
      content: "Send an email to Mike about the project status update",
      timestamp: "2026-02-27T08:51:44Z",
      commandId: "CMD-8817",
    },
    {
      id: "MSG-009",
      role: "assistant",
      content: "Parsed structured intent: `send_email` → dispatching to EmailService.\n\n**Recipient:** mike.okafor@axiomtech.com\n**Subject:** Project Status Update — Week of Feb 24\n**Draft generated** — confirmation required before send.\n\n⚠️ This action requires your confirmation. Reply **confirm** to send or **edit** to modify.",
      timestamp: "2026-02-27T08:51:48Z",
      commandId: "CMD-8817",
    },
    {
      id: "MSG-010",
      role: "user",
      content: "edit",
      timestamp: "2026-02-27T08:52:31Z",
    },
    {
      id: "MSG-011",
      role: "assistant",
      content: "Draft saved to EmailService queue (EML-7721). You can review and edit it in the Email Drafts view. The command remains in `awaiting_confirmation` state — it won't be sent until you confirm.",
      timestamp: "2026-02-27T08:52:32Z",
    },
    {
      id: "MSG-012",
      role: "user",
      content: "Create a task to prepare the investor update for Q4 results",
      timestamp: "2026-02-27T09:18:04Z",
      commandId: "CMD-8759",
    },
    {
      id: "MSG-013",
      role: "assistant",
      content: "Parsed structured intent: `create_task` → queued for TaskService.\n\n**New task:** Prepare investor update — Q4 results\n**Priority:** high\n**Status:** pending (dispatcher queue)\n\nTask will execute within the next dispatch cycle.",
      timestamp: "2026-02-27T09:18:07Z",
      commandId: "CMD-8759",
    },
    {
      id: "MSG-014",
      role: "user",
      content: "What does my calendar look like this week?",
      timestamp: "2026-02-27T09:24:18Z",
    },
    {
      id: "MSG-015",
      role: "assistant",
      content: "Querying CalendarService for this week (Feb 27 – Mar 1)...\n\n**Today (Feb 27):** No scheduled events\n**Tomorrow (Feb 28):**\n  • Engineering Standup — 9:00 AM (tentative)\n  • Deep Work — Do Not Disturb — 1:00 PM\n  • Meeting with Sarah — 2:00 PM\n\n2 scheduled events, 1 tentative. No conflicts detected.",
      timestamp: "2026-02-27T09:24:21Z",
    },
    {
      id: "MSG-016",
      role: "user",
      content: "How many tasks do I have left this week?",
      timestamp: "2026-02-27T09:27:44Z",
    },
    {
      id: "MSG-017",
      role: "assistant",
      content: "Querying TaskService...\n\n**Open tasks (no due date or due this week):** 7\n  • Prepare investor update — Q4 results (high) ⏳ pending\n  • Review Q1 budget proposal (high)\n  • Prepare onboarding doc for Nexora Systems (medium)\n  • Follow up with Priya — API integration (medium)\n  • Write unit tests for dispatcher router (medium)\n  • Set up Sentry error tracking in staging (medium)\n  • Refactor intent parser for multi-step commands (high)\n\n3 high-priority tasks open.",
      timestamp: "2026-02-27T09:27:47Z",
    },
    {
      id: "MSG-018",
      role: "user",
      content: "Remind me to follow up on the Vaulted.io call after the meeting on March 4",
      timestamp: "2026-02-27T09:31:02Z",
      commandId: "CMD-8823",
    },
    {
      id: "MSG-019",
      role: "assistant",
      content: "Parsed structured intent: `create_task` → dispatching to TaskService.\n\n**New task:** Follow up after Vaulted.io call\n**Due:** March 4, 2026 (after EVT-2287)\n**Priority:** medium\n\nExecuted in 194ms. Task created (TSK-0443).",
      timestamp: "2026-02-27T09:31:05Z",
      commandId: "CMD-8823",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// 6. SERVICE HEALTH — 3 items (one per execution service)
// ─────────────────────────────────────────────────────────────────

export const serviceHealth: ServiceHealth[] = [
  {
    service: "TaskService",
    status: "healthy",
    latencyMs: 178,
    lastCheck: "2026-02-27T09:30:00Z",
    uptime: 99.84,
  },
  {
    service: "CalendarService",
    status: "degraded",
    latencyMs: 487,
    lastCheck: "2026-02-27T09:30:00Z",
    uptime: 97.21,
  },
  {
    service: "EmailService",
    status: "healthy",
    latencyMs: 312,
    lastCheck: "2026-02-27T09:30:00Z",
    uptime: 99.41,
  },
];

// ─────────────────────────────────────────────────────────────────
// 7. DAILY METRICS — 30 items (last 30 days)
//    Realistic growth curve with weekend dips and weekday spikes.
// ─────────────────────────────────────────────────────────────────

export const dailyMetrics: DailyMetrics[] = [
  { date: "2026-01-28", commands: 41, successRate: 92.7, avgLatencyMs: 387, tasksCreated: 18, eventsScheduled: 9, emailsSent: 14 },
  { date: "2026-01-29", commands: 38, successRate: 94.1, avgLatencyMs: 371, tasksCreated: 16, eventsScheduled: 7, emailsSent: 15 },
  { date: "2026-01-30", commands: 12, successRate: 91.7, avgLatencyMs: 402, tasksCreated: 5,  eventsScheduled: 4, emailsSent: 3 },  // weekend
  { date: "2026-01-31", commands: 9,  successRate: 88.9, avgLatencyMs: 421, tasksCreated: 4,  eventsScheduled: 2, emailsSent: 3 },  // weekend
  { date: "2026-02-01", commands: 53, successRate: 93.4, avgLatencyMs: 358, tasksCreated: 22, eventsScheduled: 12, emailsSent: 19 },
  { date: "2026-02-02", commands: 61, successRate: 95.1, avgLatencyMs: 334, tasksCreated: 27, eventsScheduled: 14, emailsSent: 20 },
  { date: "2026-02-03", commands: 57, successRate: 94.7, avgLatencyMs: 341, tasksCreated: 24, eventsScheduled: 11, emailsSent: 22 },
  { date: "2026-02-04", commands: 48, successRate: 93.8, avgLatencyMs: 362, tasksCreated: 20, eventsScheduled: 10, emailsSent: 18 },
  { date: "2026-02-05", commands: 44, successRate: 95.5, avgLatencyMs: 327, tasksCreated: 19, eventsScheduled: 9,  emailsSent: 16 },
  { date: "2026-02-06", commands: 14, successRate: 92.9, avgLatencyMs: 389, tasksCreated: 6,  eventsScheduled: 3, emailsSent: 5 },  // weekend
  { date: "2026-02-07", commands: 11, successRate: 90.9, avgLatencyMs: 411, tasksCreated: 5,  eventsScheduled: 2, emailsSent: 4 },  // weekend
  { date: "2026-02-08", commands: 64, successRate: 95.3, avgLatencyMs: 322, tasksCreated: 28, eventsScheduled: 15, emailsSent: 21 },
  { date: "2026-02-09", commands: 71, successRate: 96.1, avgLatencyMs: 308, tasksCreated: 31, eventsScheduled: 17, emailsSent: 23 },
  { date: "2026-02-10", commands: 68, successRate: 95.6, avgLatencyMs: 317, tasksCreated: 29, eventsScheduled: 16, emailsSent: 23 },
  { date: "2026-02-11", commands: 59, successRate: 94.9, avgLatencyMs: 331, tasksCreated: 25, eventsScheduled: 13, emailsSent: 21 },
  { date: "2026-02-12", commands: 55, successRate: 96.4, avgLatencyMs: 298, tasksCreated: 23, eventsScheduled: 12, emailsSent: 20 },
  { date: "2026-02-13", commands: 18, successRate: 94.4, avgLatencyMs: 347, tasksCreated: 8,  eventsScheduled: 4, emailsSent: 6 },  // weekend
  { date: "2026-02-14", commands: 13, successRate: 92.3, avgLatencyMs: 378, tasksCreated: 6,  eventsScheduled: 3, emailsSent: 4 },  // weekend
  { date: "2026-02-15", commands: 72, successRate: 96.9, avgLatencyMs: 287, tasksCreated: 32, eventsScheduled: 17, emailsSent: 23 },
  { date: "2026-02-16", commands: 78, successRate: 97.4, avgLatencyMs: 274, tasksCreated: 35, eventsScheduled: 19, emailsSent: 24 },  // week high
  { date: "2026-02-17", commands: 74, successRate: 97.2, avgLatencyMs: 279, tasksCreated: 33, eventsScheduled: 18, emailsSent: 23 },
  { date: "2026-02-18", commands: 66, successRate: 96.7, avgLatencyMs: 291, tasksCreated: 29, eventsScheduled: 15, emailsSent: 22 },
  { date: "2026-02-19", commands: 61, successRate: 96.1, avgLatencyMs: 303, tasksCreated: 27, eventsScheduled: 13, emailsSent: 21 },
  { date: "2026-02-20", commands: 19, successRate: 94.7, avgLatencyMs: 339, tasksCreated: 8,  eventsScheduled: 5, emailsSent: 6 },  // weekend
  { date: "2026-02-21", commands: 15, successRate: 93.3, avgLatencyMs: 358, tasksCreated: 7,  eventsScheduled: 3, emailsSent: 5 },  // weekend
  { date: "2026-02-22", commands: 81, successRate: 97.5, avgLatencyMs: 271, tasksCreated: 36, eventsScheduled: 20, emailsSent: 25 },
  { date: "2026-02-23", commands: 84, successRate: 97.6, avgLatencyMs: 268, tasksCreated: 38, eventsScheduled: 21, emailsSent: 25 },  // all-time high
  { date: "2026-02-24", commands: 79, successRate: 97.1, avgLatencyMs: 276, tasksCreated: 35, eventsScheduled: 19, emailsSent: 25 },
  { date: "2026-02-25", commands: 73, successRate: 96.9, avgLatencyMs: 283, tasksCreated: 32, eventsScheduled: 17, emailsSent: 24 },
  { date: "2026-02-26", commands: 69, successRate: 96.4, avgLatencyMs: 294, tasksCreated: 31, eventsScheduled: 16, emailsSent: 22 },
];

// ─────────────────────────────────────────────────────────────────
// 8. DISPATCHER LOGS — 25 items
//    Execution audit trail for every command routed through
//    the centralized dispatcher.
// ─────────────────────────────────────────────────────────────────

export const dispatcherLogs: DispatcherLog[] = [
  { id: "LOG-4410", timestamp: "2026-02-27T09:31:05Z", commandId: "CMD-8823", service: "TaskService",    action: "createTask",      durationMs: 194, success: true },
  { id: "LOG-4409", timestamp: "2026-02-27T09:18:07Z", commandId: "CMD-8759", service: "TaskService",    action: "createTask",      durationMs: 0,   success: false, errorMessage: "Dispatcher queue busy — command pending" },
  { id: "LOG-4408", timestamp: "2026-02-27T09:14:35Z", commandId: "CMD-8821", service: "CalendarService",action: "createEvent",     durationMs: 312, success: true },
  { id: "LOG-4407", timestamp: "2026-02-27T09:02:18Z", commandId: "CMD-8819", service: "TaskService",    action: "createTask",      durationMs: 187, success: true },
  { id: "LOG-4406", timestamp: "2026-02-27T08:51:48Z", commandId: "CMD-8817", service: "EmailService",   action: "draftEmail",      durationMs: 428, success: true },
  { id: "LOG-4405", timestamp: "2026-02-27T08:33:12Z", commandId: "CMD-8814", service: "TaskService",    action: "completeTask",    durationMs: 203, success: true },
  { id: "LOG-4404", timestamp: "2026-02-26T16:47:25Z", commandId: "CMD-8811", service: "CalendarService",action: "createEvent",     durationMs: 298, success: true },
  { id: "LOG-4403", timestamp: "2026-02-26T14:48:01Z", commandId: "CMD-8807", service: "EmailService",   action: "sendEmail",       durationMs: 541, success: true },
  { id: "LOG-4402", timestamp: "2026-02-26T11:08:48Z", commandId: "CMD-8804", service: "TaskService",    action: "createTask",      durationMs: 171, success: true },
  { id: "LOG-4401", timestamp: "2026-02-26T09:31:10Z", commandId: "CMD-8801", service: "CalendarService",action: "createRecurringEvent", durationMs: 389, success: true },
  { id: "LOG-4400", timestamp: "2026-02-25T17:14:59Z", commandId: "CMD-8798", service: "TaskService",    action: "createTask",      durationMs: 195, success: true },
  { id: "LOG-4399", timestamp: "2026-02-25T16:02:30Z", commandId: "CMD-8795", service: "EmailService",   action: "sendEmail",       durationMs: 467, success: true },
  { id: "LOG-4398", timestamp: "2026-02-25T11:27:23Z", commandId: "CMD-8792", service: "TaskService",    action: "createTask",      durationMs: 168, success: true },
  { id: "LOG-4397", timestamp: "2026-02-25T10:02:37Z", commandId: "CMD-8789", service: "CalendarService",action: "createEvent",     durationMs: 341, success: true },
  { id: "LOG-4396", timestamp: "2026-02-24T16:19:50Z", commandId: "CMD-8785", service: "EmailService",   action: "draftEmail",      durationMs: 512, success: true },
  { id: "LOG-4395", timestamp: "2026-02-24T14:08:29Z", commandId: "CMD-8782", service: "TaskService",    action: "completeTask",    durationMs: 184, success: true },
  { id: "LOG-4394", timestamp: "2026-02-24T11:37:57Z", commandId: "CMD-8779", service: "CalendarService",action: "createEvent",     durationMs: 276, success: true },
  { id: "LOG-4393", timestamp: "2026-02-23T15:51:14Z", commandId: "CMD-8773", service: "TaskService",    action: "createTask",      durationMs: 179, success: true },
  // Edge case: failed dispatch with timeout
  { id: "LOG-4392", timestamp: "2026-02-23T13:44:34Z", commandId: "CMD-8770", service: "EmailService",   action: "sendEmail",       durationMs: 1247, success: false, errorMessage: "SMTP relay timeout — max retries exceeded (3/3)" },
  { id: "LOG-4391", timestamp: "2026-02-22T10:24:20Z", commandId: "CMD-8767", service: "CalendarService",action: "createEvent",     durationMs: 318, success: true },
  // Edge case: invalid intent — dispatcher rejected at parse stage
  { id: "LOG-4390", timestamp: "2026-02-21T09:07:56Z", commandId: "CMD-8762", service: "EmailService",   action: "draftEmail",      durationMs: 892, success: false, errorMessage: "Intent confidence below threshold (0.43 < 0.60) — command rejected, requires clarification" },
  { id: "LOG-4389", timestamp: "2026-02-20T14:22:41Z", commandId: "CMD-8757", service: "TaskService",    action: "createTask",      durationMs: 182, success: true },
  { id: "LOG-4388", timestamp: "2026-02-20T11:17:38Z", commandId: "CMD-8744", service: "EmailService",   action: "sendEmail",       durationMs: 398, success: true },
  { id: "LOG-4387", timestamp: "2026-02-19T09:42:44Z", commandId: "CMD-8741", service: "TaskService",    action: "createTask",      durationMs: 176, success: true },
  { id: "LOG-4386", timestamp: "2026-02-18T09:44:25Z", commandId: "CMD-8731", service: "EmailService",   action: "sendEmail",       durationMs: 441, success: true },
];

// ─────────────────────────────────────────────────────────────────
// 9. INTENT BREAKDOWN — Categorical chart data
//    Distribution of parsed intents across the last 30 days.
// ─────────────────────────────────────────────────────────────────

export const intentBreakdown: IntentBreakdown[] = [
  { intent: "create_task",    count: 847, successRate: 98.2, avgLatencyMs: 181 },
  { intent: "schedule_event", count: 612, successRate: 96.4, avgLatencyMs: 318 },
  { intent: "send_email",     count: 394, successRate: 91.8, avgLatencyMs: 447 },
  { intent: "draft_email",    count: 287, successRate: 97.6, avgLatencyMs: 523 },
  { intent: "complete_task",  count: 218, successRate: 99.1, avgLatencyMs: 174 },
];

// ─────────────────────────────────────────────────────────────────
// 10. HOURLY ACTIVITY — 24 items
//     Command volume by hour of day. Peaks at morning and post-lunch.
// ─────────────────────────────────────────────────────────────────

export const hourlyActivity: HourlyActivity[] = [
  { hour: 0,  label: "12 AM", commands: 2,  successRate: 100.0 },
  { hour: 1,  label: "1 AM",  commands: 1,  successRate: 100.0 },
  { hour: 2,  label: "2 AM",  commands: 0,  successRate: 0 },
  { hour: 3,  label: "3 AM",  commands: 1,  successRate: 100.0 },
  { hour: 4,  label: "4 AM",  commands: 2,  successRate: 100.0 },
  { hour: 5,  label: "5 AM",  commands: 4,  successRate: 100.0 },
  { hour: 6,  label: "6 AM",  commands: 9,  successRate: 97.8 },
  { hour: 7,  label: "7 AM",  commands: 21, successRate: 97.6 },
  { hour: 8,  label: "8 AM",  commands: 47, successRate: 95.4 },  // early morning rush
  { hour: 9,  label: "9 AM",  commands: 84, successRate: 97.1 },  // peak — morning session
  { hour: 10, label: "10 AM", commands: 76, successRate: 96.8 },
  { hour: 11, label: "11 AM", commands: 68, successRate: 97.4 },
  { hour: 12, label: "12 PM", commands: 38, successRate: 94.7 },  // lunch dip
  { hour: 13, label: "1 PM",  commands: 52, successRate: 96.2 },
  { hour: 14, label: "2 PM",  commands: 71, successRate: 97.9 },  // post-lunch peak
  { hour: 15, label: "3 PM",  commands: 63, successRate: 97.2 },
  { hour: 16, label: "4 PM",  commands: 54, successRate: 96.6 },
  { hour: 17, label: "5 PM",  commands: 43, successRate: 95.8 },  // EOD wind-down
  { hour: 18, label: "6 PM",  commands: 28, successRate: 96.4 },
  { hour: 19, label: "7 PM",  commands: 18, successRate: 94.4 },
  { hour: 20, label: "8 PM",  commands: 12, successRate: 91.7 },
  { hour: 21, label: "9 PM",  commands: 8,  successRate: 87.5 },  // lower success late night
  { hour: 22, label: "10 PM", commands: 5,  successRate: 80.0 },
  { hour: 23, label: "11 PM", commands: 3,  successRate: 100.0 },
];

// ─────────────────────────────────────────────────────────────────
// 11. DASHBOARD STATS — KPI card values
// ─────────────────────────────────────────────────────────────────

export const dashboardStats: DashboardStats = {
  totalCommandsToday: 47,
  commandsChange: 12.4,            // % change vs yesterday (69 → 47 partial day)
  executionSuccessRate: 96.4,      // % of commands executed successfully
  successRateChange: 0.8,          // up from yesterday's 95.6%
  avgDispatchLatencyMs: 294,       // ms — current day average
  latencyChange: -18,              // 18ms faster than yesterday (improvement)
  activeThreads: 3,
  threadsChange: 1,
  tasksCreatedToday: 21,
  eventsScheduledToday: 6,
  emailsSentToday: 4,
};

// ─────────────────────────────────────────────────────────────────
// LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────────

export const getCommandById = (id: string): VoiceCommand | undefined =>
  voiceCommands.find((c) => c.id === id);

export const getTasksByStatus = (completed: boolean): Task[] =>
  tasks.filter((t) => t.completed === completed);

export const getTasksByPriority = (priority: Task["priority"]): Task[] =>
  tasks.filter((t) => t.priority === priority);

export const getEventsByStatus = (status: CalendarEvent["status"]): CalendarEvent[] =>
  calendarEvents.filter((e) => e.status === status);

export const getEmailsByStatus = (status: EmailDraft["status"]): EmailDraft[] =>
  emailDrafts.filter((e) => e.status === status);

export const getLogsByService = (service: DispatcherLog["service"]): DispatcherLog[] =>
  dispatcherLogs.filter((l) => l.service === service);

export const getLogsByCommand = (commandId: string): DispatcherLog[] =>
  dispatcherLogs.filter((l) => l.commandId === commandId);

export const getFailedLogs = (): DispatcherLog[] =>
  dispatcherLogs.filter((l) => !l.success);
