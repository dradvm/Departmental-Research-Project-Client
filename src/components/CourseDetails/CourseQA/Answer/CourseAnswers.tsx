import { Menu, MenuItem, Stack } from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { Button } from "components/Button/Button";
import { EllipsisVertical, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import qaService from "services/qa.service";
import Answer from "types/answer";
import Question from "types/question";
import { getInitials } from "utils/text";
import { getTimeAgo } from "utils/time";
import AnswerItem from "./AnswerItem";
import AnswerForm from "./AnswerForm";
import QuestionForm from "../Question/QuestionForm";
import { useSession } from "next-auth/react";

export default function CourseAnswers({
  question,
  setQuestion,
}: {
  question: Question;
  setQuestion: (question: Question | null) => void;
}) {
  const { lectures, courseId } = useLearnContext();
  const [answers, setAnswers] = useState<Answer[]>([]);

  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOption, setIsOption] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const handleOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOption(true);
  };

  const handleIsUpdate = () => {
    setIsUpdate(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOption(false);
  };

  const backToQuestions = () => {
    setQuestion(null);
  };

  const handleLinkLecture = () => {
    router.push(`/course/${courseId}/learn/lecture/${question.lectureId}`);
  };

  const handleSaveQuestion = (formData: FormData) => {
    qaService
      .updateQuestion(formData)
      .then((res) => {
        console.log(res);
        setQuestion(res.data);
        setIsUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    setIsUpdate(false);
  };

  const handleSaveAnswer = (
    formData: FormData,
    handleAfterSave: () => void,
    isUpdate: boolean
  ) => {
    if (!isUpdate) {
      qaService
        .addAnswer(formData)
        .then((res) => {
          console.log(res);
          loadAnswers();
          handleAfterSave();
        })
        .catch((err) => console.log(err));
    } else {
      qaService
        .updateAnswer(formData)
        .then((res) => {
          console.log(res);
          loadAnswers();
          handleAfterSave();
        })
        .catch((err) => console.log(err));
    }
  };
  const loadAnswers = useCallback(() => {
    qaService
      .getAnswers(question.questionId)
      .then((res) => setAnswers(res.data))
      .catch((err) => console.log(err));
  }, [question.questionId]);
  useEffect(() => {
    loadAnswers();
  }, [loadAnswers]);

  const handleDeleleQuestion = () => {
    setIsDisabled(true);
    qaService
      .deleteQuestion(question.questionId)
      .then(() => {
        setIsDisabled(false);
        setQuestion(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack className="gap-y-5 w-[800px]">
      <div>
        <Button variant="primary" size="sm" onClick={backToQuestions}>
          Quay lại tất cả câu hỏi
        </Button>
      </div>
      <div className="flex space-x-3 ">
        <div className="rounded-full w-12 h-12 overflow-hidden flex-shrink-0">
          {!question.User.isDeleted && question.User.isActive ? (
            question.User.img ? (
              <Image
                src={question.User.img}
                alt="image"
                width={64}
                height={64}
              />
            ) : (
              <div className="bg-black h-full w-full flex items-center justify-around">
                <div className="text-white font-medium text-lg">
                  {getInitials(question.User.name)}
                </div>
              </div>
            )
          ) : (
            <div className="bg-black h-full w-full flex items-center justify-around">
              <User size={20} color="white" />
            </div>
          )}
        </div>
        <Stack className="gap-y-3 flex w-[750px]">
          <Stack>
            {!isUpdate && (
              <div className="font-medium text-lg">
                {question.questionTitle}
              </div>
            )}
            <div className="flex items-center space-x-1">
              <div className="underline text-indigo-600 hover:text-indigo-800 text-xs font-thin">
                {!question.User.isDeleted && question.User.isActive
                  ? question.User.name
                  : "Tài khoản người dùng"}
              </div>
              <span className="text-indigo-600">{" · "}</span>
              <div
                onClick={handleLinkLecture}
                className="text-indigo-600 hover:text-indigo-800 text-xs font-thin cursor-pointer"
              >
                Bài giảng số{" "}
                {lectures.findIndex(
                  (lecture) => lecture.lectureId === question.lectureId
                ) + 1}
              </div>
              <span className="">{" · "}</span>
              <div className="text-xs font-thin cursor-pointer">
                {getTimeAgo(question.createdAt)}
              </div>
            </div>
          </Stack>
          <Stack className="gap-y-1">
            {!isUpdate ? (
              <>
                <div
                  dangerouslySetInnerHTML={{ __html: question.questionContent }}
                ></div>
                {question.QuestionImage.map((image, index) => (
                  <div key={index} className="flex">
                    <Image
                      src={image.secureUrl}
                      alt={`question-image-${index}`}
                      unoptimized
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-auto h-auto max-w-full  object-scale-down"
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="">
                <QuestionForm
                  isUpdate={true}
                  handleSave={handleSaveQuestion}
                  title={question.questionTitle}
                  content={question.questionContent}
                  lectureId={question.lectureId.toString()}
                  oldImages={question.QuestionImage}
                  questionId={question.questionId.toString()}
                  handleCancel={handleCancel}
                />
              </div>
            )}
          </Stack>
        </Stack>

        {!isUpdate && question.userId === session?.user.userId && (
          <div className="flex-shrink-0">
            <div
              className="relative cursor-pointer py-1 rounded hover:bg-gray-300"
              onClick={handleOption}
            >
              <EllipsisVertical size={16} />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={isOption}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                sx: {
                  "& .MuiMenuItem-root": {
                    fontSize: "0.875rem",
                    px: 2,
                    py: 1,
                  },
                },
              }}
            >
              <MenuItem onClick={handleIsUpdate} disabled={isDisabled}>
                Chỉnh sửa
              </MenuItem>
              <MenuItem onClick={handleDeleleQuestion} disabled={isDisabled}>
                Xoá
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <div className="font-medium">{answers.length} hồi đáp</div>
      <Stack className="gap-y-5">
        {answers.length > 0 &&
          answers.map((answer) => (
            <AnswerItem
              key={answer.answerId}
              answer={answer}
              handleSave={handleSaveAnswer}
              loadAnswers={loadAnswers}
            />
          ))}
      </Stack>
      <div className="mt-5 flex justify-around">
        <AnswerForm
          handleSave={handleSaveAnswer}
          questionId={question.questionId.toString()}
        />
      </div>
    </Stack>
  );
}
