import * as React from "react";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import { X } from "lucide-react";
import CourseSection from "./CourseSection";
import { useStickyObserver } from "hooks/useStickyObserver";
import { SectionStudyProgress } from "types/section";

type Props = {
  courseContent: SectionStudyProgress[];
};

export default function CourseContent({ courseContent }: Props) {
  const { sentinelRef, isSticky } = useStickyObserver();

  React.useEffect(() => {}, [isSticky]);
  return (
    <>
      <div ref={sentinelRef} style={{ height: 1 }}></div>
      <div
        className={`w-[420px] ${
          isSticky ? "h-screen" : "h-[calc(100vh-3.5rem)]"
        } flex flex-col sticky top-0 border border-gray-200`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="font-bold">Nội dung khoá học</div>
          <div>
            <X size={14} strokeWidth={1} />
          </div>
        </div>
        <Divider />
        <List
          disablePadding
          // sx={{ width: "100%", bgcolor: "background.paper" }}
          className="bg-gray-100 font-bold h-full overflow-y-auto flex-1 "
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {courseContent.map((section, index) => (
            <CourseSection key={index} section={section} />
          ))}
        </List>
      </div>
    </>
  );
}
