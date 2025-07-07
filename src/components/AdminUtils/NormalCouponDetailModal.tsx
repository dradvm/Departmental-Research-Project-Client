import { X } from "lucide-react";
import { NormalCouponType } from "types/coupon";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface NormalCouponDetailModalProps {
  normalCoupon: NormalCouponType;
  acceptACouponCourse: (couponId: number, courseId: number) => void;
  deactivateCouponCourse: (couponId: number, courseId: number) => void;
  acceptAndActivateCouponCourse: (couponId: number, courseId: number) => void;
  handleClose: () => void;
}
export default function NormalCouponDetailModal(
  props: NormalCouponDetailModalProps
) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-4 bg-white rounded-[8px]">
      <h1 className=" text-[24px] uppercase font-bold text-center">
        Thông tin mã khuyến mãi
      </h1>
      <div className="grid grid-cols-2 gap-x-20">
        <h1 className="font-bold text-red-500">
          Mã khuyến mãi: {props.normalCoupon.code}
        </h1>
        <h1 className="font-bold text-red-500">
          Giá trị:
          {props.normalCoupon.type === "discount"
            ? `${props.normalCoupon.value}%`
            : `${formatVND(parseInt(props.normalCoupon.value))}`}
        </h1>
        <h2>
          Giảm tối đa:
          {formatVND(parseInt(props.normalCoupon.maxValueDiscount))}
        </h2>
        <h2>
          Cho đơn từ: {formatVND(parseInt(props.normalCoupon.minRequire))}
        </h2>
        <h2 className="font-bold text-blue-600">
          Khóa học: {props.normalCoupon.coureTitle}
        </h2>
        <h2 className="font-bold text-blue-600">
          Giảng viên: {props.normalCoupon.userName}
        </h2>
        <h2>Bắt đầu: {getDateFormat(props.normalCoupon.startDate)}</h2>
        <h2>Kết thúc: {getDateFormat(props.normalCoupon.endDate)}</h2>
        <h2>
          Đã áp dụng: {props.normalCoupon.appliedAmount}
          {props.normalCoupon.quantity}
        </h2>
      </div>

      <div className="flex gap-[8px] justify-end">
        {/* case 1: not accepted and not running */}
        {!props.normalCoupon.isAccepted && !props.normalCoupon.isRunning && (
          <button
            className="p-[4px] mt-4 bg-green-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
            title="Duyệt mã khuyến mãi này, nhưng chưa kích hoạt cho khóa học"
            onClick={() =>
              props.acceptACouponCourse(
                props.normalCoupon.couponId,
                props.normalCoupon.courseId
              )
            }
          >
            Duyệt ngay
          </button>
        )}
        {!props.normalCoupon.isAccepted && !props.normalCoupon.isRunning && (
          <button
            className="p-[4px] mt-4 bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
            title="Duyệt và kích hoạt ngay mã khuyến mãi cho khóa học"
            onClick={() =>
              props.acceptAndActivateCouponCourse(
                props.normalCoupon.couponId,
                props.normalCoupon.courseId
              )
            }
          >
            Kích hoạt ngay
          </button>
        )}
        {/* case 2: accepted and running */}
        {props.normalCoupon.isAccepted && props.normalCoupon.isRunning && (
          <button
            className="p-[4px] mt-4 bg-red-700 shadow-md shadow-red-700 rounded-[8px] font-bold text-white"
            title="Hủy kích hoạt mã khuyến mãi cho khóa học này, có thể kích hoạt lại sau"
            onClick={() =>
              props.deactivateCouponCourse(
                props.normalCoupon.couponId,
                props.normalCoupon.courseId
              )
            }
          >
            Hủy kích hoạt
          </button>
        )}
        {/* case 3: accepted but not running */}
        {props.normalCoupon.isAccepted && !props.normalCoupon.isRunning && (
          <button
            className="p-[4px] mt-4 bg-blue-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
            title="Mã này đã duyệt, kích hoạt để hiệu lực với khóa học này"
            onClick={() =>
              props.acceptAndActivateCouponCourse(
                props.normalCoupon.couponId,
                props.normalCoupon.courseId
              )
            }
          >
            Kích hoạt ngay
          </button>
        )}
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
