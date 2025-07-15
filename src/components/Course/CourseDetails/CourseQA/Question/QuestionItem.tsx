import { Stack } from "@mui/material";
import MyAvatar from "components/Avatar/Avatar";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Lecture } from "types/lecture";
import Question from "types/question";
import { getTimeAgo } from "utils/time";

export default function QuestionItem({
  question,
  lectures,
  courseId,
  setCursor,
  setQuestion,
}: {
  question: Question;
  lectures: Lecture[];
  courseId: string;
  setCursor: (cursor: number | undefined) => void;
  setQuestion: (question: Question) => void;
}) {
  const router = useRouter();
  const handleLinkLecture = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCursor(undefined);
    router.push(`/course/${courseId}/learn/lecture/${question.lectureId}`);
  };
  const handleQuestion = () => {
    setQuestion(question);
  };
  const sanitizeHTMLContent = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    div
      .querySelectorAll("ol, ul, code, pre, table, blockquote")
      .forEach((el) => {
        el.remove();
      });

    return div.innerText.trim().replace(/\s+/g, " ");
  };
  return (
    <div
      className="flex space-x-3 px-10 py-5 hover:bg-gray-100 cursor-pointer"
      onClick={handleQuestion}
    >
      <div className="">
        <MyAvatar user={question.User} />
      </div>
      <div className="grow">
        <Stack className="gap-y-7">
          <div className="flex space-x-2">
            <Stack className="grow">
              <div className="font-bold truncate w-[550px]">
                {question.questionTitle}
              </div>
              <div
                className="block text-sm truncate w-[550px] text-gray-900"
                dangerouslySetInnerHTML={{
                  __html:
                    question.QuestionImage.map(() => "<b>[Hình ảnh]</b>").join(
                      ""
                    ) + sanitizeHTMLContent(question.questionContent),
                }}
              ></div>
            </Stack>
            <Stack className="w-12">
              <div className="flex items-center space-x-1 text-black ">
                <div className="font-bold text-sm">
                  {question._count.Answer}
                </div>
                <div>
                  <MessageSquare size={20} />
                </div>
              </div>
            </Stack>
          </div>
          <div className="flex items-center space-x-1">
            <div className="underline text-indigo-600 hover:text-indigo-800 text-xs font-thin">
              {!question.User.isDeleted && question.User.isActive
                ? question.User.name
                : "Tài khoản người dùng"}
            </div>
            <span className="text-indigo-600">{" · "}</span>
            <div
              onClick={(e) => handleLinkLecture(e)}
              className="text-indigo-600 hover:text-indigo-800 text-xs font-thin"
            >
              Bài giảng số{" "}
              {lectures.findIndex(
                (lecture) => lecture.lectureId === question.lectureId
              ) + 1}
            </div>
            <span className="">{" · "}</span>
            <div className="text-xs font-thin">
              {getTimeAgo(question.createdAt)}
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
}
