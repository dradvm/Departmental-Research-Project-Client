import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import { MessageSquare, Search } from "lucide-react";
import Image from "next/image";

function Question() {
  return (
    <div className="flex space-x-5 px-10 py-5 hover:bg-gray-100">
      <div className="">
        <div className="rounded-full w-8 h-8 overflow-hidden">
          <Image src="/test.jpg" alt="image" width={64} height={64} />
        </div>
      </div>
      <div className="grow">
        <Stack className="gap-y-7">
          <div className="flex space-x-2">
            <Stack className="grow">
              <div className="font-bold truncate w-[550px]">
                Đây là 1 câu hỏi
              </div>
              <div className="block text-sm truncate w-[550px] text-gray-900">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                nobis quasi quaerat porro voluptates at, illum eaque qui itaque
                soluta eum molestiae, cupiditate, consequuntur ullam deleniti
                iure sed omnis reprehenderit.
              </div>
            </Stack>
            <Stack className="w-12">
              <div className="flex items-center space-x-1 text-gray-600 hover:text-black cursor-pointer">
                <div className="font-bold text-sm">1</div>
                <div>
                  <MessageSquare size={20} />
                </div>
              </div>
            </Stack>
          </div>
          <div className="flex items-center space-x-1">
            <div className="cursor-pointer underline text-indigo-600 hover:text-indigo-800 text-xs font-thin">
              Duy Nguyen
            </div>
            <span className="text-indigo-600">{" · "}</span>
            <div className="cursor-pointer text-indigo-600 hover:text-indigo-800 text-xs font-thin">
              Duy Nguyen
            </div>
            <span className="">{" · "}</span>
            <div className="text-xs font-thin">2 tháng trước</div>
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default function CourseQA() {
  return (
    <Stack className="px-28 py-10 gap-y-5">
      <div className="flex items-center space-x-3">
        <Input />
        <Button variant="primary" className="px-4 py-2">
          <Search size={16} />
        </Button>
      </div>
      <Stack className="gap-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-[120px]">
            <div className="font-bold text-sm">Bộ lọc:</div>
          </div>
          <div className="w-[120px]">
            <div className="font-bold text-sm">Sắp xếp:</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
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
      </Stack>
      <Stack>
        <div className="font-medium flex items-center space-x-2 text-lg">
          <div>Toàn bộ câu hỏi trong khoá học này</div>
          <span className="text-gray-500">(26)</span>
        </div>
        <Stack>
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </Stack>
      </Stack>
    </Stack>
  );
}
