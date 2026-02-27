"use client";

import { useState, useMemo } from "react";
import { assistantThread } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Terminal,
  Clock,
  Zap,
  Filter,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { ThreadMessage } from "@/lib/types";

type ViewMode = "all" | "commands";

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatDuration(startIso: string): string {
  const start = new Date(startIso);
  const now = new Date("2026-02-27T09:35:00Z");
  const diffMs = now.getTime() - start.getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

function ThreadStatusBadge({ status }: { status: "active" | "idle" | "closed" }) {
  const config = {
    active: { label: "Active", color: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    idle:   { label: "Idle",   color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    closed: { label: "Closed", color: "text-muted-foreground bg-muted" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.color)}>
      {status === "active" && (
        <span className="relative mr-1.5 inline-flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--success)]" />
        </span>
      )}
      {c.label}
    </Badge>
  );
}

function RoleBadge({ role }: { role: ThreadMessage["role"] }) {
  const config: Record<ThreadMessage["role"], { label: string; className: string }> = {
    user:      { label: "USER",      className: "text-primary bg-primary/10 border-primary/20" },
    assistant: { label: "ASSISTANT", className: "text-[color:var(--accent-foreground)] bg-accent/30 border-accent/20" },
    system:    { label: "SYSTEM",    className: "text-muted-foreground bg-muted border-muted-foreground/20" },
  };
  const c = config[role];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-widest border", c.className)}>
      {c.label}
    </span>
  );
}

function parseMessageContent(content: string): React.ReactNode {
  // Replace **bold** with styled spans and `code` with monospace
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="font-mono text-primary bg-primary/10 px-1 py-0.5 rounded text-xs">{part.slice(1, -1)}</code>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ThreadsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  const thread = assistantThread;

  const displayedMessages = useMemo(() => {
    if (viewMode === "commands") {
      return thread.messages.filter((m) => m.commandId !== undefined);
    }
    return thread.messages;
  }, [thread.messages, viewMode]);

  const commandMessages = thread.messages.filter((m) => m.commandId !== undefined);
  const threadDuration = formatDuration(thread.startedAt);

  return (
    <div className="page-container space-y-6 h-full flex flex-col">
      {/* Page Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Persistent Thread</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Execution log for thread {thread.id} — all dispatched intents and service responses
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={viewMode === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("all")}
            className="text-xs"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            All Messages
          </Button>
          <Button
            variant={viewMode === "commands" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("commands")}
            className="text-xs"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Commands Only
          </Button>
        </div>
      </div>

      {/* Thread Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Thread ID</span>
          </div>
          <p className="font-mono text-sm font-semibold">{thread.id}</p>
        </div>
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Status</span>
          </div>
          <ThreadStatusBadge status={thread.status} />
        </div>
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Commands</span>
          </div>
          <p className="font-mono text-sm font-semibold">
            {commandMessages.length}{" "}
            <span className="text-xs text-muted-foreground font-normal">dispatched</span>
          </p>
        </div>
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Duration</span>
          </div>
          <p className="font-mono text-sm font-semibold">{threadDuration}</p>
        </div>
      </div>

      {/* Filter indicator */}
      {viewMode === "commands" && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
          <Filter className="w-3 h-3" />
          Showing {displayedMessages.length} command-linked messages of {thread.messages.length} total
        </div>
      )}

      {/* Message Log */}
      <div className="aesthetic-card flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="border-b border-border/60 px-4 py-3 flex items-center gap-2 shrink-0">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono font-medium text-muted-foreground tracking-widest uppercase">
            Execution Log — {displayedMessages.length} entries
          </span>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-1">
            {displayedMessages.map((message) => (
              <MessageEntry key={message.id} message={message} />
            ))}
            {displayedMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <AlertCircle className="w-8 h-8 mb-3 opacity-40" />
                <p className="text-sm">No command-linked messages in this thread</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function MessageEntry({ message }: { message: ThreadMessage }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = message.content.length > 150;
  const displayContent = !isLong || expanded ? message.content : message.content.slice(0, 150) + "...";

  return (
    <div
      className={cn(
        "rounded-lg px-4 py-3 border transition-colors duration-100",
        message.role === "system"
          ? "bg-muted/30 border-border/30"
          : message.role === "user"
          ? "bg-primary/5 border-primary/15"
          : "bg-card border-border/50"
      )}
    >
      <div className="flex items-start gap-3 flex-wrap">
        {/* Role + Timestamp */}
        <div className="flex items-center gap-2 shrink-0">
          <RoleBadge role={message.role} />
          <span className="font-mono text-[10px] text-muted-foreground/70">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>

        {/* Command ID badge */}
        {message.commandId && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[color:var(--success)] bg-[color:var(--success)]/10 px-2 py-0.5 rounded border border-[color:var(--success)]/20">
            <CheckCircle2 className="w-2.5 h-2.5" />
            {message.commandId}
          </span>
        )}
      </div>

      {/* Content */}
      <div
        className="mt-2 text-sm leading-relaxed whitespace-pre-line text-foreground/90 cursor-pointer"
        onClick={() => isLong && setExpanded(!expanded)}
      >
        {parseMessageContent(displayContent)}
        {isLong && (
          <button
            className="ml-1 text-xs text-primary hover:text-primary/80 transition-colors duration-100"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          >
            {expanded ? "collapse" : "expand"}
          </button>
        )}
      </div>
    </div>
  );
}
