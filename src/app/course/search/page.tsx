"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter } from "lucide-react";
import CourseItem from "components/Course/CourseItem";
import { Card, CardContent, Slider } from "@mui/material";
import { Button } from "components/Button/Button";
import FlexibleSelect from "components/FlexibleSelect/FlexibleSelect";
import { Course } from "types/course";
import courseService from "services/course.service";
import { Category } from "types/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { useUser } from "../../../context/UserContext";
import Loading from "components/Main/Loading/Loading";
export default function CourseSearchPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "All"
  );
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [durationRange, setDurationRange] = useState([0, 20]); // in hours
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const search = searchParams.get("search") || "";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();
  const handlePriceRange = (event: Event, newValue: number[]) => {
    setPriceRange(newValue);
  };

  const handleDurationRange = (event: Event, newValue: number[]) => {
    setDurationRange(newValue);
  };
  const clearFilters = () => {
    window.location.href = "/course/search";
  };

  const handleFilter = useCallback(() => {
    setIsLoading(true);
    if (user) {
      courseService
        .searchCoursePrivate(
          search,
          minRating,
          selectedCategory === "All" ? undefined : Number(selectedCategory),
          priceRange[0],
          priceRange[1],
          durationRange[0],
          durationRange[1]
        )
        .then((res) => {
          setCourses(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      courseService
        .searchCoursePublic(
          search,
          minRating,
          selectedCategory === "All" ? undefined : Number(selectedCategory),
          priceRange[0],
          priceRange[1],
          durationRange[0],
          durationRange[1]
        )
        .then((res) => {
          setCourses(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [durationRange, minRating, priceRange, search, selectedCategory, user]);

  useEffect(() => {
    courseService
      .getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  return (
    <div className="">
      <div className="flex justify-between space-x-10">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <Card className="sticky top-0 shadow-md border border-gray-200">
            <CardContent className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                </h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={clearFilters}
                  className="text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  Xóa tất cả
                </Button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">
                  Thể loại
                </label>
                <FlexibleSelect
                  value={selectedCategory}
                  handleValue={setSelectedCategory}
                  items={[
                    {
                      value: "All",
                      text: "Tất cả",
                    },
                    ...categories.map((category) => ({
                      value: category.categoryId.toString(),
                      text: category.categoryName,
                    })),
                  ]}
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2 text-gray-700">
                  Đánh giá tối thiểu
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="accent-indigo-600"
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="flex items-center gap-1 text-sm text-gray-600"
                      >
                        {rating > 0 ? (
                          <>
                            {rating}
                            <FontAwesomeIcon
                              icon={faStar}
                              className="h-3 w-3 text-yellow-500"
                            />
                            trở lên
                          </>
                        ) : (
                          "Tất cả"
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2 text-gray-700">
                  Khoảng giá (VNĐ)
                </label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRange}
                    max={10000000}
                    min={0}
                    step={10000}
                    sx={{
                      color: "#4f46e5", // Tailwind indigo-600
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{priceRange[0].toLocaleString("vi-VN")}đ</span>
                    <span>{priceRange[1].toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2 text-gray-700">
                  Thời lượng (giờ)
                </label>
                <div className="px-2">
                  <Slider
                    value={durationRange}
                    onChange={handleDurationRange}
                    max={20}
                    min={0}
                    step={1}
                    sx={{
                      color: "#4f46e5", // Tailwind indigo-600
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{durationRange[0]}h</span>
                    <span>{durationRange[1]}h</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Results */}
        <div className="flex-1 px-10 py-8">
          {isLoading ? (
            <div className="h-full flex items-center justify-around">
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    Tìm thấy {courses.length} khóa học
                  </span>
                </div>
              </div>

              {/* Course Grid */}
              {courses.length > 0 ? (
                <div className="grid grid-cols-4 gap-6">
                  {courses.map((course) => (
                    <CourseItem key={course.courseId} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy khóa học nào
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                  </p>
                  <Button onClick={clearFilters} variant="filled">
                    Xóa tất cả bộ lọc
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
