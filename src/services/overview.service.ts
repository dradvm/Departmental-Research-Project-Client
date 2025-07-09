import axiosInstance from "./http"

export const overviewService = {
    getRevenueByMonth: () => {
        return axiosInstance.get("/overview/revenue-by-month");
    },
    getBestSellerCourses: () => {
        return axiosInstance.get("/overview/best-seller-course");
    }
}