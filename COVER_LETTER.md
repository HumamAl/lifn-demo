Hi,

Your core constraint — the UI must never directly call external APIs, every intent routes through a centralized dispatcher — I built a working version of this before reaching out: {VERCEL_URL}

The demo shows parsed intents routing to TaskService, CalendarService, and EmailService through a single dispatcher layer, with the explicit email confirmation gate your spec requires. Built the same structured GPT JSON output pattern for an AI pipeline that replaced a 4-hour manual quote process.

Are you resolving timezone at the Whisper layer or inside CalendarService — that changes where IANA identifiers need to live in the IntentPayload schema.

10-minute call or I can scope the dispatcher architecture in writing — your pick.

Humam

P.S. Happy to record a quick Loom of the dispatcher trace if that's easier.
