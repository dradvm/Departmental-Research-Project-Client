"use client";

import { CouponType } from "enums/coupon.enum";
import { CouponFilterInput, CouponReq, NormalCouponType } from "types/coupon";
import { ChangeEvent, useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import couponService from "services/coupon.service";
import { formatVND } from "utils/money";
import { getDateFormat } from "utils/date-format";
import { couponCourseService } from "services/couponcourse.service";
import { toast, ToastContainer } from "react-toastify";
import CouponFilter from "components/AdminUtils/CouponFilter";
import NoDataFound from "components/AdminUtils/NoDataFound";

export default function NormalPromotion() {
  const [page, setPage] = useState<number>(1);
  const [normalCoupons, setNormalCoupons] = useState<NormalCouponType[]>();
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

  async function fetchData(page: number, fil: CouponFilterInput) {
    try {
      const limit = 4;
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
        <div className="h-[100%] grid grid-cols-4 grid-rows-1 gap-4">
          {normalCoupons.map((coupon, index) => {
            let typeTitile: string = "";
            let valueTitle: string = "";
            if (coupon.type === CouponType.DISCOUNT) {
              typeTitile = coupon.type;
              valueTitle = `Giảm ${coupon.value}%`;
            } else if (coupon.type === CouponType.VOUCHER) {
              typeTitile = coupon.type;
              valueTitle = `Giảm ${formatVND(parseInt(coupon.value))}`;
            }
            if (coupon.isAccepted && coupon.isRunning)
              valueTitle += ` (Đang áp dụng)`;
            return (
              <div
                key={index}
                className="h-[90%] p-2 flex flex-col gap-2 justify-center rounded-[8px] shadow-lg shadow-green-200"
              >
                <h1 className=" text-[24px] uppercase font-bold text-center">
                  #{coupon.couponId} {typeTitile}
                </h1>
                <h1 className="font-bold text-red-500">{valueTitle}</h1>
                <h2>
                  Giảm tối đa:{" "}
                  {formatVND(parseInt(coupon.maxValueDiscount))}{" "}
                </h2>
                <h2>Cho đơn từ: {formatVND(parseInt(coupon.minRequire))}</h2>
                <h2 className="font-bold text-red-600">{coupon.coureTitle}</h2>
                <h2 className="font-bold text-blue-600">
                  Giảng viên: {coupon.userName}
                </h2>
                <h2>Bắt đầu: {getDateFormat(coupon.startDate)}</h2>
                <h2>Kết thúc: {getDateFormat(coupon.endDate)}</h2>
                <h2>
                  Đã áp dụng: {coupon.appliedAmount}/ {coupon.quantity}{" "}
                </h2>
                <div className="flex gap-[8px] justify-center">
                  {/* case 1: not accepted and not running */}
                  {!coupon.isAccepted && !coupon.isRunning && (
                    <button
                      className="p-[4px] mt-4 bg-green-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
                      title="Duyệt mã khuyến mãi này, nhưng chưa kích hoạt cho khóa học"
                      onClick={() =>
                        acceptACouponCourse(coupon.couponId, coupon.courseId)
                      }
                    >
                      Duyệt ngay
                    </button>
                  )}
                  {!coupon.isAccepted && !coupon.isRunning && (
                    <button
                      className="p-[4px] mt-4 bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
                      title="Duyệt và kích hoạt ngay mã khuyến mãi cho khóa học"
                      onClick={() =>
                        acceptAndActivateCouponCourse(
                          coupon.couponId,
                          coupon.courseId
                        )
                      }
                    >
                      Kích hoạt ngay
                    </button>
                  )}
                  {/* case 2: accepted and running */}
                  {coupon.isAccepted && coupon.isRunning && (
                    <button
                      className="p-[4px] mt-4 bg-red-700 shadow-md shadow-red-700 rounded-[8px] font-bold text-white"
                      title="Hủy kích hoạt mã khuyến mãi cho khóa học này, có thể kích hoạt lại sau"
                      onClick={() =>
                        deactivateCouponCourse(coupon.couponId, coupon.courseId)
                      }
                    >
                      Hủy kích hoạt
                    </button>
                  )}
                  {/* case 3: accepted but not running */}
                  {coupon.isAccepted && !coupon.isRunning && (
                    <button
                      className="p-[4px] mt-4 bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
                      title="Mã này đã duyệt, kích hoạt để hiệu lực với khóa học này"
                      onClick={() =>
                        acceptAndActivateCouponCourse(
                          coupon.couponId,
                          coupon.courseId
                        )
                      }
                    >
                      Kích hoạt ngay
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Pagination */}
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
            if (normalCoupons?.length === 4) setPage((curr) => curr + 1);
          }}
          title="Trang tiếp theo"
        >
          <ArrowBigRight size={32} />
        </button>
      </div>
      {/* Toast Message */}
      <ToastContainer />
    </div>
  );
}
