import {
  Divider,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "components/Button/Button";
import Image from "next/image";
import Input from "components/Input/Input";
function BarReviews({
  stars,
  barReviewSelect,
  onClick = () => {},
  reviews,
}: {
  reviews?: number;
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
          value={reviews}
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
            {reviews}%
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

function ReviewItem({ stars = 5 }: { stars?: number }) {
  return (
    <Stack className="gap-y-8 mt-5">
      <div className="flex space-x-5">
        <div className="flex">
          <div className="rounded-full w-12 h-12 overflow-hidden">
            <Image src="/test.jpg" alt="image" width={64} height={64} />
          </div>
        </div>
        <Stack className="gap-y-2">
          <div className="font-bold">Nguyễn Duy</div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
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
            <div className="font-thin text-gray-700 text-sm">6 ngày trước</div>
          </div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            nobis quasi quaerat porro voluptates at, illum eaque qui itaque
            soluta eum molestiae, cupiditate, consequuntur ullam deleniti iure
            sed omnis reprehenderit.
          </div>
        </Stack>
      </div>
      <Divider />
    </Stack>
  );
}

export default function CourseReviews() {
  const [barReviewSelect, setBarReviewSelect] = useState<number>(0);

  const handleBarReviewSelect = (stars: number) => {
    if (barReviewSelect === stars) {
      setBarReviewSelect(0);
      return;
    }
    setBarReviewSelect(stars);
  };

  return (
    <Stack className="px-28 py-10 gap-y-10">
      <div className="">
        <div className="font-bold text-2xl">Đánh giá học viên</div>
        <div className="grid grid-cols-5 gap-x-3 justify-between mt-6 items-center">
          <Stack className=" items-center gap-y-2">
            <div className="text-6xl text-yellow-600 font-bold">4.8</div>
            <div className="flex items-center w-24 justify-between text-sm">
              <FontAwesomeIcon
                icon={solidStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={solidStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={solidStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={solidStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={solidStar}
                className="text-xs text-yellow-600"
              />
            </div>
            <div className="text-yellow-600 text-sm font-medium">
              Đánh giá khoá học
            </div>
          </Stack>
          <Stack className="col-span-4 flex items-center justify-between gap-y-3 text-gray-500">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <BarReviews
                  key={index}
                  stars={5 - index}
                  onClick={handleBarReviewSelect}
                  reviews={index * 15.5}
                  barReviewSelect={barReviewSelect}
                />
              ))}
          </Stack>
        </div>
      </div>
      <div className="">
        <div className="font-bold text-2xl">Đánh giá</div>
        <Stack className="mt-2 flex">
          <div className="font-medium text-sm mb-2 flex justify-end">
            <div className="w-[120px]">Lọc đánh giá</div>
          </div>
          <div className="flex space-x-3 grow  items-center">
            <Input />
            <Button variant="primary" className="px-4 py-2">
              <Search size={16} />
            </Button>
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
        </Stack>
        <div className="">
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>
      </div>
    </Stack>
  );
}
