"use client";

import { PostType } from "types/post";
import { useEffect, useState } from "react";
import { posts } from "app/data";
import {
  Video,
  Clock4,
  CircleUser,
  ArrowBigRight,
  ArrowBigLeft,
  Search,
  Funnel,
} from "lucide-react";

export default function Post() {
  const [page, setPage] = useState<number>(1);
  const [infors, setInfors] = useState<PostType[]>();
  const [filter, setFilter] = useState({
    minTuition: undefined,
    maxTuition: undefined,
    minLessonCount: undefined,
    maxLessonCount: undefined,
    minDuration: undefined,
    maxDuration: undefined,
    searchText: undefined,
  });

  function onChangeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    const limit = 4;
    const skip = (page - 1) * limit;
    const data = posts.slice(skip, skip + limit);
    setInfors(data);
  }, [page]);

  return (
    <div className="h-[600px] flex flex-col">
      {/* Block 1: Title Page */}
      <div className="h-[10%]">
        <h1 className="text-[24px] font-bold text-blue-600">
          Danh sách các bài đăng
        </h1>
      </div>
      {/* Block 2: Filter Utility */}
      <div className="h-[10%] flex">
        <div className="w-[70%] flex gap-2">
          <div
            className="w-[6%] flex items-center justify-center"
            title="Lọc các bài đăng"
          >
            <Funnel size={32} />
          </div>
          <div className="w-[30%] px-1 flex flex-col gap-2">
            <h1 className="font-bold">Học phí (VNĐ)</h1>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <label htmlFor="">Từ: </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  step={100000}
                  name="minTuition"
                  value={filter.minTuition ?? ""}
                  onChange={onChangeFilter}
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="">đến: </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  step={100000}
                  name="maxTuition"
                  value={filter.maxTuition ?? ""}
                  onChange={onChangeFilter}
                />
              </div>
            </div>
          </div>
          <div className="w-[30%] px-1 flex flex-col gap-2">
            <h1 className="font-bold">Số lượng bài học (bài)</h1>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <label htmlFor="">Từ: </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  step={1}
                  name="minLessonCount"
                  value={filter.minLessonCount ?? ""}
                  onChange={onChangeFilter}
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="">đến: </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  step={1}
                  name="maxLessonCount"
                  value={filter.maxLessonCount ?? ""}
                  onChange={onChangeFilter}
                />
              </div>
            </div>
          </div>
          <div className="w-[30%] px-1 flex flex-col gap-2">
            <h1 className="font-bold">Thời lượng học (giờ)</h1>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <label htmlFor="">Từ: </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  step={1}
                  name="minDuration"
                  value={filter.minDuration ?? ""}
                  onChange={onChangeFilter}
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="">đến: </label>
                <input
                  className="w-[70%] px-1 border-2 rounded-[8px]"
                  type="number"
                  min={0}
                  step={1}
                  name="maxDuration"
                  value={filter.maxDuration ?? ""}
                  onChange={onChangeFilter}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex gap-2 justify-center items-center">
          <Search size={32} />
          <input
            type="text"
            className="h-fit w-[70%] p-[8px] border-2 rounded-[40px]"
            placeholder="Nội dung tìm kiếm"
            name="searchText"
            value={filter.searchText ?? ""}
            onChange={onChangeFilter}
          />
        </div>
      </div>
      {/* Block 3: Content */}
      {!infors || infors.length === 0 ? (
        <div>Không có bài đăng nào</div>
      ) : (
        <div className="h-[70%] p-[8px] grid grid-cols-4 grid-rows-1 gap-x-[8px]">
          {infors.map((post, index) => (
            <div
              key={index}
              className="h-[95%] p-[8px] mt-[20px] hover:mt-[0px] rounded-[16px] shadow-xl"
            >
              <div className="h-[30%]">Khu vực ảnh</div>
              <div className="h-[70%] flex flex-col gap-2">
                {/* Title & Sub Title*/}
                <div>
                  <h1 className="text-[20px] font-bold text-green-700">
                    {post.title}
                  </h1>
                  <h2 className="font-semibold text-pink-500">
                    {post.subTitle}
                  </h2>
                </div>
                {/* Teacher, Video Amount, Duration */}
                <div className="flex gap-2 justify-center">
                  <span
                    className="inline-flex gap-1"
                    title={`Giảng viên hướng dẫn: Lâm BF`}
                  >
                    <CircleUser color="blue" />{" "}
                    <h2 className="font-bold text-blue-700">Lâm BF </h2>
                  </span>
                  <span
                    className="inline-flex gap-1"
                    title={`Số lượng video: 27`}
                  >
                    <Video /> 27
                  </span>
                  <span
                    className="inline-flex gap-1"
                    title={`Tổng thời lượng video: 6h20p`}
                  >
                    <Clock4 /> 6h20p
                  </span>
                </div>
                {/* Tuition */}
                <div>
                  <h3 className="text-center text-[20px] font-bold text-red-600">
                    Học phí: {post.price}
                  </h3>
                </div>
                {/* Description */}
                <div className="h-[50%] overflow-auto">
                  <p>{post.description}</p>
                </div>
                {/* Combo Button */}
                <div className="flex gap-[8px] justify-center">
                  <button className="p-[4px] bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white">
                    Duyệt
                  </button>
                  <button className="p-[4px] bg-red-700 shadow-md shadow-red-700 rounded-[8px] font-bold text-white">
                    Không duyệt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Blokc 4: Button Pagination */}
      <div className="h-[10%] flex gap-[8px] justify-center">
        <button
          className="h-fit mt-[8px] p-[4px]"
          onClick={() => {
            if (page !== 1) setPage((curr) => curr - 1);
          }}
          title="Quay lại trang trước"
        >
          <ArrowBigLeft size={32} />
        </button>
        <button className="h-fit mt-[8px] p-[4px] text-[20px]">
          Trang {page}
        </button>
        <button
          className="h-fit mt-[8px] p-[4px]"
          onClick={() => {
            if (infors?.length === 4) setPage((curr) => curr + 1);
          }}
          title="Trang tiếp theo"
        >
          <ArrowBigRight size={32} />
        </button>
      </div>
    </div>
  );
}
