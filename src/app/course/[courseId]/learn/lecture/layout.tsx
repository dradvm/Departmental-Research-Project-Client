"use client";

import { Button } from "components/Button/Button";
import CircularIndeterminate from "components/CircularIndeterminate/CircularIndeterminate";
import CourseContent from "components/CourseContent/CourseContent";
import CourseDetails from "components/CourseDetails/CourseDetails";

import { ChevronDown, EllipsisVertical, Share2, Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import studyProgressService from "services/study-progress.service";
import { CourseDetail, CourseStudyProgress } from "types/course";
import { LectureStudyProgress } from "types/lecture";

type LearnContextType = {
  enabledBlock: boolean;
  setEnabledBlock: React.Dispatch<React.SetStateAction<boolean>>;
  course: CourseDetail | null;
  lectures: LectureStudyProgress[];
  handleSetTotalWatched: (checked: boolean) => void;
  currentTimeNote: number;
  setCurrentTimeNote: React.Dispatch<React.SetStateAction<number>>;
  lectureId: string;
  courseId: string;
};

const LearnContext = createContext<LearnContextType>({
  enabledBlock: true,
  setEnabledBlock: () => {},
  course: null,
  lectures: [],
  handleSetTotalWatched: () => {},
  currentTimeNote: 0,
  setCurrentTimeNote: () => {},
  lectureId: "",
  courseId: "",
});

export function useLearnContext() {
  return useContext(LearnContext);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [enabledBlock, setEnabledBlock] = useState(true);

  const { courseId, lectureId } = useParams<{
    courseId: string;
    lectureId: string;
  }>();
  const [course, setCourse] = useState<CourseStudyProgress | null>(null);
  const [lectures, setLectures] = useState<LectureStudyProgress[] | []>([]);
  const [progress, setProgress] = useState<number>(0);
  const [totalWatched, setTotalWatched] = useState<number>(0);
  const [currentTimeNote, setCurrentTimeNote] = useState<number>(0);
  useEffect(() => {
    studyProgressService
      .getCourseStudyProgress(Number(courseId))
      .then((res) => {
        const courseData = res.data as CourseStudyProgress;
        const lecturesData = courseData.Section.flatMap(
          (section) => section.Lecture
        );
        setLectures(lecturesData);
        const totalWatched = lecturesData.reduce(
          (total, lecture) => total + (lecture.StudyProgress[0].isDone ? 1 : 0),
          0
        );
        setTotalWatched(totalWatched);
        const progress = (totalWatched / lecturesData.length) * 100;
        setProgress(progress);
        setCourse(courseData);
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  const handleSetTotalWatched = (checked: boolean) => {
    setTotalWatched((prev) => {
      if (checked) {
        return prev + 1;
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    const totalLectures = lectures.length;
    if (totalLectures === 0) {
      setProgress(0);
      return;
    }
    const newProgress = (totalWatched / totalLectures) * 100;
    setProgress(newProgress);
  }, [totalWatched, lectures]);

  return (
    <LearnContext
      value={{
        enabledBlock,
        setEnabledBlock,
        course,
        lectures,
        handleSetTotalWatched,
        currentTimeNote,
        setCurrentTimeNote,
        lectureId,
        courseId,
      }}
    >
      <header className="h-14 bg-gray-950 w-full flex items-center justify-between px-4 text-white border-b border-slate-700">
        <div className="flex items-center">
          <div>UDEMY</div>
          <div className="h-5 bg-gray-500 mx-5" style={{ width: "1px" }}></div>
          <div className="font-medium">Khoá học vỡ lòng với n8n</div>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <Star size={14} className="me-1" /> Để lại đánh giá
          </Button>
          <div className="relative flex items-center">
            <Button variant="hover">
              <CircularIndeterminate progress={progress} />
              <div className="ms-1">Tiến độ của bạn</div>
              <ChevronDown size={14} strokeWidth={2} className="ms-1 mt-1" />
            </Button>
            <div className="absolute "></div>
          </div>
          <Button variant="outline">
            Chia sẻ <Share2 className="ms-2" size={14} strokeWidth={1} />
          </Button>
          <Button variant="outline">
            <EllipsisVertical size={20} strokeWidth={1} />
          </Button>
        </div>
      </header>
      <div className="flex flex-col">
        <main className="flex flex-1">
          <div className="flex-1 flex flex-col">
            <div className="aspect-video bg-black flex items-center justify-center max-h-[450px]">
              {children}
            </div>
            <CourseDetails course={course} />
          </div>

          <CourseContent courseContent={course?.Section ?? []} />
        </main>
      </div>
    </LearnContext>
  );
}
