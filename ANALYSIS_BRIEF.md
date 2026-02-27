# LIFN Demo — Analysis Brief

**Job:** Senior React Native + FastAPI Engineer Needed
**Project:** LIFN — Voice-Forward AI Execution Assistant
**Date:** 2026-02-27

---

## Analysis Brief (JSON)

```json
{
  "domain": "tech",
  "clientName": null,
  "features": [
    "voice command interface with live transcription waveform",
    "structured intent parser with GPT-4 JSON output viewer",
    "task creation and completion management",
    "calendar event scheduler with timezone display",
    "email draft composer with explicit confirmation gate",
    "centralized execution dispatcher trace log"
  ],
  "challenges": [
    {
      "title": "Centralized dispatcher routing without UI-to-API leakage",
      "vizType": "flow-diagram",
      "outcome": "Could eliminate any direct UI-to-external-API calls — every intent routes through a single dispatcher layer, making the system auditable and testable without mocking 6+ services"
    },
    {
      "title": "Structured GPT intent parsing with fallback handling",
      "vizType": "architecture-sketch",
      "outcome": "Could reduce ambiguous command failures to near-zero by treating GPT output as typed JSON schema — not free-text — with schema validation before any service is invoked"
    },
    {
      "title": "Timezone-correct calendar event creation across user context",
      "vizType": "before-after",
      "outcome": "Could eliminate the most common Phase 1 bug class: events created in UTC appearing at the wrong time in the user's local calendar — by threading IANA timezone through the entire execution path"
    }
  ],
  "portfolioProjects": [
    "WMF Agent Dashboard",
    "Outerbloom — AI Social Coordination",
    "eBay Pokemon Monitor",
    "Lead Intake CRM"
  ],
  "coverLetterHooks": [
    "structured GPT JSON output",
    "centralized execution dispatcher",
    "The UI must never directly call external APIs",
    "When you speak to your life, something real happens",
    "modular service architecture (TaskService, CalendarService, EmailService)"
  ],
  "screeningQuestion": "A brief explanation of how you would structure the execution dispatcher",
  "screeningAnswer": "The dispatcher sits between all UI events and all external services — it receives a typed intent object (parsed from GPT-4 structured output), routes to the correct service module (TaskService, CalendarService, EmailService), and returns a normalized result to the persistent assistant thread. No service is called directly from UI components. I've built a working version of this architecture: {VERCEL_URL}",
  "aestheticProfile": {
    "aesthetic": "dark-premium",
    "mood": "authoritative, precise, voice-first, execution-grade",
    "colorDirection": "indigo at oklch(0.52 0.17 260) — standard chroma with slight purple-blue cast; works on near-black canvas to feel premium, not neon",
    "densityPreference": "standard",
    "justification": "The client explicitly built a product called a 'structured execution engine' and described it as 'not a generic chatbot' — they are signaling they want a product that feels serious, capable, and technical. Their reference stack (Supabase, GPT-4, Whisper, FastAPI) is developer-oriented and the closest visual references are OpenAI Playground, Vapi.ai, and Vercel dark mode. A light-mode linear or SaaS Modern aesthetic would undermine the 'voice-forward execution' positioning. Dark Premium also allows the voice waveform and intent dispatch visualizations to feel alive and high-stakes, which matches Phase 1's core thesis: 'when you speak, something real happens.'"
  },
  "clientVocabulary": {
    "primaryEntities": ["command", "intent", "action", "thread", "task", "event", "draft"],
    "kpiLabels": ["commands dispatched", "intent parse success rate", "avg execution latency", "active thread depth"],
    "statusLabels": ["Parsed", "Dispatched", "Executing", "Confirmed", "Completed", "Failed"],
    "workflowVerbs": ["speak", "dispatch", "parse", "route", "confirm", "execute", "schedule"],
    "sidebarNavCandidates": ["Command Feed", "Task Queue", "Calendar Events", "Email Drafts", "Dispatcher Log"],
    "industryTerms": ["structured output", "intent parsing", "execution dispatcher", "persistent thread", "service module", "timezone handling", "confirmation gate", "Google OAuth"]
  },
  "designSignals": "The client's team is building an AI execution layer — their daily reference apps are OpenAI Playground, Supabase dashboard, and iOS system UIs. 'Premium' to them means interfaces that feel powerful and precise: dark canvas, glowing active states, clean monospace data labels. A light-mode dashboard with blue stat cards would read as a web app template. The demo must feel like infrastructure for AI agents, not a productivity to-do list — because the client explicitly wrote 'this is not a chatbot.'",
  "accentColor": "indigo",
  "signals": ["HIGH_BUDGET", "DETAILED_SPEC", "TECH_SPECIFIC"],
  "coverLetterVariant": "A",
  "domainResearcherFocus": "Focus on voice AI and mobile AI assistant terminology: intent classification, structured output (OpenAI function calling / JSON mode), Whisper transcription, Web Speech API, IANA timezone identifiers, Google OAuth PKCE flow, Gmail API scopes. Entity names should be realistic user commands ('Schedule a dentist appointment Tuesday at 3pm ET', 'Email Sarah about the budget doc', 'Mark gym session complete'). Metric ranges: intent parse latency 800–2500ms, calendar event creation 1.2–3s, email send confirmation < 500ms. Edge cases: ambiguous intents (is 'call mom' a calendar event or a task?), timezone mismatch (device vs. event timezone), OAuth token expiry during active session, GPT refusing to generate structured output for unsafe commands. Real tools/references: Vapi.ai, ElevenLabs Conversational AI, OpenAI Realtime API, Whisper API, Google Calendar API, Gmail API, Supabase Auth, Expo Go, TestFlight."
}
```

