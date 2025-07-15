"use client";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RevenueReportByMonth } from "types/overview";

interface RevenueChartProps {
  data: RevenueReportByMonth[];
}

export default function RevenueChart(props: RevenueChartProps) {
  return (
    <ResponsiveContainer height={400}>
      <ComposedChart data={props.data} margin={{ right: 20 }}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId={"left"}
          domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
        />
        <YAxis
          yAxisId={"right"}
          orientation="right"
          domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#ffc658"
          barSize={40}
          yAxisId={"left"}
          name={"Tổng số hóa đơn"}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#82ca9d"
          yAxisId={"right"}
          name="Doanh thu"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
