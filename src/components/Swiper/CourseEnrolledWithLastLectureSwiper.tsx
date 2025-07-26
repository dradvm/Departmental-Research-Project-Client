import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, IconButton, LinearProgress, Stack } from "@mui/material";
import { Swiper as SwiperCore } from "swiper/types";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Course } from "types/course";
import enrollmentService from "services/enrollment.service";
import { Enrollment } from "types/enrollment";
import Link from "next/link";
import { formatDuration2 } from "utils/time";
export default function CourseEnrolledWithLastLectureSwiper() {
  const [enrolledStudy, setCourseEnrolledStudy] = useState<Enrollment[]>([]);
  const swiperRef = useRef<SwiperCore>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

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

  const getNameLastLecture = (course: Course): string => {
    const lectures = course.Section?.flatMap((section) => section.Lecture);
    const lastLectureStudy = course.LastLectureStudy;
    if (lastLectureStudy) {
      const lecture =
        lectures?.filter(
          (lecture) =>
            lecture.lectureId === lastLectureStudy[0].Lecture.lectureId
        )[0] ?? null;
      if (lecture) {
        const index =
          lectures?.findIndex((l) => l.lectureId === lecture.lectureId) ?? 0;
        return `${index + 1}. ${lecture.nameLecture}`;
      }
    }
    return "";
  };

  useEffect(() => {
    enrollmentService
      .getCourseEnrolledWithLastStudy()
      .then((res) => {
        setIsEnd(res.data.length <= 3);
        setCourseEnrolledStudy(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box position="relative">
      <Swiper
        modules={[Navigation]}
        onSwiper={onSwiperInit}
        onSlideChange={onSlideChange}
        slidesPerView={3}
        slidesPerGroup={2}
        spaceBetween={16}
        loop={false}
        speed={700}
      >
        {enrolledStudy.map((enroll, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`/course/${enroll.courseId}/learn/lecture/${enroll.Course.LastLectureStudy?.[0]?.Lecture?.lectureId ?? ""}`}
              className="flex bg-white shadow-lg border border-gray-200"
            >
              <div className="w-28 h-36 overflow-hidden flex items-center justify-center relative flex-shrink-0">
                <Image
                  src="/thumbnail.webp"
                  alt="Live from space album cover"
                  width={128}
                  height={256}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black opacity-40" />
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white bg-opacity-80 w-10 h-10">
                      <FontAwesomeIcon icon={faPlay} />
                    </span>
                  </div>
                </div>
              </div>

              <Stack className="grow">
                <Stack className="justify-between p-4 grow">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      {enroll.Course.title}
                    </div>
                    <div className="text-base text-black font-medium">
                      {getNameLastLecture(enroll.Course)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="font-medium">Bài giảng</span>
                    {" · "}Còn{" "}
                    {formatDuration2(
                      (enroll.Course.LastLectureStudy?.[0]?.Lecture.time ?? 0) -
                        (enroll.Course.LastLectureStudy?.[0]?.Lecture
                          .StudyProgress?.[0]?.currentTime ?? 0)
                    )}
                  </div>
                </Stack>
                {enroll.Course.LastLectureStudy?.[0]?.Lecture.StudyProgress?.[0]
                  ?.currentTime !== undefined &&
                enroll.Course.LastLectureStudy?.[0]?.Lecture.StudyProgress?.[0]
                  ?.currentTime !== 0 ? (
                  <LinearProgress
                    variant="determinate"
                    className="w-full text-indigo-600"
                    value={
                      ((enroll.Course.LastLectureStudy?.[0]?.Lecture
                        .StudyProgress?.[0]?.currentTime ?? 0) /
                        enroll.Course.LastLectureStudy?.[0]?.Lecture.time) *
                      100
                    }
                    color="inherit"
                    sx={{
                      height: 6,
                      transition: "height 0.1s ease",
                      cursor: "pointer",
                      "& .MuiLinearProgress-bar": {
                        transition: "none !important",
                      },
                    }}
                  />
                ) : (
                  <div className="w-full" style={{ height: 6 }}></div>
                )}
              </Stack>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút trái */}
      {!isBeginning && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 100,
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
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 100,
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
  );
}
