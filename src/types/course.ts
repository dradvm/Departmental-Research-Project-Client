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

// 4 following interfaces are used for admin
interface LectureAdminUI {
  lectureId: string;
  lectureName: string;
  time: string;
}

interface SectionAdminUI {
  sectionId: string;
  sectionName: string;
  lectures: LectureAdminUI[];
}

export interface CourseAdminUI {
  courseId: string;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  isPublic: boolean;
  isAccepted: boolean;
  thumbnail: string;
  requirement: string;
  targetAudience: string;
  totalTime: string;
  lectureCount: string;
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherBiography: string;
  sections: SectionAdminUI[];
}

export interface CourseResAdminUI {
  courses: CourseAdminUI[];
  length: number;
}

// user for PostFilter component
export interface CourseAdminFilter {
  minPrice?: string,
  maxPrice?: string,
  minLectureCount?: string,
  maxLectureCount?: string,
  minTime?: string,
  maxTime?: string,
  searchText?: string
}

// use for courseService: get all course
export interface CourseAdminQueryType {
  limit: number;
  skip: number;
  minPrice?: number,
  maxPrice?: number,
  minLectureCount?: number,
  maxLectureCount?: number,
  minTime?: number,
  maxTime?: number,
  searchText?: string
}