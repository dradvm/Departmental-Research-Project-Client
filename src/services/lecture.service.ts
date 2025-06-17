import axiosInstance from "./http";

const lectureService = {
  getLectureById: (id: string) => axiosInstance.get(`/courses/lectures/${id}`),
};

export default lectureService;
