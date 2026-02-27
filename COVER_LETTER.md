Hi,

Your core constraint — the UI must never directly call external APIs, every intent routes through a centralized dispatcher — I built a working version of this before reaching out: {VERCEL_URL}

The demo shows typed intents routing through a single dispatcher to TaskService, CalendarService, and EmailService — with the email confirmation gate your spec requires. Built the same GPT structured JSON pattern for an AI pipeline that replaced a 4-hour manual quote process.

Are you resolving timezone at the Whisper layer or inside CalendarService — that changes where IANA identifiers live in the IntentPayload schema.

10-minute call or I can scope the architecture in writing — your pick.

Humam
