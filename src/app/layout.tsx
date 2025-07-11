"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-quill-new/dist/quill.snow.css";
import "./globals.css";

import DynamicHeader from "components/Main/Header/DynamicHeader";
import NextAuthWrapper from "lib/next.auth.wrapper";

import { DynamicFooter } from "components/Main/Footer/DynamicFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <NextAuthWrapper>
          <DynamicHeader />
          {children}
          <DynamicFooter />
        </NextAuthWrapper>
      </body>
    </html>
  );
}
