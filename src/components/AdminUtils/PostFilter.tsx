import { Box } from "@mui/material";
import withRole from "components/WithRole/withRole";
import { Search } from "lucide-react";
import { CourseAdminFilter } from "types/course";

interface PostFilterProp {
  filter: CourseAdminFilter;
  onChangeFilter: React.ChangeEventHandler<HTMLInputElement>;
}
function PostFilter({ filter, onChangeFilter }: PostFilterProp) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        mb: 2,
      }}
    >
      {/* Row 1: Price and Lecture amount */}
      <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
        {/* Column 1: Price (tuition) */}
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
                name="minPrice"
                value={filter.minPrice ?? ""}
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
                name="maxPrice"
                value={filter.maxPrice ?? ""}
                onChange={onChangeFilter}
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </Box>
          </Box>
        </Box>

        {/* Column 2: Lecture amount */}
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
                name="minLectureCount"
                value={filter.minLectureCount ?? ""}
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
                name="maxLectureCount"
                value={filter.maxLectureCount ?? ""}
                onChange={onChangeFilter}
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Row 2: Course duration and Search */}
      <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
        {/* Column 1: Course duration */}
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
                name="minTime"
                value={filter.minTime ?? ""}
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
                name="maxTime"
                value={filter.maxTime ?? ""}
                onChange={onChangeFilter}
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </Box>
          </Box>
        </Box>

        {/* Column 2: Search */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <strong className="block mb-1">Tìm kiếm bài đăng khóa học</strong>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Search size={20} className="text-slate-700" />
            <input
              type="text"
              placeholder="Tên giảng viên, tên khóa học"
              name="searchText"
              value={filter.searchText ?? ""}
              onChange={onChangeFilter}
              className="w-full rounded-full px-4 py-2 border border-gray-300 placeholder:text-slate-700 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withRole(PostFilter, ["ADMIN"]);