import { Review } from "./review";
import { Section } from "./section";

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
    Review?: number;
  };
}
