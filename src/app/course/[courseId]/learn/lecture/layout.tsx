"use client";

import { Button } from "components/Button/Button";
import CircularIndeterminate from "components/CircularIndeterminate/CircularIndeterminate";
import CourseContent from "components/Course/CourseContent/CourseContent";
import CourseDetails from "components/Course/CourseDetails/CourseDetails";
import ReviewModal from "components/Modal/ReviewModal";

import { ChevronDown, EllipsisVertical, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import courseService from "services/course.service";
import enrollmentService from "services/enrollment.service";
import studyProgressService from "services/study-progress.service";
import { Course } from "types/course";
import { Lecture } from "types/lecture";
import { LearnContext } from "../../../../../context/LearnContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [enabledBlock, setEnabledBlock] = useState(true);

  const { courseId, lectureId } = useParams<{
    courseId: string;
    lectureId: string;
  }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lectures, setLectures] = useState<Lecture[] | []>([]);
  const [progress, setProgress] = useState<number>(0);
  const [totalWatched, setTotalWatched] = useState<number>(0);
  const [currentTimeNote, setCurrentTimeNote] = useState<number>(0);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);

  const handleOpenReviewModal = () => {
    setIsOpenReviewModal(true);
  };
  const handleCloseReviewModal = () => {
    setIsOpenReviewModal(false);
    setReview(true);
  };

  useEffect(() => {
    courseService
      .getReviewByCourseAndUser(courseId)
      .then((res) => setReview(!!res.data))
      .catch((err) => console.error(err));
    studyProgressService
      .getCourseStudyProgress(Number(courseId))
      .then((res) => {
        const courseData = res.data as Course;
        const lecturesData =
          courseData.Section?.flatMap((section) => section.Lecture) ?? [];
        setLectures(lecturesData);
        const studyProgressData = lecturesData.flatMap(
          (studyProgress) => studyProgress.StudyProgress
        );
        const totalWatched = studyProgressData.reduce(
          (total, studyProgress) =>
            total + (studyProgress && studyProgress.isDone ? 1 : 0),
          0
        );
        setTotalWatched(totalWatched);
        const progress =
          studyProgressData.length > 0
            ? Math.ceil((totalWatched / studyProgressData.length) * 100)
            : 0;
        setProgress(progress);
        setCourse(courseData);
      })
      .catch((err) => console.log(err));
    enrollmentService.updateLastAccessCourse(Number(courseId)).then().catch();
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
          <Link href={"/"}>EduMarket</Link>
          <div className="h-5 bg-gray-500 mx-5" style={{ width: "1px" }}></div>
          <Link
            href={`/course/${courseId}`}
            className="font-medium hover:text-gray-400"
          >
            {course?.title}
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {!review && (
            <Button onClick={handleOpenReviewModal}>
              <Star size={14} className="me-1" /> Để lại đánh giá
            </Button>
          )}
          {isOpenReviewModal && (
            <ReviewModal
              courseId={parseInt(courseId)}
              handleCloseModal={handleCloseReviewModal}
            />
          )}
          <div className="relative flex items-center">
            <Button variant="hover">
              <CircularIndeterminate progress={progress} />
              <div className="ms-1">Tiến độ của bạn</div>
              <ChevronDown size={14} strokeWidth={2} className="ms-1 mt-1" />
            </Button>
            <div className="absolute "></div>
          </div>
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
