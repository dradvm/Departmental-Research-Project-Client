import axiosInstance from "./http";

const studyProgressService = {
  getTrackStudyProgress: (lectureId: string) =>
    axiosInstance.get(`/study-progress/track-lecture/${lectureId}`),
  trackStudyProgress: (lectureId: string, seconds: number = 0) =>
    axiosInstance.post(`/study-progress/track-lecture/${lectureId}`, {
      seconds: seconds,
    }),
  toggleStudyProgress: (lectureId: string, isDone: boolean) =>
    axiosInstance.patch(`/study-progress/toggle-done/${lectureId}`, {
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
