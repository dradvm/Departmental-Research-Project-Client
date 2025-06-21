import { StudyProgress } from "types/study-progress";
export interface Lecture {
  lectureId: number;
  sectionId: number;
  nameLecture: string;
  video: string;
  time: number;
  order: number;
}

export interface LectureStudyProgress extends Lecture {
  StudyProgress: StudyProgress[];
}
