import {
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "components/Button/Button";
function BarReviews({
  stars,
  disabled,
  onClick = () => {},
  reviews,
}: {
  reviews?: number;
  stars: number;
  disabled?: boolean;
  onClick?: (stars: number) => void;
}) {
  return (
    <Tooltip title={`${reviews} đánh giá`}>
      <div
        className={`grid grid-cols-4 gap-x-5 w-full items-center cursor-pointer ${
          disabled || reviews === 0 ? "opacity-30" : ""
        } 
      ${reviews === 0 ? "cursor-not-allowed" : ""}`}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center w-24 justify-between text-sm">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <FontAwesomeIcon
                  key={`${stars}-${index}`}
                  icon={faStar}
                  className={`text-xs text-yellow-600 ${
                    index + 1 > stars ? "opacity-30" : ""
                  }`}
                />
              ))}
          </div>
          <div>
            <X size={14} color="black" />
          </div>
        </div>
      </div>
    </Tooltip>
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
    <Stack className="px-32 py-10 gap-y-10">
      <div className="">
        <div className="font-bold text-2xl">Đánh giá học viên</div>
        <div className="grid grid-cols-5 gap-x-3 justify-between mt-6 items-center">
          <Stack className=" items-center gap-y-2">
            <div className="text-6xl text-yellow-600 font-bold">4.8</div>
            <div className="flex items-center w-24 justify-between text-sm">
              <FontAwesomeIcon
                icon={faStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={faStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={faStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={faStar}
                className="text-xs text-yellow-600"
              />
              <FontAwesomeIcon
                icon={faStar}
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
                  disabled={
                    barReviewSelect !== 0 && barReviewSelect !== 5 - index
                  }
                />
              ))}
          </Stack>
        </div>
      </div>
      <div className="">
        <div className="font-bold text-2xl">Đánh giá</div>
        <div className="mt-2 flex items-center space-x-3">
          <div className="flex items-center space-x-3 grow  items-end">
            <input
              type="text"
              placeholder="Tìm đánh giá"
              className="w-full px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <Button variant="primary" className="px-4 py-2">
              <Search size={16} />
            </Button>
          </div>
          <div>
            <div className="">Lọc đánh giá</div>
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
        </div>
        <div className="h-screen"></div>
      </div>
    </Stack>
  );
}
