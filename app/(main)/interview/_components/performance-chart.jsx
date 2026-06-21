"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        {/* FIX 1: Ensure container sets block spacing layout configuration explicitly */}
        <div className="h-[300px] w-full min-w-0">
          {/* FIX 2: Set a fallback minimum dimension so Recharts won't mount with a width of 0 */}
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart 
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }} // Adds safe internal bounds alignment padding
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                dy={10} // Spaces dates down from grid lines
              />
              <YAxis 
                domain={[0, 100]} 
                tickLine={false}
                dx={-5}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md bg-white text-black dark:bg-zinc-900 dark:text-white">
                        <p className="text-sm font-semibold">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                // FIX 3: Replaced raw theme variables with an explicit safe fallback hex color identifier string!
                stroke="#4F4C4C" // Nice visible Royal Blue color hex value (or replace with your hex color preference)
                strokeWidth={3}
                activeDot={{ r: 6 }} // Renders clear interactive mouse-over indicators
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}