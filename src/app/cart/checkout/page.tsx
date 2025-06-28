"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "components/StripeCheckoutForm";
import { PaymentBodyType } from "types/payment";

const stripePromise = loadStripe(
  "pk_test_51Radd5FhlEqryiyTfKpB4E1P80AuQ176rt4oEb8wZy8Wp5IcMuEuyec6vwKIxd7GIPWyTQJDazedcEkdw77V11L600WkzhOu96"
);

type StripeTheme = "stripe" | "flat" | "night";

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
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Thanh toán khóa học</h1>
      {clientSecret && cartInfor && (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm clientSecret={clientSecret} cart={cartInfor}/>
        </Elements>
      )}
    </div>
  );
}
