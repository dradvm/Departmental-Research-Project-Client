import { CourseAdminQueryType } from "types/course";
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
  getTotalCourseReviews: (courseId: string, rating?: number, search?: string) =>
    axiosInstance.get(`/courses/${courseId}/reviews/total`, {
      params: {
        rating: rating,
        search: search,
      },
    }),
  getOtherCourses: (courseId: number, instructorId: number) =>
    axiosInstance.get(`/courses/${courseId}/others`, {
      params: {
        instructorId,
      },
    }),

  // for admin functions
  getAllCourse: (params: CourseAdminQueryType) => {
    return axiosInstance.get('/courses', { params });
  },

  // accept a course
  acceptCourse: (courseId: number) => {
    return axiosInstance.put(`/courses/accept/${courseId}`);
  }
};

export default courseService;
