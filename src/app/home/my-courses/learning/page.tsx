"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faPlay, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Enrollment } from "types/enrollment";
import { Course } from "types/course";
import { Lecture } from "types/lecture";
import studyProgressSerivce from "services/study-progress.service";
import enrollmentService from "services/enrollment.service";

function CourseItem({ course }: { course: Course }) {
  const [lecture, setLecture] = useState<Lecture>();
  useEffect(() => {
    studyProgressSerivce
      .getLastStudyLecture(course.courseId)
      .then((res) => {
        console.log(res.data);
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
              src={"/thumbnail.webp"}
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
              {course.User.name}
            </div>
          </Stack>
          <Stack className="mt-2 text-indigo-600">
            <LinearProgress
              variant="determinate"
              value={3}
              className="w-full col-span-3"
              sx={{
                height: 2,
              }}
              color="inherit"
            />
            <div className="flex justify-between mt-1">
              <div className="text-xs text-slate-700 h-4">Hoàn thành 100%</div>
              <Stack className="items-end">
                <div className="flex items-center space-x-1 h-4">
                  {[1, 2, 3, 4, 5].map((s, i) => {
                    return (
                      <FontAwesomeIcon
                        key={s}
                        icon={i + 1 > 3 ? regularStar : solidStar}
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
  const [sort, setSort] = useState<string>("recentlyAccessed");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [progressFilter, setProgressFilter] = useState<string>("");
  const [instructorFilter, setInstructorFilter] = useState<string>("");

  const [categories, setCategories] = useState<string[]>([
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Mobile Development",
    "Game Development",
  ]);
  const [instructors, setInstructors] = useState<string[]>([
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
  ]);

  const handleSetSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const handleSetCategoryFilter = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value as string);
  };
  const handleSetProgressFilter = (event: SelectChangeEvent) => {
    setProgressFilter(event.target.value as string);
  };
  const handleSetInstructorFilter = (event: SelectChangeEvent) => {
    setInstructorFilter(event.target.value as string);
  };
  useEffect(() => {
    enrollmentService
      .getCourseEnrolled()
      .then((res) => {
        setCourseEnrolled(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Stack className="gap-y-8">
      <Stack className="space-y-2">
        <div className="flex space-x-3 text-sm font-medium">
          <div className="w-[200px]">Sắp xếp theo</div>
          <div className="">Lọc theo</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <FormControl sx={{ minWidth: 200 }} size="small" className="">
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={sort}
                onChange={(e) => handleSetSort(e)}
                sx={{
                  fontSize: "0.875rem", // Giảm font size
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi focus
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem", // Giảm font size
                      },
                    },
                  },
                }}
              >
                <MenuItem value={"recentlyAccessed"}>
                  Đã truy cập gần đây
                </MenuItem>
                <MenuItem value={"recentlyEnrolled"}>
                  Đã ghi danh gần đây
                </MenuItem>
                <MenuItem value={"titleAsc"}>Tiêu đề: Từ A đến Z</MenuItem>
                <MenuItem value={"titleDesc"}>Tiêu đề: Từ Z đến A</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                value={categoryFilter}
                onChange={(e) => handleSetCategoryFilter(e)}
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  fontSize: "0.875rem", // Giảm font size
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi focus
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem", // Giảm font size
                      },
                    },
                  },
                }}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <>Danh mục</>; // placeholder hiển thị
                  }
                  return selected;
                }}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                value={progressFilter}
                onChange={(e) => handleSetProgressFilter(e)}
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  fontSize: "0.875rem", // Giảm font size
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi focus
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem", // Giảm font size
                      },
                    },
                  },
                }}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <>Danh mục</>; // placeholder hiển thị
                  }
                  return selected;
                }}
              >
                <MenuItem value="inProgress">Đang tiến hành</MenuItem>
                <MenuItem value="completed">Đã hoàn thành</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  fontSize: "0.875rem", // Giảm font size
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(91, 73, 244)", // Khi focus
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        fontSize: "0.875rem", // Giảm font size
                      },
                    },
                  },
                }}
                value={instructorFilter}
                onChange={(e) => handleSetInstructorFilter(e)}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <>Giảng viên</>; // placeholder hiển thị
                  }
                  return selected;
                }}
              >
                {instructors.map((instructor, index) => (
                  <MenuItem key={index} value={instructor}>
                    {instructor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex space-x-3">
            <Input />
            <Button variant="primary" className="px-4 py-2">
              <Search size={16} />
            </Button>
          </div>
        </div>
      </Stack>
      <div className="grid grid-cols-4 gap-x-5 gap-y-3">
        {courseEnrolled &&
          courseEnrolled.map((course, index) => {
            return <CourseItem key={index} course={course.Course} />;
          })}
      </div>
    </Stack>
  );
}
