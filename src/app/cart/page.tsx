"use client";

import { useEffect, useRef, useState } from "react";
import { CartType } from "types/cart";
import cartService from "services/cart.service";
import ProformaInvoice from "components/CartComponent/ProformaInvoice";
import ItemCart from "components/CartComponent/ItemCart";
import Link from "next/link";
import { PaymentBodyType, PaymentDetailBodyType } from "types/payment";
import paymentTransactionService from "services/paymenttransaction.service";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<CartType>();
  const inputRef = useRef<HTMLInputElement>(null);

  // get data: only run the firs time
  async function getDataFirstTime() {
    const cart: CartType = (await cartService.getCart()).data;
    setCart(cart);
  }
  // usually run
  async function fetchData() {
    const code = inputRef.current?.value;
    let cart: CartType;
    if (code) cart = (await cartService.getCart(code)).data;
    else cart = (await cartService.getCart()).data;
    console.log(cart.message);
    console.log(cart.success);
    setCart(cart);
  }

  useEffect(() => {
    getDataFirstTime();
  }, []);

  // delete a course from cart
  async function handleDeleteOneItem(courseId: number) {
    if (confirm(`Xác nhận xóa khóa học này ra khỏi giỏ hàng của bạn?`)) {
      await cartService.deleteOneItem(courseId);
      await fetchData();
    }
  }

  // delete all courses form cart
  async function handleDeleteAllItem() {
    if (
      confirm(`Xác nhận xóa toàn bộ các khóa học này ra khỏi giỏ hàng của bạn?`)
    ) {
      await cartService.deleteAllItem();
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
            await paymentTransactionService.createPaymentTransaction({
              amount: parseInt(cart.finalPrice),
            })
          ).data;
          localStorage.setItem("clientSecret", data.clientSecret);
        }
        router.push("/cart/checkout");
      } catch (e) {
        console.log(`Có lỗi xảy ra khi tạo paymentIntent: ${e}`);
        confirm(`Có lỗi khi tạo paymentIntent`);
      }
    }
  }

  return (
    <div>
      {cart && cart.items.length > 0 ? (
        <div className="mt-[40px] flex flex-col lg:flex-row lg:gap-[5%]">
          <div className="w-full lg:w-[70%]">
            <h1 className="text-[24px] font-bold">Giỏ hàng của tôi</h1>
            <div>
              <div className="flex justify-between">
                <h5 className="font-bold">
                  Tổng số khóa học: {cart.items.length}
                </h5>
                <button
                  className="w-fit p-[4px] border rounded-[8px] bg-red-700 text-white"
                  onClick={handleDeleteAllItem}
                >
                  Xóa tất cả khóa học khỏi giỏ hàng
                </button>
              </div>
              {cart.items.map((item, index) => (
                <ItemCart
                  key={index}
                  item={item}
                  onDelete={handleDeleteOneItem}
                ></ItemCart>
              ))}
            </div>
          </div>
          <ProformaInvoice
            dataInput={{
              originalPrice: cart.originalPrice,
              totalPrice: cart.totalPrice,
              finalPrice: cart.finalPrice,
              inputRef: inputRef,
              applyCoupon: handleApplyCoupon,
              createPaymentIntent: createPaymentIntent,
            }}
          ></ProformaInvoice>
        </div>
      ) : (
        <div className="mt-[40px] text-center">
          <h1 className="text-[32px] text-purple-800 font-bold">
            Giỏ hàng không có khóa học nào.
          </h1>
          <button className="mt-8 p-2 bg-purple-500 rounded-[12px] hover:mt-6 hover:bg-purple-400">
            <Link href="#" className="text-[28px] text-white">
              Đến trang mua sắm ngay!
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
