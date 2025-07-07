import { Course } from "./course";

export interface Enrollment {
  userId: number;
  courseId: number;
  dateRegister: Date;
  finishStatus: boolean;
  progress: number;
  Course: Course;
}
