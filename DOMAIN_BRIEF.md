# Domain Knowledge Brief — Voice AI Life Execution Assistant

## Sub-Domain Classification

Personal voice-forward life execution assistant (single-user, mobile-first, iOS/Android). Not a chatbot. Not a call center voice bot. Not a smart speaker skill. This is a **structured execution engine** that accepts voice commands, parses them into machine-actionable intents with typed slot parameters, then dispatches those intents to modular service adapters (calendar, email, task manager). The UI is an operations dashboard for a personal command dispatcher — showing execution status, not conversation history.

Sub-domain analogy: "Siri Shortcuts + Zapier + personal CRM — controlled via voice, visualized like a DevOps monitoring dashboard."

---

## Job Analyst Vocabulary — Confirmed and Extended

The client vocabulary from the job posting is technically precise and accurate to this sub-domain. Key client terms to preserve verbatim:

- "execution dispatcher" — correct; this is the routing layer between intent classification and service adapters
- "structured intent parsing" — correct; refers to GPT-4 structured output producing typed JSON from transcribed speech
- "persistent assistant thread" — correct; OpenAI Assistant API thread that maintains conversation context
- "centralized dispatcher" — correct; single orchestration layer that routes intents to services
- "modular service architecture" — correct; each integration (calendar, email, tasks) is an isolated service module

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- Primary record type: **command** (not "task", not "request", not "query") — voice commands are the atomic unit
- Secondary record types: **execution** (the run of a command), **intent** (the parsed action type), **utterance** (the raw transcribed speech before parsing)
- People/system roles: **dispatcher** (the routing engine), **service adapter** (calendar/email/tasks integration), **thread** (persistent context session)
- Domain verb for processing: **dispatch** (not "run", not "execute" alone) — "Dispatched to Calendar" is the canonical success state
- Execution outputs: **action confirmation** (what the service returns when done), **slot values** (the extracted parameters from an utterance)

### Expanded KPI Vocabulary

Beyond standard AI metrics — the exact names of metrics this domain tracks for an execution engine.

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Intent Recognition Rate | % of utterances correctly classified to an intent | % (0-100) |
| Command Execution Rate | % of dispatched commands successfully completed by service adapters | % (0-100) |
| Slot Fill Rate | % of required parameters extracted without ambiguity prompts | % (0-100) |
| Avg Response Latency | End-to-end time from speech end to action confirmation | ms (integer) |
| Transcription Accuracy | Word Error Rate inverse — how accurately Whisper transcribed the audio | % (0-100) |
| Ambiguity Rate | % of commands requiring clarification before dispatch | % (0-100) |
| Fallback Rate | % of utterances that matched no intent and fell to error handler | % (0-100) |
| Commands Today | Raw count of voice commands issued in current day | integer count |
| Active Threads | Number of open persistent assistant threads | integer count |
| Service Uptime | % availability of each service adapter (calendar, email, tasks) | % per service |
| Avg Confirmation Time | How long service adapters take to return action confirmation | ms (integer) |
| Human Override Rate | % of executions that were cancelled or modified after dispatch | % (0-100) |

### Status Label Vocabulary

Exact status strings for this execution engine — these go directly into data tables, badges, and filter dropdowns.

- **Command lifecycle states**: `Listening` → `Transcribing` → `Parsing` → `Dispatching` → `Executing` → `Confirmed`
- **Problem states**: `Ambiguous` (needs slot clarification), `Failed` (service adapter error), `Timed Out` (no adapter response), `Cancelled` (user override before confirmation)
- **Service adapter states**: `Connected`, `Degraded`, `Disconnected`, `Rate Limited`
- **Thread states**: `Active`, `Idle`, `Archived`
- **Intent classification confidence**: `High Confidence` (>0.85), `Low Confidence` (0.60-0.85), `Unrecognized` (<0.60)

### Workflow and Action Vocabulary

Verbs used in this domain — these become button labels, action menu items, and empty state messages.

- Primary actions: **dispatch**, **parse**, **transcribe**, **classify**, **confirm**, **cancel**
- Secondary actions: **retry**, **escalate**, **archive**, **replay**, **override**, **clarify**
- Intent type labels: `CreateEvent`, `UpdateTask`, `SendEmail`, `QueryCalendar`, `DeleteReminder`, `SetReminder`, `ScheduleMeeting`, `SummarizeEmails`
- Slot parameter labels: `datetime`, `recipient`, `subject`, `duration`, `location`, `priority`, `recurrence`

