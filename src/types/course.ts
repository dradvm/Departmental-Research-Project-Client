import { Lecture } from "types/lecture";
import { Review } from "./review";
import { Section } from "./section";
import { Category } from "./category";
import { Wishlist } from "./wishlist";

export interface CourseCategory {
  courseId: number;
  categoryId: number;
  Category?: Category;
}
export interface Course {
  courseId: number;
  userId: number;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  isPublic: boolean;
  isAccepted: boolean;
  thumbnail: string;
  requirement: string;
  targetAudience: string;
  User?: {
    userId: number;
    name: string;
  };

  Section?: Section[];

  Review?: Review[];
  _count?: {
    Enrollment?: number;
    Review?: number;
  };
  LastLectureStudy?: {
    Lecture: Lecture;
  }[];
  CourseCategory?: CourseCategory[];
  Wishlist?: Wishlist[];
}
