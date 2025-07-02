"use client";

import "react-quill-new/dist/quill.snow.css";
import "./globals.css";

import DynamicHeader from "components/Main/Header/DynamicHeader";
import NextAuthWrapper from "lib/next.auth.wrapper";

import { usePathname } from "next/navigation";
import Footer from "components/Main/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Danh sách các route cần ẩn header
  const hiddenRoutes = ["/auth/login", "/auth/register", "/verify"];

  // Ẩn header nếu pathname khớp bất kỳ prefix nào trong hiddenRoutes
  const shouldShowHeader = !hiddenRoutes.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <NextAuthWrapper>
          {shouldShowHeader && <DynamicHeader />}
          {children}
        </NextAuthWrapper>
        <Footer />
      </body>
    </html>
  );
}