### Sidebar Navigation Candidates

Domain-specific nav items using execution engine vocabulary — NOT generic labels.

- **Command Center** (main dashboard — execution feed and health status)
- **Intent Library** (all recognized intents and their slot schemas)
- **Execution History** (log of all commands with outcomes)
- **Service Adapters** (calendar, email, tasks connection status and settings)
- **Thread Sessions** (active and archived persistent assistant threads)
- **Analytics** (intent distribution, latency trends, error rates)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

This product lives at the intersection of voice AI (which practitioners associate with Vapi, Assembly AI, and ElevenLabs — dark, technical, monitoring-heavy) and personal productivity ops (which practitioners associate with Notion, Linear, and Things 3 — clean, structured, minimal). The right aesthetic is **Dark Premium with a developer tool sensibility**: near-black backgrounds, electric accent (amethyst/violet or teal), monospace for values, and status-first layouts where system health is immediately scannable.

The key visual differentiator for this domain: the dashboard should show **execution state, not conversation**. No chat bubbles. No message threads. Instead: command feed with status badges, service health row, intent distribution charts, and latency sparklines. Think Langfuse meets PagerDuty — a technical operator viewing a live processing pipeline.

Waveform and audio-reactive elements are appropriate for the voice recording moment but should NOT dominate the dashboard. The waveform appears during active listening (a transient animated state), not as a persistent chrome element. Once the command completes, it becomes a row in an execution log. Practitioners of voice AI building tools are skeptical of "gimmicky" waveforms — they want to see the numbers.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Vapi** — Voice AI orchestration dashboard. Dark background, structured call log with latency columns, service health indicators per provider. Practitioners in voice AI consider it the gold standard for agent monitoring UI. It shows transcripts, latency breakdowns, and cost per call in a dense, scrollable log.

2. **Langfuse** — LLM observability platform. Dark Premium aesthetic, trace timeline visualization, confidence scores, token usage by model. Every AI developer building GPT-4-backed systems has seen this. Its execution timeline (nested spans showing STT → LLM → TTS time breakdown) is exactly the visual language LIFN's dashboard should echo.

3. **Linear** — Issue tracking with a developer sensibility. Clean, fast, keyboard-first, dark mode default. Used as a reference because LIFN's command management (assigning priorities, tracking status, archiving) mirrors issue tracking workflows in visual structure.

### Aesthetic Validation

- **Job Analyst aesthetic choice**: Dark Premium
- **Domain validation**: Confirmed — voice AI execution engine practitioners work in tools like Vapi, Langfuse, Retool, and Grafana all day. Dark Premium with electric accent is the exact expectation. The amethyst/violet primary hue (`oklch(0.50 0.20 290)`) used in the AI/Automation section of industry-design-patterns.md is exactly right for this sub-domain.
- **One adjustment**: Lean slightly more into the **Data-Dense** secondary axis. This is an operations dashboard, not a marketing demo. Reduce card padding by 1 step from spacious default. Use compact header height. Monospace font for all numeric values (latency ms, command counts, confidence %). The operational density of Langfuse/Vapi is part of what makes them feel credible to technical clients.

### Density and Layout Expectations

**Dense, approaching command-center density.** This product's user is a developer/early adopter who built a voice pipeline — they understand and expect dense information displays. Standard SaaS card spacing would feel too casual for this audience.

Layout pattern: **Activity-feed-primary with service health sidebar**. The dominant view is a scrollable command execution feed (list-heavy, real-time feel), with a right-side or top-row status panel for service adapter health. This is not a card-heavy view — cards appear for aggregate KPIs at the top, then feeds and tables below.

Chart types: **Area chart for command volume over time** (temporal throughput), **Bar chart for intent distribution** (categorical), **Latency sparklines per service** (operational pulse).

---

## Entity Names (10+ realistic names)

### Companies / Organizations (if needed for multi-user context)
These are realistic names for voice AI / productivity tool companies in this space:
- Aether Labs
- Nexus Voice Systems
- Meridian AI
- Pulsar Dispatch
- Axiom Intelligence
- Cortex Personal OS
- Waveline Technologies
- Catalyst AI
- Resonant Systems
- Fieldwork AI

