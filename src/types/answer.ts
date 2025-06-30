import { Image } from "./image";

interface Answer {
  answerId: number;
  userId: number;
  answerContent: string;
  questionId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  User: {
    name: string;
    img: string | null;
    isActive: boolean;
    isDeleted: boolean;
  };
  AnswerImage: Image[];
}
export default Answer;
