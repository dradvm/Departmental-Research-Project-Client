"use client";

import GlobalPromotionForm from "components/AdminUtils/GlobalPromotionForm";
import { CouponType } from "enums/coupon.enum";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GlobalCouponBody } from "types/coupon";

export default function AddGlobalPromotion() {
  const [promotionInfor, setPromotionInfor] = useState<GlobalCouponBody>({
    isGlobal: true,
    type: CouponType.DISCOUNT,
    value: 0,
    startDate: "",
    endDate: "",
    appliedAmount: 0,
    quantity: 0,
    maxValueDiscount: 0,
    minRequire: 0,
    code: "",
  });

  function handleSuccessfulCreation() {
    toast.success("Thêm mã khuyến mãi hệ thống thành công", {
      autoClose: 3000,
    });
  }

  function handleFailedCreation() {
    toast.error("Lỗi khi tạo mã khuyến mãi hệ thống", { autoClose: 3000 });
  }

  function handleInformIsExistingCode() {
    toast.error("Mã khuyến mãi (code) đã tồn tại");
  }

  return (
    <div className="w-[60%] mx-auto mt-4 p-2 shadow-xl shadow-blue-200 rounded-[12px]">
      <GlobalPromotionForm
        promotion={promotionInfor}
        setPromotionInfor={setPromotionInfor}
        handleSuccessfulCreation={handleSuccessfulCreation}
        handleFailedCreation={handleFailedCreation}
        handleInformIsExistingCode={handleInformIsExistingCode}
      ></GlobalPromotionForm>
      <ToastContainer></ToastContainer>
    </div>
  );
}