### People Names (user/developer personas for mock data)
These are realistic early-adopter developer/professional user names:
- Marcus Chen
- Priya Sharma
- Jordan Osei
- Alex Reyes
- Nadia Kowalski
- Sam Nakamura
- Eli Thornton
- Camille Dubois
- Omar Farouk
- Lena Brandt

### Intent Types (canonical command categories)
- `CreateCalendarEvent` — "Schedule a meeting with Jordan at 3pm Friday"
- `UpdateCalendarEvent` — "Move tomorrow's standup to 10am"
- `DeleteCalendarEvent` — "Cancel my dentist appointment"
- `QueryCalendar` — "What's on my schedule Thursday?"
- `CreateTask` — "Add buy groceries to my task list"
- `UpdateTask` — "Mark the proposal draft as done"
- `SetReminder` — "Remind me to call Marcus at 5pm"
- `SendEmail` — "Email Priya with the project update"
- `SummarizeEmails` — "Summarize my unread emails from today"
- `SearchContacts` — "Find Jordan's phone number"
- `SetTimer` — "Set a 25-minute focus timer"
- `QueryWeather` — "What's the weather like tomorrow morning?"

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Intent Recognition Rate | 72% | 89% | 96% | Drops with ambient noise, accent variance; Whisper+GPT-4 in controlled conditions |
| Command Execution Rate | 78% | 91% | 98% | Service adapter errors, API rate limits, auth failures cause misses |
| Avg End-to-End Latency | 380ms | 820ms | 2,400ms | STT(200ms) + LLM structured output(400ms) + adapter(200ms) typical chain |
| Transcription Accuracy | 81% | 93% | 98% | Whisper large-v3; degrades with background noise and domain-specific jargon |
| Slot Fill Rate | 68% | 84% | 95% | Complex intents (email) require more slots; single-slot commands near 100% |
| Ambiguity Rate | 3% | 9% | 22% | Rises with complex multi-step commands or underspecified slot values |
| Fallback Rate | 1% | 5% | 14% | Unrecognized intents; critical to keep below 10% for UX |
| Commands Per Day (active user) | 8 | 24 | 67 | Power users in productivity tool contexts |
| Commands Per Session | 2 | 6 | 18 | Single session typical is 3-8 commands in a morning routine |
| Active Threads | 1 | 2 | 5 | Most users have 1 active thread; power users maintain context windows |
| Service Adapter Uptime | 97.2% | 99.1% | 99.9% | Calendar APIs most reliable; email (SMTP) most failure-prone |
| LLM Structured Output Latency | 280ms | 620ms | 1,800ms | GPT-4o structured output; varies with prompt length and load |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Intent | The action the user wants the system to perform — a discrete operation like "create event" or "send email" | Core unit of the NLU pipeline; every command maps to exactly one intent |
| Utterance | The raw transcribed text of a voice command before intent classification | Pre-parsing; "Hey, can you add a meeting with Jordan tomorrow at 3" is an utterance |
| Slot | A typed parameter required by an intent — e.g., `datetime`, `recipient`, `priority` | Extracted from utterance; missing slots trigger clarification prompts |
| Slot Filling | The process of prompting the user to provide missing required parameters | "What time should I schedule the meeting?" is a slot-filling clarification |
| Dispatcher | The routing layer that receives a parsed intent+slots and routes to the correct service adapter | Central orchestration component; the architectural centerpiece of LIFN |
| Service Adapter | An isolated module that translates a dispatched intent into a specific API call (Google Calendar, Gmail, Todoist) | Pluggable integration layer; each adapter has its own health status |
| Execution Thread | A persistent context window maintained across multiple commands in a session | Enables multi-turn commands ("...and also move the next one an hour later") |
| Action Confirmation | The response returned by a service adapter confirming what was created/updated/deleted | The terminal state of a command lifecycle — appears in the execution feed |
| Structured Output | GPT-4's JSON mode for extracting typed intent+slot data from unstructured transcribed text | The classification step; produces `{"intent": "CreateEvent", "slots": {...}}` |
| Confidence Score | The model's probability estimate for the classified intent (0.0-1.0) | Used to gate auto-dispatch; commands below 0.75 threshold require confirmation |
| ASR | Automatic Speech Recognition — the transcription layer (Whisper) | First step in pipeline; converts audio → text |
| NLU | Natural Language Understanding — classification + slot extraction from transcribed text | Second step in pipeline; converts text → intent+slots |
| TTS | Text-to-Speech — synthesized voice for action confirmations | Output layer; speaks back "Meeting created for Tuesday at 3pm" |
| Hallucination | When the LLM invents slot values not present in the utterance (e.g., fabricates a meeting time) | Critical failure mode; mitigated by strict structured output schemas |
| Fallback Handler | Catch-all intent for utterances below confidence threshold | Returns to user with "I didn't understand — could you rephrase?" |
| Rate Limit | API quota restriction from service adapters (Google Calendar, Gmail, Todoist) | Edge case trigger; appears as `Rate Limited` status in service adapter panel |
| WER | Word Error Rate — % of words transcribed incorrectly by ASR | Inverse of transcription accuracy; lower is better |
| SSML | Speech Synthesis Markup Language — markup controlling TTS prosody, emphasis, pauses | Used in action confirmation voice responses for natural-sounding output |

