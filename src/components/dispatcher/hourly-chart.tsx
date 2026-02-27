"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { HourlyActivity } from "@/lib/types";

interface Props {
  data: HourlyActivity[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="aesthetic-card px-3 py-2 text-xs space-y-1 border border-border/60">
      <p className="font-mono font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-muted-foreground">
          <span className="text-foreground font-medium">{entry.value}</span>{" "}
          {entry.name === "commands" ? "commands dispatched" : "% success rate"}
        </p>
      ))}
    </div>
  );
}

export default function HourlyChart({ data }: Props) {
  // Show peak hours (6am–9pm) for readability
  const chartData = data.filter((d) => d.hour >= 6 && d.hour <= 22);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          tickLine={false}
          axisLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "var(--surface-hover)" }}
        />
        <Bar dataKey="commands" name="commands" radius={[3, 3, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={entry.hour}
              fill={
                entry.commands === Math.max(...chartData.map((d) => d.commands))
                  ? "var(--primary)"
                  : "color-mix(in oklch, var(--primary), transparent 50%)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
