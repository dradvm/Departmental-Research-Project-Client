"use client";
import {
  faHeart,
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatDuration } from "utils/time";
import CoursePageListCourse from "components/Course/CoursePage/CoursePageListCourse";
import courseService from "services/course.service";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Course } from "types/course";
import Image from "next/image";
import { Button } from "components/Button/Button";
import CourseCard from "components/Course/CoursePage/CourseCard";
import wishlistService from "services/wishlist.service";
import cartService from "services/cart.service";
import { formatVND } from "utils/money";

export default function CoursePage() {
  const { courseId } = useParams<{
    courseId: string;
  }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isOpenListCourse, setIsOpenListCourse] = useState<boolean>(false);
  const [otherCourse, setOtherCourse] = useState<Course[]>([]);
  const [isFavorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isExistInCart, setIsExistInCart] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const loadIsExistInCart = useCallback(() => {
    cartService
      .isExitInCart(Number(courseId))
      .then((res) => {
        if (res.data) {
          setIsExistInCart(true);
        } else {
          setIsExistInCart(false);
        }
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  const loadIsExistInWishlist = useCallback(() => {
    wishlistService
      .isExitInWishlist(Number(courseId))
      .then((res) => {
        if (res.data) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  const toggleFavorite = () => {
    setIsLoading(true);
    setIsDisabled(true);
    if (!isLoading && course && !isDisabled) {
      if (isFavorite) {
        wishlistService
          .removeWishlist(course.courseId)
          .then(() => {
            setIsLoading(false);
            setIsDisabled(false);
            loadIsExistInWishlist();
            loadIsExistInCart();
          })
          .catch((err) => console.log(err));
      } else {
        wishlistService
          .addWishlist(course.courseId)
          .then(() => {
            setIsLoading(false);
            setIsDisabled(false);
            loadIsExistInWishlist();
            loadIsExistInCart();
          })
          .catch((err) => console.log(err));
      }
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

  const handleOpenListCourse = () => {
    setIsOpenListCourse((prev) => !prev);
  };

  const handleAddToCart = useCallback(() => {
    if (course) {
      setIsDisabled(true);
      cartService
        .addCourseIntoCart({ courseId: course.courseId })
        .then(() => {
          setIsDisabled(false);
          loadIsExistInCart();
          loadIsExistInWishlist();
        })
        .catch((err) => console.log(err));
    }
  }, [course, loadIsExistInCart, loadIsExistInWishlist]);

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

  useEffect(() => {
    courseService
      .getCourseById(courseId)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  useEffect(() => {
    loadIsExistInCart();
  }, [loadIsExistInCart]);

  useEffect(() => {
    loadIsExistInWishlist();
  }, [loadIsExistInWishlist]);

  useEffect(() => {
    if (course) {
      courseService
        .getOtherCourses(course?.courseId, course?.userId)
        .then((res) => setOtherCourse(res.data))
        .catch((err) => console.log(err));
      courseService
        .getCoursePrice(course?.courseId)
        .then((res) => {
          setPrice(res.data.price);
          setFinalPrice(res.data.finalPrice);
        })
        .catch((err) => console.log(err));
    }
  }, [course]);

  return (
    <Stack className="relative">
      <div className="px-52 py-10 bg-gray-950 text-white">
        <div className="w-[70%]">
          <div className="flex flex-wrap space-x-3">
            {(course?.CourseCategory ?? []).map((courseCategory) => (
              <Link
                key={courseCategory.Category?.categoryId}
                href={"/"}
                className="bg-indigo-700 text-gray-100 font-medium rounded-full px-4 py-1"
              >
                {courseCategory.Category?.categoryName}
              </Link>
            ))}
          </div>

          <Stack className="gap-y-3 mt-8">
            <div className="text-3xl font-bold">{course?.title}</div>
            <div className="text-2xl font-medium">{course?.description}</div>
            <div className="flex items-center space-x-3">
              <div className="text-yellow-600 font-bold">{rating}</div>
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
              <div className="text-indigo-200 underline">
                ({course?._count?.Review} xếp hạng)
              </div>
              <div>{course?._count?.Enrollment} học viên</div>
            </div>
            <div>
              Được tạo bởi{" "}
              <Link href="/" className="text-indigo-200 underline">
                {course?.User?.name}
              </Link>
            </div>
            {/* <div className="flex items-center space-x-3">
              <BadgeAlert size={16} />
              <div>Cập nhật gần nhất {4}</div>
            </div> */}
          </Stack>
        </div>
      </div>
      <div className="px-52 py-10">
        <Stack className=" w-[70%] space-y-10">
          <Stack className="gap-y-3">
            <div className="text-2xl font-medium">Nội dung khoá học</div>
            <Stack>
              <div className="flex items-center justify-between font-medium text-sm">
                <div className="space-x-1 text-gray-900">
                  {course?.Section?.length} phần {" · "}{" "}
                  {course?.Section?.reduce(
                    (total, section) => total + section.Lecture.length,
                    0
                  )}{" "}
                  bài giảng {" · "} {formatDuration(totalTime ?? 0)} tổng thời
                  lượng
                </div>
                <div
                  className="text-indigo-600 cursor-pointer hover:bg-indigo-100 rounded px-4 py-2"
                  onClick={handleOpenListCourse}
                >
                  {isOpenListCourse ? "Thu gọn" : "Mở rộng"} tất cả các phần
                </div>
              </div>
              <div className="flex mt-3">
                <CoursePageListCourse
                  sections={course?.Section ?? []}
                  isOpenControl={isOpenListCourse}
                />
              </div>
            </Stack>
          </Stack>
          <Stack className="gap-y-3">
            <div className="text-2xl font-medium">
              Khám phá các chủ đề tương tự
            </div>
            <div className="flex flex-wrap space-x-3">
              {(course?.CourseCategory ?? []).map((courseCategory) => (
                <Link
                  href={"/"}
                  key={courseCategory.Category?.categoryId}
                  className="px-4 py-2 rounded-sm border hover:bg-gray-100 font-medium border-gray-800"
                >
                  {courseCategory.Category?.categoryName}
                </Link>
              ))}
            </div>
          </Stack>
          <Stack className="gap-y-3">
            <div className="text-2xl font-medium">Học viên cũng mua</div>
            <Stack className="">
              <div>
                {otherCourse.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
              <Button size="lg" variant="primary">
                Hiện thêm
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </div>
      <div className="absolute top-0 right-0 -translate-x-48 translate-y-16">
        <Stack className="bg-white border border-gray-200 w-80">
          <Image
            src="/thumbnail.webp"
            alt="Live from space album cover"
            width={128}
            height={256}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />

          <Stack className="px-4 py-8 gap-y-3">
            {price !== null && finalPrice !== null ? (
              <div className="flex space-x-3 items-center">
                <div className="text-lg font-medium line-through text-gray-400">
                  {formatVND(price ?? 0)}
                </div>

                <div className="text-lg font-bold">
                  {formatVND(finalPrice ?? 0)}
                </div>
              </div>
            ) : (
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            )}

            <Stack className="gap-y-2">
              <div className="flex space-x-2 w-full">
                {isExistInCart ? (
                  <Link href={"/cart"} className="flex grow">
                    <Button variant="filled" className="grow">
                      Chuyển đến giỏ hàng
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="filled"
                    onClick={handleAddToCart}
                    disabled={isDisabled}
                    className="grow"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                )}
                <button
                  disabled={isDisabled}
                  onClick={toggleFavorite}
                  className={`border border-indigo-600 px-3 py-2 rounded-sm flex items-center text-indigo-600 ${!isLoading && " hover:bg-indigo-50 cursor-pointer"} ${isDisabled && "cursor-not-allowed"}`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>
                  ) : (
                    <>
                      {isFavorite ? (
                        <FontAwesomeIcon icon={faHeart} fontSize={18} />
                      ) : (
                        <Heart size={18} />
                      )}
                    </>
                  )}
                </button>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}
