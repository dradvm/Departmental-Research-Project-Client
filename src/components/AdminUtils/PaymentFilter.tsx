import { Funnel, Search } from "lucide-react";
import { PaymentFilter } from "types/payment";

interface PaymentFilterProps {
  filter: PaymentFilter;
  onChangeFilterInput: React.ChangeEventHandler<HTMLInputElement>;
}

export function PaymentFilterUtils(props: PaymentFilterProps) {
  return (
    <div className="h-fit flex">
      <div className="w-[70%] flex gap-2">
        <div
          className="w-[6%] flex items-center justify-center"
          title="Lọc các đơn hàng"
        >
          <Funnel size={32} />
        </div>
        <div className="w-[50%] px-1 flex flex-col gap-2">
          <h1 className="font-bold">Thời gian</h1>
          <div className="flex gap-2">
            <div className="flex gap-2">
              <label htmlFor="">Từ: </label>
              <input
                className="w-[72%] px-1 border-2 rounded-[8px]"
                type="date"
                name="startDate"
                value={props.filter.startDate ?? ""}
                onChange={props.onChangeFilterInput}
              />
            </div>
            <div className="flex gap-2">
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
        </div>
        <div className="w-[40%] px-1 flex flex-col gap-2">
          <h1 className="font-bold">Tổng tiền</h1>
          <div className="flex gap-2">
            <div className="flex gap-2">
              <label htmlFor="">Từ: </label>
              <input
                className="w-[70%] px-1 border-2 rounded-[8px]"
                type="number"
                min={0}
                step={100000}
                name="minPrice"
                value={props.filter.minPrice ?? ""}
                onChange={props.onChangeFilterInput}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="">đến: </label>
              <input
                className="w-[70%] px-1 border-2 rounded-[8px]"
                type="number"
                min={0}
                step={100000}
                name="maxPrice"
                value={props.filter.maxPrice ?? ""}
                onChange={props.onChangeFilterInput}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%] flex gap-2 justify-center items-center">
        <Search size={32} />
        <input
          type="text"
          className="h-fit w-[80%] p-[8px] border-2 rounded-[40px]"
          placeholder="Họ tên khách hàng"
          name="searchText"
          value={props.filter.searchText ?? ""}
          onChange={props.onChangeFilterInput}
        />
      </div>
    </div>
  );
}
