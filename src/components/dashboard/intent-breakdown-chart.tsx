"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { IntentBreakdown } from "@/lib/types";

const INTENT_LABELS: Record<string, string> = {
  create_task: "Create Task",
  schedule_event: "Schedule Event",
  send_email: "Send Email",
  draft_email: "Draft Email",
  complete_task: "Complete Task",
};

const INTENT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface TooltipPayloadItem {
  payload?: IntentBreakdown & { label: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length || !payload[0].payload) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-card p-3 text-xs shadow-lg min-w-[160px]">
      <p className="font-medium text-foreground mb-1.5">{d.label}</p>
      <p className="text-muted-foreground flex justify-between gap-4">
        Dispatched <span className="font-mono text-foreground">{d.count.toLocaleString()}</span>
      </p>
      <p className="text-muted-foreground flex justify-between gap-4">
        Parse Rate <span className="font-mono text-foreground">{d.successRate}%</span>
      </p>
      <p className="text-muted-foreground flex justify-between gap-4">
        Avg Latency <span className="font-mono text-foreground">{d.avgLatencyMs}ms</span>
      </p>
    </div>
  );
};

interface IntentBreakdownChartProps {
  data: IntentBreakdown[];
}

export function IntentBreakdownChart({ data }: IntentBreakdownChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: INTENT_LABELS[d.intent] ?? d.intent,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 0 }}>
        <XAxis
          type="number"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={INTENT_COLORS[index % INTENT_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
