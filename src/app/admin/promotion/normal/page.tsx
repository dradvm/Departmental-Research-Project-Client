"use client";

import { productCoupon } from "app/data";
import { CouponType } from "enums/coupon.enum";
import { ProductCouponType } from "types/coupon";
import { useEffect, useState } from "react";
import { Funnel, Search, ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function NormalPromotion() {
  const [page, setPage] = useState<number>(1);
  const [productCoupons, setproductCoupons] = useState<ProductCouponType[]>();

  useEffect(() => {
    const limit = 4;
    const skip = (page - 1) * limit;
    const data = productCoupon.slice(skip, skip + limit);
    setproductCoupons(data);
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
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="">đến: </label>
                <input
                  className="w-[72%] px-1 border-2 rounded-[8px]"
                  type="date"
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
                />
                <span> %</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex gap-2 justify-center items-center">
          <Search size={32} />
          <input
            type="text"
            className="h-fit w-[70%] p-[8px] border-2 rounded-[40px]"
            placeholder="Nội dung tìm kiếm"
          />
        </div>
      </div>
      {/* Content */}
      <div className="h-[100%] grid grid-cols-4 grid-rows-1 gap-4">
        {!productCoupons || productCoupons.length === 0 ? (
          <div>Danh sách mã khuyến mãi khóa học trống</div>
        ) : (
          productCoupons.map((gCoupon, index) => {
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
                className="h-[90%] p-2 flex flex-col gap-2 justify-center rounded-[8px] shadow-lg shadow-green-200"
              >
                <h1 className="uppercase font-bold text-center">
                  #{gCoupon.idCoupon} {typeTitile}
                </h1>
                <h1 className="font-bold text-red-500">{valueTitle}</h1>
                <h2>Giảm tối đa: {gCoupon.maxValueDiscount} VNĐ</h2>
                <h2>Cho đơn từ: {gCoupon.minRequire} VNĐ</h2>
                <h2 className="font-bold text-red-600">
                  Cho khóa học: {gCoupon.title}
                </h2>
                <h2 className="font-bold text-blue-600">
                  Giảng viên: {gCoupon.name}
                </h2>
                <h2>Bắt đầu: {gCoupon.startDate.slice(0, 10)}</h2>
                <h2>Kết thúc: {gCoupon.endDate.slice(0, 10)}</h2>
                <h2>
                  Đã áp dụng: {gCoupon.appliedAmount}/ {gCoupon.quantity}{" "}
                </h2>
                <div className="flex gap-[8px] justify-center">
                  <button className="p-[4px] bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white">
                    Duyệt
                  </button>
                  <button className="p-[4px] bg-red-700 shadow-md shadow-red-700 rounded-[8px] font-bold text-white">
                    Không duyệt
                  </button>
                </div>
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
            if (productCoupons?.length === 4) setPage((curr) => curr + 1);
          }}
          title="Trang tiếp theo"
        >
          <ArrowBigRight size={32} />
        </button>
      </div>
    </div>
  );
}
