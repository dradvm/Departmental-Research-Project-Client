"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import ConstructorHeader from "./Constructor.Header";
import { useUser } from "../../../../context/UserContext";

export default function DynamicHeader() {
  const { user } = useUser();
  const pathname = usePathname();

  if (!user) return null;

  if (pathname.startsWith("/course")) return <></>;
  if (user.role === 'INSTRUCTOR' || user.role === "ADMIN") return <ConstructorHeader />;

  return <Header />;
}
