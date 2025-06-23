"use client";

import GlobalPromotionForm from "components/AdminUtils/GlobalPromotionForm";
import { CouponType } from "enums/coupon.enum";
import { useState } from "react";
import { GlobalCouponType } from "types/coupon";

export default function AddGlobalPromotion() {
  const [promotionInfor, setPromotionInfor] = useState<GlobalCouponType>({
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

  return (
    <div className="w-[60%] mx-auto mt-4 p-2 shadow-xl shadow-blue-200 rounded-[12px]">
      <GlobalPromotionForm
        promotion={promotionInfor}
        setPromotionInfor={setPromotionInfor}
      ></GlobalPromotionForm>
    </div>
  );
}
