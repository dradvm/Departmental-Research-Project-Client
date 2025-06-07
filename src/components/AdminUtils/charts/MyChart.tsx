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

const data = [
  { name: "Tháng 1", students: 120, teachers: 900, revenue: 12 },
  { name: "Tháng 2", students: 760, teachers: 300, revenue: 23 },
  { name: "Tháng 3", students: 300, teachers: 700, revenue: 4 },
  { name: "Tháng 4", students: 1990, teachers: 120, revenue: 99 },
  { name: "Tháng 5", students: 920, teachers: 500, revenue: 70 },
  { name: "Tháng 6", students: 500, teachers: 1150, revenue: 41 },
  { name: "Tháng 7", students: 100, teachers: 40, revenue: 8 },
  { name: "Tháng 8", students: 670, teachers: 150, revenue: 60 },
  { name: "Tháng 9", students: 190, teachers: 300, revenue: 56 },
  { name: "Tháng 10", students: 750, teachers: 1700, revenue: 73 },
  { name: "Tháng 11", students: 310, teachers: 800, revenue: 49 },
  { name: "Tháng 12", students: 890, teachers: 50, revenue: 97 },
];

export default function MyChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
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
          dataKey="students"
          fill="#ffc658"
          barSize={40}
          yAxisId={"left"}
          name={"Học viên"}
        />
        <Bar
          dataKey="teachers"
          fill="#8884d8"
          barSize={40}
          yAxisId={"left"}
          name={"Giảng viên"}
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
