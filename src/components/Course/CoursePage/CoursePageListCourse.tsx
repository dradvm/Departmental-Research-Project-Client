import { List } from "@mui/material";
import CoursePageSection from "./CoursePageSection";
import { Section } from "types/section";

export default function CoursePageListCourse({
  sections,
  isOpenControl = false,
}: {
  sections: Section[];
  isOpenControl?: boolean;
}) {
  return (
    <List
      disablePadding
      className="bg-gray-100 font-bold h-full overflow-y-auto flex-1 border border-gray-300"
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {sections.map((section: Section) => (
        <CoursePageSection
          key={section.sectionId}
          section={section}
          isOpenControl={isOpenControl}
        />
      ))}
    </List>
  );
}
