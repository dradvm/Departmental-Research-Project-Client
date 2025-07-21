"use client";

import Image from "next/image";
import { Divider, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Heart, Users } from "lucide-react";
import { Course } from "types/course";
import { formatVND } from "utils/money";
import { formatDuration2 } from "utils/time";
import { useMemo, useState } from "react";
import wishlistService from "services/wishlist.service";
import Link from "next/link";
import { useUser } from "../../../../context/UserContext";
import { useRouter } from "next/navigation";

export default function CourseCard({ course }: { course: Course }) {
  const [isFavorite, setFavorite] = useState(course.Wishlist?.length ?? 0 > 0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const toggleFavorite = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (user) {
      setIsLoading(true);
      if (!isLoading) {
        if (isFavorite) {
          wishlistService
            .removeWishlist(course.courseId)
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        } else {
          wishlistService
            .addWishlist(course.courseId)
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        }
      }
      setFavorite((prev) => !prev);
    } else {
      router.push("/auth/login");
    }
  };
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
  return (
    <Link href={`/course/${course.courseId}`}>
      <Stack className="gap-y-5 mb-5">
        <div className="flex space-x-3">
          {/* Image */}
          <div className="w-16 h-16 relative ">
            <Image
              src={course.thumbnail ?? "/thumbnail.webp"}
              alt="Course Thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <Stack className="gap-y-2 grow">
            <div className="flex justify-between">
              <div className="text-base font-medium text-gray-800 w-96 leading-5">
                {course.title}
              </div>

              <div className="flex items-center space-x-1 text-yellow-600">
                <span className="font-bold text-sm">{rating}</span>
                <FontAwesomeIcon icon={faStar} className="text-sm" />
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Users size={16} />
                <span className="text-sm">{course._count?.Enrollment}</span>
              </div>

              <div className="flex items-center">
                {course.finalPrice === course.price ? (
                  <div className="font-bold text-gray-800 text-right text-sm">
                    {formatVND(course.finalPrice ?? 0)}
                  </div>
                ) : (
                  <Stack className="text-right text-sm">
                    <div className="font-bold text-gray-800">
                      {formatVND(course.finalPrice ?? 0)}
                    </div>
                    <div className="line-through text-gray-400 text-xs">
                      {formatVND(course.price ?? 0)}
                    </div>
                  </Stack>
                )}
              </div>
              <div
                onClick={toggleFavorite}
                className={`text-indigo-600 border rounded-full border-indigo-600 ${!isLoading && "cursor-pointer hover:bg-indigo-50"} w-10 h-10  flex items-center justify-around`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent"></div>
                ) : (
                  <>
                    {isFavorite ? (
                      <FontAwesomeIcon icon={faHeart} fontSize={16} />
                    ) : (
                      <Heart size={16} />
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="text-green-800 font-bold">
                Tổng số {formatDuration2(totalTime ?? 0)}
              </span>
              {/* <span>· Đã cập nhật 7/2025</span> */}
            </div>
          </Stack>
        </div>
        <Divider />
      </Stack>
    </Link>
  );
}