---

## Common Workflows

### Workflow 1: Standard Voice Command Execution (Happy Path)
1. User activates listening (tap microphone button or wake word)
2. Audio recorded and streamed to Whisper ASR endpoint
3. Transcribed utterance returned as text
4. Text sent to GPT-4 structured output with intent schema prompt
5. Model returns typed JSON: `{"intent": "CreateCalendarEvent", "slots": {"title": "...", "datetime": "...", "attendees": [...]}}`
6. Dispatcher receives intent+slots, validates required slots present
7. Dispatcher routes to Calendar Service Adapter
8. Adapter calls Google Calendar API, creates event
9. Adapter returns action confirmation: `{"status": "confirmed", "event_id": "...", "summary": "..."}`
10. TTS synthesizes confirmation message: "Done, meeting scheduled for Friday at 3pm"
11. Command logged to execution history with full trace

### Workflow 2: Ambiguous Command — Slot Clarification Loop
1. User issues underspecified command: "Schedule a meeting with Jordan"
2. Pipeline runs Workflow 1 steps 1-6
3. Dispatcher detects missing required slot: `datetime`
4. System issues clarification prompt: "When should I schedule it?"
5. User provides: "Tomorrow at 2pm"
6. Thread context merges slot value into original intent
7. Dispatch proceeds from step 7 onward
8. Command logged with `clarification_count: 1`

### Workflow 3: Destructive Command — Confirmation Gate
1. User issues high-impact command: "Delete all emails from marketing lists"
2. Intent classified as `BulkDeleteEmails` with high confidence
3. Dispatcher flags intent as `requires_confirmation` (destructive action policy)
4. System prompts: "This will delete 47 emails. Confirm?"
5. User confirms verbally ("yes, do it")
6. Dispatcher routes to Email Service Adapter with confirmed flag
7. Adapter executes bulk delete, returns count of deleted messages
8. Action confirmation logged; user notified of irreversible action completion

---

## Common Edge Cases

These become specific records in mock data — each should appear at least once in the command execution feed:

1. **Timezone ambiguity across DST transition**: User schedules event "next Sunday at 2am" during daylight saving transition — datetime slot resolves to ambiguous local time. Command flagged as `Ambiguous` with timezone validation warning.
2. **Multi-step command parsing failure**: "Schedule a meeting with Jordan AND send him the agenda" — compound intent (two actions) not separable by current parser. Falls back with suggestion to issue as two separate commands.
3. **Service adapter rate limit hit**: Google Calendar API quota exceeded after bulk scheduling session. Command shows `Rate Limited` status; retry scheduled for 60 seconds.
4. **Email service auth token expiry**: Gmail OAuth token expired mid-session. Email adapter status flips to `Disconnected`. Commands dispatched to email fail with `Auth Error` until re-authentication.
5. **LLM hallucination caught by validation**: GPT-4 structured output invents a `datetime` slot value not present in utterance. Schema validator rejects the output, forces clarification instead of proceeding with fabricated data.
6. **Low-confidence intent near threshold**: User utterance highly ambiguous — "move that thing" after context gap. Confidence score 0.61, below 0.75 auto-dispatch threshold. Flagged as `Low Confidence`, shown in manual review queue.
7. **Duplicate event detection**: Calendar adapter detects collision — an existing event occupies the requested slot. Returns conflict warning before confirming creation.
8. **Silent/empty audio**: Microphone activated but no speech detected within timeout. Command shows `Transcription Failed — No Speech Detected` in history.

