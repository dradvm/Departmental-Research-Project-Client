"use client";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { debounce } from "lodash";
import { TvMinimalPlay } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import studyProgressService from "services/study-progress.service";
import { LectureStudyProgress } from "types/lecture";
import { formatDuration } from "utils/time";

type Props = {
  lecture: LectureStudyProgress;
  lectures: LectureStudyProgress[];
  setLectures: React.Dispatch<React.SetStateAction<LectureStudyProgress[]>>;
};

export default function CourseLecture({
  lecture,
  lectures,
  setLectures,
}: Props) {
  const { lectureId } = useParams<{
    lectureId: string;
  }>();
  const router = useRouter();
  const [checked, setChecked] = React.useState(lecture.StudyProgress[0].isDone);
  const { handleSetTotalWatched } = useLearnContext();
  const handleLink = useCallback(() => {
    router.push(`./${lecture.lectureId}`);
  }, [router, lecture.lectureId]);

  const saveProgress = useCallback(
    debounce((checked: boolean) => {
      studyProgressService
        .toggleStudyProgress(lecture.lectureId, checked)
        .then()
        .catch((err) => console.log(err));
    }, 500),
    [lecture.lectureId]
  );

  const newLectures = useCallback(
    (checked: boolean) =>
      lectures.map((lec) => {
        if (lec.lectureId == lecture.lectureId) {
          return {
            ...lec,
            StudyProgress: [
              {
                ...lec.StudyProgress[0],
                isDone: checked,
              },
            ],
          };
        }
        return lec;
      }),
    [lectures, lecture.lectureId]
  );

  const handleClickIcon = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setChecked((prev) => !prev);
      setLectures(newLectures(!checked));
      handleSetTotalWatched(!checked);
      saveProgress(!checked);
    },
    [saveProgress, checked, newLectures, setLectures, handleSetTotalWatched]
  );
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
            <span className="ms-1">{formatDuration(lecture.time)}</span>
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
      <ListItemIcon sx={{ minWidth: 0 }} onClick={handleClickIcon}>
        <Checkbox
          checked={checked}
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
