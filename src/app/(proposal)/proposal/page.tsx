import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ExternalLink, TrendingUp } from "lucide-react";

// Stats from developer-profile.md — exact numbers, never inflated
const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "< 48hr", label: "Demo Turnaround" },
  { value: "15+", label: "Industries Served" },
];

export default function ProposalPage() {
  const displayName =
    APP_CONFIG.clientName !== null ? APP_CONFIG.clientName : APP_CONFIG.projectName;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero (Project Brief) ── */}
      <section
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "oklch(0.07 0.015 var(--primary-h, 260))" }}
      >
        {/* Radial highlight — indigo glow at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.52 0.17 260 / 0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12">
          {/* Effort badge — mandatory */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full mb-6">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-primary" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            Built this demo for {displayName}
          </span>

          {/* Role prefix */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/40 mb-4">
            Full-Stack Developer · AI Execution Architect
          </p>

          {/* Name — weight contrast */}
          <h1 className="text-5xl md:text-6xl tracking-tight leading-none mb-4">
            <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
            <span className="font-black text-white">{profile.name}</span>
          </h1>

          {/* Tailored value prop */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            {profile.tagline}
          </p>

          <p className="text-sm text-white/45 max-w-2xl leading-relaxed mt-3">
            {profile.bio}
          </p>
        </div>

        {/* Stats shelf */}
        <div
          className="relative z-10 border-t px-8 py-4"
          style={{
            borderColor: "oklch(1 0 0 / 0.08)",
            background: "oklch(1 0 0 / 0.04)",
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work ── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Proof of Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Relevant Projects
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="aesthetic-card p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-tight">
                  {project.title}
                </h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary shrink-0 transition-colors"
                    style={{ transitionDuration: "var(--dur-fast)" }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome badge */}
              {project.outcome && (
                <div className="flex items-start gap-2 text-sm">
                  <TrendingUp
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--success)" }}>
                    {project.outcome}
                  </span>
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-xs font-mono bg-primary/10 text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Relevance note */}
              {project.relevance && (
                <p className="text-xs italic text-primary/70">
                  {project.relevance}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
        </div>

        {/* Timeline approach: step numbers with a vertical connector */}
        <div className="space-y-0">
          {profile.approach.map((step, i) => {
            const stepLabels = ["01", "02", "03", "04"];
            const timelines = [
              "Week 1",
              "Week 1–2",
              "Week 3–4",
              "Week 1 onward",
            ];
            return (
              <div key={step.title} className="flex gap-5">
                {/* Step number + vertical line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 border bg-primary/15 border-primary/30 text-primary"
                  >
                    {stepLabels[i]}
                  </div>
                  {i < profile.approach.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: "oklch(1 0 0 / 0.08)" }}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className={i < profile.approach.length - 1 ? "pb-6" : ""}>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {timelines[i]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 4: Skills Grid ── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            What I Build With
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {profile.skillCategories.map((category) => (
            <div
              key={category.name}
              className="aesthetic-card p-4 space-y-2.5"
            >
              <p className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-sm font-mono"
                    style={{
                      border: "1px solid oklch(1 0 0 / 0.10)",
                      background: "oklch(1 0 0 / 0.04)",
                      color: "var(--foreground)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: CTA (Dark Panel) ── */}
      <section
        className="relative rounded-2xl overflow-hidden text-center"
        style={{ background: "oklch(0.07 0.015 var(--primary-h, 260))" }}
      >
        {/* Subtle radial glow at top-center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 35% at 50% 0%, oklch(0.52 0.17 260 / 0.10), transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 space-y-4">
          {/* Pulsing availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--success)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{ color: "color-mix(in oklch, var(--success) 80%, white)" }}
            >
              Currently available for new projects
            </span>
          </div>

          {/* Tailored headline */}
          <h2 className="text-2xl font-bold text-white leading-tight">
            Ready to build the dispatcher layer your spec describes.
          </h2>

          {/* Specific body — references this demo */}
          <p className="text-white/60 max-w-lg mx-auto leading-relaxed text-sm">
            The demo in Tab 1 shows the typed intent flow, confirmation gate,
            and service routing already wired together. The real product ships
            with the FastAPI backend, iOS build pipeline, and full Google OAuth
            — same architecture, production grade.
          </p>

          {/* Primary action — text, not a dead button */}
          <p className="text-lg font-semibold text-white pt-2">
            Reply on Upwork to start
          </p>

          {/* Secondary — back to demo */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            ← Back to the demo
          </a>

          {/* Signature */}
          <p
            className="pt-4 text-sm text-white/35 border-t"
            style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
          >
            — Humam
          </p>
        </div>
      </section>

    </div>
  );
}
