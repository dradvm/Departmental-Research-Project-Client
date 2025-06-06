import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TvMinimalPlay } from "lucide-react";

export default function CourseLecture() {
  return (
    <ListItemButton disableRipple>
      <ListItemText
        sx={{ paddingLeft: "12px" }}
        primary="1. Giới thiệu về n8n là 1 công cụ automation mạnh mẽ"
        secondary={
          <span className="flex items-center text-xs">
            <TvMinimalPlay size={14} strokeWidth={1} />
            <span className="ms-1">1min</span>
          </span>
        }
        slotProps={{
          primary: {
            style: { fontWeight: 400, color: "#444", fontSize: "14px" },
          },
          secondary: {
            style: { marginTop: "6px" },
          },
        }}
      />
      <ListItemIcon sx={{ minWidth: 0 }}>
        <Checkbox
          size="small"
          sx={{
            padding: 0,
            mr: "6px",
            "&.Mui-checked": {
              color: "rgb(91, 73, 244)",
            },
          }}
        />
      </ListItemIcon>
    </ListItemButton>
  );
}
