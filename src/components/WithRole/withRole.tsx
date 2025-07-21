// components/WithRole/withRole.tsx
"use client"; // rất quan trọng nếu bạn dùng App Router

import { useRouter } from "next/navigation"; // dùng 'next/router' nếu Pages Router
import { useEffect } from "react";
import { useUser } from "../../context/UserContext"; // chỉnh lại path nếu cần

const withRole = (Component: any, allowedRoles: string[]) => {
  return function WithRoleWrapper(props: any) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user) return; // chờ context load
      if (!allowedRoles.includes(user.role)) {
        router.replace("/unauthorized"); // hoặc trang nào bạn muốn
      }
    }, [user]);

    if (!user || !allowedRoles.includes(user.role)) return null;

    return <Component {...props} />;
  };
};

export default withRole;
