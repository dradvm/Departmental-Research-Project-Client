"use client";
import Sidebar, { NavItemSideBar } from "components/Sidebar/Sidebar";
import {
  AlertTriangle,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboardIcon,
  Tag,
  User,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems: NavItemSideBar[] = [
    {
      text: "Dashboard",
      icon: <LayoutDashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      text: "Learner",
      icon: <User />,
      path: "/admin/learner",
    },
    {
      text: "Instructor",
      icon: <GraduationCap />,
      path: "/admin/instructor",
    },
    {
      text: "Payment",
      icon: <CreditCard />,
      path: "/admin/payment",
    },
    {
      text: "Post",
      icon: <FileText />,
      path: "/admin/post",
    },
    {
      text: "Promotion",
      icon: <Tag />,
      path: [
        "/admin/promotion",
        "/admin/promotion/global",
        "/admin/promotion/normal",
      ],
    },
    {
      text: "Report",
      icon: <AlertTriangle />,
      path: "/admin/report",
    },
  ];

  return (
    <div className="flex">
      <Sidebar navItems={navItems} title="Admin Panel" />
      <div className="duration-300 ease-linear grow px-2 py-4">{children}</div>
    </div>
  );
}
