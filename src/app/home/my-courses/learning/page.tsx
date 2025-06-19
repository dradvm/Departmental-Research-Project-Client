"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
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
import courseService from "services/course.service";
import { Enrollment } from "types/enrollment";

function Course({ title, instructor }: { title: string; instructor: string }) {
  return (
    <Link href={"/"} className="group">
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
            {title}
          </div>
          <div className="text-slate-500 text-xs truncate">{instructor}</div>
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
  );
}

export default function LearningPage() {
  const [courseEnrolled, setCourseEnrolled] = useState<Enrollment[]>([]);

  useEffect(() => {
    courseService
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
          <div className="w-[120px]">Sắp xếp theo</div>
          <div className="">Lọc theo</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small" className="">
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
            return (
              <Course
                key={index}
                title={course.Course.title}
                instructor={course.Course.userId.toString()}
              />
            );
          })}
      </div>
    </Stack>
  );
}
