import { RefObject } from "react";
import { formatVND } from "utils/money";

interface InputProformalInvoice {
  totalPrice: string;
  finalPrice: string;
  inputRef: RefObject<HTMLInputElement | null>;
  applyCoupon: () => void;
  createPaymentIntent: () => void;
}

export default function ProformaInvoice({
  dataInput,
}: {
  dataInput: InputProformalInvoice;
}) {
  return (
    <div className="w-full md:w-[60%] mx-auto lg:w-[25%] lg:mx-0 flex flex-col">
      <p className="text-[24px] font-bold">Bảng tạm tính</p>
      <div className="mt-[12px]">
        <p className="text-[18px] font-bold">Tạm tính:</p>
        <p className="text-[18px] font-bold text-blue-500">
          {formatVND(parseInt(dataInput.totalPrice))}
        </p>
      </div>
      <div className="flex">
        <input
          ref={dataInput.inputRef}
          id="promotion-code"
          className="flex-1 p-[4px] border-[2px] rounded-[8px]"
          type="text"
          placeholder="Nhập mã của bạn"
        />
        <button
          className="ml-[4px] p-[4px] rounded-[8px] bg-purple-600 text-white"
          onClick={dataInput.applyCoupon}
        >
          Áp dụng
        </button>
      </div>
      <div className="mt-[12px]">
        <p className="text-[18px] font-bold underline decoration-double">
          Cần thanh toán:
        </p>
        <p className="text-[28px] font-bold text-blue-500">
          {formatVND(parseInt(dataInput.finalPrice))}
        </p>
      </div>

      <button
        className="m-[4px] p-[12px] rounded-[8px] bg-purple-600 text-center text-white"
        onClick={dataInput.createPaymentIntent}
      >
        Thanh toán
      </button>
    </div>
  );
}
