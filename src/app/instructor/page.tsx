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
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import InstructorDashboard from "components/Instructor/instructor-dashboard";

const drawerWidth = 240;
const HEADER_HEIGHT = 64; // Chiều cao header tổng (AppBar bên ngoài)

export default function DashboardLayout() {
  const [selected, setSelected] = React.useState("Dashboard");

  const renderContent = () => {
    switch (selected) {
      case "Dashboard":
        return <InstructorDashboard></InstructorDashboard>;
      case "Users":
        return <Typography variant="h4">Manage your users here</Typography>;
      case "Settings":
        return <Typography variant="h4">Adjust your settings here</Typography>;
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
              <ListItemText primary="Users" />
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
              <ListItemText primary="Settings" />
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
