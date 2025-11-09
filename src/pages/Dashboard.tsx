import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  expense: {
    label: "expense",
    color: "#FF0001",
  },
  profit: {
    label: "profit",
    color: "#43ff64d9",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", expense: 186, profit: 80 },
  { month: "February", expense: 305, profit: 200 },
  { month: "March", expense: 237, profit: 120 },
  { month: "April", expense: 73, profit: 190 },
  { month: "May", expense: 209, profit: 130 },
  { month: "June", expense: 214, profit: 140 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-white h-full rounded-2xl items-start justify-start flex flex-col gap-2 p-4">
      <ChartContainer config={chartConfig} className="max-h-80 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DashboardPage;
