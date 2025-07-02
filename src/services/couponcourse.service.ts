import { CouponCourseBodyPutType } from "types/couponcourse"
import axiosInstance from "./http"

export const couponCourseService = {
    // create a coupon for a course
    // teacher send request and admin will accept
    createACouponCourse: (body: CouponCourseBodyPutType) => {
        return axiosInstance.post('couponcourse', body)
    },
    // 1/ accept and activate a coupon to a course isRunning: false => true, isAccept: false => true
    // 2/ activate a coupon to a course (ACCPETED) isRunning: false => true, isAccept: true (true => true)
    acceptAndActiveACouponCourse: (body: CouponCourseBodyPutType) => {
        return axiosInstance.put('/couponcourse/accept-and-activate', body);
    },
    // 3/ accept a coupon to a course (ONLY ACCEPT NOT ACTIVATE) isRunning: false, isAccept: false => true
    acceptACouponCourse: (body: CouponCourseBodyPutType) => {
        return axiosInstance.put('/couponcourse/only-accept', body);
    },
    // 4/ deactivate a coupon to a course (ACCEPTED) isRunning: true => false, isAccept: true
    deactivateACouponCourse: (body: CouponCourseBodyPutType) => {
        return axiosInstance.put('/couponcourse/deactivate', body);
    },
}