"use client";

import { usePathname } from "next/navigation";
import ConstructorHeader from "./Constructor.Header";
import { useUser } from "../../../../context/UserContext";
import { useMemo } from "react";

export default function DynamicHeader() {
  const { user } = useUser();
  const pathname = usePathname();

  // if (user.role === "INSTRUCTOR" || user.role === "ADMIN")
  //   return <ConstructorHeader />;

  const hiddenRoutes = useMemo(
    () => ["/course/:slug", "/dashboard", "/admin", "/auth", "/verify"],
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
    return matchHiddenRoutes(pathname, hiddenRoutes);
  }, [hiddenRoutes, pathname]);

  if (isHeaderHidden) return <div></div>;
  return <Header />;
}
