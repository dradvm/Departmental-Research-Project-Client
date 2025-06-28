import { Stack } from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { Button } from "components/Button/Button";
import FlexibleSelect, {
  FlexibleSelectWithCheckbox,
} from "components/FlexibleSelect/FlexibleSelect";
import Input from "components/Input/Input";
import { MessageSquare, Search, User, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import qaService from "services/qa.service";
import { LectureStudyProgress } from "types/lecture";
import Question from "types/question";
import { getInitials } from "utils/text";
import { getTimeAgo } from "utils/time";
import CourseLoading from "./CourseLoading";
import Answer from "types/answer";
import Editor from "components/Editor/Editor";

function QuestionItem({
  question,
  lectures,
  courseId,
  setCursor,
  setQuestion,
}: {
  question: Question;
  lectures: LectureStudyProgress[];
  courseId: string;
  setCursor: (cursor: number | undefined) => void;
  setQuestion: (question: Question) => void;
}) {
  const router = useRouter();

  const handleLinkLecture = () => {
    setCursor(undefined);
    router.push(`/course/${courseId}/learn/lecture/${question.lectureId}`);
  };
  const handleQuestion = () => {
    setQuestion(question);
  };

  return (
    <div
      className="flex space-x-3 px-10 py-5 hover:bg-gray-100 cursor-pointer"
      onClick={handleQuestion}
    >
      <div className="">
        <div className="rounded-full w-8 h-8 overflow-hidden">
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
      </div>
      <div className="grow">
        <Stack className="gap-y-7">
          <div className="flex space-x-2">
            <Stack className="grow">
              <div className="font-bold truncate w-[550px]">
                {question.questionTitle}
              </div>
              <div className="block text-sm truncate w-[550px] text-gray-900">
                {question.questionContent}
              </div>
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
              onClick={handleLinkLecture}
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

function CourseQuestions({
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
        <Stack className="gap-y-5">
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

function AnswerItem({ answer }: { answer: Answer }) {
  return (
    <div className="flex space-x-3">
      <div className="rounded-full w-12 h-12 overflow-hidden">
        {!answer.User.isDeleted && answer.User.isActive ? (
          answer.User.img ? (
            <Image src={answer.User.img} alt="image" width={64} height={64} />
          ) : (
            <div className="bg-black h-full w-full flex items-center justify-around">
              <div className="text-white font-medium text-lg">
                {getInitials(answer.User.name)}
              </div>
            </div>
          )
        ) : (
          <div className="bg-black h-full w-full flex items-center justify-around">
            <User size={20} color="white" />
          </div>
        )}
      </div>
      <Stack className="gap-y-1">
        <div className="font-medium flex space-x-3">
          <div className="underline text-indigo-600">
            {!answer.User.isDeleted && answer.User.isActive
              ? answer.User.name
              : "Tài khoản người dùng"}
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          {getTimeAgo(answer.createdAt)}
        </div>
        <div>{answer.answerContent}</div>
      </Stack>
    </div>
  );
}

function CourseAnswers({
  question,
  setQuestion,
}: {
  question: Question;
  setQuestion: (question: Question | null) => void;
}) {
  const { lectures, courseId } = useLearnContext();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const backToQuestions = () => {
    setQuestion(null);
  };
  const router = useRouter();

  const handleLinkLecture = () => {
    router.push(`/course/${courseId}/learn/lecture/${question.lectureId}`);
  };

  useEffect(() => {
    qaService
      .getAnswers(question.questionId)
      .then((res) => setAnswers(res.data))
      .catch((err) => console.log(err));
  }, [question]);

  return (
    <Stack className="gap-y-5">
      <div>
        <Button variant="primary" size="sm" onClick={backToQuestions}>
          Quay lại tất cả câu hỏi
        </Button>
      </div>
      <div className="flex space-x-3">
        <div className="rounded-full w-12 h-12 overflow-hidden">
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
        <Stack>
          <div className="font-medium text-lg">{question.questionTitle}</div>
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
      </div>
      <Stack className="gap-y-3 mt-5 px-6">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <AnswerItem key={answer.answerId} answer={answer} />
          ))
        ) : (
          <div>k có</div>
        )}
      </Stack>
    </Stack>
  );
}

function AskQuestion({
  setIsAsk,
  lectureId,
}: {
  setIsAsk: (value: boolean) => void;
  lectureId: number;
}) {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionContent, setQuestionContent] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const maxLength = 5000;
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleSave = () => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("questionTitle", questionTitle);
    formData.append("questionContent", questionContent);
    formData.append("lectureId", lectureId.toString());
    qaService
      .addQuestion(formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remainingSlots = 3 - images.length;
    const filesArray = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots);

    setImages((prev) => [...prev, ...filesArray]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack className="gap-y-5">
      <div>
        <Button variant="primary" size="sm" onClick={() => setIsAsk(false)}>
          Quay lại tất cả câu hỏi
        </Button>
      </div>
      <Stack className="gap-y-3">
        <Stack className="gap-y-2">
          <div className="font-medium">Tiêu đề hoặc tóm tắt</div>
          <Input
            value={questionTitle}
            handleValue={setQuestionTitle}
            placeholder="Ví dụ: vì sao chúng ta sử dụng giá trị này?"
          />
        </Stack>
        <Stack className="gap-y-2">
          <div className="font-medium">Chi tiết (tuỳ chọn)</div>
          <div className="flex justify-around">
            <Editor
              value={questionContent}
              setValue={setQuestionContent}
              isDisplay={true}
              isDisabled={isDisabled}
              maxLength={maxLength}
              minLength={0}
              isButton={false}
              warningMessageMaxLength={`Bạn không thể lưu nội dung dài hơn ${maxLength}`}
            />
          </div>
          <div className="">
            <div className="grid grid-cols-3 gap-5 mb-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative border rounded overflow-hidden"
                >
                  <Image
                    src={URL.createObjectURL(img)}
                    width={100}
                    height={100}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div
              className="border-2 border-dashed border-indigo-600 rounded p-14 text-center cursor-pointer hover:bg-gray-50 transition"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <p className="text-gray-600">
                Kéo thả hoặc bấm để chọn ảnh (tối đa 3 ảnh)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Stack>
        <Button
          className="mt-3"
          variant="filled"
          size="lg"
          disabled={questionTitle.trim().length === 0}
          onClick={handleSave}
        >
          Xuất bản
        </Button>
      </Stack>
    </Stack>
  );
}

export default function CourseQA() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isAsk, setIsAsk] = useState<boolean>(true);
  const { lectureId } = useLearnContext();
  return (
    <div className="px-28 py-8">
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
