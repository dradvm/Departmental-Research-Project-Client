import axiosInstance from "./http";

const enrollmentService = {
  getCourseEnrolled: (
    sort: string,
    categoryId: string | undefined,
    progress: string,
    instructorId: string | undefined,
    search: string = ""
  ) =>
    axiosInstance.get("/enrollment", {
      params: {
        sort,
        categoryId,
        progress,
        instructorId,
        search,
      },
    }),
  updateLastAccessCourse: (courseId: number) =>
    axiosInstance.patch(`/enrollment/lastAccess/${courseId}`),
  getCourseEnrolledCategories: () =>
    axiosInstance.get("/enrollment/categories"),
  getCourseEnrolledInstructors: () =>
    axiosInstance.get("/enrollment/instructors"),
  getCourseEnrolledWithLastStudy: () => axiosInstance.get("/enrollment/home"),
};
export default enrollmentService;
