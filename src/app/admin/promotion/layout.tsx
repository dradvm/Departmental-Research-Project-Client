"use client";

import { useRouter } from "next/navigation";

export default function PromotionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <div className="h-fit flex flex-col">
      <div className="mt-4 flex gap-4 items-center">
        <h1 className="text-[24px] font-bold text-blue-600">
          Quản lý mã khuyến mãi
        </h1>
        <select
          name=""
          id=""
          className="border rounded-[8px] p-1"
          onChange={(e) => router.push(e.target.value)}
        >
          <option value="/admin/promotion/global">
            Khuyến mãi toàn hệ thống
          </option>
          <option value="/admin/promotion/normal">
            Khuyến mãi riêng theo khóa học
          </option>
        </select>
      </div>
      <div>{children}</div>
    </div>
  );
}
