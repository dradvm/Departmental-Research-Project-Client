"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { useMemo } from "react";

export default function DynamicHeader() {
  const pathname = usePathname();

  const hiddenRoutes = useMemo(
    () => ["/course/:slug", "/dashboard", "/admin"],
    []
  );

  function matchHiddenRoutes(pathname: string, patterns: string[]) {
    const pathSegments = pathname.split("/").filter(Boolean);

    return patterns.some((pattern) => {
      const patternSegments = pattern.split("/").filter(Boolean);

      if (pathSegments.length <= patternSegments.length) return false;

      for (let i = 0; i < patternSegments.length; i++) {
        const patternPart = patternSegments[i];
        const pathPart = pathSegments[i];

        if (patternPart.startsWith(":")) continue;

        if (patternPart !== pathPart) return false;
      }

      return true;
    });
  }

  const isHeaderHidden = useMemo(() => {
    console.log(matchHiddenRoutes(pathname, hiddenRoutes));
    return matchHiddenRoutes(pathname, hiddenRoutes);
  }, [hiddenRoutes, pathname]);

  if (isHeaderHidden) return <></>;
  return <Header />;
}
