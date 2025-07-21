import { MouseEvent, useMemo, useState } from "react";
import { Course } from "types/course";
import {
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { Popover, Stack } from "@mui/material";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDuration2 } from "utils/time";
import { formatVND } from "utils/money";

export default function CourseItem({ course }: { course: Course }) {
  const rating = useMemo(() => {
    const reviews = course.Review ?? [];
    return Number(
      (
        reviews.reduce((total, review) => total + review.rating, 0) /
        (reviews.length || 1)
      ).toFixed(1)
    );
  }, [course]);
  const totalTime = useMemo(() => {
    return course.Section?.reduce(
      (total, section) =>
        total +
        section.Lecture.reduce((time, lecture) => time + lecture.time, 0),
      0
    );
  }, [course]);
  const getStartIcon = (average: number, star: number) => {
    if (average > star) {
      const reminder = average - star;
      if (reminder < 0.25) {
        return regularStar;
      } else if (reminder < 0.75) {
        return faStarHalfStroke;
      } else {
        return solidStar;
      }
    } else {
      return regularStar;
    }
  };
  return (
    <Link href={`/course/${course.courseId}`} className="group">
      <Stack className="gap-y-2">
        <div
          className="w-full h-32 relative"
          style={{ border: "1px solid #999" }}
        >
          <Image
            src={course.thumbnail}
            fill
            alt="props"
            className="object-cover"
          />
        </div>
        <Stack className="gap-y-1">
          <div className="font-medium text-base/5 line-clamp-2 max-h-10">
            {course.title}
          </div>
          <div className="text-slate-500 text-xs truncate">
            {course.User?.name}
          </div>
          <div className="flex items-center space-x-1">
            <div className="text-yellow-700 font-medium text-sm">{rating}</div>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((star, index) => {
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={getStartIcon(rating, index)}
                      className={`text-yellow-600`}
                      fontSize={8}
                    />
                  );
                })}
            </div>
            <div className="text-sm">({course._count?.Review})</div>
          </div>
          <div className="font-medium">{formatVND(course.price)}</div>
        </Stack>
      </Stack>
    </Link>
  );
}
