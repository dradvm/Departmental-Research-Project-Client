"use client";

import CouponFilter from "components/AdminUtils/CouponFilter";
import NoDataFound from "components/AdminUtils/NoDataFound";
import { CouponType } from "enums/coupon.enum";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import couponService from "services/coupon.service";
import { CouponFilterInput, CouponReq, GlobalCouponType } from "types/coupon";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

export default function GlobalPromotion() {
  const [page, setPage] = useState<number>(1);
  const [globalCoupons, setglobalCoupons] = useState<GlobalCouponType[]>();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 4;
        const skip = (page - 1) * limit;
        const req: CouponReq = {
          skip,
          limit,
          ...filter,
        };
        const data: GlobalCouponType[] = (
          await couponService.getAllGlobalCoupon(req)
        ).data;
        setglobalCoupons(data);
      } catch (e) {
        console.log("Lỗi lấy danh sách mã khuyến mãi hệ thống: ", e);
      }
    };

    fetchData();
  }, [page, filter]);

  return (
    <div className="h-[100%] flex flex-col">
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
        <div className="h-[80%] grid grid-cols-4 grid-rows-1 gap-4">
          {globalCoupons.map((gCoupon, index) => {
            let typeTitile: string = "";
            let valueTitle: string = "";
            if (gCoupon.type === CouponType.DISCOUNT) {
              typeTitile = gCoupon.type;
              valueTitle = `Giảm ${gCoupon.value}% hóa đơn`;
            } else if (gCoupon.type === CouponType.VOUCHER) {
              typeTitile = gCoupon.type;
              valueTitle = `Giảm ${formatVND(parseInt(gCoupon.value))}`;
            }
            return (
              <div
                key={index}
                className="h-[70%] my-auto p-2 flex flex-col gap-2 justify-center rounded-[8px] shadow-lg shadow-green-200"
              >
                <h1 className="uppercase font-bold text-center">
                  #{gCoupon.couponId} {typeTitile}
                </h1>
                <h1 className="font-bold text-red-500">Code: {gCoupon.code}</h1>
                <h1 className="font-bold text-red-500">{valueTitle}</h1>
                <h2>
                  Giảm tối đa:{" "}
                  {formatVND(parseInt(gCoupon.maxValueDiscount))}{" "}
                </h2>
                <h2>Cho đơn từ: {formatVND(parseInt(gCoupon.minRequire))}</h2>
                <h2>Bắt đầu: {getDateFormat(gCoupon.startDate)}</h2>
                <h2>Kết thúc: {getDateFormat(gCoupon.endDate)}</h2>
                <h2>
                  Đã áp dụng: {gCoupon.appliedAmount}/ {gCoupon.quantity}{" "}
                </h2>
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
            if (globalCoupons?.length === 4) setPage((curr) => curr + 1);
          }}
          title="Trang tiếp theo"
        >
          <ArrowBigRight size={32} />
        </button>
      </div>
    </div>
  );
}
