import { Lecture, LectureStudyProgress } from "./lecture";

export interface Section {
  sectionId: number;
  courseId: number;
  nameSection: string;
  order: number;
  Lecture: Lecture[];
}
export interface SectionStudyProgress extends Section {
  Lecture: LectureStudyProgress[];
}
