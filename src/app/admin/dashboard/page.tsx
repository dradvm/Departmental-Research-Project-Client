"use client";

import BestSellerCourseChart from "components/AdminUtils/charts/BestSellerCourseChart";
import RevenueChart from "components/AdminUtils/charts/RevenueChart";
import withRole from "components/WithRole/withRole";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { overviewService } from "services/overview.service";
import { BestSellerCourse, RevenueReportByMonth } from "types/overview";

function Chart() {
  const [revenueReport, setRevenueReport] = useState<RevenueReportByMonth[]>(
    []
  );
  const [bestSellerCourses, setBestSellerCourses] = useState<
    BestSellerCourse[]
  >([]);
  async function fetchData() {
    try {
      const revuenue: RevenueReportByMonth[] = (
        await overviewService.getRevenueByMonth()
      ).data;
      const bestSeller: BestSellerCourse[] = (
        await overviewService.getBestSellerCourses()
      ).data;
      setRevenueReport(revuenue);
      setBestSellerCourses(bestSeller);
    } catch (e) {
      console.log("Lỗi khi lấy báo cáo: ", e);
      toast.error("Lỗi khi lấy báo cáo");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[24px] font-bold text-blue-600">
        Biểu đồ thống kê doanh thu trong năm 2025
      </h1>
      <RevenueChart data={revenueReport}></RevenueChart>
      <h1 className="text-[24px] font-bold text-blue-600">
        Xếp hạng những khóa học bán chạy nhất trong năm 2025
      </h1>
      <BestSellerCourseChart data={bestSellerCourses}></BestSellerCourseChart>
      <ToastContainer />
    </div>
  );
}

export default withRole(Chart, ["ADMIN"]);