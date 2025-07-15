"use client";

import {
  CouponFilterInput,
  CouponReq,
  NormalCouponDB,
  NormalCouponType,
} from "types/coupon";
import { ChangeEvent, useEffect, useState } from "react";
import couponService from "services/coupon.service";
import { couponCourseService } from "services/couponcourse.service";
import { toast, ToastContainer } from "react-toastify";
import CouponFilter from "components/AdminUtils/CouponFilter";
import NoDataFound from "components/AdminUtils/NoDataFound";
import { Pagination } from "components/AdminUtils/Pagination";
import NormalCouponTable from "components/AdminUtils/NormalCouponTable";
import { Modal } from "@mui/material";
import NormalCouponDetailModal from "components/AdminUtils/NormalCouponDetailModal";

export default function NormalPromotion() {
  const [page, setPage] = useState<number>(1);
  const [normalCoupons, setNormalCoupons] = useState<NormalCouponType[]>();
  const [dataLen, setDataLen] = useState<number>(0);
  // close and open modal
  const [open, setOpen] = useState<boolean>(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  // seletedCoupon
  const [selectedCoupon, setSelectedCoupon] = useState<NormalCouponType>();
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

  async function fetchData(page: number, fil: CouponFilterInput) {
    try {
      const skip = (page - 1) * limit;
      const req: CouponReq = {
        skip,
        limit,
        ...fil,
      };
      const data: NormalCouponDB = (await couponService.getAllNormalCoupon(req))
        .data;
      setDataLen(data.length);
      setNormalCoupons(data.normalCoupons);
    } catch (e) {
      toast.error("Lỗi khi lấy dữ liệu khuyến mãi của khóa học", {
        autoClose: 2000,
      });
      console.log("Lỗi khi lấy dữ liệu khuyến mãi của khóa học", e);
    }
  }

  useEffect(() => {
    fetchData(page, filter);
  }, [page, filter]);

  // For button "Duyệt ngay"
  // isDeleted: false
  // isAccepted: false => true
  async function acceptACouponCourse(couponId: number, courseId: number) {
    try {
      await couponCourseService.acceptACouponCourse({
        couponId,
        courseId,
      });
      toast.success("Đã duyệt và kích hoạt mã khuyến mãi cho khóa học!", {
        autoClose: 2000,
      });
      await fetchData(page, filter);
    } catch (e) {
      console.log("Có lỗi xảy ra khi duyệt mã khuyến mãi cho khóa học!", e);
      toast.error("Lỗi khi duyệt mã khuyến mãi cho khóa học!", {
        autoClose: 2000,
      });
    }
  }

  // For button "Hủy kích hoạt"
  // isRunning: true => false
  // isAccepted: true
  async function deleteCouponCourse(couponId: number, courseId: number) {
    try {
      await couponCourseService.deleteACouponCourse({ couponId, courseId });
      toast.success("Đã hủy kích hoạt mã khuyến mãi cho khóa học!", {
        autoClose: 2000,
      });
      await fetchData(page, filter);
    } catch (e) {
      console.log(
        "Có lỗi xảy ra khi HỦY KÍCH HOẠT mã khuyến mãi cho khóa học!",
        e
      );
      toast.error("Lỗi khi hủy kích hoạt mã khuyến mãi!", { autoClose: 2000 });
    }
  }

  return (
    <div className="h-fit mt-4 flex flex-col gap-4">
      {/* Filter Utility */}
      <CouponFilter
        filter={filter}
        onChangeFilterInput={onChangeFilterInput}
        isGlobalCouponPage={false}
      ></CouponFilter>
      {/* Content */}
      {!normalCoupons || normalCoupons.length === 0 ? (
        <NoDataFound message="Danh sách mã khuyến mãi khóa học trống" />
      ) : (
        <NormalCouponTable
          normalCoupons={normalCoupons}
          handleOpen={handleOpen}
          setSelectedCoupon={setSelectedCoupon}
          acceptACouponCourse={acceptACouponCourse}
          deleteCouponCourse={deleteCouponCourse}
        ></NormalCouponTable>
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
      {/* Normal Coupon Detail Modal */}
      <Modal open={open} onClose={handleClose}>
        {selectedCoupon ? (
          <NormalCouponDetailModal
            normalCoupon={selectedCoupon}
            handleClose={handleClose}
            acceptACouponCourse={acceptACouponCourse}
            deleteCouponCourse={deleteCouponCourse}
          ></NormalCouponDetailModal>
        ) : (
          <h1>Không có mã khuyến mãi khóa học nào được chọn</h1>
        )}
      </Modal>
      {/* Toast Message */}
      <ToastContainer />
    </div>
  );
}