---

## Aesthetic Profile (Standalone)

```json
{
  "aesthetic": "dark-premium",
  "domain": "tech",
  "mood": "authoritative, precise, voice-first, execution-grade",
  "colorDirection": "indigo oklch(0.52 0.17 260) on near-black canvas oklch(0.08 0.01 260)",
  "radiusProfile": "soft (0.75rem)",
  "densityProfile": "standard",
  "motionCharacter": "smooth (150-300ms ease-in-out)",
  "accentColor": "indigo",
  "primaryOklch": "oklch(0.52 0.17 260)",
  "backgroundOklch": "oklch(0.08 0.01 260)",
  "chartHue": 260
}
```

---

## Vocabulary Map (for all downstream agents)

```json
{
  "entityNames": {
    "primary_record": "command",
    "customer": "user",
    "worker": "dispatcher",
    "id_field": "intent ID",
    "secondary_records": ["task", "event", "draft"]
  },
  "statusWorkflow": ["Parsed", "Dispatched", "Executing", "Confirmed", "Completed", "Failed"],
  "kpiNames": ["Commands Dispatched", "Intent Parse Rate", "Avg Execution Latency", "Thread Depth"],
  "sidebarLabels": ["Command Feed", "Task Queue", "Calendar Events", "Email Drafts", "Dispatcher Log"],
  "industryTerms": ["structured output", "intent dispatcher", "persistent thread", "service module", "timezone handling", "confirmation gate", "function calling", "Whisper", "Google OAuth"],
  "complianceSignals": ["explicit email confirmation", "OAuth token scope", "Gmail API verification"],
  "painVocabulary": ["app switching", "no confirmation before send", "timezone mismatch", "UI calling APIs directly", "free-text parsing", "unstructured intent"]
}
```

---

## Screening Question Answers

**Question 1: Links to React Native apps you've shipped**
My recent mobile work includes a voice + AI coordination platform (Outerbloom) and an iOS-compatible monitoring tool. I can provide TestFlight links or Expo Go builds on request. Full portfolio: {VERCEL_URL}

**Question 2: How you would structure the execution dispatcher**
The dispatcher receives a typed `IntentPayload` (parsed from GPT-4 structured JSON output), validates it against an intent schema, then routes to the correct service module — `TaskService`, `CalendarService`, or `EmailService`. Each service is isolated: no cross-service calls, no direct external API calls from UI components. The dispatcher returns a normalized `ExecutionResult` back to the persistent assistant thread. I've prototyped this pattern in the demo: {VERCEL_URL}

**Question 3: Your estimate**
Phase 1 as scoped: 6–8 weeks. iOS build + PWA + backend + Gmail OAuth verification all in scope. Happy to break this into 2-week milestones with clear "Done =" criteria per milestone.

