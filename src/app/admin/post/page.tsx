"use client";

import { PostType } from "types/post";
import { useEffect, useState } from "react";
import { posts } from "app/data";
import { Video, Clock4, CircleUser, Search, Funnel } from "lucide-react";
import { Pagination } from "components/AdminUtils/Pagination";
import NoDataFound from "components/AdminUtils/NoDataFound";
import { Box } from "@mui/material";
import Image from "next/image";
import { Button } from "components/Button/Button";

export function PostItem({ post }: { post: PostType }) {
  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition w-full max-w-xl overflow-hidden">
      {/* Ảnh đại diện */}
      <div className="w-32 h-36 flex-shrink-0 overflow-hidden">
        <Image
          src={post.thumbnail ?? "/thumbnail.webp"}
          alt={post.title}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Nội dung khóa học */}
      <div className="flex flex-col justify-between p-3 grow gap-1">
        <h1 className="text-base font-semibold text-indigo-600 truncate">
          {post.title}
        </h1>

        <div className="flex items-center gap-1 text-sm text-blue-700">
          <CircleUser size={14} />
          <span className="truncate">{post.teacherName ?? "Chưa rõ"}</span>
        </div>

        <h3 className="text-sm font-bold text-red-600">
          {post.price ? `Học phí: ${post.price} VNĐ` : "Miễn phí"}
        </h3>

        <div className="flex justify-end">
          <Button variant="filled" size="sm">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CoursePage() {
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

  const limit = 4;

  useEffect(() => {
    const skip = (page - 1) * limit;
    const data = posts.slice(skip, skip + limit);
    setInfors(data);
  }, [page]);

  return (
    <div className="h-[600px] mt-4 flex flex-col gap-4">
      {/* Block 2: Filter Utility */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          mb: 2,
        }}
      >
        {/* Hàng 1: Học phí & Số lượng bài học */}
        <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
          {/* Học phí */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <strong className="block mb-1">Học phí (VNĐ):</strong>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <label className="w-[30px]">Từ</label>
                <input
                  type="number"
                  min={0}
                  step={100000}
                  name="minTuition"
                  value={filter.minTuition ?? ""}
                  onChange={onChangeFilter}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <label className="w-[30px]">Đến</label>
                <input
                  type="number"
                  min={0}
                  step={100000}
                  name="maxTuition"
                  value={filter.maxTuition ?? ""}
                  onChange={onChangeFilter}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </Box>
            </Box>
          </Box>

          {/* Số lượng bài học */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <strong className="block mb-1">Số lượng bài học (bài):</strong>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <label className="w-[30px]">Từ</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  name="minLessonCount"
                  value={filter.minLessonCount ?? ""}
                  onChange={onChangeFilter}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <label className="w-[30px]">Đến</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  name="maxLessonCount"
                  value={filter.maxLessonCount ?? ""}
                  onChange={onChangeFilter}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Hàng 2: Thời lượng học & Tìm kiếm */}
        <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
          {/* Thời lượng học */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <strong className="block mb-1">Thời lượng học (giờ):</strong>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <label className="w-[30px]">Từ</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  name="minDuration"
                  value={filter.minDuration ?? ""}
                  onChange={onChangeFilter}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <label className="w-[30px]">Đến</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  name="maxDuration"
                  value={filter.maxDuration ?? ""}
                  onChange={onChangeFilter}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </Box>
            </Box>
          </Box>

          {/* Tìm kiếm */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <strong className="block mb-1">Tìm kiếm bài đăng</strong>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Search size={20} className="text-slate-700" />
              <input
                type="text"
                placeholder="Nội dung tìm kiếm"
                name="searchText"
                value={filter.searchText ?? ""}
                onChange={onChangeFilter}
                className="w-full rounded-full px-4 py-2 border border-gray-300 placeholder:text-slate-700 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Block 3: Content */}
      {!infors || infors.length === 0 ? (
        <NoDataFound message="Không có bài đăng"></NoDataFound>
      ) : (
        <div
          className="
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          {infors.map((post) => (
            <PostItem key={post.idCourse} post={post} />
          ))}
        </div>
      )}
      {/* Blokc 4: Button Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        dataLength={infors ? infors.length : 0}
        limit={limit}
      ></Pagination>
    </div>
  );
}
