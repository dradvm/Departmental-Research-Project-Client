import withRole from "components/WithRole/withRole";
import { X } from "lucide-react";
import { GlobalCouponType } from "types/coupon";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface GlobalCouponDetailModalProps {
  globalCoupon: GlobalCouponType;
  handleClose: () => void;
}
export function GlobalCouponDetailModal(props: GlobalCouponDetailModalProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-4 bg-white rounded-[8px]">
      <h1 className="uppercase font-bold text-center">Thông tin chi tiết</h1>
      <div className="grid grid-cols-2 gap-x-8">
        <h1 className="font-bold text-red-500">
          Mã khuyến mãi: {props.globalCoupon.code}
        </h1>
        <h1 className="font-bold text-red-500">
          {props.globalCoupon.type === "discount"
            ? `Giảm ${props.globalCoupon.value}%`
            : `Giảm ${formatVND(parseInt(props.globalCoupon.value))}`}
        </h1>
        <h2>
          Giảm tối đa:{" "}
          {formatVND(parseInt(props.globalCoupon.maxValueDiscount))}{" "}
        </h2>
        <h2>
          Cho đơn từ: {formatVND(parseInt(props.globalCoupon.minRequire))}
        </h2>
        <h2>Bắt đầu: {getDateFormat(props.globalCoupon.startDate)}</h2>
        <h2>Kết thúc: {getDateFormat(props.globalCoupon.endDate)}</h2>
        <h2>
          Đã áp dụng: {props.globalCoupon.appliedAmount}/{" "}
          {props.globalCoupon.quantity}{" "}
        </h2>
      </div>
      <button
        className="absolute right-0 top-0 px-4 py-1 rounded-[4px] hover:bg-red-600 hover:text-white"
        onClick={props.handleClose}
      >
        <X />
      </button>
    </div>
  );
}

export default withRole(GlobalCouponDetailModal, ["ADMIN"]);