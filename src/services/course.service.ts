import axiosInstance from "./http";

const courseService = {
  getAllCourse: () => axiosInstance.get("/courses"),
  getCourseById: (id: string) => axiosInstance.get(`/courses/${id}`),
};

export default courseService;
