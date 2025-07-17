import axiosInstance from "./http";

const studyRemindService = {
  getAll: () => axiosInstance.get("/study-remind"),
  addStudyRemind: (body: {
    code: string;
    summary: string;
    description?: string;
    start: string;
    end: string;
    frequency: string;
    daysOfWeek?: string[];
    timeZone: string;
  }) => axiosInstance.post("/study-remind", body),
  resyncStudyRemind: (studyRemindId: number, code: string) =>
    axiosInstance.post(`/study-remind/sync`, {
      studyRemindId,
      code,
    }),
  deleteStudyRemind: (studyRemindId: number, code: string) =>
    axiosInstance.delete(`/study-remind/${studyRemindId}`, {
      params: {
        code,
      },
    }),
};
export default studyRemindService;
