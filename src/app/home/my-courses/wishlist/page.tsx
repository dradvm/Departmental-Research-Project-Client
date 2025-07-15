"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import { Heart, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  faHeart,
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import wishlistService from "services/wishlist.service";
import { Course } from "types/course";
import { formatDuration2 } from "utils/time";
import { formatVND } from "utils/money";
import Loading from "components/Main/Loading/Loading";

function CourseItem({ course }: { course: Course }) {
  const [isFavorite, setFavorite] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsLoading(true);
    if (isFavorite) {
      wishlistService
        .removeWishlist(course.courseId)
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      wishlistService
        .addWishlist(course.courseId)
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
    setFavorite((prev) => !prev);
  };
  const rating = useMemo(() => {
    const reviews = course.Review ?? [];
    return Number(
      (
        reviews.reduce((total, review) => total + review.rating, 0) /
        (reviews.length || 1)
      ).toFixed(1)
    );
  }, [course]);
  const totalTime = useMemo(() => {
    return course.Section?.reduce(
      (total, section) =>
        total +
        section.Lecture.reduce((time, lecture) => time + lecture.time, 0),
      0
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
  return (
    <Link href={"/"} className="group">
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
            ></motion.div>
          </div>
          {isLoading ? (
            <div className="absolute top-0 right-0 m-2 animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            <div
              className="absolute top-0 right-0 text-white p-2 hover:text-slate-200"
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <FontAwesomeIcon icon={faHeart} fontSize={20} />
              ) : (
                <Heart size={20} />
              )}
            </div>
          )}
        </div>
        <Stack className="gap-y-1">
          <div className="font-medium text-base/5 line-clamp-2 max-h-10">
            {course.title}
          </div>
          <div className="text-slate-500 text-xs truncate">
            {course.User?.name}
          </div>
          <div className="flex items-center space-x-1">
            <div className="text-yellow-700 font-medium text-sm">{rating}</div>
            <div className="flex">
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
            <div className="text-sm">({course._count?.Review})</div>
          </div>
          <div className="text-xs text-slate-600">
            Tổng số {formatDuration2(totalTime ?? 0)} {" · "}{" "}
            {course.Section?.flatMap((section) => section.Lecture).length} bài
            giảng
          </div>
          <div className="font-medium">{formatVND(course.price)}</div>
        </Stack>
      </Stack>
    </Link>
  );
}

export default function WishListPage() {
  const [wishlist, setWishlist] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isHasWishlist, setIsHasWishlist] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const loadWishlist = useCallback(() => {
    setIsLoading(true);
    wishlistService.getWishlist(searchValue).then((res) => {
      setIsLoading(false);
      setWishlist(res.data.flatMap((ws: { Course: Course }) => ws.Course));
      setIsFirstLoad(false);
    });
  }, [searchValue]);

  const handleSearch = () => {
    setSearchValue(search);
  };
  const handleClear = () => {
    setSearch("");
    setSearchValue("");
  };

  useEffect(() => {
    if (!isFirstLoad) {
      setIsHasWishlist(wishlist.length > 0);
    }
  }, [isFirstLoad, wishlist]);

  useEffect(() => {
    setIsLoading(false);
    loadWishlist();
  }, [loadWishlist]);

  return (
    <>
      {isFirstLoad ? (
        <div className="py-32">
          <Loading />
        </div>
      ) : (
        <>
          {isHasWishlist ? (
            <Stack className="gap-y-8">
              <div className="flex items-center justify-between">
                <div className="font-medium text-lg">
                  {searchValue.trim().length > 0 && (
                    <>
                      {wishlist.length} kết quả tìm kiếm cho:{" "}
                      <b>{searchValue}</b>
                    </>
                  )}
                </div>
                <div className="flex space-x-3">
                  <Input
                    value={search}
                    handleValue={setSearch}
                    placeholder="Tìm khoá học"
                  />
                  <div className="flex space-x-2">
                    {search.trim().length > 0 && (
                      <Button
                        variant="filled"
                        className="px-4 py-2"
                        onClick={handleClear}
                      >
                        <X size={16} />
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      className="px-4 py-2"
                      onClick={handleSearch}
                    >
                      <Search size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <div className="py-20">
                  <Loading />
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                  {wishlist.length > 0 ? (
                    wishlist.map((course, index) => {
                      return <CourseItem key={index} course={course} />;
                    })
                  ) : (
                    <></>
                  )}
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
