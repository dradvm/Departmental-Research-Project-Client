import { Stack } from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { Button } from "components/Button/Button";
import { useState } from "react";
import qaService from "services/qa.service";
import Question from "types/question";
import QuestionForm from "./CourseQA/Question/QuestionForm";
import CourseAnswers from "./CourseQA/Answer/CourseAnswers";
import CourseQuestions from "./CourseQA/Question/CourseQuestions";

function AskQuestion({
  setIsAsk,
  lectureId,
}: {
  setIsAsk: (value: boolean) => void;
  lectureId: string;
}) {
  const handleSave = (formData: FormData) => {
    return qaService
      .addQuestion(formData)
      .then(() => {
        setIsAsk(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack className="gap-y-5 w-[750px]">
      <div>
        <Button variant="primary" size="sm" onClick={() => setIsAsk(false)}>
          Quay lại tất cả câu hỏi
        </Button>
      </div>
      <QuestionForm handleSave={handleSave} lectureId={lectureId} />
    </Stack>
  );
}

export default function CourseQA() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isAsk, setIsAsk] = useState<boolean>(false);
  const { lectureId } = useLearnContext();
  return (
    <div className="flex justify-around">
      {isAsk ? (
        <AskQuestion setIsAsk={setIsAsk} lectureId={lectureId} />
      ) : question === null ? (
        <CourseQuestions setQuestion={setQuestion} setIsAsk={setIsAsk} />
      ) : (
        <CourseAnswers question={question} setQuestion={setQuestion} />
      )}
    </div>
  );
}
