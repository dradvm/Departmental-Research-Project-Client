import { Section } from "./section";
import { StudyProgress } from "types/study-progress";
export interface Lecture {
  lectureId: number;
  sectionId: number;
  nameLecture: string;
  video: string;
  time: number;
  order: number;
  StudyProgress?: StudyProgress[];
  Section?: Section;
}
