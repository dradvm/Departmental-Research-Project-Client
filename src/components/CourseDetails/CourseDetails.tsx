"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Search } from "lucide-react";
import CourseOverview from "./CourseOverview";
import CourseReviews from "./CourseReviews";
import CourseQA from "./CourseQA";
import CourseNotes from "./CourseNotes";
import { CourseDetail } from "types/course";

export default function CourseDetails({
  course,
}: {
  course: CourseDetail | null;
}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="px-4 text-black">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            slotProps={{
              root: {
                sx: {
                  "& .MuiTab-root": {
                    fontWeight: 600,
                    fontSize: "14px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                  },
                  "& .MuiTab-root:hover": {
                    color: "#000",
                  },
                  "& .MuiTabs-indicator": {
                    color: "#000",
                    backgroundColor: "#000",
                    height: "1px",
                  },
                  "& .Mui-selected": {
                    color: "#000 !important",
                  },
                },
              },
            }}
          >
            <Tab icon={<Search size={16} strokeWidth={2} />} value="1" />
            <Tab label="Tổng quan" value="2" />
            <Tab label="Q&A" value="3" />
            <Tab label="Ghi chú" value="4" />
            {/* <Tab label="Thông báo" value="5" /> */}
            <Tab label="Đánh giá" value="6" />
            <Tab label="Công cụ học" value="7" />
          </TabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2">
          <CourseOverview course={course} />
        </TabPanel>
        <TabPanel value="3">
          <CourseQA />
        </TabPanel>
        <TabPanel value="4">
          <CourseNotes />
        </TabPanel>
        {/* <TabPanel value="5">Item Two</TabPanel> */}
        <TabPanel value="6">
          <CourseReviews />
        </TabPanel>
        <TabPanel value="7">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
