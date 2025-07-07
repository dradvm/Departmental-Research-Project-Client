"use client";

import { CouponFilterInput, CouponReq, NormalCouponType } from "types/coupon";
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
      const data: NormalCouponType[] = (
        await couponService.getAllNormalCoupon(req)
      ).data;
      setNormalCoupons(data);
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
  // only accept, not set isRunning
  // isRunning: false
  // isAccepted: false => true
  async function acceptACouponCourse(couponId: number, courseId: number) {
    try {
      await couponCourseService.acceptACouponCourse({
        couponId,
        courseId,
      });
      toast.success(
        "Đã duyệt nhưng chưa kích hoạt mã khuyến mãi cho khóa học!",
        {
          autoClose: 2000,
        }
      );
      await fetchData(page, filter);
    } catch (e) {
      console.log("Có lỗi xảy ra khi duyệt mã khuyến mãi cho khóa học!", e);
      toast.error("Lỗi khi duyệt mã khuyến mãi cho khóa học!", {
        autoClose: 2000,
      });
    }
  }

  // For button "Kích hoạt ngay"
  // isRunning: false => true
  // isAccepted: false => true / true => true
  async function acceptAndActivateCouponCourse(
    couponId: number,
    courseId: number
  ) {
    try {
      await couponCourseService.acceptAndActiveACouponCourse({
        couponId,
        courseId,
      });
      toast.success("Đã duyệt và kích hoạt mã khuyến mãi cho khóa học!", {
        autoClose: 2000,
      });
      await fetchData(page, filter);
    } catch (e) {
      console.log(
        "Có lỗi xảy ra khi duyệt và kích hoạt mã khuyến mãi cho khóa học!",
        e
      );
      toast.error("Lỗi khi duyệt và kích hoạt mã khuyến mãi cho khóa học!", {
        autoClose: 2000,
      });
    }
  }

  // For button "Hủy kích hoạt"
  // isRunning: true => false
  // isAccepted: true
  async function deactivateCouponCourse(couponId: number, courseId: number) {
    try {
      await couponCourseService.deactivateACouponCourse({ couponId, courseId });
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
    <div className="h-[100%] flex flex-col">
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
          deactivateCouponCourse={deactivateCouponCourse}
          acceptAndActivateCouponCourse={acceptAndActivateCouponCourse}
        ></NormalCouponTable>
      )}
      {/* Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        dataLength={normalCoupons ? normalCoupons.length : 0}
        limit={limit}
      ></Pagination>
      {/* Normal Coupon Detail Modal */}
      <Modal open={open} onClose={handleClose}>
        {selectedCoupon ? (
          <NormalCouponDetailModal
            normalCoupon={selectedCoupon}
            handleClose={handleClose}
            acceptACouponCourse={acceptACouponCourse}
            deactivateCouponCourse={deactivateCouponCourse}
            acceptAndActivateCouponCourse={acceptAndActivateCouponCourse}
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
