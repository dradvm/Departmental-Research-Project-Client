"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function DynamicHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/course")) return <></>;
  return <Header />;
}
