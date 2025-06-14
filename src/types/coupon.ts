import { CouponType } from "enums/coupon.enum";

export interface ProductCouponType {
  idCoupon: number;
  type: CouponType;
  value: number;
  startDate: string;
  endDate: string;
  quantity: number;
  appliedAmount: number;
  minRequire: number;
  maxValueDiscount: number;
  idUser: number;
  name: string;
  idCourse: number;
  title: string;
}

export interface GlobalCouponType {
  idCoupon: number;
  type: CouponType;
  value: number;
  startDate: string;
  endDate: string;
  quantity: number;
  appliedAmount: number;
  minRequire: number;
  maxValueDiscount: number;
}
