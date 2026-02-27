"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { dispatcherLogs, hourlyActivity } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Workflow,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
} from "lucide-react";
import type { DispatcherLog, ServiceType } from "@/lib/types";

const HourlyChart = dynamic(() => import("@/components/dispatcher/hourly-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
      Loading chart...
    </div>
  ),
});

type ServiceFilter = ServiceType | "all";
type SuccessFilter = "all" | "success" | "failed";
type SortKey = "timestamp" | "durationMs";

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function ServiceBadge({ service }: { service: ServiceType }) {
  const config: Record<ServiceType, string> = {
    TaskService:     "text-primary bg-primary/10 border-primary/20",
    CalendarService: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20",
    EmailService:    "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10 border-[color:var(--chart-2)]/20",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-mono border rounded px-1.5 py-0", config[service])}
    >
      {service}
    </Badge>
  );
}

function DispatcherRow({ log }: { log: DispatcherLog }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = !log.success && log.errorMessage;

  return (
    <>
      <TableRow
        className={cn(
          "cursor-pointer transition-colors duration-100",
          !log.success
            ? "bg-destructive/5 hover:bg-destructive/8"
            : "hover:bg-[color:var(--surface-hover)]"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
          {formatTimestamp(log.timestamp)}
        </TableCell>
        <TableCell className="font-mono text-xs text-primary">{log.commandId}</TableCell>
        <TableCell>
          <ServiceBadge service={log.service} />
        </TableCell>
        <TableCell className="font-mono text-xs text-foreground/80">{log.action}</TableCell>
        <TableCell className="font-mono text-xs tabular-nums text-right">
          {log.durationMs === 0 ? (
            <span className="text-muted-foreground/50">—</span>
          ) : (
            <span className={log.durationMs > 800 ? "text-[color:var(--warning)]" : ""}>
              {log.durationMs}ms
            </span>
          )}
        </TableCell>
        <TableCell className="text-center">
          {log.success ? (
            <CheckCircle2 className="w-4 h-4 text-[color:var(--success)] inline-block" />
          ) : (
            <XCircle className="w-4 h-4 text-destructive inline-block" />
          )}
        </TableCell>
      </TableRow>
      {expanded && hasDetail && (
        <TableRow>
          <TableCell colSpan={6} className="bg-destructive/5 px-6 py-3">
            <div className="flex items-start gap-2 text-xs">
              <XCircle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-destructive">Error: </span>
                <span className="font-mono text-destructive/80">{log.errorMessage}</span>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
      {expanded && !hasDetail && (
        <TableRow>
          <TableCell colSpan={6} className="bg-[color:var(--surface-active)]/40 px-6 py-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <span>log_id: <span className="text-foreground/70">{log.id}</span></span>
              <span>dispatch_ts: <span className="text-foreground/70">{log.timestamp}</span></span>
              <span>duration: <span className="text-foreground/70">{log.durationMs}ms</span></span>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function DispatcherPage() {
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("all");
  const [successFilter, setSuccessFilter] = useState<SuccessFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const displayed = useMemo(() => {
    return dispatcherLogs
      .filter((log) => {
        const serviceMatch = serviceFilter === "all" || log.service === serviceFilter;
        const successMatch =
          successFilter === "all" ||
          (successFilter === "success" && log.success) ||
          (successFilter === "failed" && !log.success);
        return serviceMatch && successMatch;
      })
      .sort((a, b) => {
        const av = sortKey === "durationMs" ? a.durationMs : a.timestamp;
        const bv = sortKey === "durationMs" ? b.durationMs : b.timestamp;
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [serviceFilter, successFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const totalSuccess = dispatcherLogs.filter((l) => l.success).length;
  const totalFailed = dispatcherLogs.filter((l) => !l.success).length;
  const successLogs = dispatcherLogs.filter((l) => l.success && l.durationMs > 0);
  const avgDuration =
    successLogs.length > 0
      ? Math.round(successLogs.reduce((s, l) => s + l.durationMs, 0) / successLogs.length)
      : 0;

  return (
    <div className="page-container space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dispatcher Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Execution trace for every intent routed through the centralized dispatcher
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Workflow className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Total Dispatches</span>
          </div>
          <p className="font-mono text-xl font-semibold">{dispatcherLogs.length}</p>
        </div>
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
            <span className="text-xs font-medium uppercase tracking-wide">Succeeded</span>
          </div>
          <p className="font-mono text-xl font-semibold text-[color:var(--success)]">{totalSuccess}</p>
        </div>
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <XCircle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-xs font-medium uppercase tracking-wide">Failed</span>
          </div>
          <p className="font-mono text-xl font-semibold text-destructive">{totalFailed}</p>
        </div>
        <div className="aesthetic-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wide">Avg Latency</span>
          </div>
          <p className="font-mono text-xl font-semibold">
            {avgDuration}
            <span className="text-xs text-muted-foreground font-normal ml-1">ms</span>
          </p>
        </div>
      </div>

      {/* Hourly Activity Chart */}
      <div className="aesthetic-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold">Command Volume by Hour</h2>
          <span className="text-xs text-muted-foreground ml-auto">24-hour dispatch distribution</span>
        </div>
        <HourlyChart data={hourlyActivity} />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={serviceFilter} onValueChange={(v) => setServiceFilter(v as ServiceFilter)}>
          <SelectTrigger className="w-44 text-xs">
            <SelectValue placeholder="All services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="TaskService">TaskService</SelectItem>
            <SelectItem value="CalendarService">CalendarService</SelectItem>
            <SelectItem value="EmailService">EmailService</SelectItem>
          </SelectContent>
        </Select>

        <Select value={successFilter} onValueChange={(v) => setSuccessFilter(v as SuccessFilter)}>
          <SelectTrigger className="w-36 text-xs">
            <SelectValue placeholder="All results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            <SelectItem value="success">Succeeded</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0 ml-auto">
          {displayed.length}{" "}
          {displayed.length === 1 ? "dispatch" : "dispatches"}
        </span>
      </div>

      {/* Dispatcher Log Table */}
      <div className="aesthetic-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("timestamp")}
                >
                  <div className="flex items-center gap-1">
                    Timestamp
                    {sortKey === "timestamp" &&
                      (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Command ID
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Service
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Action
                </TableHead>
                <TableHead
                  className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:text-foreground transition-colors duration-100 text-right"
                  onClick={() => handleSort("durationMs")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Latency
                    {sortKey === "durationMs" &&
                      (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide text-center">
                  Result
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-6 h-6 opacity-40" />
                      No dispatches match this filter
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((log) => <DispatcherRow key={log.id} log={log} />)
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
