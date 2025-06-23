import axiosInstance from "./http";

const enrollmentService = {
  getCourseEnrolled: () => axiosInstance.get("/enrollment"),
};
export default enrollmentService;
