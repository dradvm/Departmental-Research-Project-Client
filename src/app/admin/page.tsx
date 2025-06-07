import MyChart from "components/AdminUtils/charts/MyChart";

export default function Admin() {
  return (
    <div>
      <h1>
        Biểu đồ số lượng đăng ký của học viên, giảng viên và doanh thu theo mỗi
        tháng, năm 2024
      </h1>
      <MyChart></MyChart>
    </div>
  );
}