**Question 4: Confirmation of timeline**
Available to start immediately. Milestone-based works well for me — I can have the dispatcher architecture and Google OAuth flow running in Week 1 as described.

**Question 5: Relevant experience with GPT structured outputs**
Used OpenAI structured output (function calling + JSON mode) in the WMF Agent Dashboard to extract 14 fields per RFQ from unstructured email. Same principle applies here: define a strict intent schema, validate output before any service executes. The demo at {VERCEL_URL} shows a simplified version of this pattern.

---

## Cover Letter (Variant A — "Built It Already")

```
Your Phase 1 core challenge is architectural: keeping the UI from ever calling Google APIs directly while making voice commands feel instant — built a working version: {VERCEL_URL}

The demo shows the dispatcher layer routing parsed intents to TaskService, CalendarService, and EmailService — with the email confirmation gate your spec requires. Used the same structured GPT output pattern I built for an AI RFQ pipeline that replaced a 4-hour manual process.

Are you planning to handle timezone resolution at the Whisper transcription layer or at the CalendarService level?

Humam

P.S. I can record a quick Loom walkthrough of the dispatcher architecture if that's easier than reading code.
```

**Word count:** 107 words. Does not start with "I". Demo link in sentence 1. Embedded question specific to their spec. Signed "Humam". Binary CTA via P.S. Loom mention included.

---

## Build Notes for Downstream Agents

### Dashboard Composition (Dashboard Builder)
This is a voice AI execution product. The dashboard should NOT be a generic stat-card + bar chart layout. Instead:
- **Command Feed** — the primary surface: a live log of recent voice commands with parsed intent type, execution status badge, and latency. Looks like a terminal/activity stream.
- **4 compact KPI cards** — Commands Dispatched (today), Intent Parse Rate, Avg Execution Latency (ms), Active Thread Depth
- **Intent type breakdown** — donut or horizontal bar showing distribution: Tasks vs. Calendar vs. Email
- **Dispatcher trace panel** — shows the execution path for the most recent command (Parsed → Routed → Executed → Confirmed)

### Feature Pages (Feature Builder)
1. **Command Feed** — searchable/filterable log of all voice commands with intent JSON inspector
2. **Task Queue** — tasks created via voice: title, created-at, status (Pending / Completed), source command
3. **Calendar Events** — events scheduled via LIFN: title, datetime (with timezone label), confirmation status
4. **Email Drafts** — drafted emails: recipient, subject, status (Pending Confirmation / Sent), confirmation timestamp
5. **Dispatcher Log** — raw execution trace: intent ID, service called, latency, success/error

### Challenges (Challenges Builder)
3 challenges as specified above. Visualizations:
1. Flow diagram showing dispatcher routing (voice input → Whisper → GPT-4 → IntentParser → Dispatcher → ServiceModule → Result → Thread)
2. Architecture sketch showing modular service isolation (UI → Dispatcher only; Dispatcher → Services; Services → External APIs)
3. Before/after: before = event created in UTC stored as-is; after = IANA timezone extracted from intent + stored with user timezone + displayed correctly

### Mock Data Notes (Data Architect)
- Commands should include realistic voice utterances: "Schedule a dentist appointment Tuesday at 3pm ET", "Email Sarah the budget doc", "Mark gym session as done", "Add 'call accountant' to my task list"
- Timestamps should show both user-local time and UTC to demonstrate timezone handling
- Intent JSON should be realistic structured output: `{ "intent": "CREATE_EVENT", "title": "Dentist Appointment", "datetime": "2026-03-03T15:00:00", "timezone": "America/New_York" }`
- Include edge cases: failed parse (ambiguous command), pending confirmation (email not yet sent), timezone mismatch warning

### Proposal Page (Proposal Builder)
Value prop: "Full-stack developer who builds AI execution pipelines — from structured GPT output to dispatcher architecture to production iOS builds."
Portfolio priority: WMF Agent Dashboard (#1) → Outerbloom (#16) → eBay Pokemon Monitor (#23) → Lead Intake CRM (#3)
"How I Work" variant: AI/automation framing — Architect → Parse → Dispatch → Ship