---

## What Would Impress a Domain Expert

5 insider details that signal deep understanding of voice AI execution architecture:

1. **Latency breakdown by pipeline stage**: Not just total latency — showing ASR latency, LLM latency, adapter latency separately. Practitioners building these systems obsess over where the bottleneck is. Showing `STT: 212ms | LLM: 483ms | Adapter: 94ms` per command is the mark of someone who has actually debugged a voice pipeline.

2. **Confidence score threshold configuration**: Exposing the auto-dispatch threshold (default 0.85) as a configurable setting in the interface. AI practitioners immediately recognize this as the precision-recall tradeoff control. It signals architectural awareness, not just UI gloss.

3. **Intent distribution shows the long tail problem**: The intent distribution chart should show a power-law distribution — a few intents (CreateEvent, CreateTask) dominating, with a long tail of rare intents. This is what real voice systems look like. A uniform distribution would signal fake data.

4. **Thread context window indicator**: Showing the active thread's context length (tokens used vs. limit) in the session panel. This is a real concern for persistent threads — running out of context window mid-session causes subtle failures that practitioners have experienced.

5. **Whisper model version as metadata**: Recording which Whisper model version processed each command (whisper-1, whisper-large-v3). Production systems track this for A/B testing transcription quality. Showing model version per command row is a subtle but decisive signal of production experience.

---

## Common Systems & Tools Used

Voice AI and agentic productivity tool practitioners in this space use:

1. **Whisper (OpenAI)** — ASR transcription; the de facto standard for voice-to-text in developer-built systems
2. **GPT-4 / GPT-4o (OpenAI)** — LLM backbone for structured intent parsing; structured output mode for slot extraction
3. **Vapi** — Voice AI agent orchestration; the platform LIFN's architecture most resembles
4. **Langfuse** — LLM observability; traces, spans, confidence scores, latency breakdowns
5. **FastAPI** — Python backend framework for LLM-adjacent services; mentioned in job posting
6. **Supabase** — PostgreSQL + realtime + auth; mentioned in job posting; stores command history, thread state
7. **ElevenLabs / OpenAI TTS** — Text-to-speech for action confirmation voice responses
8. **Google Calendar API / Gmail API / Microsoft Graph** — Service adapter targets
9. **Todoist API / Things 3 / Linear API** — Task management service adapter targets
10. **Expo / React Native** — Mobile delivery layer; voice recording, push notifications

---

## Geographic / Cultural Considerations

US-market primary (English-language voice commands, US date/time format MM/DD/YYYY, 12-hour clock for voice output). Calendar events in user's local timezone (critical edge case: DST transitions). Email references use US professional conventions. No multi-language or metric/imperial considerations relevant to core feature set.

---

## Data Architect Notes

Specific instructions for the Data Architect based on this research:

- **Primary entity name**: `Command` (not Task, not Request) — every record in the execution feed is a `Command`
- **Status field values** (exact strings for union types): `"listening" | "transcribing" | "parsing" | "dispatching" | "executing" | "confirmed" | "ambiguous" | "failed" | "timed_out" | "cancelled"`
- **Intent type field values**: `"CreateCalendarEvent" | "UpdateCalendarEvent" | "DeleteCalendarEvent" | "QueryCalendar" | "CreateTask" | "UpdateTask" | "SetReminder" | "SendEmail" | "SummarizeEmails" | "SearchContacts" | "SetTimer" | "QueryWeather"`
- **Service adapter statuses**: `"connected" | "degraded" | "disconnected" | "rate_limited"`
- **Confidence score ranges**: Most records 0.82-0.96; edge cases at 0.61 (low confidence) and 0.99 (high confidence); a few at 0.55-0.65 for the fallback/ambiguous examples
- **Latency values**: ASR 150-380ms, LLM 280-920ms, Adapter 50-280ms — never round numbers
- **Commands per day dataset**: 6-12 months of daily command counts showing power-law daily distribution (high on Mon/Tue, lower on weekends)
- **Intent distribution dataset**: `CreateCalendarEvent` ~32%, `CreateTask` ~24%, `SendEmail` ~16%, `SetReminder` ~11%, `QueryCalendar` ~8%, others split remaining ~9%
- **Service adapters**: 4 services — Calendar, Email, Tasks, Reminders — each with uptime history and current status
- **Thread sessions dataset**: 5-8 sessions with token_usage field, command_count, created_at, last_active
- **Edge cases to include as specific records**:
  - 1-2 commands with `status: "ambiguous"` and `clarification_prompts: 1`
  - 1 command with `status: "failed"` and `error_code: "rate_limited"` on Email adapter
  - 1 command with `confidence_score: 0.58` flagged for review
  - 1 command with very high latency (2,340ms total) showing LLM timeout
  - 1 command with `status: "cancelled"` (user overrode before execution)

