"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import paymentService from "services/payment.service";
import { PaymentBodyType } from "types/payment";

export default function StripeCheckoutForm({
  clientSecret,
  cart,
  handleErrorPaymentCreation,
}: {
  clientSecret: string;
  cart: PaymentBodyType;
  handleErrorPaymentCreation: (e: unknown) => void;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setMessage("");

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setMessage("Không thể lấy thông tin thẻ.");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
        },
      },
    });

    if (result.error) {
      setMessage(result.error.message || "Đã có lỗi xảy ra. Hãy thử lại");
    } else if (result.paymentIntent?.status === "succeeded") {
      try {
        await paymentService.createPayment(cart);
        localStorage.removeItem("cartInfor");
        localStorage.removeItem("clientSecret");
        setMessage("Thanh toán thành công! Làm mới trang sau 5 giây nữa!");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        router.push("/cart");
      } catch (e) {
        handleErrorPaymentCreation(e);
      }
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white border rounded-xl shadow p-6 space-y-5"
    >
      {/* Họ và tên */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-black mb-1"
        >
          Họ và tên
        </label>
        <input
          id="name"
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
          placeholder="Họ và tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Số thẻ */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Số thẻ
        </label>
        <div className="p-2 border border-gray-300 rounded-md">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000000",
                  "::placeholder": {
                    color: "#9ca3af", // tailwind's gray-400
                  },
                },
                invalid: {
                  color: "#dc2626", // tailwind's red-600
                },
              },
            }}
          />
        </div>
      </div>

      {/* Ngày hết hạn & CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Ngày hết hạn
          </label>
          <div className="p-2 border border-gray-300 rounded-md">
            <CardExpiryElement />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            CVC
          </label>
          <div className="p-2 border border-gray-300 rounded-md">
            <CardCvcElement />
          </div>
        </div>
      </div>

      {/* Nút Thanh toán */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        {processing ? "Đang xử lý..." : "Thanh toán"}
      </button>

      {/* Thông báo */}
      {message && (
        <p
          className={`text-center text-sm ${
            message.includes("thành công") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
