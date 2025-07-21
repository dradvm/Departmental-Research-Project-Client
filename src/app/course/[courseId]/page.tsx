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
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Course } from "types/course";
import Image from "next/image";
import { Button } from "components/Button/Button";
import CourseCard from "components/Course/CoursePage/CourseCard";
import wishlistService from "services/wishlist.service";
import cartService from "services/cart.service";
import { formatVND } from "utils/money";
import { useUser } from "../../../../context/UserContext";

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
  const { user } = useUser();
  const router = useRouter();
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  const loadIsExistInCart = useCallback(() => {
    if (user) {
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
    }
  }, [courseId, user]);

  const loadIsExistInWishlist = useCallback(() => {
    if (user) {
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
    }
  }, [courseId, user]);

  const toggleFavorite = () => {
    if (user) {
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
    } else {
      router.push("/auth/login");
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
    if (user) {
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
    } else {
      router.push("/auth/login");
    }
  }, [course, loadIsExistInCart, loadIsExistInWishlist, user, router]);

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
      if (user) {
        courseService
          .getOtherCourseByUserPrivate(course?.userId, course?.courseId)
          .then((res) => {
            setOtherCourse(res.data);
            setIsSkeleton(false);
          })
          .catch((err) => console.log(err));
      } else {
        courseService
          .getOtherCourseByUserPublic(course?.userId, course?.courseId)
          .then((res) => {
            setOtherCourse(res.data);
            setIsSkeleton(false);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [course, user]);

  return (
    <Stack className="relative">
      <div className="px-52 py-10 bg-gray-950 text-white">
        {isSkeleton ? (
          <div className="w-[70%] animate-pulse">
            {/* Category Skeleton */}
            <div className="flex flex-wrap space-x-3 mb-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 rounded-full h-6 w-24"
                  ></div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4 mt-8">
              <div className="h-8 bg-gray-800 rounded w-3/4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2"></div>

              {/* Rating Skeleton */}
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 h-4 w-10 rounded"></div>
                <div className="flex justify-between items-center space-x-1 h-4 w-16">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-3 w-3 bg-yellow-600 rounded-sm"
                      ></div>
                    ))}
                </div>
                <div className="bg-gray-700 h-4 w-32 rounded"></div>
                <div className="bg-gray-700 h-4 w-24 rounded"></div>
              </div>

              {/* Author Skeleton */}
              <div className="flex items-center space-x-2">
                <div className="bg-gray-600 h-4 w-24 rounded"></div>
                <div className="bg-indigo-300 h-4 w-32 rounded"></div>
              </div>

              {/* Last updated (optional) */}
              {/* 
      <div className="flex items-center space-x-3">
        <div className="bg-gray-600 h-4 w-4 rounded-full"></div>
        <div className="bg-gray-600 h-4 w-32 rounded"></div>
      </div> 
      */}
            </div>
          </div>
        ) : (
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
              <div className="text-2xl font-medium">{course?.subTitle}</div>
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
        )}
      </div>
      <div className="px-52 py-10">
        {isSkeleton ? (
          <div className="w-[70%] space-y-10 animate-pulse">
            {/* Nội dung khóa học */}
            <div className="space-y-3">
              <div className="h-6 w-64 bg-gray-300 rounded"></div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="bg-gray-300 h-4 w-96 rounded"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-full bg-gray-200 rounded"
                      ></div>
                    ))}
                </div>
              </div>
            </div>

            {/* Khám phá các chủ đề tương tự */}
            <div className="space-y-3">
              <div className="h-6 w-72 bg-gray-300 rounded"></div>
              <div className="flex flex-wrap gap-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="px-6 py-2 bg-gray-200 rounded-sm w-32 h-8"
                    ></div>
                  ))}
              </div>
            </div>

            {/* Yêu cầu */}
            <div className="space-y-3">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gray-200 rounded"
                    ></div>
                  ))}
              </div>
            </div>

            {/* Mô tả */}
            <div className="space-y-3">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="space-y-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gray-200 rounded"
                    ></div>
                  ))}
              </div>
            </div>

            {/* Đối tượng */}
            <div className="space-y-3">
              <div className="h-6 w-64 bg-gray-300 rounded"></div>
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gray-200 rounded"
                    ></div>
                  ))}
              </div>
            </div>

            {/* Học viên cũng mua */}
            <div className="space-y-3">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
              <div className="space-y-4">
                {Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-32 w-full bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                <div className="w-32 h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
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
              <div className="text-2xl font-medium">Yêu cầu</div>
              <div
                dangerouslySetInnerHTML={{ __html: course?.description ?? "" }}
              ></div>
            </Stack>
            <Stack className="gap-y-3">
              <div className="text-2xl font-medium">Mô tả</div>
              <div
                dangerouslySetInnerHTML={{ __html: course?.description ?? "" }}
              ></div>
            </Stack>
            <Stack className="gap-y-3">
              <div className="text-2xl font-medium">
                Đối tượng của khoá học này
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: course?.targetAudience ?? "",
                }}
              ></div>
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
        )}
      </div>
      {isSkeleton ? (
        <div className="absolute top-0 right-0 -translate-x-48 translate-y-16 animate-pulse">
          <div className="bg-white border border-gray-200 w-80 rounded overflow-hidden shadow-md">
            {/* Thumbnail Skeleton */}
            <div className="w-full h-44 bg-gray-300"></div>

            {/* Price + Buttons Skeleton */}
            <div className="px-4 py-8 space-y-4">
              {/* Giá */}
              <div className="h-6 w-24 bg-gray-300 rounded"></div>

              {/* Nút hành động */}
              <div className="flex space-x-2 w-full">
                <div className="h-10 bg-gray-300 rounded flex-1"></div>
                <div className="h-10 w-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 right-0 -translate-x-48 translate-y-16">
          <Stack className="bg-white border border-gray-200 w-80">
            <Image
              src={course?.thumbnail || "/thumbnail.webp"}
              alt="Live from space album cover"
              width={128}
              height={256}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />

            <Stack className="px-4 py-8 gap-y-3">
              {course?.price === course?.finalPrice ? (
                <div className="text-xl font-bold">
                  {formatVND(course?.finalPrice ?? 0)}
                </div>
              ) : (
                <div className="flex space-x-3 items-center">
                  <div className="text-xl font-bold">
                    {formatVND(course?.finalPrice ?? 0)}
                  </div>
                  <div className="line-through text-gray-700">
                    {formatVND(course?.price ?? 0)}
                  </div>
                </div>
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
      )}
    </Stack>
  );
}
