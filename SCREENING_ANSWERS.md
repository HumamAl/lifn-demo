# LIFN — Screening Answers

---

**Q1: Links to React Native apps you've shipped**

My recent mobile-adjacent work includes Sports Vision MVP (AR-style scan UI with detection overlays) and Outerbloom (AI coordination platform with scheduling). Most of my portfolio is web — but the execution architecture I built for your project translates directly: {VERCEL_URL}

---

**Q2: How would you structure the execution dispatcher?**

The dispatcher receives a typed `IntentPayload` parsed from GPT-4 structured JSON output, validates it against an intent schema, then routes to the correct service module — `TaskService`, `CalendarService`, or `EmailService`. No direct external API calls from UI components — the UI never knows which service runs. The dispatcher returns a normalized `ExecutionResult` to the persistent assistant thread.

Built a working version of this architecture: {VERCEL_URL}

---

**Q3: Your estimate**

Phase 1 as scoped (iOS build + PWA + FastAPI dispatcher + Gmail OAuth verification): 6–8 weeks. Milestone-based works well — happy to scope Week 1 deliverables after you review the demo.

---

**Q4: Confirmation of timeline**

Available to start immediately. 1–3 months aligns with the scope. Suggest 2-week milestones with explicit "Done =" criteria per phase — dispatcher architecture and Google OAuth flow can be the Week 1 milestone.

---

**Q5: Relevant experience with GPT structured outputs**

Used OpenAI function calling + JSON mode in the WMF Agent Dashboard to extract 14 fields per RFQ from unstructured email — same principle: strict intent schema, validate before any service executes. That project replaced a 4-hour manual process with a 20-minute structured extraction flow.

Same pattern in the LIFN demo: {VERCEL_URL}
