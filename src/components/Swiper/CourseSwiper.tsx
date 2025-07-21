import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, IconButton, Stack } from "@mui/material";
import { Swiper as SwiperCore } from "swiper/types";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Course } from "types/course";
import { Category } from "types/category";
import CourseItem from "components/Course/CourseItem";
import courseService from "services/course.service";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";
export default function CourseSwiper({ category }: { category: Category }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const swiperRef = useRef<SwiperCore>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  const { user } = useUser();

  const onSwiperInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };

  const onSlideChange = (swiper: SwiperCore) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  useEffect(() => {
    if (user) {
      courseService
        .getCoursesByCategoryPrivate(category.categoryId)
        .then((res) => {
          setIsEnd(res.data.length <= 5);
          setCourses(res.data);
          setIsSkeleton(false);
        })
        .catch((err) => console.log(err));
    } else {
      courseService
        .getCoursesByCategoryPublic(category.categoryId)
        .then((res) => {
          setIsEnd(res.data.length <= 5);
          setCourses(res.data);
          setIsSkeleton(false);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user, category.categoryId]);

  return (
    <>
      {courses.length > 0 ? (
        <Stack className="gap-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{category.categoryName}</div>
            <Link
              className="font-medium text-indigo-600 underline"
              href={`/course/search?category=${category.categoryId}`}
            >
              Xem thêm
            </Link>
          </div>
          {isSkeleton ? (
            <div className="grid grid-cols-5 gap-4 animate-pulse">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-40"></div>
                ))}
            </div>
          ) : (
            <Box position="relative">
              <Swiper
                modules={[Navigation]}
                onSwiper={onSwiperInit}
                onSlideChange={onSlideChange}
                slidesPerView={5}
                slidesPerGroup={5}
                spaceBetween={16}
                loop={false}
                speed={700}
              >
                {courses.map((course, index) => (
                  <SwiperSlide key={index}>
                    <CourseItem course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Nút trái */}
              {!isBeginning && (
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    top: "25%",
                    left: 0,
                    transform: "translateY(-25%)",
                    zIndex: 30,
                    bgcolor: "white",
                    boxShadow: 1,
                    padding: "12px",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#eee",
                    },
                  }}
                >
                  <ChevronLeft />
                </IconButton>
              )}

              {/* Nút phải */}
              {!isEnd && (
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    top: "25%",
                    right: 0,
                    transform: "translateY(-25%)",
                    zIndex: 30,
                    bgcolor: "white",
                    boxShadow: 1,
                    padding: "12px",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#eee",
                    },
                  }}
                >
                  <ChevronRight />
                </IconButton>
              )}
            </Box>
          )}
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}
