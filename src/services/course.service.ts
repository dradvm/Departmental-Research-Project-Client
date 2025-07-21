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
  getReviewByCourseAndUser: (courseId: string) =>
    axiosInstance.get(`/courses/${courseId}/review`),
  createReview: (courseId: number, rating: number, review: string) =>
    axiosInstance.post(`/courses/reviews`, {
      courseId,
      review,
      rating,
    }),
  updateReview: (reviewId: number, rating: number, review: string) =>
    axiosInstance.patch(`/courses/reviews/${reviewId}`, {
      review,
      rating,
    }),
  deleteReview: (reviewId: number) =>
    axiosInstance.delete(`/courses/reviews/${reviewId}`),
  // for admin functions
  getAllCourse: (params: CourseAdminQueryType) => {
    return axiosInstance.get("/courses", { params });
  },

  // accept a course
  acceptCourse: (courseId: number) => {
    return axiosInstance.put(`/courses/accept/${courseId}`);
  },

  getRevenueByInstructor: (instructorId: number) => {
    return axiosInstance.get(`/courses/revenue/${instructorId}`);
  },

  createFullCourse: (formData: FormData) => {
    return axiosInstance.post("/courses/create-full", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateFullCourse: (id: number | string, formData: FormData) => {
    return axiosInstance.patch(`/courses/update-full/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getMyCourses: () => {
    return axiosInstance.get("/courses/me");
  },
  getCoursesByCategoryPublic: (categoryId: number) =>
    axiosInstance.get(`/courses/category/${categoryId}/public`),
  getCoursesByCategoryPrivate: (categoryId: number) =>
    axiosInstance.get(`/courses/category/${categoryId}/private`),
  getCategories: () => axiosInstance.get("/courses/categories"),

  getCoursePrice: (courseId: number) =>
    axiosInstance.get(`/courses/${courseId}/price`),
  getOtherCourseByUserPublic: (userId: number, courseId: number) =>
    axiosInstance.get(`/courses/other-courses/${courseId}/public`, {
      params: {
        userId,
      },
    }),

  getOtherCourseByUserPrivate: (userId: number, courseId: number) =>
    axiosInstance.get(`/courses/other-courses/${courseId}/private`, {
      params: {
        userId,
      },
    }),
  searchCoursePublic: (
    search?: string,
    rating?: number,
    categoryId?: number,
    priceMin?: number,
    priceMax?: number,
    durationMin?: number,
    durationMax?: number
  ) =>
    axiosInstance.get("/courses/search/public", {
      params: {
        search,
        rating,
        categoryId,
        priceMin,
        priceMax,
        durationMin,
        durationMax,
      },
    }),
  searchCoursePrivate: (
    search?: string,
    rating?: number,
    categoryId?: number,
    priceMin?: number,
    priceMax?: number,
    durationMin?: number,
    durationMax?: number
  ) =>
    axiosInstance.get("/courses/search/private", {
      params: {
        search,
        rating,
        categoryId,
        priceMin,
        priceMax,
        durationMin,
        durationMax,
      },
    }),
};

export default courseService;
