import { Section } from "./section";

export interface CourseDetail {
  idCourse: number;
  idUser: number;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  isPublic: boolean;
  isAccepted: boolean;
  thumbnail: string;
  requirement: string;
  targetAudience: string;
  Section: Section[];
}
