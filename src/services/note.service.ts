import axiosInstance from "./http";

const noteService = {
  getNotes: (courseId: number) =>
    axiosInstance.get("/notes", {
      params: {
        courseId,
      },
    }),
  getNote: (noteId: number) => axiosInstance.get(`/notes/${noteId}`),
  addNote: (timeNote: number, note: string, lectureId: number) =>
    axiosInstance.post("/notes", {
      timeNote,
      note,
      lectureId,
    }),
  updateNote: (noteId: number, note: string) =>
    axiosInstance.patch("/notes", {
      noteId,
      note,
    }),
  deleteNote: (noteId: number) => axiosInstance.delete(`/notes/${noteId}`),
};
export default noteService;
