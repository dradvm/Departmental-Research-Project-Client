"use client";

import { globalCoupon } from "app/data";
import { CouponType } from "enums/coupon.enum";
import { Funnel, Search, ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { GlobalCouponType } from "types/coupon";

export default function GlobalPromotion() {
  const [page, setPage] = useState<number>(1);
  const [globalCoupons, setglobalCoupons] = useState<GlobalCouponType[]>();
  const [filter, setFilter] = useState({
    startDate: undefined,
    endDate: undefined,
    minPrice: undefined,
    minPercent: undefined,
    searchText: undefined,
  });

  function onChangeFilterInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    const limit = 4;
    const skip = (page - 1) * limit;
    const data = globalCoupon.slice(skip, skip + limit);
    setglobalCoupons(data);
  }, [page]);

  return (
    <div className="h-[100%] flex flex-col">
      {/* Filter Utility */}
      <div className="h-[10%] flex">
        <div className="w-[70%] flex gap-2">
          <div
            className="w-[6%] flex items-center justify-center"
            title="Lọc các mã khuyến mãi"
          >
            <Funnel size={32} />
          </div>
          <div className="w-[45%] px-1 flex flex-col gap-2">
            <h1 className="font-bold">Thời gian hiệu lực</h1>
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
          <div className="w-[45%] px-1 flex flex-col gap-2">
            <h1 className="font-bold">Giá trị</h1>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  max={10000000}
                  step={100000}
                  name="minPrice"
                  value={filter.minPrice ?? ""}
                  onChange={onChangeFilterInput}
                />
                <span> VNĐ</span>
              </div>
              <div className="flex gap-2">
                <label htmlFor="">hoặc </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  name="minPercent"
                  value={filter.minPercent ?? ""}
                  onChange={onChangeFilterInput}
                />
                <span> %</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[10%] my-auto">
          <Link
            href="/admin/promotion/global/add"
            className="p-[4px] bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
          >
            Thêm mới
          </Link>
        </div>
        <div className="w-[20%] flex gap-2 justify-center items-center">
          <Search size={32} />
          <input
            type="text"
            className="h-fit w-[70%] p-[8px] border-2 rounded-[40px]"
            placeholder="Nội dung tìm kiếm"
            name="searchText"
            value={filter.searchText ?? ""}
            onChange={onChangeFilterInput}
          />
        </div>
      </div>
      {/* Content */}
      <div className="h-[80%] grid grid-cols-4 grid-rows-1 gap-4">
        {!globalCoupons || globalCoupons.length === 0 ? (
          <div>Danh sách mã khuyến mãi hệ thống trống</div>
        ) : (
          globalCoupons.map((gCoupon, index) => {
            let typeTitile: string = "";
            let valueTitle: string = "";
            if (gCoupon.type === CouponType.DISCOUNT) {
              typeTitile = gCoupon.type;
              valueTitle = `Giảm ${gCoupon.value}%`;
            } else if (gCoupon.type === CouponType.VOUCHER) {
              typeTitile = gCoupon.type;
              valueTitle = `Giảm ${gCoupon.value} VNĐ`;
            }
            return (
              <div
                key={index}
                className="h-[70%] my-auto p-2 flex flex-col gap-2 justify-center rounded-[8px] shadow-lg shadow-green-200"
              >
                <h1 className="uppercase font-bold text-center">
                  #{gCoupon.couponId} {typeTitile}
                </h1>
                <h1 className="font-bold text-red-500">{valueTitle}</h1>
                <h2>Giảm tối đa: {gCoupon.maxValueDiscount} VNĐ</h2>
                <h2>Cho đơn từ: {gCoupon.minRequire} VNĐ</h2>
                <h2>Bắt đầu: {gCoupon.startDate.slice(0, 10)}</h2>
                <h2>Kết thúc: {gCoupon.endDate.slice(0, 10)}</h2>
                <h2>
                  Đã áp dụng: {gCoupon.appliedAmount}/ {gCoupon.quantity}{" "}
                </h2>
              </div>
            );
          })
        )}
      </div>
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
