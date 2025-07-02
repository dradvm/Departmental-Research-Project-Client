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
    axiosInstance.patch(`/enrollment/${courseId}`),
  getCourseEnrolledCategories: () =>
    axiosInstance.get("/enrollment/categories"),
  getCourseEnrolledInstructors: () =>
    axiosInstance.get("/enrollment/instructors"),
};
export default enrollmentService;
