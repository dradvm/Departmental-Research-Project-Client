"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Typography,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import BarChartIcon from "@mui/icons-material/BarChart";

import InstructorDashboard from "components/Instructor/instructor-dashboard";
import InstructorReview from "components/Instructor/instructor-review";
import InstructorQA from "components/Instructor/instructor-qa";
import BarsDataset from "components/Instructor/Overview/instructor-overview";
import withRole from "components/WithRole/withRole";

const drawerWidth = 240;
const HEADER_HEIGHT = 64; // Chiều cao header tổng (AppBar bên ngoài)

function DashboardLayout() {
  const [selected, setSelected] = React.useState("Dashboard");

  const renderContent = () => {
    switch (selected) {
      case "Dashboard":
        return <InstructorDashboard />;
      case "Users":
        return <InstructorReview />;
      case "Settings":
        return <InstructorQA />;
      case "Overview":
        return <BarsDataset />;
      default:
        return <Typography variant="h4">Không tìm thấy trang</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: HEADER_HEIGHT,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Dashboard"}
              onClick={() => setSelected("Dashboard")}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý khóa học" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Users"}
              onClick={() => setSelected("Users")}
            >
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary="Đánh giá khóa học" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Settings"}
              onClick={() => setSelected("Settings")}
            >
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Hỏi đáp" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Overview"}
              onClick={() => setSelected("Overview")}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Thống kê" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

export default withRole(DashboardLayout, ["INSTRUCTOR"]);