## Layout Builder Notes

Specific design guidance based on domain conventions:

- **Recommended density**: Compact. This is an ops dashboard for a technical user — the audience expects density. Set `--content-padding: 1rem`, `--card-padding: 1rem`, `--nav-item-py: 0.375rem`.
- **Sidebar width**: Standard (16rem) or slightly narrower (15rem) — nav labels are short (`Command Center`, `Intent Library`). Utility tool convention.
- **Color primary**: Electric Amethyst/Violet — `oklch(0.50 0.20 290)` per AI/Automation domain entry in industry-design-patterns.md. Alternatively, a slightly more electric teal (`oklch(0.55 0.18 195)`) to differentiate from generic "AI purple" — this is a voice/audio product, teal has audio-technology associations.
- **Background**: Near-black `oklch(0.08 0.02 290)` — not pure black, slightly tinted toward the primary hue.
- **Sidebar**: Dark sidebar matching background, with primary-colored active state indicator. NOT a light sidebar — this would break the dark premium feel.
- **Typography**: Geist Sans for labels, Geist Mono for ALL numeric values (latency ms, confidence scores, command counts). The monospace type for numbers is what separates "developer tool" from "marketing dashboard."
- **Status badge treatment**: Filled background for high-energy states (`Executing`, `Confirmed` = green), outline/subtle for neutral states (`Idle`), warning fill for `Ambiguous`, destructive fill for `Failed`. Semantic color is critical.
- **Border treatment**: `border-border/20` — very subtle in dark theme. Cards defined by slight background elevation (`--sidebar-bg` slightly lighter than `--background`), not thick borders.
- **Motion**: Smooth (200-300ms) for navigation transitions. The command feed should have a CSS-animated entrance for new rows (slide-in-from-top, 150ms) simulating real-time arrival.

## Dashboard Builder Notes

Specific guidance for which KPIs to lead with on the dashboard:

- **Largest single stat card**: Intent Recognition Rate (%) — the primary health signal for a voice execution engine. If recognition is failing, nothing else matters.
- **Second priority stat**: Commands Today (count) — usage pulse.
- **Third/fourth priority**: Avg Latency (ms) and Command Execution Rate (%) — operational performance.
- **Fifth stat**: Fallback Rate (%) — quality signal; should show red/warning if above 8%.
- **Primary chart**: Area chart — daily command volume over the past 30 days. Shows usage trend and daily patterns (weekday peaks).
- **Secondary chart**: Bar chart — intent distribution (which commands users issue most). This is the "long tail" visual — `CreateCalendarEvent` and `CreateTask` should dominate with steep dropoff.
- **Domain-specific panel**: **Command Execution Feed** — a scrollable, real-time (simulated) log of the most recent 15-20 commands with columns: `Command | Intent | Confidence | Status | Latency | Time`. This is the signature panel that screams "execution engine, not chatbot." Each row has a status badge using the semantic status vocabulary above.
- **Service Health Row**: A horizontal strip below the stat cards showing the 4 service adapters (Calendar, Email, Tasks, Reminders) with their current status indicator (green dot / yellow dot / red dot) and uptime %. This is the DevOps/monitoring visual vocabulary that Langfuse and Vapi practitioners immediately recognize.
- **Composition guidance**: Lead with stat cards (5 cards), then service health strip, then the command feed (dominant, ~50% of page height), then intent distribution chart and a latency trend chart side by side at the bottom. Do NOT put the chart at top — for ops dashboards, the live feed is primary.
