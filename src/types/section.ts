import { Lecture } from "./lecture";

export interface Section {
  idSection: number;
  idCourse: number;
  nameSection: string;
  Lecture: Lecture[];
}
