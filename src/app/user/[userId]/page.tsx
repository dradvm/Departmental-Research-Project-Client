"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, BookOpen, Award, Badge } from "lucide-react";
import CourseItem from "components/Course/CourseItem";
import { Button } from "components/Button/Button";
import { userService } from "services/user.service";
import { useParams } from "next/navigation";
import { UserType } from "types/user";
import MyAvatar from "components/Avatar/Avatar";
import { Course } from "types/course";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mui/material";
import { Category } from "types/category";

export default function UserProfile() {
  const { userId } = useParams<{
    userId: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const totalStudent = useMemo(() => {
    if (user) {
      return (
        user.Course?.reduce(
          (total, course) => total + (course._count?.Enrollment ?? 0),
          0
        ) ?? 0
      );
    }
    return 0;
  }, [user]);
  const totalReview = useMemo(() => {
    if (user) {
      return (
        user.Course?.reduce(
          (total, course) => total + (course._count?.Review ?? 0),
          0
        ) ?? 0
      );
    }
    return 0;
  }, [user]);

  const averageRate = useMemo(() => {
    if (user && totalReview > 0) {
      const totalRate =
        user.Course?.reduce(
          (total, course) =>
            total +
            (course.Review ?? []).reduce(
              (total2, review) => total2 + review.rating,
              0
            ),
          0
        ) ?? 0;
      return Number(totalRate / totalReview).toFixed(1);
    }
    return 0;
  }, [user, totalReview]);

  useEffect(() => {
    userService
      .getUserProfile(Number(userId))
      .then((res) => {
        const user: UserType | null = res.data.data;
        setUser(user);
        if (user) {
          setFilteredCourses(user.Course ?? []);
          const allCategories =
            user.Course?.flatMap(
              (course) =>
                course.CourseCategory?.map((cc) => cc.Category).filter(
                  (cat) => !!cat
                ) ?? []
            ) ?? [];

          const uniqueCategories: Category[] = Array.from(
            new Map(allCategories.map((cat) => [cat.categoryId, cat])).values()
          );
          setCategories(uniqueCategories);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      {loading ? (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto lg:mx-0" />

              <div className="flex-1 space-y-4">
                <div className="h-8 w-1/2 bg-gray-200 rounded" />
                <div className="h-5 w-1/4 bg-gray-200 rounded" />
                <div className="h-5 w-1/6 bg-gray-200 rounded" />
                <div className="h-4 w-full max-w-xl bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2 text-center">
                      <div className="h-6 w-12 mx-auto bg-gray-200 rounded" />
                      <div className="h-4 w-20 mx-auto bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-24 rounded-full bg-gray-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          {/* Header */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Instructor Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 mx-auto lg:mx-0">
                    <MyAvatar
                      user={{
                        img: user?.img,
                        name: user?.name ?? "",
                        isActive: true,
                        isDeleted: false,
                      }}
                      width={160}
                      height={160}
                      fontSize="3rem"
                    />
                  </div>
                </div>

                <Stack className="w-full space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {user?.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {user?.role === "INSTRUCTOR" ? "Giảng viên" : "Học viên"}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="w-5 h-5 text-yellow-600"
                    />
                    <span className="text-lg font-semibold text-gray-800">
                      {averageRate}
                    </span>
                  </div>

                  {user?.biography && (
                    <p className="text-gray-700 text-base leading-relaxed max-w-3xl">
                      {user.biography}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-6 h-6 text-blue-600 mr-2" />
                        <span className="text-xl font-bold text-gray-900">
                          {totalStudent}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">Học viên</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-6 h-6 text-green-600 mr-2" />
                        <span className="text-xl font-bold text-gray-900">
                          {user?.Course?.length}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">Khóa học</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-6 h-6 text-purple-600 mr-2" />
                        <span className="text-xl font-bold text-gray-900">
                          {totalReview}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">Đánh giá</p>
                    </div>
                  </div>

                  {categories.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Chuyên môn:
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {categories.map((category) => (
                          <span
                            key={category.categoryId}
                            className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full text-gray-800"
                          >
                            {category.categoryName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Stack>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Khóa học của tôi ({filteredCourses.length})
              </h2>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category.categoryId}
                    variant={
                      selectedCategory.includes(category.categoryId.toString())
                        ? "filled"
                        : "primary"
                    }
                    onClick={() => {
                      if (
                        selectedCategory.includes(
                          category.categoryId.toString()
                        )
                      ) {
                        setSelectedCategory((prev) =>
                          prev.filter(
                            (item) => item !== category.categoryId.toString()
                          )
                        );
                      } else {
                        setSelectedCategory((prev) => [
                          ...prev,
                          category.categoryId.toString(),
                        ]);
                      }
                    }}
                    className="capitalize"
                  >
                    {category.categoryName}
                  </Button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-4 gap-6">
              {filteredCourses
                .filter(
                  (course) =>
                    selectedCategory.length === 0 ||
                    course.CourseCategory?.flatMap(
                      (item) => item.categoryId
                    ).some((item) => selectedCategory.includes(item.toString()))
                )
                .map((course) => (
                  <CourseItem key={course.courseId} course={course} />
                ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy khóa học nào
                </h3>
                <p className="text-gray-500">
                  Thử chọn danh mục khác để xem các khóa học có sẵn.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
