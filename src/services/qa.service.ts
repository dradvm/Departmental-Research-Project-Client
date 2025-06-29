import axiosInstance, { createAxios } from "./http";

const formDataAxiosInstance = createAxios("/questions", "multipart/form-data");

const qaService = {
  getQuestions: (
    courseId: number,
    orderBy: boolean = true,
    search: string = "",
    isUser: boolean = false,
    isNone: boolean = false,
    cursor?: number
  ) =>
    axiosInstance.get(`/questions/${courseId}`, {
      params: {
        orderBy,
        search,
        isUser,
        isNone,
        cursor,
      },
    }),
  getQuestionsLecture: (
    lectureId: number,
    orderBy: boolean = true,
    search: string = "",
    isUser: boolean = false,
    isNone: boolean = false,
    cursor?: number
  ) =>
    axiosInstance.get(`/questions/lecture/${lectureId}`, {
      params: {
        orderBy,
        search,
        isUser,
        isNone,
        cursor,
      },
    }),
  getTotalQuestions: (
    courseId: number,
    orderBy: boolean = true,
    search: string = "",
    isUser: boolean = false,
    isNone: boolean = false
  ) =>
    axiosInstance.get(`/questions/total/${courseId}`, {
      params: {
        orderBy,
        search,
        isUser,
        isNone,
      },
    }),
  getTotalQuestionsLecture: (
    lectureId: number,
    orderBy: boolean = true,
    search: string = "",
    isUser: boolean = false,
    isNone: boolean = false
  ) =>
    axiosInstance.get(`/questions/total/lecture/${lectureId}`, {
      params: {
        orderBy,
        search,
        isUser,
        isNone,
      },
    }),
  getAnswers: (questionId: number) =>
    axiosInstance.get(`questions/${questionId}/answers`),
  addQuestion: (formData: FormData) => formDataAxiosInstance.post("", formData),
  updateQuestion: (formData: FormData) =>
    formDataAxiosInstance.patch("", formData),
};

export default qaService;
