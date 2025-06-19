import { Section } from "./section";

export interface Course {
  courseId: number;
  userId: number;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  isPublic: boolean;
  isAccepted: boolean;
  thumbnail: string;
  requirement: string;
  targetAudience: string;
}
export interface CourseDetail extends Course {
  Section: Section[];
}
