import axiosInstance from "./http";

const lectureService = {
  getLectureById: (id: string) => axiosInstance.get(`/courses/lecture/${id}`),
};

export default lectureService;
