"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { PaymentFilter, PaymentType } from "types/payment";
import { Funnel, Search, ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import paymentService from "services/payment.service";
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getDateFormat, getIsoStringDateFromDate } from "utils/date-format";
import { formatVND } from "utils/money";
import NoDataFound from "components/AdminUtils/NoDataFound";

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>();
  const [infors, setInfors] = useState<PaymentType[]>();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<PaymentFilter>({
    startDate: undefined,
    endDate: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    searchText: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  // open modal
  function handleOpen() {
    setOpen(true);
  }
  // close modal
  function handleClose() {
    setOpen(false);
  }

  function onChangeFilterInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
    setPage(1);
  }

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const limit = 5;
        const skip = (page - 1) * limit;
        const paymentsDB: PaymentType[] = (
          await paymentService.getAllPayment({
            limit,
            skip,
            startDate: filter.startDate
              ? getIsoStringDateFromDate(filter.startDate)
              : undefined,
            endDate: filter.endDate
              ? getIsoStringDateFromDate(filter.endDate)
              : undefined,
            minPrice: filter.minPrice ? parseInt(filter.minPrice) : undefined,
            maxPrice: filter.maxPrice ? parseInt(filter.maxPrice) : undefined,
            userName: filter.searchText ? filter.searchText : undefined,
          })
        ).data;
        setInfors(paymentsDB);
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu payment: ", e);
        setInfors([]);
      }
    };
    fetchPayment();
  }, [page, filter]);

  return (
    <div>
      <div className="h-[600px] flex flex-col">
        {/* Block 1: Filter Utility */}
        <div className="h-[10%] flex">
          <div className="w-[70%] flex gap-2">
            <div
              className="w-[6%] flex items-center justify-center"
              title="Lọc các đơn hàng"
            >
              <Funnel size={32} />
            </div>
            <div className="w-[50%] px-1 flex flex-col gap-2">
              <h1 className="font-bold">Thời gian</h1>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <label htmlFor="">Từ: </label>
                  <input
                    className="w-[72%] px-1 border-2 rounded-[8px]"
                    type="date"
                    name="startDate"
                    value={filter.startDate ?? ""}
                    onChange={onChangeFilterInput}
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">đến: </label>
                  <input
                    className="w-[72%] px-1 border-2 rounded-[8px]"
                    type="date"
                    name="endDate"
                    value={filter.endDate ?? ""}
                    onChange={onChangeFilterInput}
                  />
                </div>
              </div>
            </div>
            <div className="w-[40%] px-1 flex flex-col gap-2">
              <h1 className="font-bold">Tổng tiền</h1>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <label htmlFor="">Từ: </label>
                  <input
                    className="w-[70%] px-1 border-2 rounded-[8px]"
                    type="number"
                    min={0}
                    step={100000}
                    name="minPrice"
                    value={filter.minPrice ?? ""}
                    onChange={onChangeFilterInput}
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">đến: </label>
                  <input
                    className="w-[70%] px-1 border-2 rounded-[8px]"
                    type="number"
                    min={0}
                    step={100000}
                    name="maxPrice"
                    value={filter.maxPrice ?? ""}
                    onChange={onChangeFilterInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[40%] flex gap-2 justify-center items-center">
            <Search size={32} />
            <input
              type="text"
              className="h-fit w-[70%] p-[8px] border-2 rounded-[40px]"
              placeholder="Họ tên khách hàng"
              name="searchText"
              value={filter.searchText ?? ""}
              onChange={onChangeFilterInput}
            />
          </div>
        </div>
        {/* Block 2: Content */}
        {infors && infors.length > 0 ? (
          <div className="h-[90%] p-4 flex flex-col gap-4">
            <div className="h-fit">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Mã HĐ
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Mã KH
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="left">
                        Khách hàng
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Ngày lập hóa đơn
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Số lượng khóa học
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Tổng tiền
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {infors.map((payment) => {
                      return (
                        <TableRow
                          key={payment.paymentId}
                          className="hover:bg-gray-200"
                        >
                          <TableCell align="center">
                            {payment.paymentId}
                          </TableCell>
                          <TableCell align="center">{payment.userId}</TableCell>
                          <TableCell align="left">{payment.userName}</TableCell>
                          <TableCell align="right">
                            {getDateFormat(payment.timePayment)}
                          </TableCell>
                          <TableCell align="center">
                            {payment.paymentDetail.length}
                          </TableCell>
                          <TableCell align="right">
                            {formatVND(parseInt(payment.finalPrice))}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={() => {
                              setSelectedPayment(payment);
                              handleOpen();
                            }}
                          >
                            <button className="px-2 py-1 rounded-[4px] bg-purple-700 text-white">
                              Xem chi tiết
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {/* Button Pagination */}
            <div className="h-fit flex gap-[8px] justify-center">
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
                  if (infors?.length === 5) setPage((curr) => curr + 1);
                }}
                title="Trang tiếp theo"
              >
                <ArrowBigRight size={32} />
              </button>
            </div>
          </div>
        ) : (
          <NoDataFound message="Không có hóa đơn nào được tìm thấy"></NoDataFound>
        )}
      </div>
      {/* modal for payment detail */}
      <Modal open={open} onClose={handleClose}>
        {selectedPayment ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-4 bg-white rounded-[8px]">
            <h1 className="text-center font-bold text-[28px]">
              Chi tiết hóa đơn
            </h1>
            {/* general information */}
            <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-x-20 font-semibold">
              <p>Mã HĐ: {selectedPayment.paymentId} </p>
              <p>Ngày lập: {getDateFormat(selectedPayment.timePayment)} </p>
              <p>Khách hàng: {selectedPayment.userName} </p>
              <p>Mã KH: {selectedPayment.userId} </p>
            </div>
            {/* payment detail */}
            <div>
              {selectedPayment.paymentDetail ? (
                <div className="mt-8">
                  <h1 className="font-bold text-[20px]">
                    Danh sách các khóa học (
                    {selectedPayment.paymentDetail.length})
                  </h1>
                  {selectedPayment.paymentDetail.map((paymentDetail) => {
                    return (
                      <div
                        key={paymentDetail.courseId}
                        className="grid grid-cols-[1fr_5fr_2fr_2fr] gap-4"
                      >
                        <p>{paymentDetail.courseId}</p>
                        <p>{paymentDetail.courseTitle}</p>
                        <p className="line-through">
                          {formatVND(parseInt(paymentDetail.price))}
                        </p>
                        <p className="font-bold">
                          {formatVND(parseInt(paymentDetail.finalPrice))}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h1 className="text-center font-bold text-[20px]">
                  Hóa đơn này không có khóa học nào!
                </h1>
              )}
            </div>
            {/* coupon and price */}
            <div className="grid grid-cols-2 mt-8 font-bold">
              <h1>Giá gốc:</h1>
              <h1 className="text-right">
                {formatVND(parseInt(selectedPayment.originalPrice))}
              </h1>
              <h1>Tạm tính</h1>
              <h1 className="text-right">
                {formatVND(parseInt(selectedPayment.totalPrice))}
              </h1>
              <h1>Mã giảm giá:</h1>
              <h1 className="text-right">
                {selectedPayment.code
                  ? `${selectedPayment.code}`
                  : "Không áp dụng"}
              </h1>
              <h1 className="text-[20px] text-blue-500">Tổng cộng:</h1>
              <h1 className="text-[20px] text-blue-500 text-right">
                {formatVND(parseInt(selectedPayment.finalPrice))}
              </h1>
            </div>
            {/* exit button */}
            <button
              className="absolute right-0 top-0 px-4 py-1 rounded-[4px] hover:bg-red-600 hover:text-white"
              onClick={handleClose}
            >
              <X />
            </button>
          </div>
        ) : (
          <h1>Không có hóa đơn nào được chọn cả</h1>
        )}
      </Modal>
    </div>
  );
}
