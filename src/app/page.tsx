"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import MyAvatar from "components/Avatar/Avatar";
import { Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { Course } from "types/course";
import { useEffect, useState } from "react";
import enrollmentService from "services/enrollment.service";
import CourseEnrolledWithLastLectureSwiper from "components/Swiper/CourseEnrolledWithLastLectureSwiper";
import { useUser } from "../context/UserContext";
import { Category } from "types/category";
import courseService from "services/course.service";
import CourseSwiper from "components/Swiper/CourseSwiper";

library.add(fas, far, fab);

export default function Home() {
  const [courseEnrolledStudy, setCourseEnrolledStudy] = useState<Course[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useUser();
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  useEffect(() => {
    enrollmentService
      .getCourseEnrolledWithLastStudy()
      .then((res) => {
        {
          setCourseEnrolledStudy(res.data);
        }
      })
      .catch((err) => console.log(err));
    courseService
      .getCategories()
      .then((res) => {
        setCategories(res.data);
        setIsSkeleton(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Stack className="gap-y-20 px-32 py-8">
      <section className="">
        <Stack className="gap-y-10">
          {user && (
            <div className="flex items-center space-x-5">
              <MyAvatar
                user={{
                  isActive: true,
                  isDeleted: false,
                  img: user.image,
                  name: user.name,
                }}
                height={64}
                width={64}
                fontSize="2rem"
              />
              <Stack className="gap-y-1">
                <div className="text-2xl font-bold">
                  Chào mừng {user.name} trở lại!
                </div>
                <div>{user.biography}</div>
              </Stack>
            </div>
          )}
          <div className="relative w-full h-96">
            <div className="absolute z-10 px-4 py-6 bg-white rounded-sm shadow translate-x-16 translate-y-16 w-96">
              <Stack className="gap-y-1">
                <div className="text-2xl font-medium">
                  Mới ghé thăm EduMarket? Bạn thật may mắn!
                </div>
                <div>
                  Các khóa học có giá từ 279.000 ₫. Nhận ưu đãi học viên mới
                  trước khi ưu đãi hết hạn.
                </div>
              </Stack>
            </div>
            <Image src={"/banner.jpg"} fill alt="banner" />
          </div>
        </Stack>
      </section>

      {isSkeleton ? (
        <Stack className="animate-pulse gap-y-10">
          {/* Tiêu đề + Link */}
          <Stack className="gap-y-5">
            <div className="flex items-center justify-between">
              <div className="h-6 w-56 bg-gray-300 rounded"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Swiper đầu tiên (Học tiếp) */}
            <div className="grid grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-40"></div>
                ))}
            </div>
          </Stack>

          {/* Các danh mục khác (giả lập thêm 2 slider nữa) */}
          {Array(2)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="space-y-4">
                {/* Tiêu đề danh mục */}
                <div className="flex justify-between items-center">
                  <div className="h-6 w-48 bg-gray-300 rounded"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-200 rounded-lg h-40"
                      ></div>
                    ))}
                </div>
              </div>
            ))}
        </Stack>
      ) : (
        <>
          {courseEnrolledStudy !== undefined &&
            courseEnrolledStudy.length > 0 && (
              <section>
                <Stack className="gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-2xl">
                      Hãy bắt đầu học nào
                    </div>
                    <Link
                      className="font-medium text-indigo-600 underline"
                      href={"/home/my-courses/learning"}
                    >
                      Học tập
                    </Link>
                  </div>
                  <CourseEnrolledWithLastLectureSwiper />
                </Stack>
              </section>
            )}
          {categories !== undefined && categories.length > 0 ? (
            <>
              {categories.map((category) => (
                <CourseSwiper category={category} key={category.categoryId} />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Stack>
  );
}
