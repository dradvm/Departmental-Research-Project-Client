import { Course } from "./course";

export interface Wishlist {
  userId: number;
  courseId: number;
  Course?: Course;
}
