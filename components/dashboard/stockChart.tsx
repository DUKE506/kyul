"use client";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

const dummyData = [
  { p: 10 },
  { p: 15 },
  { p: 12 },
  { p: 18 },
  { p: 16 },
  { p: 22 },
];

export const StockChart = ({ isUp }: { isUp: boolean }) => {
  return (
    <div className="h-12 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData}>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Line
            type="monotone"
            dataKey="p"
            stroke={isUp ? "#3fb950" : "#f85149"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
