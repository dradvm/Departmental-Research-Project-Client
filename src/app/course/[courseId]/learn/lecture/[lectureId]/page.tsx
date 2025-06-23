"use client";

import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import courseService from "services/course.service";
import studyProgressService from "services/study-progress.service";
import { Lecture } from "types/lecture";
import { StudyProgress } from "types/study-progress";

export default function LecturePage({}) {
  const { courseId, lectureId } = useParams<{
    courseId: string;
    lectureId: string;
  }>();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [studyProgress, setStudyProgress] = useState<StudyProgress>();
  useEffect(() => {
    courseService.getLectureById(lectureId).then((res) => setLecture(res.data));
    studyProgressService
      .getTrackStudyProgress(lectureId)
      .then((res) => setStudyProgress(res.data))
      .catch((err) => console.log(err));
    studyProgressService
      .trackLastStudyLecture(courseId, parseInt(lectureId))
      .then()
      .catch((err) => console.log(err));
  }, [courseId, lectureId]);
  return (
    studyProgress && (
      <VideoPlayer
        url={lecture?.video ?? ""}
        startTime={studyProgress.currentTime}
      />
    )
  );
}
