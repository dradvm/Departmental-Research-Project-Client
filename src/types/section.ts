import { Lecture } from "./lecture";

export interface Section {
  sectionId: number;
  courseId: number;
  nameSection: string;
  order: number;
  Lecture: Lecture[];
}
