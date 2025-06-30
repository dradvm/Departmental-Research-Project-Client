import { Stack } from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { Button } from "components/Button/Button";
import CourseLoading from "components/CourseDetails/CourseLoading";
import FlexibleSelect, {
  FlexibleSelectWithCheckbox,
} from "components/FlexibleSelect/FlexibleSelect";
import Input from "components/Input/Input";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import qaService from "services/qa.service";
import Question from "types/question";
import QuestionItem from "./QuestionItem";

export default function CourseQuestions({
  setQuestion,
  setIsAsk,
}: {
  setQuestion: (question: Question) => void;
  setIsAsk: (value: boolean) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [questionSelect, setQuestionSelect] = useState<boolean>(true);
  const [questionFilter, setQuestionFilter] = useState<string[]>([]);
  const [questionOrderBy, setQuestionOrderBy] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(true);
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const { courseId, lectureId, lectures } = useLearnContext();
  const handleClearSearch = () => {
    setSearch("");
    setSearchValue("");
    setCursor(undefined);
  };
  const handleSearch = () => {
    if (searchValue !== search.trim().replace(/\s+/g, " ")) {
      setSearchValue(search.trim().replace(/\s+/g, " "));
      setCursor(undefined);
    }
  };

  const handleQuestionSelect = (value: string) => {
    setQuestionSelect(value === "course");
    setCursor(undefined);
  };

  const handleQuestionOrderBy = (value: string) => {
    setQuestionOrderBy(value === "desc");
    setCursor(undefined);
  };

  const handleQuestionFilter = (value: string[]) => {
    setQuestionFilter(value);
    setCursor(undefined);
  };
  const loadQuestions = useCallback(() => {
    const isUser = questionFilter.includes("questionAsked");
    const isNone = questionFilter.includes("questionNoAnswer");
    if (questionSelect) {
      qaService
        .getQuestions(
          parseInt(courseId),
          questionOrderBy,
          searchValue,
          isUser,
          isNone,
          cursor
        )
        .then((res) => {
          setIsLoadingQuestions(false);
          setQuestions((prev) => (cursor ? [...prev, ...res.data] : res.data));
        })
        .catch((err) => console.log(err));
      qaService
        .getTotalQuestions(
          parseInt(courseId),
          questionOrderBy,
          searchValue,
          isUser,
          isNone
        )
        .then((res) => {
          setTotalQuestion(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      qaService
        .getQuestionsLecture(
          parseInt(lectureId),
          questionOrderBy,
          searchValue,
          isUser,
          isNone,
          cursor
        )
        .then((res) => {
          setQuestions((prev) => (cursor ? [...prev, ...res.data] : res.data));
        })
        .catch((err) => console.log(err));
      qaService
        .getTotalQuestionsLecture(
          parseInt(lectureId),
          questionOrderBy,
          searchValue,
          isUser,
          isNone
        )
        .then((res) => {
          setIsLoadingQuestions(false);
          setTotalQuestion(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [
    courseId,
    questionFilter,
    questionOrderBy,
    searchValue,
    questionSelect,
    lectureId,
    cursor,
  ]);
  const handleLoadMore = () => {
    setCursor(questions[questions.length - 1].questionId);
  };

  useEffect(() => {
    setIsLoading(false);
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(() => {
    setIsLoadingQuestions(true);
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    courseId,
    questionFilter,
    questionOrderBy,
    searchValue,
    questionSelect,
    lectureId,
  ]);
  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);
  return (
    <>
      {isLoading ? (
        <CourseLoading />
      ) : (
        <Stack className="gap-y-5 w-[800px]">
          <div
            className="font-bold text-gray-700 hover:text-black cursor-pointer flex"
            onClick={() => setIsAsk(true)}
          >
            <div className="hover:bg-gray-200 text-sm">Đặt câu hỏi mới</div>
          </div>
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Tìm kiếm tất cả các câu hỏi trong khoá học"
              value={search}
              handleValue={setSearch}
            />
            <div className="flex">
              {search.length > 0 && (
                <Button
                  variant="filled"
                  className="px-4 py-2"
                  onClick={handleClearSearch}
                >
                  <X size={16} />
                </Button>
              )}
              <Button
                variant="primary"
                className="px-4 py-2"
                onClick={handleSearch}
              >
                <Search size={16} />
              </Button>
            </div>
          </div>
          <Stack className="gap-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-[200px]">
                <div className="font-bold text-sm">Bộ lọc:</div>
              </div>
              <div className="w-[120px]">
                <div className="font-bold text-sm">Sắp xếp:</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FlexibleSelect
                minWidth={200}
                value={questionSelect ? "course" : "lecture"}
                handleValue={handleQuestionSelect}
                items={[
                  { value: "course", text: "Tất cả các bài giảng" },
                  { value: "lecture", text: "Bài giảng hiện tại" },
                ]}
              />
              <FlexibleSelect
                value={questionOrderBy ? "desc" : "asc"}
                handleValue={handleQuestionOrderBy}
                items={[
                  { value: "desc", text: "Sắp xếp theo câu hỏi mới nhất" },
                  { value: "asc", text: "Sắp xếp theo câu hỏi lâu nhất" },
                ]}
              />
              <FlexibleSelectWithCheckbox
                value={questionFilter}
                handleValue={handleQuestionFilter}
                items={[
                  {
                    value: "questionAsked",
                    text: "Câu hỏi tôi đã hỏi",
                  },
                  {
                    value: "questionNoAnswer",
                    text: "Câu hỏi không có câu trả lời",
                  },
                ]}
                handleRenderValue={() => {
                  return "Lọc câu hỏi";
                }}
              />
            </div>
          </Stack>
          <Stack className="gap-y-3">
            {isLoadingQuestions ? (
              <CourseLoading />
            ) : (
              <>
                {totalQuestion > 0 ? (
                  <>
                    <div className="font-medium flex items-center space-x-2 text-lg">
                      <div>Toàn bộ câu hỏi trong khoá học này</div>
                      <span className="text-gray-500">({totalQuestion})</span>
                    </div>
                    <Stack>
                      {questions.map((question) => (
                        <QuestionItem
                          key={question.questionId}
                          question={question}
                          lectures={lectures}
                          courseId={courseId}
                          setCursor={setCursor}
                          setQuestion={setQuestion}
                        />
                      ))}
                    </Stack>
                    {questions.length < totalQuestion && (
                      <Button variant="primary" onClick={handleLoadMore}>
                        Xem thêm
                      </Button>
                    )}
                  </>
                ) : (
                  <Stack>
                    <div className="font-medium text-lg">Không có kết quả</div>
                    <div className="">
                      Thử tìm kiếm các từ khóa khác nhau hoặc điều chỉnh bộ lọc
                      của bạn
                    </div>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
