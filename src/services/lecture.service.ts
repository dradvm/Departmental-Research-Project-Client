import createAxios from "./http";

const axios = createAxios("/courses/lectures");
const lectureService = {
  getLectureById: (id: string) => axios.get(`/${id}`),
};

export default lectureService;
