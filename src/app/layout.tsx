"use client";

import "react-quill-new/dist/quill.snow.css";
import "./globals.css";

import DynamicHeader from "components/Main/Header/DynamicHeader";
import NextAuthWrapper from "lib/next.auth.wrapper";

import Footer from "components/Main/Footer/Footer";

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
          <Footer />
        </NextAuthWrapper>
      </body>
    </html>
  );
}
