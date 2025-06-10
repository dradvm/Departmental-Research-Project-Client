"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import HeaderCourse from "./HeaderCourse";

export default function DynamicHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/course")) return <HeaderCourse />;
  return <Header />;
}
