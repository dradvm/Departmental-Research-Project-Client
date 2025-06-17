"use client";
import CourseContent from "components/CourseContent/CourseContent";
import CourseDetails from "components/CourseDetails/CourseDetails";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import courseService from "services/course.service";
import { CourseDetail } from "types/course";
import { Lecture } from "types/lecture";
import { Section } from "types/section";

type LearnContextType = {
  enabledBlock: boolean;
  setEnabledBlock: React.Dispatch<React.SetStateAction<boolean>>;
  course: CourseDetail | null;
  lectures: Lecture[];
};

const LearnContext = createContext<LearnContextType>({
  enabledBlock: true,
  setEnabledBlock: () => {},
  course: null,
  lectures: [],
});

export function useLearnContext() {
  return useContext(LearnContext);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [enabledBlock, setEnabledBlock] = useState(true);

  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lectures, setLectures] = useState<Lecture[] | []>([]);

  useEffect(() => {
    courseService
      .getCourseById(courseId)
      .then((res) => {
        const courseData = res.data as CourseDetail;
        courseData.Section.forEach((section: Section) => {
          section.Lecture.sort((a, b) => a.order - b.order);
        });
        courseData.Section.sort((a, b) => a.order - b.order);
        setLectures(courseData.Section.flatMap((section) => section.Lecture));
        setCourse(courseData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LearnContext value={{ enabledBlock, setEnabledBlock, course, lectures }}>
      <div className="flex flex-col">
        <main className="flex flex-1">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-black flex items-center justify-center max-h-[450px]">
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
