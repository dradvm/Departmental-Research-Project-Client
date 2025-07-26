"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

export interface NavItemSideBar {
  text: string;
  icon: React.ReactNode;
  path?: string | string[];
  onClick?: () => void;
}

function SidebarItem({
  item,
  open,
  isActive,
  onClick,
}: {
  item: NavItemSideBar;
  open: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip title={open ? "" : item.text} placement="right" arrow>
      <ListItemButton
        selected={isActive}
        onClick={() => {
          if (item.onClick) {
            item.onClick();
          } else {
            onClick();
          }
        }}
        sx={{
          justifyContent: open ? "initial" : "center",
          px: open ? 2.5 : 1.5,
          py: 1,
          minHeight: 48,
          color: "black", // indigo-500
          borderRadius: "4px", // rounded-md
          mx: 1, // để có khoảng trắng hai bên
          "&.Mui-selected": {
            backgroundColor: "#4F46E5", // indigo-50
            fontWeight: 600,
            "& .MuiListItemIcon-root": {
              color: "white",
            },
            color: "white",
            "&:hover": {
              backgroundColor: "#4F46E5",
            },
          },
          "&:not(.Mui-selected):hover": {
            backgroundColor: "#E0E7FF", // indigo-100
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: "#6366F1",
            minWidth: 0,
            mr: open ? 2 : "auto",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {open && <ListItemText primary={item.text} />}
      </ListItemButton>
    </Tooltip>
  );
}

export default function Sidebar({
  navItems,
  minWidth = 64,
  maxWidth = 320,
  title = "",
}: {
  navItems: NavItemSideBar[];
  minWidth?: number;
  maxWidth?: number;
  title?: string;
}) {
  const [open, setOpen] = useState(true);
  const drawerWidth = open ? maxWidth : minWidth;
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!open);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          backgroundColor: "#ffffff", // white
          color: "#6366F1", // indigo-500
          borderRight: "1px solid #E5E7EB",
        },
      }}
    >
      <div className="px-3 py-3 mb-3 flex items-center justify-between duration-300 ease bg-indigo-700 text-white">
        {open && (
          <div className="text-xl font-medium whitespace-nowrap overflow-hidden text-ellipsis px-2">
            {title}
          </div>
        )}
        <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <List>
        {navItems.map((item) => (
          <SidebarItem
            key={item.text}
            item={item}
            open={open}
            isActive={
              item.path
                ? typeof item.path === "string"
                  ? pathname === item.path
                  : item.path.includes(pathname)
                : false // nếu không có path, không active
            }
            onClick={() => {
              if (item.path) {
                const targetPath =
                  typeof item.path === "string" ? item.path : item.path[0];
                router.push(targetPath);
              } else if (item.onClick) {
                item.onClick(); // fallback nếu là nút như Logout
              }
            }}
          />
        ))}
      </List>
    </Drawer>
  );
}
