"use client";

import { reports } from "app/data";
import { useEffect, useState } from "react";
import { ReportType } from "types/report";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { User } from "lucide-react";

export default function Report() {
  const [page, setPage] = useState<number>(1);
  const [infors, setInfors] = useState<ReportType[]>();

  useEffect(() => {
    const limit = 6;
    const skip = (page - 1) * limit;
    const data = reports.slice(skip, skip + limit);
    setInfors(data);
  }, [page]);

  return (
    <div className="h-[600px] flex flex-col">
      <div className="h-[10%]">
        <h1 className="text-[24px] font-bold text-blue-600">
          Danh sách các báo cáo từ người dùng
        </h1>
      </div>
      {!infors || infors.length === 0 ? (
        <div>Không có báo cáo nào</div>
      ) : (
        <div className="h-[80%] grid grid-cols-2 grid-rows-3 gap-8">
          {infors.map((report, index) => (
            <div
              key={index}
              className="p-[8px] shadow-lg rounded-[12px] overflow-auto"
            >
              <div className="flex gap-2">
                <p className="text-red-500 font-bold">ID: {report.idReport}:</p>
                <User />
                <h1 className="font-bold text-blue-500">{`${report.name} (ID: ${report.idUser})`}</h1>
              </div>
              <div>Nội dung: {report.contentReport}</div>
            </div>
          ))}
        </div>
      )}
      {/* Button Pagination */}
      <div className="h-[10%] flex gap-[8px] justify-center">
        <button
          className="h-fit mt-[8px] p-[4px]"
          onClick={() => {
            if (page !== 1) setPage((curr) => curr - 1);
          }}
          title="Quay lại trang trước"
        >
          <ArrowBigLeft size={32} />
        </button>
        <button className="h-fit mt-[8px] p-[4px] text-[20px]">
          Trang {page}
        </button>
        <button
          className="h-fit mt-[8px] p-[4px]"
          onClick={() => {
            if (infors?.length === 6) setPage((curr) => curr + 1);
          }}
          title="Trang tiếp theo"
        >
          <ArrowBigRight size={32} />
        </button>
      </div>
    </div>
  );
}
