export interface CouponCourseBodyPutType {
    courseId: number;
    couponId: number;
}

export interface CouponCourseBody {
    courseId: number;
    isGlobal: boolean,
    type: "discount" | "voucher";
    value: string;
    startDate: string;
    endDate: string;
    quantity: number;
    minRequire: number;
    maxValueDiscount: number;
    code: string;
}