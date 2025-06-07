import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React from "react";
import List from "@mui/material/List";
import CourseLecture from "./CourseLecture";
import { Divider } from "@mui/material";

export default function CourseSection() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick} disableRipple>
        <ListItemText
          primary="Section 1: Chào mừng đến với khoá học automation với n8n tổng"
          secondary="1/1 | 1min"
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
          <CourseLecture />
          <CourseLecture />
          <CourseLecture />
          <CourseLecture />
        </List>
      </Collapse>
      <Divider />
    </>
  );
}
