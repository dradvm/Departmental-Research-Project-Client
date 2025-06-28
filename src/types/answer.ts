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
}
export default Answer;
