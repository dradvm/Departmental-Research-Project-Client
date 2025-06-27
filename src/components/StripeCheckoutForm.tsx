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
}: {
  clientSecret: string;
  cart: PaymentBodyType;
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
          name: name,
        },
      },
    });

    if (result.error) {
      setMessage(result.error.message || "Đã có lỗi xảy ra.");
    } else if (result.paymentIntent?.status === "succeeded") {
      // succeeded => create payment
      await paymentService.createPayment(cart);
      localStorage.removeItem("cartInfor");
      localStorage.removeItem("clientSecret");
      router.push("/cart");
      setMessage("Thanh toán thành công!");
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border max-w-md mx-auto"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Họ và tên
        </label>
        <input
          id="name"
          type="text"
          required
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Họ và tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Number Account */}
      <div>
        <label className="block text-sm font-medium mb-1">Số thẻ</label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Exprie Date & CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ngày hết hạn</label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardExpiryElement />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardCvcElement />
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition"
      >
        {processing ? "Đang xử lý..." : "Thanh toán"}
      </button>

      {/* Inform */}
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
