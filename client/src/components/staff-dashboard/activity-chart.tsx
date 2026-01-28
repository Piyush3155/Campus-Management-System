"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ActivityDataItem {
  name: string
  total: number
}

interface StaffActivityChartProps {
  data: ActivityDataItem[]
}

export function StaffActivityChart({ data }: StaffActivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            borderRadius: '8px',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))'
          }}
          itemStyle={{ color: 'hsl(var(--primary))' }}
          formatter={(value: number) => [`${value}% Attendance`, 'Status']}
        />
        <Bar
          dataKey="total"
          radius={[4, 4, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.total > 75 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} 
              fillOpacity={0.8}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
