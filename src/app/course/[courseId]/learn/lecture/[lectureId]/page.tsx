"use client";

import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import React, { useEffect, useState } from "react";
import courseService from "services/course.service";
import { Lecture } from "types/lecture";

export default function LecturePage({
  params,
}: {
  params: Promise<{
    courseId: string;
    lectureId: string;
  }>;
}) {
  const { lectureId }: { lectureId: string } = React.use(params); // fix this line
  const [lecture, setLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    courseService.getLectureById(lectureId).then((res) => setLecture(res.data));
  }, [lectureId]);

  return <VideoPlayer url={lecture?.video ?? ""} />;
}
