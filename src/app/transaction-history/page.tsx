"use client";

import { useEffect, useState } from "react";
import { PaymentType } from "types/payment";
import paymentService from "services/payment.service";
import { Modal } from "@mui/material";
import NoDataFound from "components/AdminUtils/NoDataFound";
import { Pagination } from "components/AdminUtils/Pagination";
import TransactionTable from "components/AdminUtils/TransactionTable";
import TransactionDetailModal from "components/AdminUtils/TransactionDetailModal";

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>();
  const [infors, setInfors] = useState<PaymentType[]>();
  const [page, setPage] = useState<number>(1);

  const [open, setOpen] = useState<boolean>(false);
  // open modal
  function handleOpen() {
    setOpen(true);
  }
  // close modal
  function handleClose() {
    setOpen(false);
  }

  const limit = 5;

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const skip = (page - 1) * limit;
        const paymentsDB: PaymentType[] = (
          await paymentService.getAllMyTransaction({ limit, skip })
        ).data;
        setInfors(paymentsDB);
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu payment: ", e);
        setInfors([]);
      }
    };
    fetchPayment();
  }, [page]);

  return (
    <div>
      <div className="h-fit mt-4 flex flex-col gap-4">
        {/* Block 2: Content */}
        {infors && infors.length > 0 ? (
          <TransactionTable
            payments={infors}
            setSelectedPayment={setSelectedPayment}
            handleOpen={handleOpen}
          ></TransactionTable>
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
          <TransactionDetailModal
            paymentDetail={selectedPayment}
            handleClose={handleClose}
          ></TransactionDetailModal>
        ) : (
          <h1>Không có hóa đơn nào được chọn cả</h1>
        )}
      </Modal>
    </div>
  );
}
