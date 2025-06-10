"use client";
import CourseContent from "components/CourseContent/CourseContent";
import CourseDetails from "components/CourseDetails/CourseDetails";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <main className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center max-h-[450px]">
            {children}
          </div>
          <CourseDetails />
        </div>

        <CourseContent />
      </main>
    </div>
  );
}
