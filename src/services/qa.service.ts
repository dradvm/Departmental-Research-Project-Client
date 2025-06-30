import axiosInstance, { createAxios } from "./http";

const formDataAxiosInstance = createAxios("/qa", "multipart/form-data");

const qaService = {
  getQuestions: (
    courseId: number,
    orderBy: boolean = true,
    search: string = "",
    isUser: boolean = false,
    isNone: boolean = false,
    cursor?: number
  ) =>
    axiosInstance.get(`qa/questions/${courseId}`, {
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
    axiosInstance.get(`qa/questions/lecture/${lectureId}`, {
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
    axiosInstance.get(`qa/questions/total/${courseId}`, {
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
    axiosInstance.get(`qa/questions/total/lecture/${lectureId}`, {
      params: {
        orderBy,
        search,
        isUser,
        isNone,
      },
    }),
  getAnswers: (questionId: number) =>
    axiosInstance.get(`qa/questions/${questionId}/answers`),
  addQuestion: (formData: FormData) =>
    formDataAxiosInstance.post("questions", formData),
  updateQuestion: (formData: FormData) =>
    formDataAxiosInstance.patch("questions", formData),
  deleteQuestion: (questionId: number) =>
    axiosInstance.delete(`qa/questions/${questionId}`),
  addAnswer: (formData: FormData) =>
    formDataAxiosInstance.post("answers", formData),
  updateAnswer: (formData: FormData) =>
    formDataAxiosInstance.patch("answers", formData),
  deleteAnswer: (answerId: number) =>
    axiosInstance.delete(`qa/answers/${answerId}`),
};

export default qaService;
