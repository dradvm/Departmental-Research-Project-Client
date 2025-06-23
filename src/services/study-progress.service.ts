import axiosInstance from "./http";

const studyProgressService = {
  getCourseStudyProgress: (courseId: number) =>
    axiosInstance.get(`/study-progress/course/${courseId}`),
  getTrackStudyProgress: (lectureId: string) =>
    axiosInstance.get(`/study-progress/track-lecture/${lectureId}`),
  trackStudyProgress: (lectureId: string, seconds: number = 0) =>
    axiosInstance.post(`/study-progress/track-lecture/${lectureId}`, {
      seconds: Math.floor(seconds),
    }),
  toggleStudyProgress: (lectureId: number, isDone: boolean) =>
    axiosInstance.patch(`/study-progress/toggle-lecture/${lectureId}`, {
      isDone: isDone,
    }),
  getLastStudyLecture: (courseId: number) =>
    axiosInstance.get(`/study-progress/last-lecture/${courseId}`),
  trackLastStudyLecture: (courseId: string, lectureId: number) =>
    axiosInstance.post(`/study-progress/last-lecture/${courseId}`, {
      lectureId: lectureId,
    }),
};

export default studyProgressService;
