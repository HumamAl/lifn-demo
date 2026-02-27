import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer specializing in AI-powered execution tools — from structured intent parsing to modular service architectures.",
  bio: "I build AI pipelines that actually do something: typed intent dispatchers, structured GPT output validation, service isolation layers. You've already seen one in Tab 1 — built specifically for this project.",
  approach: [
    {
      title: "Map the Execution Graph",
      description:
        "Trace every voice command to its final side-effect — task created, event scheduled, email sent. Every path through the dispatcher is typed and accounted for before a line of service code gets written.",
    },
    {
      title: "Build the Dispatcher First",
      description:
        "Central routing layer before any UI. Every intent is typed, validated against a schema, and routed through one layer. No direct UI-to-API calls. The system is auditable and testable without mocking 6+ services.",
    },
    {
      title: "Ship to TestFlight Weekly",
      description:
        "Continuous iOS builds via Expo EAS — not a big-bang deployment at the end. You get a clickable build every week, which means feedback loops stay tight and integration surprises stay small.",
    },
    {
      title: "Structured Logging from Day 1",
      description:
        "Every dispatch, parse, and execution is logged with intent ID, service called, latency, and success/error. When something breaks, you see exactly where in the pipeline it broke and why.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend & Mobile",
      skills: [
        "React Native",
        "Expo",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
      ],
    },
    {
      name: "Backend & APIs",
      skills: [
        "FastAPI",
        "Python",
        "Supabase",
        "Google OAuth",
        "Gmail API",
        "Google Calendar API",
      ],
    },
    {
      name: "AI & Voice",
      skills: [
        "OpenAI Structured Output",
        "GPT-4",
        "Whisper API",
        "Web Speech API",
        "Intent Parsing",
      ],
    },
    {
      name: "DevOps",
      skills: ["TestFlight", "Expo EAS", "Vercel", "GitHub Actions"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI email classification + structured extraction pipeline for an industrial manufacturer. GPT extracts 14 typed fields per RFQ from unstructured email, routes to human-in-the-loop approval, then generates an Excel quote template.",
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    tech: ["Next.js", "TypeScript", "Claude API", "n8n", "Microsoft Graph"],
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
    relevance:
      "Same pattern: structured AI output → dispatcher → service execution",
  },
  {
    id: "outerbloom",
    title: "Outerbloom — AI Social Coordination",
    description:
      "AI-driven matching platform that intelligently connects people, schedules, and venues. AI parses intent, matches constraints across users, and triggers calendar coordination without manual back-and-forth.",
    outcome:
      "AI-driven matching pipeline connecting users, schedules, and venues — reducing manual coordination overhead",
    tech: ["Next.js", "TypeScript", "Tailwind", "AI pipeline"],
    liveUrl: "https://outerbloom.vercel.app",
    relevance: "Calendar scheduling and AI coordination",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "End-to-end lead pipeline with a public intake form, CRM dashboard, lead scoring, and a configurable automation rules engine. Form input flows through processing to action — no manual routing.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance: "Modular service architecture, form → processing → action pipeline",
  },
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description:
      "Six-module SaaS platform covering the full maintenance lifecycle: asset registry, work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics dashboard.",
    outcome:
      "6-module SaaS covering the full maintenance lifecycle — from asset registry to work orders to parts inventory",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Multi-module modular architecture",
  },
];
