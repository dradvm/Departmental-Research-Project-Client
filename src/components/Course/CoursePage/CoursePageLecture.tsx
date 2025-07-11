import { ListItemButton, ListItemText } from "@mui/material";
import { TvMinimalPlay } from "lucide-react";
import { Lecture } from "types/lecture";
import { formatTime } from "utils/time";

export default function CoursePageLecture({ lecture }: { lecture: Lecture }) {
  return (
    <ListItemButton disableRipple>
      <ListItemText
        sx={{ paddingLeft: "12px" }}
        primary={
          <div className="flex items-center justify-between text-sm text-gray-700">
            <div className="flex items-center space-x-3">
              <TvMinimalPlay size={14} strokeWidth={1} />
              <div>{lecture.nameLecture}</div>
            </div>

            <span className="">{formatTime(lecture.time)}</span>
          </div>
        }
        slotProps={{
          primary: {
            style: {
              fontWeight: 400,
              color: "#222",
              fontSize: "14px",
            },
          },
          secondary: {
            style: { marginTop: "6px" },
          },
        }}
      />
    </ListItemButton>
  );
}
