"use client";
import Sidebar, { NavItemSideBar } from "components/Sidebar/Sidebar";
import {
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboardIcon,
  LogOut,
  Tag,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems: NavItemSideBar[] = [
    {
      text: "Thống kê",
      icon: <LayoutDashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      text: "Học viên",
      icon: <User />,
      path: "/admin/learner",
    },
    {
      text: "Giảng viên",
      icon: <GraduationCap />,
      path: "/admin/instructor",
    },
    {
      text: "Đơn hàng",
      icon: <CreditCard />,
      path: "/admin/payment",
    },
    {
      text: "Bài đăng",
      icon: <FileText />,
      path: "/admin/post",
    },
    {
      text: "Khuyến mãi",
      icon: <Tag />,
      path: [
        "/admin/promotion",
        "/admin/promotion/global",
        "/admin/promotion/normal",
      ],
    },
    {
      text: "Logout",
      icon: <LogOut />,
      onClick: () => signOut({ callbackUrl: "/" }),
    },
  ];

  return (
    <div className="flex">
      <Sidebar navItems={navItems} title="Quản trị viên" />
      <div className="duration-300 ease-linear grow px-2 py-4">{children}</div>
    </div>
  );
}
