"use client";

import "./globals.css";
import DynamicHeader from "components/Main/Header/DynamicHeader";

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
        <DynamicHeader />
        {children}
      </body>
    </html>
  );
}
