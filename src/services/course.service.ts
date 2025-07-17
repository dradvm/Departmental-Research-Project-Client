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
  },

  getRevenueByInstructor: (instructorId: number) => {
    return axiosInstance.get(`/courses/revenue/${instructorId}`);
  },

  createFullCourse: (formData: FormData) => {
    return axiosInstance.post('/courses/create-full', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updateFullCourse: (id: number | string, formData: FormData) => {
    return axiosInstance.patch(`/courses/update-full/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getMyCourses: () => {
    return axiosInstance.get('/courses/me');
  },

};

export default courseService;
