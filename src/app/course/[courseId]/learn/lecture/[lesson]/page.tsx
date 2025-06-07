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
  return (
    <VideoPlayer url="https://dn720003.ca.archive.org/0/items/haikyuu-s1-dub/Haikyuu%20temporada%201%2FHaikyuu%21%21%20%28Dub%29%20Episode%201.mp4" />
  );
}
