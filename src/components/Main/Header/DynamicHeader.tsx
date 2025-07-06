"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import ConstructorHeader from "./Constructor.Header";
import { useMemo } from "react";

export default function DynamicHeader() {
  const pathname = usePathname();

  // Danh sách các route cần ẩn header
  const hiddenRoutes = useMemo(() => ["/course", "/dashboard"], []);

  // Ẩn header nếu pathname khớp bất kỳ prefix nào trong hiddenRoutes
  const isHeaderHidden = useMemo(() => {
    return hiddenRoutes.some((path) => pathname.startsWith(path));
  }, [hiddenRoutes, pathname]);

  if (isHeaderHidden) return <></>;
  return <Header />;
}
