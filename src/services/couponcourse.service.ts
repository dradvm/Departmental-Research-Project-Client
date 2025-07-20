import { CouponCourseBody, CouponCourseBodyPutType } from "types/couponcourse"
import axiosInstance from "./http"

export const couponCourseService = {
    // create a coupon for a course
    // teacher send request and admin will accept
    createACouponCourse: (body: CouponCourseBody) => {
        return axiosInstance.post('/couponcourse', body)
    },
    checkIsApplyingCoupon: (courseId: number) => {
        return axiosInstance.get(`/couponcourse/check/isApplying/${courseId}`);
    },
    // get all coupon course service for teacher
    getAllCouponCourse: () => {
        return axiosInstance.get('/couponcourse');
    },
    acceptACouponCourse: (body: CouponCourseBodyPutType) => {
        return axiosInstance.put('/couponcourse/accept', body);
    },
    deleteACouponCourse: (body: CouponCourseBodyPutType) => {
        return axiosInstance.put('/couponcourse/delete', body);
    },
}