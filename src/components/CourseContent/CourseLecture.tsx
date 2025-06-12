"use client";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TvMinimalPlay } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Lecture } from "types/lecture";

type Props = {
  lecture: Lecture;
};

export default function CourseLecture({ lecture }: Props) {
  const params = useParams();
  const router = useRouter();
  console.log(params);
  const idCourse = params.idCourse;
  const handleLink = useCallback(() => {
    router.push(`/course/${idCourse}/learn/lecture/${lecture.idLecture}`);
  }, [idCourse, router, lecture.idLecture]);

  return (
    <ListItemButton disableRipple onClick={handleLink}>
      <ListItemText
        sx={{ paddingLeft: "12px" }}
        primary={lecture.nameLecture}
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
