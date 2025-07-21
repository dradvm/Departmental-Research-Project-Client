import axiosInstance from "./http";

const messageService = {
  getThreads: () => axiosInstance.get("/messages/threads"),
  getThread: (otherUserId: number) =>
    axiosInstance.get(`/messages/threads/${otherUserId}`),
  getMessages: (otherUserId: number) =>
    axiosInstance.get(`/messages/${otherUserId}`),
  countNotSeeenMessages: () => axiosInstance.get("/messages/count-not-seen"),
};
export default messageService;
