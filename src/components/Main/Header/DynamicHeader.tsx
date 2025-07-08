"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { useMemo } from "react";

export default function DynamicHeader() {
  const pathname = usePathname();

  const hiddenRoutes = useMemo(() => ["/course", "/dashboard", "/admin"], []);

  const isHeaderHidden = useMemo(() => {
    return hiddenRoutes.some((path) => pathname.startsWith(path));
  }, [hiddenRoutes, pathname]);

  if (isHeaderHidden) return <></>;
  return <Header />;
}
