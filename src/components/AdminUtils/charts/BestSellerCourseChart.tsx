import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BestSellerCourse } from "types/overview";

interface BestSellerCourseChartType {
  data: BestSellerCourse[];
}
export default function BestSellerCourseChart(
  props: BestSellerCourseChartType
) {
  return (
    <ResponsiveContainer height={400}>
      <ComposedChart data={props.data} margin={{ right: 20 }}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey={"title"} tick={false}></XAxis>
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
          dataKey={"count"}
          fill="#1f77b4"
          barSize={40}
          yAxisId={"left"}
          name={"Số lượt bán"}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#ff7f0e"
          yAxisId={"right"}
          name="Doanh thu"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
