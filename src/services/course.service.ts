import axiosInstance from "./http";

const courseService = {
  getCourseById: (courseId: string) =>
    axiosInstance.get(`/courses/${courseId}`),
  getLectureById: (lectureId: string) =>
    axiosInstance.get(`/courses/lectures/${lectureId}`),
  getCourseReviewOverview: (courseId: string) =>
    axiosInstance.get(`/courses/${courseId}/reviews/overview`),
  getCourseReviews: (
    courseId: string,
    rating?: number,
    search?: string,
    cursor?: number
  ) =>
    axiosInstance.get(`/courses/${courseId}/reviews`, {
      params: {
        rating: rating,
        search: search,
        cursor: cursor,
      },
    }),
  getNumberCourseReviews: (
    courseId: string,
    rating?: number,
    search?: string
  ) =>
    axiosInstance.get(`/courses/${courseId}/reviews/number`, {
      params: {
        rating: rating,
        search: search,
      },
    }),
  trackStudyProgress: (lectureId: string, seconds: number = 0) =>
    axiosInstance.post(`/courses/lectures/${lectureId}/study-progress/track`, {
      params: {
        seconds: seconds,
      },
    }),
  toggleStudyProgress: (lectureId: string, isDone: boolean) => {
    axiosInstance.patch(
      `/courses/lectures/${lectureId}/study-progress/toggle-done`,
      {
        params: {
          isDone: isDone,
        },
      }
    );
  },
  getCourseEnrolled: () => axiosInstance.get("courses/enrollment"),
};

export default courseService;
