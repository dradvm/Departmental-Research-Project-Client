"use client";

import { payments } from "app/data";
import { useEffect, useState } from "react";
import { PaymentType } from "types/payment";
import {
  Funnel,
  Search,
  ArrowBigLeft,
  ArrowBigRight,
  CircleDollarSign,
  CalendarDays,
} from "lucide-react";

export default function Payment() {
  const [activatedItem, setActivatedItem] = useState<number>();
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>();
  const [infors, setInfors] = useState<PaymentType[]>();
  const [page, setPage] = useState<number>(1);
  
  useEffect(() => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const data: PaymentType[] = payments.slice(skip, skip + limit);
    setInfors(data);
  }, [page]);

  return (
    <div>
      <div className="h-[600px] flex flex-col">
        {/* Block 1: Title Page */}
        <div className="h-[10%]">
          <h1 className="text-[24px] font-bold text-blue-600">
            Quản lý các hóa đơn
          </h1>
        </div>
        {/* Block 2: Filter Utility */}
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
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">đến: </label>
                  <input
                    className="w-[70%] px-1 border-2 rounded-[8px]"
                    type="number"
                    min={0}
                    step={100000}
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
              placeholder="Nội dung tìm kiếm"
            />
          </div>
        </div>
        {/* Block 3: Content */}
        <div className="h-[80%] p-4 flex flex-col gap-20 lg:flex-row">
          {/* List */}
          <div className="w-full lg:w-[40%]">
            <div>
              {!infors || infors.length === 0 ? (
                <div>Danh sách hóa đơn trống</div>
              ) : (
                <ul>
                  {infors.map((infor, index) => {
                    return (
                      <li
                        key={index}
                        className={`grid grid-cols-3 grid-rows-1 gap-4 px-6 py-2 border-b hover:underline cursor-pointer
               ${infor.idUser === activatedItem ? "bg-blue-100" : ""}`}
                        onClick={() => {
                          if (infor.idUser !== activatedItem) {
                            setSelectedPayment(infor);
                            setActivatedItem(infor.idUser);
                          }
                        }}
                      >
                        <p>
                          #{infor.idPayment}. {infor.name}
                        </p>
                        <div
                          className="flex gap-2 items-center"
                          title={`Ngày lập hóa đơn: ${infor.timePayment}`}
                        >
                          <CalendarDays size={20} />
                          <p>{infor.timePayment.slice(0, 10)}</p>
                        </div>
                        <div
                          className="flex gap-2 items-center"
                          title={`Tổng giá trị hóa đơn: ${infor.totalPrice}`}
                        >
                          <CircleDollarSign size={20} />
                          <p>{infor.totalPrice}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              {/* Button Pagination */}
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
                    if (infors?.length === 10) setPage((curr) => curr + 1);
                  }}
                  title="Trang tiếp theo"
                >
                  <ArrowBigRight size={32} />
                </button>
              </div>
            </div>
          </div>
          {/* Detail */}
          {selectedPayment && (
            <div className="h-[100%] w-full lg:w-[50%] p-4 flex flex-col gap-4 shadow-lg shadow-blue-400">
              {/* Block 1 */}
              <h1 className="h-[10%] text-[32px] text-center font-bold">
                Thông tin hóa đơn
              </h1>
              {/* Block 2 */}
              <div className="h-[12%] grid grid-cols-2 grid-rows-2 gap-2 text-[20px] font-semibold">
                <h1>Số hóa đơn: {selectedPayment.idPayment}</h1>
                <h1>Ngày lập: {selectedPayment.timePayment.slice(0, 10)}</h1>
                <h1>Khách hàng: {selectedPayment.name}</h1>
                <h2>Mã khách hàng: {selectedPayment.idUser}</h2>
              </div>
              {/* Block 3 */}
              <div className="max-h-[50%] text-[18px]">
                <h1 className="underline">Danh sách khóa học</h1>
                <div>
                  {selectedPayment.PaymentDetail.map((detailPayment) => (
                    <div
                      key={detailPayment.idCourse}
                      className="grid grid-cols-10 grid-rows-1"
                    >
                      <h1>{detailPayment.idCourse}</h1>
                      <h1 className="col-span-5">{detailPayment.courseName}</h1>
                      <h1 className="col-span-2 line-through">
                        {detailPayment.originalPrice}
                      </h1>
                      <h1 className="col-span-2 font-bold">
                        {detailPayment.price}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
              {/* Block 4 */}
              <div className="h-[10%] text-[20px] font-bold">
                <h1 className="text-blue-500">
                  Tổng số khóa học: {selectedPayment.PaymentDetail.length}
                </h1>
                <h1 className="text-red-500">
                  Tổng tiền: {selectedPayment.totalPrice}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
