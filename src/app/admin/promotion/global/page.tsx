"use client";

import { Modal } from "@mui/material";
import CouponFilter from "components/AdminUtils/CouponFilter";
import { GlobalCouponDetailModal } from "components/AdminUtils/GlobalCouponDetailModal";
import GlobalCouponTable from "components/AdminUtils/GlobalCouponTable";
import NoDataFound from "components/AdminUtils/NoDataFound";
import { Pagination } from "components/AdminUtils/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import couponService from "services/coupon.service";
import {
  CouponFilterInput,
  CouponReq,
  GlobalCouponDB,
  GlobalCouponType,
} from "types/coupon";

export default function GlobalPromotion() {
  const [page, setPage] = useState<number>(1);
  const [globalCoupons, setglobalCoupons] = useState<GlobalCouponType[]>();
  const [dataLen, setDataLen] = useState<number>(0);
  // open and close modal
  const [open, setOpen] = useState<boolean>(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  // selectedCoupon
  const [selectedCoupon, setSelectedCoupon] = useState<GlobalCouponType>();

  const [filter, setFilter] = useState<CouponFilterInput>({
    startDate: undefined,
    endDate: undefined,
    minPrice: undefined,
    minPercent: undefined,
    searchText: undefined,
  });

  function onChangeFilterInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPage(1);
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
  }

  const limit = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (page - 1) * limit;
        const req: CouponReq = {
          skip,
          limit,
          ...filter,
        };
        const data: GlobalCouponDB = (
          await couponService.getAllGlobalCoupon(req)
        ).data;
        setDataLen(data.length);
        setglobalCoupons(data.globalCoupons);
      } catch (e) {
        console.log("Lỗi lấy danh sách mã khuyến mãi hệ thống: ", e);
      }
    };

    fetchData();
  }, [page, filter]);

  return (
    <div className="h-fit mt-4 flex flex-col gap-4">
      {/* Filter Utility */}
      <CouponFilter
        filter={filter}
        onChangeFilterInput={onChangeFilterInput}
        isGlobalCouponPage={true}
      ></CouponFilter>
      {/* Content */}

      {!globalCoupons || globalCoupons.length === 0 ? (
        <NoDataFound message="Danh sách mã khuyến mãi hệ thống trống" />
      ) : (
        <GlobalCouponTable
          globalCoupons={globalCoupons}
          handleOpen={handleOpen}
          setSelectedCoupon={setSelectedCoupon}
        ></GlobalCouponTable>
      )}
      {/* Pagination */}
      <div className="flex items-center justify-around">
        <Pagination
          page={page}
          setPage={setPage}
          dataLength={dataLen}
          limit={limit}
        ></Pagination>
      </div>
      {/* Modal: Detail Global Coupon */}
      <Modal open={open} onClose={handleClose}>
        {selectedCoupon ? (
          <GlobalCouponDetailModal
            globalCoupon={selectedCoupon}
            handleClose={handleClose}
          ></GlobalCouponDetailModal>
        ) : (
          <h1>Không có mã khuyến mãi hệ thống nào được chọn</h1>
        )}
      </Modal>
    </div>
  );
}
