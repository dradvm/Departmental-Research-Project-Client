import withRole from "components/WithRole/withRole";
import { Funnel, Search } from "lucide-react";
import Link from "next/link";
import { ChangeEvent } from "react";
import { CouponFilterInput } from "types/coupon";

interface CouponFilterProps {
  filter: CouponFilterInput;
  onChangeFilterInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isGlobalCouponPage: boolean;
}

function CouponFilter(props: CouponFilterProps) {
  return (
    <div className="h-fit my-4">
      <div className="flex gap-8">
        {/* Block 1: Filter icon */}
        <div
          className="flex items-center justify-center"
          title="Lọc các mã khuyến mãi"
        >
          <Funnel size={32} />
        </div>
        {/* Block 2: Date input */}
        <div className="px-1 flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-2">
            <label htmlFor="">Từ: </label>
            <input
              className="w-[72%] px-1 border-2 rounded-[8px]"
              type="date"
              name="startDate"
              value={props.filter.startDate ?? ""}
              onChange={props.onChangeFilterInput}
            />
            <label htmlFor="">đến: </label>
            <input
              className="w-[72%] px-1 border-2 rounded-[8px]"
              type="date"
              name="endDate"
              value={props.filter.endDate ?? ""}
              onChange={props.onChangeFilterInput}
            />
          </div>
        </div>
        {/* Block 3: Value input */}
        <div className="px-1 flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-2">
            <input
              className="px-1 border-2 rounded-[8px]"
              type="number"
              min={0}
              max={10000000}
              name="minPrice"
              value={props.filter.minPrice ?? ""}
              onChange={props.onChangeFilterInput}
            />
            <span> VNĐ</span>
            <label htmlFor="">hoặc </label>
            <input
              className="px-1 border-2 rounded-[8px]"
              type="number"
              min={0}
              max={100}
              step={1}
              name="minPercent"
              value={props.filter.minPercent ?? ""}
              onChange={props.onChangeFilterInput}
            />
            <span> %</span>
          </div>
        </div>
        {/* Block 4: Add button and search input */}
        {/* only show for global coupon page */}
        {props.isGlobalCouponPage && (
          <div className="my-auto">
            <Link
              href="/admin/promotion/global/add"
              className="p-[4px] bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
            >
              Thêm mới
            </Link>
          </div>
        )}
        {/* only show for normal coupon page */}
        {!props.isGlobalCouponPage && (
          <div className="flex gap-2 justify-center items-center">
            <Search size={32} />
            <input
              type="text"
              className="h-fit px-2 py-1 border-2 rounded-[20px]"
              placeholder="Khóa học, giảng viên"
              name="searchText"
              value={props.filter.searchText ?? ""}
              onChange={props.onChangeFilterInput}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default withRole(CouponFilter, ["ADMIN"]);