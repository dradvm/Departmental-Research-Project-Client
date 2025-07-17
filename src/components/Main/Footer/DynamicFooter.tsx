import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { useMemo } from "react";

export function DynamicFooter() {
  const pathname = usePathname();

  const hiddenRoutes = useMemo(() => ["/admin", "/auth", "/verify", "/instructor"], []);

  const isFooterHidden = useMemo(() => {
    return hiddenRoutes.some((path) => pathname.startsWith(path));
  }, [hiddenRoutes, pathname]);

  if (isFooterHidden) return <></>;

  return <Footer />;
}
