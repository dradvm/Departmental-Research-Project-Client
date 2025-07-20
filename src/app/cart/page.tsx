"use client";

import { useEffect, useRef, useState } from "react";
import { CartType } from "types/cart";
import cartService from "services/cart.service";
import ProformaInvoice from "components/CartComponent/ProformaInvoice";
import ItemCart from "components/CartComponent/ItemCart";
import Link from "next/link";
import { PaymentBodyType, PaymentDetailBodyType } from "types/payment";
import { useRouter } from "next/navigation";
import paymentService from "services/payment.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "components/Button/Button";
import { Stack } from "@mui/material";
import Loading from "components/Main/Loading/Loading";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<CartType>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  // get data: only run the firs time
  async function getDataFirstTime() {
    const cart: CartType = (await cartService.getCart()).data;
    setCart(cart);
    setIsFirstLoading(false);
  }
  // usually run
  async function fetchData() {
    const code = inputRef.current?.value;
    let cart: CartType;
    if (code) cart = (await cartService.getCart(code)).data;
    else cart = (await cartService.getCart()).data;
    if (cart.success) {
      if (cart.couponId) toast.success(cart.message || "Đã áp dụng khuyến mãi");
    } else {
      if (cart.message)
        toast.error(cart.message || "Không áp dụng được khuyến mãi");
    }
    setCart(cart);
  }

  useEffect(() => {
    getDataFirstTime();
  }, []);

  // delete a course from cart
  async function handleDeleteOneItem(courseId: number, titleCourse: string) {
    if (confirm(`Xác nhận xóa khóa học này ra khỏi giỏ hàng của bạn?`)) {
      await cartService.deleteOneItem(courseId);
      toast.success(`Đã xóa ${titleCourse} khỏi giỏ hàng!`);
      await fetchData();
    }
  }

  // delete all courses form cart
  async function handleDeleteAllItem() {
    if (
      confirm(`Xác nhận xóa toàn bộ các khóa học này ra khỏi giỏ hàng của bạn?`)
    ) {
      await cartService.deleteAllItem();
      toast.success(`Đã xóa tất cả khóa học khỏi giỏ hàng!`);
      await fetchData();
    }
  }

  // apply coupon
  async function handleApplyCoupon() {
    if (inputRef.current?.value) await fetchData();
  }

  // make a payment (payment intent)
  async function createPaymentIntent() {
    if (cart && cart.items.length > 0) {
      try {
        // handle cart information
        const courses: PaymentDetailBodyType[] = cart.items.map((item) => ({
          courseId: parseInt(item.course.courseId),
        }));
        const reqBody: PaymentBodyType = {
          itemCart: courses,
          originalPrice: parseInt(cart.originalPrice),
          totalPrice: parseInt(cart.totalPrice),
          couponId: cart.couponId ? parseInt(cart.couponId) : null,
          finalPrice: parseInt(cart.finalPrice),
        };
        localStorage.setItem("cartInfor", JSON.stringify(reqBody));

        // check if the previous clientSecret is existing
        const preClientSecret = localStorage.getItem("clientSecret");
        if (!preClientSecret) {
          const data: { clientSecret: string } = (
            await paymentService.createPaymentIntent({
              amount: parseInt(cart.finalPrice),
            })
          ).data;
          localStorage.setItem("clientSecret", data.clientSecret);
        }
        router.push("/cart/checkout");
      } catch (e) {
        console.log(`Có lỗi xảy ra khi tạo paymentIntent: ${e}`);
        toast.error(`Có lỗi khi tạo paymentIntent`);
      }
    }
  }

  return (
    <div className="min-h-96 flex justify-center items-center w-full">
      {isFirstLoading ? (
        <Loading />
      ) : (
        <div className="w-full">
          {cart && cart.items.length > 0 ? (
            <div className="flex flex-col lg:flex-row lg:gap-[5%]">
              <div className="w-full lg:w-[70%]">
                <h1 className="text-[24px] font-bold">Giỏ hàng của tôi</h1>
                <div>
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">
                      {cart.items.length} khoá học trong giỏ hàng
                    </h5>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleDeleteAllItem}
                    >
                      Xóa tất cả khóa học khỏi giỏ hàng
                    </Button>
                  </div>
                  <Stack className="gap-y-5 mt-3">
                    {cart.items.map((item, index) => (
                      <ItemCart
                        key={index}
                        item={item}
                        onDelete={handleDeleteOneItem}
                        loadData={getDataFirstTime}
                      ></ItemCart>
                    ))}
                  </Stack>
                </div>
              </div>
              <ProformaInvoice
                dataInput={{
                  totalPrice: cart.totalPrice,
                  finalPrice: cart.finalPrice,
                  inputRef: inputRef,
                  applyCoupon: handleApplyCoupon,
                  createPaymentIntent: createPaymentIntent,
                }}
              ></ProformaInvoice>
            </div>
          ) : (
            <Stack className="items-center gap-y-3">
              <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-600">
                Giỏ hàng của bạn hiện đang trống.
              </h1>
              <Link href="/">
                <Button variant="filled" size="lg">
                  Khám phá khóa học ngay
                </Button>
              </Link>
            </Stack>
          )}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      )}
    </div>
  );
}
