"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { PaymentFilter, PaymentType } from "types/payment";
import paymentService from "services/payment.service";
import { Modal } from "@mui/material";
import { getIsoStringDateFromDate } from "utils/date-format";
import NoDataFound from "components/AdminUtils/NoDataFound";
import { Pagination } from "components/AdminUtils/Pagination";
import PaymentDetailModal from "components/AdminUtils/PaymentDetailModal";
import PaymentTable from "components/AdminUtils/PaymentTable";
import { PaymentFilterUtils } from "components/AdminUtils/PaymentFilter";

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

  const limit = 5;

  useEffect(() => {
    const fetchPayment = async () => {
      try {
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
      <div className="h-fit mt-4 flex flex-col gap-4">
        {/* Block 1: Filter Utility */}
        <PaymentFilterUtils
          filter={filter}
          onChangeFilterInput={onChangeFilterInput}
        ></PaymentFilterUtils>
        {/* Block 2: Content */}
        {infors && infors.length > 0 ? (
          <PaymentTable
            payments={infors}
            setSelectedPayment={setSelectedPayment}
            handleOpen={handleOpen}
          ></PaymentTable>
        ) : (
          <NoDataFound message="Không có hóa đơn nào được tìm thấy"></NoDataFound>
        )}
        {/* Block 3: Pagination */}
        <div className="flex items-center justify-around">
          <Pagination
            page={page}
            setPage={setPage}
            dataLength={infors ? infors.length : 0}
            limit={limit}
          ></Pagination>
        </div>
      </div>
      {/* modal for payment detail */}
      <Modal open={open} onClose={handleClose}>
        {selectedPayment ? (
          <PaymentDetailModal
            paymentDetail={selectedPayment}
            handleClose={handleClose}
          ></PaymentDetailModal>
        ) : (
          <h1>Không có hóa đơn nào được chọn cả</h1>
        )}
      </Modal>
    </div>
  );
}
