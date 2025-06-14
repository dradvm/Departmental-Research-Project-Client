"use client";

import { Stack } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyCoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <Stack>
      <Stack className="px-32 pt-12 gap-y-10 bg-gray-950">
        <div className="text-5xl font-medium text-white">Học tập</div>
        <div className="flex items-center space-x-5">
          <Link
            href={"./learning"}
            className={`h-9 font-medium cursor-pointer ${
              path.endsWith("/learning")
                ? "border-b-4 border-white text-white"
                : "hover:text-white text-slate-300"
            }`}
          >
            Tất cả khoá học
          </Link>
          <Link
            href={"./wishlist"}
            className={`h-9 font-medium cursor-pointer ${
              path.endsWith("/wishlist")
                ? "border-b-4 border-white text-white"
                : "hover:text-white text-slate-300"
            }`}
          >
            Mong muốn
          </Link>
          <Link
            href={"./certification"}
            className={`h-9 font-medium cursor-pointer ${
              path.endsWith("/certification")
                ? "border-b-4 border-white text-white"
                : "hover:text-white text-slate-300"
            }`}
          >
            Chứng chỉ
          </Link>
          <Link
            href={"./learning-tools"}
            className={`h-9 font-medium cursor-pointer ${
              path.endsWith("/learning-tools")
                ? "border-b-4 border-white text-white"
                : "hover:text-white text-slate-300"
            }`}
          >
            Công cụ học tập
          </Link>
        </div>
      </Stack>
      <div className="px-32 py-8">{children}</div>
    </Stack>
  );
}
