"use client";

import { payments } from "@/app/data";
import { useState } from "react";
import { PaymentType } from "@/app/types/payment";
export default function Payment() {
  const [selectedItem, setSelectedItem] = useState<number>();
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>();
  return (
    <div>
      <div className="h-[500px] flex justify-evenly flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%] overflow-y-auto">
          <h1>Danh sách các đơn hàng</h1>
          <ul>
            {payments.map((payment, index) => {
              return (
                <li
                  key={index}
                  className={`px-6 py-2 border-b hover:underline cursor-pointer
                         ${
                           payment.idPayment === selectedItem
                             ? "bg-blue-100"
                             : ""
                         }`}
                  onClick={() => {
                    if (payment.idPayment !== selectedItem) {
                      setSelectedPayment(payment);
                      setSelectedItem(payment.idPayment);
                    }
                  }}
                >
                  Đơn hàng: {payment.idPayment}. Giá trị: {payment.totalPrice}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full lg:w-[50%]">
          {selectedPayment && (
            <div>
              Mã đơn hàng: {selectedPayment.idPayment}
              <br />
              Thời gian thanh toán: {selectedPayment.timePayment}
              <br />
              Tổng giá trị: {selectedPayment.totalPrice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
