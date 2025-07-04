"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinearProgress, Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  faPlay,
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Enrollment } from "types/enrollment";
import { Course } from "types/course";
import { Lecture } from "types/lecture";
import studyProgressSerivce from "services/study-progress.service";
import enrollmentService from "services/enrollment.service";
import FlexibleSelect from "components/FlexibleSelect/FlexibleSelect";
import { Category } from "types/category";
import { StudyProgress } from "types/study-progress";
import Loading from "components/Main/Loading/Loading";

function CourseItem({ course }: { course: Course }) {
  const [lecture, setLecture] = useState<Lecture>();
  const progress = useMemo(() => {
    const studyProgress: StudyProgress[] =
      course.Section?.flatMap((section) =>
        section.Lecture.flatMap((lecture) => lecture.StudyProgress)
      ).filter((sp): sp is StudyProgress => sp !== undefined) || [];
    return Math.ceil(
      (studyProgress.reduce((total, sp) => total + (sp.isDone ? 1 : 0), 0) /
        studyProgress.length) *
        100
    );
  }, [course]);
  const rating = useMemo(() => {
    const reviews = course.Review ?? [];
    return Number(
      (
        reviews.reduce((total, review) => total + review.rating, 0) /
        (reviews.length || 1)
      ).toFixed(1)
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
  useEffect(() => {
    studyProgressSerivce
      .getLastStudyLecture(course.courseId)
      .then((res) => {
        setLecture(res.data);
      })
      .catch((err) => console.log(err));
  }, [course.courseId]);

  return (
    lecture && (
      <Link
        href={`/course/${course.courseId}/learn/lecture/${lecture.lectureId}`}
        className="group"
      >
        <Stack className="gap-y-2">
          <div
            className="w-full h-44 relative"
            style={{ border: "1px solid #999" }}
          >
            <Image
              src={course.thumbnail}
              fill
              alt="props"
              className="object-cover"
            />
            <div className="absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100">
              <div className="w-full h-full bg-black opacity-50"></div>
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 0, scale: 1 }}
                className="text-white absolute w-full h-full flex items-center justify-center top-0 left-0"
              >
                <div className="absolute rounded-full p-6 bg-white"></div>
                <FontAwesomeIcon
                  icon={faPlay}
                  className="absolute text-black text-xl"
                />
              </motion.div>
            </div>
          </div>
          <Stack className="gap-y-1">
            <div className="font-medium text-base/5 line-clamp-2 h-10">
              {course.title}
            </div>
            <div className="text-slate-500 text-xs truncate">
              {course.User?.name}
            </div>
          </Stack>
          <Stack className="mt-2 text-indigo-600">
            <LinearProgress
              variant="determinate"
              value={progress}
              className="w-full col-span-3"
              sx={{
                height: 2,
              }}
              color="inherit"
            />
            <div className="flex justify-between mt-1">
              <div className="text-xs text-slate-700 h-4">
                Hoàn thành {progress}%
              </div>
              <Stack className="items-end">
                <div className="flex items-center space-x-1 h-4">
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
                <div className="text-xs text-slate-700 ">Đưa ra đánh giá</div>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </Link>
    )
  );
}

export default function LearningPage() {
  const [courseEnrolled, setCourseEnrolled] = useState<Enrollment[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isHasCourseEnrolled, setIsHasCourseEnrolled] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("recentlyAccessed");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [progressFilter, setProgressFilter] = useState<string>("");
  const [instructorFilter, setInstructorFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<
    {
      userId: number;
      name: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadCourses = useCallback(() => {
    enrollmentService
      .getCourseEnrolled(
        sort,
        categoryFilter === "" ? undefined : categoryFilter,
        progressFilter,
        instructorFilter === "" ? undefined : instructorFilter,
        searchValue
      )
      .then((res) => {
        setIsLoading(false);
        setCourseEnrolled(res.data);
        setIsFirstLoad(false);
      })
      .catch((err) => console.log(err));
  }, [sort, categoryFilter, progressFilter, instructorFilter, searchValue]);

  const handleSearch = useCallback(() => {
    setSearchValue(search);
  }, [search]);

  const clearFilter = () => {
    setSort("recentlyAccessed");
    setCategoryFilter("");
    setProgressFilter("");
    setInstructorFilter("");
    setSearch("");
    setSearchValue("");
  };

  useEffect(() => {
    if (!isFirstLoad) {
      setIsHasCourseEnrolled(courseEnrolled.length > 0);
    }
  }, [isFirstLoad, courseEnrolled]);

  useEffect(() => {
    enrollmentService
      .getCourseEnrolledCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
    enrollmentService
      .getCourseEnrolledInstructors()
      .then((res) => {
        setInstructors(res.data);
      })
      .catch((err) => console.log(err));
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [courseEnrolled]);

  useEffect(() => {
    setIsLoading(true);
    loadCourses();
  }, [loadCourses]);

  return (
    <>
      {isFirstLoad ? (
        <div className="py-32">
          <Loading />
        </div>
      ) : (
        <>
          {isHasCourseEnrolled ? (
            <Stack className="gap-y-8">
              <div className="flex justify-between">
                <div className="flex space-x-3">
                  <Stack className="gap-y-2">
                    <div className="text-xs font-bold">Sắp xếp theo</div>
                    <FlexibleSelect
                      value={sort}
                      handleValue={setSort}
                      items={[
                        {
                          value: "recentlyAccessed",
                          text: "Đã truy cập gần đây",
                        },
                        {
                          value: "recentlyEnrolled",
                          text: "Đã ghi danh gần đây",
                        },
                        {
                          value: "titleAsc",
                          text: "Tiêu đề: Từ A đến Z",
                        },
                        {
                          value: "titleDesc",
                          text: "Tiêu đề: Từ Z đến A",
                        },
                      ]}
                      minWidth={200}
                    />
                  </Stack>
                  <Stack className="gap-y-2">
                    <div className="text-xs font-bold">Lọc theo</div>
                    <div className="flex space-x-3 items-center ">
                      <FlexibleSelect
                        value={categoryFilter}
                        handleValue={setCategoryFilter}
                        minWidth={120}
                        items={categories.map((category) => {
                          return {
                            value: category.categoryId.toString(),
                            text: category.categoryName,
                          };
                        })}
                        handleRenderValue={(selected) => {
                          if (selected === "") {
                            return "Danh mục"; // placeholder hiển thị
                          }
                          return (
                            categories.find(
                              (category) =>
                                category.categoryId.toString() === selected
                            )?.categoryName ?? ""
                          );
                        }}
                      />
                      <FlexibleSelect
                        value={progressFilter}
                        handleValue={setProgressFilter}
                        minWidth={120}
                        items={[
                          {
                            value: "inProgress",
                            text: "Đang tiến hành",
                          },
                          {
                            value: "completed",
                            text: "Đã hoàn thành",
                          },
                        ]}
                        handleRenderValue={(selected) => {
                          if (selected === "") {
                            return "Tiến độ"; // placeholder hiển thị
                          }
                          const value = [
                            {
                              value: "inProgress",
                              text: "Đang tiến hành",
                            },
                            {
                              value: "completed",
                              text: "Đã hoàn thành",
                            },
                          ];
                          return (
                            value.find((item) => item.value === selected)
                              ?.text ?? ""
                          );
                        }}
                      />
                      <FlexibleSelect
                        value={instructorFilter}
                        handleValue={setInstructorFilter}
                        minWidth={120}
                        items={instructors.map((instructor) => {
                          return {
                            value: instructor.userId.toString(),
                            text: instructor.name,
                          };
                        })}
                        handleRenderValue={(selected) => {
                          if (selected === "") {
                            return "Giảng viên"; // placeholder hiển thị
                          }
                          return (
                            instructors.find(
                              (instructor) =>
                                instructor.userId.toString() === selected
                            )?.name ?? ""
                          );
                        }}
                      />
                      <div
                        onClick={clearFilter}
                        className="flex items-center text-sm font-medium cursor-pointer h-full hover:bg-gray-300 rounded px-1 text-middle"
                      >
                        Thiết lập lại
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Input
                    value={search}
                    handleValue={setSearch}
                    placeholder="Tìm khoá học"
                  />
                  <Button
                    variant="primary"
                    className="px-4 py-2"
                    onClick={handleSearch}
                  >
                    <Search size={16} />
                  </Button>
                </div>
              </div>
              {isLoading ? (
                <div className="py-20">
                  <Loading />
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-x-5 gap-y-3 min-h-64">
                  {courseEnrolled.map((course, index) => {
                    return <CourseItem key={index} course={course.Course} />;
                  })}
                </div>
              )}
            </Stack>
          ) : (
            <div className="py-32 flex justify-around">
              <Stack className="gap-y-3 items-center">
                <Link href={"/"}>
                  <Button variant="filled" size="lg">
                    Xem ngay các khoá học
                  </Button>
                </Link>
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  );
}
