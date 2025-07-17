"use client";

import React, { useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import InstructorDashboard from "components/Instructor/instructor-dashboard";
import InstructorReview from "components/Instructor/instructor-review";
import InstructorQA from "components/Instructor/instructor-qa";
import BarsDataset from "components/Instructor/Overview/instructor-overview";
const drawerWidth = 240;
const HEADER_HEIGHT = 64; // Chiều cao header tổng (AppBar bên ngoài)

export default function DashboardLayout() {
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
        return <Typography variant="h4">Page not found</Typography>;
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
            top: HEADER_HEIGHT, // 💡 Không đè lên header
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
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Users"}
              onClick={() => setSelected("Users")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Review" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Settings"}
              onClick={() => setSelected("Settings")}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Q&A" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={selected === "Overview"}
              onClick={() => setSelected("Overview")}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
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
