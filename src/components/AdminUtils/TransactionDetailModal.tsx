import withRole from "components/WithRole/withRole";
import { X } from "lucide-react";
import { PaymentType } from "types/payment";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface PaymentDetailFormProps {
  paymentDetail: PaymentType;
  handleClose: () => void;
}

function TransactionDetailModal(props: PaymentDetailFormProps) {
  const { paymentDetail } = props;

  return (
    <div className="absolute top-1/2 left-1/2 w-[90vw] max-w-[800px] transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg shadow-lg">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 p-1 hover:bg-red-500 hover:text-white rounded-full transition"
        onClick={props.handleClose}
        title="Đóng"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h1 className="text-center font-bold text-2xl text-indigo-600 mb-4">
        Chi tiết đơn hàng
      </h1>

      {/* General Info */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 text-[16px] font-medium">
        <p>
          <strong>Ngày lập:</strong> {getDateFormat(paymentDetail.timePayment)}
        </p>
      </div>

      {/* Payment Detail List */}
      <div className="mb-6">
        <h2 className="font-bold text-lg mb-2 text-indigo-600">
          Danh sách khóa học ({paymentDetail.paymentDetail.length})
        </h2>

        <div className="max-h-[300px] overflow-y-auto border rounded-md">
          <div className="grid grid-cols-[6fr_2fr_2fr] gap-2 px-4 py-2 font-semibold border-b bg-gray-100 text-gray-700">
            <span>Tên khóa học</span>
            <span className="text-right">Giá gốc</span>
            <span className="text-right">Giá cuối</span>
          </div>
          {paymentDetail.paymentDetail.map((detail) => (
            <div
              key={detail.courseId}
              className="grid grid-cols-[6fr_2fr_2fr] gap-2 px-4 py-2 border-b text-[15px]"
            >
              <span>{detail.courseTitle}</span>
              <span className="text-right line-through text-gray-500">
                {detail.price !== detail.finalPrice
                  ? formatVND(parseInt(detail.price))
                  : ""}
              </span>
              <span className="text-right font-semibold text-gray-800">
                {formatVND(parseInt(detail.finalPrice))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon & Price Summary */}
      <div className="grid grid-cols-2 gap-y-2 font-medium text-[16px] mb-2">
        {paymentDetail.originalPrice !== paymentDetail.totalPrice && (
          <>
            <span>Giá gốc:</span>
            <span className="text-right">
              {formatVND(parseInt(paymentDetail.originalPrice))}
            </span>
          </>
        )}
        {(paymentDetail.originalPrice !== paymentDetail.totalPrice ||
          paymentDetail.code) && (
            <>
              <span>Tạm tính:</span>
              <span className="text-right">
                {formatVND(parseInt(paymentDetail.totalPrice))}
              </span>
            </>
          )}
        {paymentDetail.code && (
          <>
            <span>Mã giảm giá:</span>
            <span className="text-right">{paymentDetail.code}</span>
          </>
        )}
      </div>

      {/* Final Total */}
      <div className="grid grid-cols-2 mt-4 border-t pt-2 font-bold text-indigo-600 text-[18px]">
        <span>Tổng cộng:</span>
        <span className="text-right">
          {formatVND(parseInt(paymentDetail.finalPrice))}
        </span>
      </div>
    </div>
  );
}

export default withRole(TransactionDetailModal, ["ADMIN"]);