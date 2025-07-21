import { Button } from "components/Button/Button";
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
    <div className="w-96 flex flex-col border rounded-xl p-4 space-y-4">
      <p className="text-xl font-bold text-black">Bảng tạm tính</p>

      <div>
        <p className="text-base font-semibold text-black">Tạm tính:</p>
        <p className="text-lg font-bold text-indigo-600">
          {formatVND(parseInt(dataInput.totalPrice))}
        </p>
      </div>

      <div className="flex space-x-2 items-center">
        <input
          ref={dataInput.inputRef}
          id="promotion-code"
          type="text"
          placeholder="Nhập mã của bạn"
          className="text-sm grow  px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <Button variant="filled" size="sm" onClick={dataInput.applyCoupon}>
          Áp dụng
        </Button>
      </div>

      <div>
        <p className="text-base font-semibold text-black">Cần thanh toán:</p>
        <p className="text-2xl font-bold text-indigo-600">
          {formatVND(parseInt(dataInput.finalPrice))}
        </p>
      </div>

      <Button variant="filled" onClick={dataInput.createPaymentIntent}>
        Thanh toán
      </Button>
    </div>
  );
}
