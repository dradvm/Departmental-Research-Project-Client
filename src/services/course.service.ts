import createAxios from "./http";

const axios = createAxios("/courses");
const courseService = {
  getAllCourse: () => axios.get(""),
  getCourseById: (id: string) => axios.get(`/${id}`),
};

export default courseService;
