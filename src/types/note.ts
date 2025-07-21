import { Lecture } from "./lecture";

export type Note = {
  noteId: number;
  timeNote: number;
  note: string;
  userId: number;
  lectureId: number;
  Lecture: Lecture;
};
