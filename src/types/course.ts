import { Review } from "./review";
import { Section, SectionStudyProgress } from "./section";

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
  User: {
    userId: number;
    name: string;
  };
}

export interface CourseDetail extends Course {
  Section: Section[];
}

export interface CourseStudyProgress extends CourseDetail {
  Section: SectionStudyProgress[];
}

export interface CourseEnrolled extends CourseStudyProgress {
  Review: Review[];
}
