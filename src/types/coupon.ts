// use for POST: create a coupon
export interface CouponBody {
  isGlobal: boolean;
  type: "discount" | "voucher";
  value: number;
  startDate: string;
  endDate: string;
  quantity: number;
  minRequire: number;
  maxValueDiscount: number;
  code: string;
}

// use for GET: get all normal coupon/ global coupon
export interface CouponReq {
  limit: number;
  skip: number;
  userId?: number;
  startDate?: string,
  endDate?: string,
  minPrice?: number,
  minPercent?: number,
  searchText?: string,
}

export interface CouponFilterInput {
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  minPercent?: number;
  searchText?: string;
}

export interface NormalCouponType {
  couponId: number;
  type: string;
  value: string;
  startDate: string;
  endDate: string;
  quantity: string;
  appliedAmount: string;
  minRequire: string;
  maxValueDiscount: string;
  code: string;
  isGlobal: boolean;
  // status
  isAccepted: boolean;
  isDeleted: boolean;
  // course information
  courseId: number;
  coureTitle: string;
  userId: number
  userName: string;
}

export interface GlobalCouponType {
  couponId: string;
  userId: string;
  isGlobal: boolean;
  type: "discount" | "voucher";
  value: string;
  startDate: string;
  endDate: string;
  quantity: string;
  appliedAmount: string;
  minRequire: string;
  maxValueDiscount: string;
  code: string;
}

export interface NormalCouponDB {
  normalCoupons: NormalCouponType[];
  length: number;
}

export interface GlobalCouponDB {
  globalCoupons: GlobalCouponType[];
  length: number;
}