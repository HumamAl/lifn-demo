"use client";

import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  Area,
  Legend,
} from "recharts";
import type { DailyMetrics } from "@/lib/types";

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-card p-3 text-xs shadow-lg">
      <p className="font-medium text-foreground mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-muted-foreground flex items-center gap-2 mb-0.5">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          <span className="font-mono font-medium text-foreground">
            {entry.name === "Success Rate" ? `${entry.value}%` : String(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
};

interface ExecutionTimelineChartProps {
  data: DailyMetrics[];
}

export function ExecutionTimelineChart({ data }: ExecutionTimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="fillCommands" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.4}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val: string) => {
            const d = new Date(val);
            return `${d.getMonth() + 1}/${d.getDate()}`;
          }}
          interval="preserveStartEnd"
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          domain={[85, 100]}
          width={35}
          tickFormatter={(v: number) => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          formatter={(value: string) => (
            <span style={{ color: "var(--muted-foreground)" }}>{value}</span>
          )}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="commands"
          name="Commands"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillCommands)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-1)" }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="successRate"
          name="Success Rate"
          stroke="var(--chart-2)"
          strokeWidth={1.5}
          dot={false}
          strokeDasharray="4 2"
          activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-2)" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
