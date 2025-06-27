"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import ConstructorHeader from "./Constructor.Header";

export default function DynamicHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/course")) return <></>;
  return <Header />;
}
