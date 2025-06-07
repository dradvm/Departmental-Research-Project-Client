"use client";

import { reports } from "@/app/data";
import { useState } from "react";
import { ReportType } from "@/app/types/report";

export default function Report() {
  const [selectedItem, setSelectedItem] = useState<number>();
  const [selectedReport, setSelectedReport] = useState<ReportType>();
  return (
    <div>
      <div className="h-[500px] flex justify-evenly flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%] overflow-y-auto">
          <h1>Danh sách các báo cáo từ người dùng</h1>
          <ul>
            {reports.map((report, index) => {
              return (
                <li
                  key={index}
                  className={`px-6 py-2 border-b hover:underline cursor-pointer
               ${report.idReport === selectedItem ? "bg-blue-100" : ""}`}
                  onClick={() => {
                    if (report.idReport !== selectedItem) {
                      setSelectedReport(report);
                      setSelectedItem(report.idReport);
                    }
                  }}
                >
                  Báo cáo: {report.idReport}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full lg:w-[50%]">
          {selectedReport && (
            <div>
              Mã báo cáo: {selectedReport.idReport}
              <br />
              Nội dung: {selectedReport.contentReport}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
