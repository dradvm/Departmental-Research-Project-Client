"use client";

import {
  Badge,
  Divider,
  Stack,
  Menu,
  MenuItem,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import { Button } from "components/Button/Button";
import { Bell, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { userService } from "services/user.service";
import enrollmentService from "services/enrollment.service";
import { Enrollment } from "types/enrollment";
import MyAvatar from "components/Avatar/Avatar";
import { LanguageIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const { data: session, status } = useSession();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [enrolledStudy, setCourseEnrolledStudy] = useState<Enrollment[]>([]);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: "/" });
  };

  const handleRoleChange = () => {
    userService
      .changeRoleUser()
      .then(() =>
        alert(
          `Cập nhật role thành công, Vui long đăng nhập lại để thấy thay đổi!`
        )
      )
      .catch((err) => console.error("Lỗi khi cập nhật role:", err));
  };

  useEffect(() => {
    enrollmentService
      .getCourseEnrolledWithLastStudy()
      .then((res) => {
        setCourseEnrolledStudy(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex items-center px-8 py-4 space-x-3">
        <Link href={"/"}>EduMarket</Link>
        <div className="relative font-sm  select-none h-10 cursor-pointer group hover:text-indigo-700">
          <div className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent">
            Khám phá
          </div>
          <div className="px-5 py-3 absolute left-0 bottom-0 translate-y-[110%] w-40 bg-white border border-gray-200 invisible opacity-0 rounded shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-100 scale-95 group-hover:scale-100"></div>
        </div>
        <div className="grow flex">
          <input
            type="text"
            placeholder="Tìm đánh giá"
            className={`rounded-full px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${user ? "grow" : "w-[800px]"}`}
          />
        </div>
        <div className="flex">
          {status === "loading" ? (
            <></>
          ) : (
            <>
              {user ? (
                <>
                  <div className="relative font-sm  select-none h-10 cursor-pointer group hover:text-indigo-700">
                    {user?.role !== "USERS" ? (
                      <Link
                        href={"/instructor"}
                        className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent"
                      >
                        Giảng dạy
                      </Link>
                    ) : (
                      <>
                        <div className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent">
                          Giảng dạy trên EduMarket
                        </div>
                        <Stack className="z-10 gap-y-3 p-4 absolute right-0 bottom-0 translate-y-[110%] w-64 bg-white border border-gray-200 invisible opacity-0 rounded-lg shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-100 scale-95 group-hover:scale-100">
                          <div className="text-black text-center font-medium">
                            Biến kiến thức của bạn thành cơ hội và tiếp cận với
                            hàng triệu người trên thế giới.
                          </div>
                          <Button variant="filled" onClick={handleRoleChange}>
                            Đăng ký ngay
                          </Button>
                        </Stack>
                      </>
                    )}
                  </div>

                  <div className="relative font-sm  select-none h-10 cursor-pointer group hover:text-indigo-700">
                    <Link
                      href={"/home/my-courses/learning"}
                      className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent"
                    >
                      Học tập
                    </Link>
                  </div>
                  <Link
                    href={"/home/my-courses/wishlist"}
                    className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer"
                  >
                    <Heart size={18} />
                  </Link>
                  <Link
                    href={"/cart"}
                    className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer"
                  >
                    <ShoppingCart size={18} />
                  </Link>
                  <div className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer">
                    <Badge badgeContent={1} color="error">
                      <Bell size={18} />
                    </Badge>
                  </div>

                  <>
                    <div
                      className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer"
                      onClick={handleAvatarClick}
                    >
                      <Badge overlap="circular" color="error" variant="dot">
                        <div className="rounded-full w-8 h-8 overflow-hidden">
                          <Image
                            src={user.image || "/default-avatar.jpg"}
                            alt="avatar"
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      </Badge>
                    </div>

                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      {/* Header: Avatar + Name */}
                      <div className="flex items-center space-x-3 px-4 py-6">
                        <MyAvatar
                          user={{
                            isDeleted: false,
                            isActive: true,
                            img: user.image,
                            name: user.name,
                          }}
                          width={64}
                          height={64}
                          fontSize="1.5rem"
                        />
                        <div className="grow">
                          <Typography fontWeight="bold">{user.name}</Typography>
                          <Typography fontSize={14} color="text.secondary">
                            {user.email}
                          </Typography>
                        </div>
                      </div>

                      <Divider />

                      {/* Section 1 */}
                      <MenuItem onClick={handleClose}>
                        <Link href="/home/my-courses/learning">Học tập</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          href={"/cart"}
                          className="flex items-center justify-between grow"
                        >
                          <ListItemText>Giỏ hàng của tôi</ListItemText>
                          <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                            2
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          href={"home/my-courses/wishlist"}
                          className="flex items-center justify-between grow"
                        >
                          <ListItemText>Mong muốn</ListItemText>
                          <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                            2
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link href={"/instructor"}>
                          Bảng điều khiển của giảng viên
                        </Link>
                      </MenuItem>

                      <Divider />

                      {/* Section 2 */}
                      <MenuItem onClick={handleClose}>
                        <Link
                          href={"/cart"}
                          className="flex items-center justify-between grow"
                        >
                          <ListItemText>Thông báo</ListItemText>
                          <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                            2
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          href={"/message"}
                          className="flex items-center justify-between grow"
                        >
                          <ListItemText>Tin nhắn</ListItemText>
                          <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                            2
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link href={"/transaction-history"}>Lịch sử mua</Link>
                      </MenuItem>

                      <Divider />
                      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                  </>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login" passHref legacyBehavior>
                    <Button variant="primary">Đăng nhập</Button>
                  </Link>
                  <Link href="/auth/login" passHref legacyBehavior>
                    <Button variant="filled">Đăng ký</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Divider />
    </>
  );
}
