import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  // actual length of data
  dataLength: number;
  // data liminitation in a page
  limit: number;
}
export function Pagination(props: PaginationProps) {
  return (
    <div className="h-fit flex gap-[8px] justify-center">
      <button
        className="h-fit mt-[8px] p-[4px]"
        onClick={() => {
          if (props.page !== 1) props.setPage((curr) => curr - 1);
        }}
        title="Quay lại trang trước"
      >
        <ArrowBigLeft size={32} />
      </button>
      <button className="h-fit mt-[8px] p-[4px] text-[20px]">
        Trang {props.page}
      </button>
      <button
        className="h-fit mt-[8px] p-[4px]"
        onClick={() => {
          if (props.dataLength === props.limit)
            props.setPage((curr) => curr + 1);
        }}
        title="Trang tiếp theo"
      >
        <ArrowBigRight size={32} />
      </button>
    </div>
  );
}
