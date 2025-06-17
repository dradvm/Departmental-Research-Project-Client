"use client";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { TvMinimalPlay } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Lecture } from "types/lecture";

type Props = {
  lecture: Lecture;
};

export default function CourseLecture({ lecture }: Props) {
  const { lectureId } = useParams<{
    lectureId: string;
  }>();
  const router = useRouter();
  const handleLink = useCallback(() => {
    router.push(`./${lecture.lectureId}`);
  }, [router, lecture.lectureId]);
  const { lectures } = useLearnContext();
  return (
    <ListItemButton
      disableRipple
      onClick={handleLink}
      sx={{
        bgcolor: String(lecture.lectureId) === lectureId ? "#ddd" : "white",
        "&:hover": {
          bgcolor: "#ddd",
        },
      }}
    >
      <ListItemText
        sx={{ paddingLeft: "12px" }}
        primary={
          `${
            lectures.findIndex(
              (lec) => lec.lectureId === Number(lecture.lectureId)
            ) + 1
          }. ` + lecture.nameLecture
        }
        secondary={
          <span className="flex items-center text-xs">
            <TvMinimalPlay size={14} strokeWidth={1} />
            <span className="ms-1">1min</span>
          </span>
        }
        slotProps={{
          primary: {
            style: { fontWeight: 400, color: "#222", fontSize: "14px" },
          },
          secondary: {
            style: { marginTop: "6px" },
          },
        }}
      />
      <ListItemIcon
        sx={{ minWidth: 0 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
