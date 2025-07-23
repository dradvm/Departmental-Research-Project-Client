"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "components/StripeCheckoutForm";
import { PaymentBodyType } from "types/payment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack } from "@mui/material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type StripeTheme = "stripe" | "flat" | "night";

function handleErrorPaymentCreation(e: unknown) {
  console.log(e);
  console.log(`Lỗi có thể do mâu thuẫn về giá trị của hóa đơn`);
  toast.error(`Có lỗi khi tạo hóa đơn`);
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const [cartInfor, setCartInfor] = useState<PaymentBodyType>();

  useEffect(() => {
    // handle cart
    let cart: PaymentBodyType | null = null;
    const cartString: string | null = localStorage.getItem("cartInfor");
    if (!cartString) confirm(`Có lỗi khi lấy cartInfor từ localStorage`);
    else cart = JSON.parse(cartString);
    if (cart) setCartInfor(cart);

    // handle clientSecret
    const secret: string | null = localStorage.getItem("clientSecret");
    if (!secret) confirm(`Có lỗi khi lấy clientSecret từ localStorage`);
    else setClientSecret(secret);
  }, []);

  const appearance: { theme: StripeTheme } = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="w-full flex items-center justify-around">
      <Stack className="w-96">
        <h1 className="text-2xl font-bold mb-6">Thanh toán khóa học</h1>
        {clientSecret && cartInfor && (
          <Elements stripe={stripePromise} options={options}>
            <StripeCheckoutForm
              clientSecret={clientSecret}
              cart={cartInfor}
              handleErrorPaymentCreation={handleErrorPaymentCreation}
            />
          </Elements>
        )}
        <ToastContainer />
      </Stack>
    </div>
  );
}
