import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import CoursePageLecture from "./CoursePageLecture";
import { Section } from "types/section";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatDuration2 } from "utils/time";

export default function CoursePageSection({
  section,
  isOpenControl = false,
}: {
  section: Section;
  isOpenControl?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(isOpenControl);
  }, [isOpenControl]);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            <div className="flex items-center justify-between">
              <div className="flex space-x-3 font-bold items-center">
                <div>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${isOpen ? "-rotate-180" : ""}`}
                  />
                </div>
                <div>{section.nameSection}</div>
              </div>
              <div className="flex space-x-1 text-sm text-gray-800">
                <div>{section.Lecture.length} bài giảng</div>
                <div className="">{" · "}</div>
                <div>
                  {formatDuration2(
                    section.Lecture.reduce(
                      (total, lecture) => total + lecture.time,
                      0
                    )
                  )}
                </div>
              </div>
            </div>
          }
        />
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="bg-white">
          {section.Lecture.map((lecture) => (
            <CoursePageLecture key={lecture.lectureId} lecture={lecture} />
          ))}
        </List>
      </Collapse>
    </>
  );
}
