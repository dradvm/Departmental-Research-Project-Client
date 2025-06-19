import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React from "react";
import List from "@mui/material/List";
import CourseLecture from "./CourseLecture";
import { Divider } from "@mui/material";
import { Section } from "types/section";
import { formatDuration } from "utils/time";

type Props = {
  section: Section;
};

export default function CourseSection({ section }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick} disableRipple>
        <ListItemText
          primary={`Phần ${section.order}: ` + section.nameSection}
          secondary={`1/${section.Lecture.length} | ${formatDuration(
            section.Lecture.reduce((total, lecture) => total + lecture.time, 0)
          )}`}
          slotProps={{
            primary: {
              style: { fontWeight: "bold", color: "#000" },
            },
            secondary: {
              style: { fontSize: "12px", color: "#666", marginTop: "6px" },
            },
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="bg-white">
          {section.Lecture.map((lecture, index) => (
            <CourseLecture lecture={lecture} key={index} />
          ))}
        </List>
      </Collapse>
      <Divider />
    </>
  );
}
