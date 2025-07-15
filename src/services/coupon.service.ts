import { CouponReq, CouponBody } from "types/coupon";
import axiosInstance from "./http";

const couponService = {
    checkIsExistingCode: (code: string) => {
        return axiosInstance.get(`/coupon/isExisting/${encodeURIComponent(code)}`);
    },
    createCoupon: (body: CouponBody) => {
        return axiosInstance.post("/coupon", body);
    },
    // userId which is also teacherId, is a option
    // admin: get all coupon-course => do not need to pass userId
    // teacher: => only get all their coupon-course => must pass userId
    getAllNormalCoupon: (params: CouponReq) => {
        return axiosInstance.get("/coupon/get/all/normal", { params });
    },
    getAllGlobalCoupon: (params: CouponReq) => {
        return axiosInstance.get("/coupon/get/all/global", { params });
    }
}
export default couponService;