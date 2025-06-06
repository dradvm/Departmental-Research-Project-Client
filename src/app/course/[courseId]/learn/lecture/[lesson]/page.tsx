"use client";

import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import React from "react";

export default function LessonPage({
  params,
}: {
  params: Promise<{
    courseId: string;
    lesson: string;
  }>;
}) {
  const { courseId, lesson }: { courseId: string; lesson: string } =
    React.use(params); // fix this line
  console.log("Course ID:", courseId);
  console.log("Lesson:", lesson);
  return <VideoPlayer url="/test.mp4" controls={false} />;
}
