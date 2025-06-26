import { Divider, LinearProgress, Stack, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Search, User, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "components/Button/Button";
import Image from "next/image";
import Input from "components/Input/Input";
import courseService from "services/course.service";
import { Review, ReviewOverview } from "types/review";
import { getTimeAgo } from "utils/time";
import { getInitials } from "utils/text";
import CourseLoading from "./CourseLoading";
import FlexibleSelect from "components/FlexibleSelect/FlexibleSelect";
function BarReviews({
  stars,
  barReviewSelect,
  onClick = () => {},
  reviews,
  percent,
}: {
  reviews: number;
  percent: number;
  stars: number;
  barReviewSelect: number;
  onClick?: (stars: number) => void;
}) {
  return (
    <Tooltip title={`${reviews} đánh giá`}>
      <div
        className={`flex w-full space-x-3 items-center  ${
          reviews === 0 || (barReviewSelect !== 0 && barReviewSelect !== stars)
            ? "opacity-30"
            : ""
        } 
      ${reviews === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => {
          if (reviews !== 0) onClick(stars);
        }}
      >
        <LinearProgress
          variant="determinate"
          value={percent}
          className="w-full col-span-3"
          sx={{
            height: 8,
          }}
          color="inherit"
        />
        <div className="flex items-center justify-between w-32">
          <div className="flex items-center w-24 justify-between text-sm">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <FontAwesomeIcon
                  key={`${stars}-${index}`}
                  icon={index + 1 > stars ? regularStar : solidStar}
                  className={`text-xs text-yellow-600`}
                />
              ))}
          </div>
        </div>
        <div className="flex items-center w-20 justify-between text-sm select-none">
          <div className="text-xs underline font-medium text-indigo-600">
            {percent}%
          </div>
          {barReviewSelect === stars ? (
            <div>
              <X size={14} color="black" />
            </div>
          ) : null}
        </div>
      </div>
    </Tooltip>
  );
}
function TextContent({
  text,
  keywords = "",
}: {
  text: string;
  keywords: string;
}) {
  const kw = keywords.split(" ");
  const regex = new RegExp(`(${kw.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        kw.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
          <span key={index} className="font-medium">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}
function ReviewItem({
  review,
  keywords,
}: {
  review: Review;
  keywords: string;
}) {
  return (
    <Stack className="gap-y-8 mt-5">
      <div className="flex space-x-5">
        <div className="flex">
          <div className="rounded-full w-12 h-12 overflow-hidden">
            {!review.User.isDeleted && review.User.isActive ? (
              review.User.img ? (
                <Image
                  src={review.User.img}
                  alt="image"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="bg-black h-full w-full flex items-center justify-around">
                  <div className="text-white font-medium text-lg">
                    {getInitials(review.User.name)}
                  </div>
                </div>
              )
            ) : (
              <div className="bg-black h-full w-full flex items-center justify-around">
                <User size={20} color="white" />
              </div>
            )}
          </div>
        </div>
        <Stack className="gap-y-1">
          <div className="font-bold">
            {!review.User.isDeleted && review.User.isActive
              ? review.User.name
              : "Tài khoản người dùng"}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FontAwesomeIcon
                    key={`${review.rating}-${index}`}
                    icon={index + 1 > review.rating ? regularStar : solidStar}
                    className={`text-xs text-yellow-600`}
                  />
                ))}
            </div>
            <div className="font-thin text-gray-700 text-sm">
              {getTimeAgo(review.createdAt)}
            </div>
          </div>
          <div className="text-sm">
            <TextContent text={review.review} keywords={keywords} />
          </div>
        </Stack>
      </div>
      <Divider />
    </Stack>
  );
}

export default function CourseReviews({ courseId }: { courseId: string }) {
  const [barReviewSelect, setBarReviewSelect] = useState<number>(0);
  const [reviewOverview, setReviewOverview] = useState<ReviewOverview | null>(
    null
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [numberReviews, setNumberReviews] = useState<number | undefined>(
    undefined
  );
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const handleClearSearch = () => {
    setSearch("");
    setSearchValue("");
    setCursor(undefined);
  };
  const handleFilter = (value: string) => {
    setIsLoadingReviews(true);
    setCursor(undefined);
    setBarReviewSelect(parseInt(value));
  };
  const handleSearch = () => {
    if (searchValue !== search.trim().replace(/\s+/g, " ")) {
      setIsLoadingReviews(true);
      setSearchValue(search.trim().replace(/\s+/g, " "));
      setCursor(undefined);
    }
  };
  const handleLoadMore = () => {
    setCursor(reviews[reviews.length - 1].reviewId);
  };
  const handleBarReviewSelect = useCallback(
    (stars: number) => {
      setIsLoadingReviews(true);
      setCursor(undefined);
      if (barReviewSelect === stars) {
        setBarReviewSelect(0);
        return;
      }
      setBarReviewSelect(stars);
    },
    [barReviewSelect]
  );
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
      .getCourseReviewOverview(courseId)
      .then((res) => {
        setIsLoading(false);
        setReviewOverview(res.data);
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  useEffect(() => {
    if (cursor !== undefined) {
      courseService
        .getCourseReviews(
          courseId,
          barReviewSelect === 0 ? undefined : barReviewSelect,
          searchValue,
          cursor
        )
        .then((res) => {
          setIsLoadingReviews(false);
          setReviews((prev) => [...prev, ...res.data]);
        })
        .catch((err) => console.log(err));
    } else {
      courseService
        .getCourseReviews(
          courseId,
          barReviewSelect === 0 ? undefined : barReviewSelect,
          searchValue
        )
        .then((res) => {
          setIsLoadingReviews(false);
          setReviews(res.data);
        })
        .catch((err) => console.log(err));
    }
    courseService
      .getNumberCourseReviews(
        courseId,
        barReviewSelect === 0 ? undefined : barReviewSelect,
        searchValue
      )
      .then((res) => setTotalReviews(res.data))
      .catch((err) => console.log(err));
  }, [barReviewSelect, courseId, searchValue, cursor]);

  useEffect(() => {
    setNumberReviews(reviews.length);
  }, [reviews]);
  return (
    <>
      {isLoading ? (
        <CourseLoading />
      ) : reviewOverview?.average === null ? (
        <div className="flex w-full justify-center mt-3">
          <Button variant="primary">
            Khoá học chưa có đánh giá. Đánh giá ngay!
          </Button>
        </div>
      ) : (
        <Stack className="px-28 py-10 gap-y-10">
          <div className="">
            <div className="font-bold text-2xl">Đánh giá học viên</div>
            <div className="grid grid-cols-5 gap-x-3 justify-between mt-6 items-center">
              <Stack className=" items-center gap-y-2">
                <div className="text-6xl text-yellow-600 font-bold">
                  {reviewOverview?.average}
                </div>
                <div className="flex items-center w-24 justify-between text-sm">
                  {reviewOverview &&
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={getStartIcon(reviewOverview.average, index)}
                          className="text-xs text-yellow-600"
                        />
                      ))}
                </div>
                <div className="text-yellow-600 text-sm font-medium">
                  Đánh giá khoá học
                </div>
              </Stack>
              <Stack className="col-span-4 flex items-center justify-between gap-y-3 text-gray-500">
                {reviewOverview &&
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <BarReviews
                        key={index}
                        stars={5 - index}
                        onClick={handleBarReviewSelect}
                        reviews={reviewOverview?.ratings[5 - index - 1].review}
                        percent={reviewOverview?.ratings[5 - index - 1].percent}
                        barReviewSelect={barReviewSelect}
                      />
                    ))}
              </Stack>
            </div>
          </div>
          <Stack className="gap-y-5">
            <div>
              <div className="font-bold text-2xl">Đánh giá</div>
              <Stack className="mt-2 flex">
                <div className="font-medium text-sm mb-2 flex justify-end">
                  <div className="w-[160px]">Lọc đánh giá</div>
                </div>
                <div className="flex space-x-3 grow  items-center">
                  <Input
                    value={search}
                    handleValue={setSearch}
                    placeholder={"Tìm bình luận"}
                  />
                  <div className="flex">
                    {search.length > 0 && (
                      <Button
                        variant="filled"
                        className="px-4 py-2"
                        onClick={handleClearSearch}
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
                  <FlexibleSelect
                    minWidth={160}
                    value={barReviewSelect.toString()}
                    handleValue={handleFilter}
                    items={[
                      {
                        value: "0",
                        text: "Tất cả xếp hạng",
                      },
                      {
                        value: "5",
                        text: "Năm sao",
                        disabled: reviewOverview?.ratings[4].review === 0,
                      },
                      {
                        value: "4",
                        text: "Bốn sao",
                        disabled: reviewOverview?.ratings[3].review === 0,
                      },
                      {
                        value: "3",
                        text: "Ba sao",
                        disabled: reviewOverview?.ratings[2].review === 0,
                      },
                      {
                        value: "2",
                        text: "Hai sao",
                        disabled: reviewOverview?.ratings[1].review === 0,
                      },
                      {
                        value: "1",
                        text: "Một sao",
                        disabled: reviewOverview?.ratings[0].review === 0,
                      },
                    ]}
                  />
                </div>
              </Stack>
              {searchValue.trim().length > 0 && (
                <div className="mt-3">
                  {numberReviews === 0 ? "Không có" : numberReviews} bình luận{" "}
                  {numberReviews === 0 && "nào"} đề cập đến &quot;
                  <b>{searchValue}</b>&quot;
                </div>
              )}
            </div>
            <div className="">
              {isLoadingReviews ? (
                <CourseLoading />
              ) : (
                reviews.length > 0 &&
                reviews.map((review, index) => (
                  <ReviewItem
                    key={index}
                    review={review}
                    keywords={searchValue}
                  />
                ))
              )}
            </div>
            {reviews.length < totalReviews && (
              <Button variant="primary" onClick={handleLoadMore}>
                Xem thêm đánh giá
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
