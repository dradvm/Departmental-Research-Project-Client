import { CourseEnrolled } from "./course";

export interface Enrollment {
  userId: number;
  courseId: number;
  dateRegister: Date;
  finishStatus: boolean;
  progress: number;
  Course: CourseEnrolled;
}
