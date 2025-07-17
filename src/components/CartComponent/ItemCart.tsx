import { Button, Divider, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import courseService from "services/course.service";
import { ItemType } from "types/cart";
import { Course } from "types/course";
import { formatVND } from "utils/money";
import {
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDuration2 } from "utils/time";
export default function ItemCart({
  item,
  onDelete,
  onWishlist,
}: {
  item: ItemType;
  onDelete: (courseId: number, titleCourse: string) => void;
  onWishlist: (handleWishlistItem: number) => void;
}) {
  const [course, setCourse] = useState<Course>();

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
  const rating = useMemo(() => {
    if (course) {
      const reviews = course.Review ?? [];
      return Number(
        (
          reviews.reduce((total, review) => total + review.rating, 0) /
          (reviews.length || 1)
        ).toFixed(1)
      );
    }
  }, [course]);
  const totalTime = useMemo(() => {
    if (course) {
      return course.Section?.reduce(
        (total, section) =>
          total +
          section.Lecture.reduce((time, lecture) => time + lecture.time, 0),
        0
      );
    }
  }, [course]);
  useEffect(() => {
    courseService
      .getCourseById(item.course.courseId)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, [item.course.courseId]);

  return (
    <div className="">
      <Divider />
      <div className="flex space-x-3 mt-3">
        <div className="md:block md:w-[15%] relative">
          <Image
            src={item.course.thumbnail ?? "/thumbnail.webp"}
            fill
            alt="img"
          />
        </div>
        <Stack className="w-[70%] md:w-[60%] lg:w-[40%] gap-y-1">
          <div className="font-semibold">{item.course.title}</div>
          <div className="text-gray-900 text-xs">
            Bởi {item.teacher.userName}
          </div>
          <div className="flex space-x-3 text-xs">
            <div className="flex font-bold items-center space-x-1">
              <div className="text-yellow-600">{rating}</div>
              <div className="flex items-center justify-between h-4 w-16">
                {Array(5)
                  .fill(0)
                  .map((star, index) => {
                    return (
                      <FontAwesomeIcon
                        key={index}
                        icon={getStartIcon(rating ?? 0, index)}
                        className={`text-yellow-600`}
                        fontSize={8}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="text-gray-700">
              ({course?._count?.Review} xếp hạng)
            </div>
          </div>
          <div className="text-xs text-gray-700">
            Tổng số {formatDuration2(totalTime ?? 0)} {" · "}{" "}
            {
              (course?.Section ?? []).flatMap((section) => section.Lecture)
                .length
            }{" "}
            bài giảng
          </div>
        </Stack>
        {/* Div 3 */}
        <Stack className="gap-y-1 items-end text-indigo-600 text-sm">
          <div>
            <div
              className="hover:bg-indigo-100 p-1 rounded-sm cursor-pointer"
              onClick={() =>
                onDelete(parseInt(item.course.courseId), item.course.title)
              }
            >
              Xóa
            </div>
          </div>
          <div>
            <div className="hover:bg-indigo-100 p-1 rounded-sm cursor-pointer">
              Thêm vào yêu thích
            </div>
          </div>
        </Stack>
        {/* Div 4 */}
        <div className="w-[30%] md:w-[20%] flex flex-col justify-center">
          <p className="text-center text-[20px] font-bold">
            {formatVND(parseInt(item.course.final_price))}
          </p>
        </div>
      </div>
      {/* Div 3 only for mobile and tablet*/}
      <div className="w-full flex flex-row gap-[4px] justify-end mb-[8px] lg:hidden">
        <button className="w-fit p-[4px] border rounded-[8px] bg-red-700 text-white">
          Xóa
        </button>
        <button className="w-fit p-[4px] border rounded-[8px] bg-blue-300 text-white">
          Thêm vào yêu thích
        </button>
      </div>
    </div>
  );
}
