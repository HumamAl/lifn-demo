import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers building voice AI apps let the UI call Google APIs directly — one component schedules, another sends, nothing is auditable. When GPT returns free-text instead of structured JSON, they add string parsing hacks. Timezones get stored in UTC and silently display wrong.",
  differentApproach:
    "I architect a centralized dispatcher that owns every service call. GPT output is treated as a typed IntentPayload validated against a strict schema before anything executes. IANA timezone travels through the entire execution path — from Whisper transcription to CalendarService to the event record.",
  accentWord: "typed IntentPayload",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-dispatcher",
    title: "Centralized Dispatcher Routing Without UI-to-API Leakage",
    description:
      "In naive implementations, React Native components call Google Calendar and Gmail APIs directly. This makes the system untestable, unauditable, and brittle — any API change breaks multiple components.",
    visualizationType: "flow",
    outcome:
      "Could eliminate any direct UI-to-external-API calls — every intent routes through a single dispatcher layer, making the system auditable and testable without mocking 6+ separate service integrations",
  },
  {
    id: "challenge-intent",
    title: "Structured GPT Intent Parsing with Fallback Handling",
    description:
      "Treating GPT-4 output as free text is the most common failure mode in voice AI apps. Ambiguous commands, refusals, and schema drift cause silent failures that are impossible to debug at scale.",
    visualizationType: "architecture",
    outcome:
      "Could reduce ambiguous command failures to near-zero by treating GPT output as typed JSON schema — not free-text — with schema validation before any service is invoked",
  },
  {
    id: "challenge-timezone",
    title: "Timezone-Correct Calendar Event Creation Across User Context",
    description:
      "When a user says 'dentist appointment Tuesday at 3pm ET', that timezone must travel from Whisper transcription through GPT parsing through CalendarService to the stored event. Any gap creates the #1 Phase 1 bug.",
    visualizationType: "before-after",
    outcome:
      "Could eliminate the most common Phase 1 bug class: events created in UTC appearing at the wrong time in the user's local calendar — by threading IANA timezone through the entire execution path",
  },
];
