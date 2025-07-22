import { PaymentFilter } from "types/payment";
import { Box } from "@mui/material";
import { Funnel, Search } from "lucide-react";
import withRole from "components/WithRole/withRole";

interface PaymentFilterProps {
  filter: PaymentFilter;
  onChangeFilterInput: React.ChangeEventHandler<HTMLInputElement>;
}

export function PaymentFilterUtils(props: PaymentFilterProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
      }}
    >
      {/* Dòng 1: 2 filter chia đều */}
      <Box
        sx={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}
      >
        {/* Funnel icon */}
        <Box
          title="Lọc các đơn hàng"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 32,
          }}
        >
          <Funnel size={20} />
        </Box>

        {/* Thời gian (chiếm 50%) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
            minWidth: 280,
            flexWrap: "wrap",
          }}
        >
          <strong>Thời gian:</strong>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <label>Từ</label>
            <input
              type="date"
              name="startDate"
              value={props.filter.startDate ?? ""}
              onChange={props.onChangeFilterInput}
              className="w-[140px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <label>đến</label>
            <input
              type="date"
              name="endDate"
              value={props.filter.endDate ?? ""}
              onChange={props.onChangeFilterInput}
              className="w-[140px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </Box>
        </Box>

        {/* Tổng tiền (chiếm 50%) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
            minWidth: 280,
            flexWrap: "wrap",
          }}
        >
          <strong>Tổng tiền:</strong>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <label>Từ</label>
            <input
              type="number"
              min={0}
              step={100000}
              name="minPrice"
              value={props.filter.minPrice ?? ""}
              onChange={props.onChangeFilterInput}
              className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <label>đến</label>
            <input
              type="number"
              min={0}
              step={100000}
              name="maxPrice"
              value={props.filter.maxPrice ?? ""}
              onChange={props.onChangeFilterInput}
              className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </Box>
        </Box>
      </Box>

      {/* Dòng 2: ô tìm kiếm khách hàng chiếm toàn bộ */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
        }}
      >
        <Search size={20} className="text-slate-700" />
        <input
          type="text"
          placeholder="Họ tên khách hàng"
          name="searchText"
          value={props.filter.searchText ?? ""}
          onChange={props.onChangeFilterInput}
          className="w-full rounded-full px-4 py-2 border border-gray-300 placeholder:text-slate-700 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </Box>
    </Box>
  );
}

export default withRole(PaymentFilterUtils, ["ADMIN"]);