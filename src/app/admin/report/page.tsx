"use client";

import { reports } from "app/data";
import { useEffect, useState } from "react";
import { ReportType } from "types/report";
import { Pagination } from "components/AdminUtils/Pagination";
import NoDataFound from "components/AdminUtils/NoDataFound";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Report() {
  const [page, setPage] = useState<number>(1);
  const [infors, setInfors] = useState<ReportType[]>();

  const limit = 6;

  useEffect(() => {
    const skip = (page - 1) * limit;
    const data = reports.slice(skip, skip + limit);
    setInfors(data);
  }, [page]);

  return (
    <div className="h-fit mt-4 flex flex-col gap-4">
      {!infors || infors.length === 0 ? (
        <NoDataFound message="Không có báo cáo/ phản hồi nào từ người dùng"></NoDataFound>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Người dùng
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "80%" }}>
                  Nội dung báo cáo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {infors.map((report) => (
                <TableRow key={report.idReport}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.contentReport}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Button Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        dataLength={infors ? infors.length : 0}
        limit={limit}
      ></Pagination>
    </div>
  );
}
