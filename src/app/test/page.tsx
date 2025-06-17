"use client";
import { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TestService from "services/test.service";

// Public key từ Stripe Dashboard
const stripePromise = loadStripe(
  "pk_test_51Radd5FhlEqryiyTfKpB4E1P80AuQ176rt4oEb8wZy8Wp5IcMuEuyec6vwKIxd7GIPWyTQJDazedcEkdw77V11L600WkzhOu96"
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    TestService.payment({
      amount: 5000,
      currency: "usd",
    }).then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: "Nguyen Van A",
        },
      },
    });

    if (result.error) {
      alert(`❌ Thanh toán thất bại: ${result.error.message}`);
    } else if (result.paymentIntent?.status === "succeeded") {
      alert("✅ Thanh toán thành công!");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Đang xử lý..." : "Thanh toán"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
