import { Image } from "./image";

interface Question {
  questionId: number;
  userId: number;
  lectureId: number;
  createdAt: string;
  updatedAt: string;
  questionTitle: string;
  questionContent: string;
  User: {
    name: string;
    img: string | null;
    isActive: boolean;
    isDeleted: boolean;
  };
  QuestionImage: Image[];
  _count: {
    Answer: number;
  };
}
export default Question;
