import { X } from "lucide-react";
import { PaymentType } from "types/payment";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface PaymentDetailFormProps {
  paymentDetail: PaymentType;
  handleClose: () => void;
}

export default function PaymentDetailModal(props: PaymentDetailFormProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-4 bg-white rounded-[8px]">
      <h1 className="text-center font-bold text-[28px]">Chi tiết hóa đơn</h1>
      {/* general information */}
      <div className="mt-4 grid grid-cols-2 grid-rows-1 gap-x-20 font-semibold">
        <p>Khách hàng: {props.paymentDetail.userName} </p>
        <p>Ngày lập: {getDateFormat(props.paymentDetail.timePayment)} </p>
      </div>
      {/* payment detail */}
      <div>
        {props.paymentDetail.paymentDetail ? (
          <div className="mt-8">
            <h1 className="font-bold text-[20px]">
              Danh sách các khóa học (
              {props.paymentDetail.paymentDetail.length})
            </h1>
            {props.paymentDetail.paymentDetail.map((paymentDetail) => {
              return (
                <div
                  key={paymentDetail.courseId}
                  className="grid grid-cols-[6fr_2fr_2fr] gap-4"
                >
                  <p>{paymentDetail.courseTitle}</p>
                  <p className="line-through">
                    {paymentDetail.price === paymentDetail.finalPrice
                      ? ""
                      : formatVND(parseInt(paymentDetail.price))}
                  </p>
                  <p className="font-bold">
                    {formatVND(parseInt(paymentDetail.finalPrice))}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="text-center font-bold text-[20px]">
            Hóa đơn này không có khóa học nào!
          </h1>
        )}
      </div>
      {/* coupon and price */}
      <div className="grid grid-cols-2 mt-8 font-bold">
        {/* original price */}
        {props.paymentDetail.originalPrice !==
          props.paymentDetail.totalPrice && <h1>Giá gốc:</h1>}
        {props.paymentDetail.originalPrice !==
          props.paymentDetail.totalPrice && (
          <h1 className="text-right">
            {formatVND(parseInt(props.paymentDetail.originalPrice))}
          </h1>
        )}
        {/* subtotal price */}
        {(props.paymentDetail.originalPrice !==
          props.paymentDetail.totalPrice ||
          props.paymentDetail.code) && <h1>Tạm tính</h1>}
        {(props.paymentDetail.originalPrice !==
          props.paymentDetail.totalPrice ||
          props.paymentDetail.code) && (
          <h1 className="text-right">
            {formatVND(parseInt(props.paymentDetail.totalPrice))}
          </h1>
        )}

        {/* coupon code */}
        {props.paymentDetail.code && <h1>Mã giảm giá:</h1>}
        {props.paymentDetail.code && (
          <h1 className="text-right">{props.paymentDetail.code}</h1>
        )}
        {/* total price */}
        <h1 className="text-[20px] text-blue-500">Tổng cộng:</h1>
        <h1 className="text-[20px] text-blue-500 text-right">
          {formatVND(parseInt(props.paymentDetail.finalPrice))}
        </h1>
      </div>
      {/* exit button */}
      <button
        className="absolute right-0 top-0 px-4 py-1 rounded-[4px] hover:bg-red-600 hover:text-white"
        onClick={props.handleClose}
      >
        <X />
      </button>
    </div>
  );
}
