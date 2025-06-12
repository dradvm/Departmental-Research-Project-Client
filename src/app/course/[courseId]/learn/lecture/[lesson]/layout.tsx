"use client";
import CourseContent from "components/CourseContent/CourseContent";
import CourseDetails from "components/CourseDetails/CourseDetails";
import React, { createContext, useContext, useEffect, useState } from "react";
import courseService from "services/course.service";
import { CourseDetail } from "types/course";

type LearnContextType = {
  enabledBlock: boolean;
  setEnabledBlock: React.Dispatch<React.SetStateAction<boolean>>;
};

const LearnContext = createContext<LearnContextType>({
  enabledBlock: true,
  setEnabledBlock: () => {},
});

export function useLearnContext() {
  return useContext(LearnContext);
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const [enabledBlock, setEnabledBlock] = useState(true);

  const { courseId } = React.use(params);
  const [course, setCourse] = useState<CourseDetail>();

  useEffect(() => {
    courseService
      .getCourseById(courseId)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LearnContext value={{ enabledBlock, setEnabledBlock }}>
      <div className="flex flex-col">
        <main className="flex flex-1">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-black flex items-center justify-center max-h-[450px]">
              {children}
            </div>
            <CourseDetails />
          </div>

          <CourseContent courseContent={course?.Section ?? []} />
        </main>
      </div>
    </LearnContext>
  );
}
