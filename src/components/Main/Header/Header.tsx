"use client";

import {
  Badge,
  Divider,
  Stack,
  Menu,
  MenuItem,
  Typography,
  ListItemText,
} from "@mui/material";
import { Button } from "components/Button/Button";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { userService } from "services/user.service";
import MyAvatar from "components/Avatar/Avatar";
import messageService from "services/message.service";
import cartService from "services/cart.service";
import wishlistService from "services/wishlist.service";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const { status } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [messageHasNotSeenCount, setMessageHasNotSeenCount] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/course/search?search=${encodeURIComponent(search.trim())}`);
    }
  };
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
          `Trở thành giảng viên thành công! Bạn có thể bắt đầu tạo khóa học ngay bây giờ. Vui lòng đăng nhập lại để cập nhật quyền hạn.`
        )
      )
      .catch((err) => console.error("Lỗi khi cập nhật role:", err));
  };

  useEffect(() => {
    if (user) {
      messageService.countNotSeeenMessages().then((res) => {
        setMessageHasNotSeenCount(res.data);
      });
      cartService.count().then((res) => {
        setCartCount(res.data);
      });
      wishlistService.count().then((res) => {
        setWishlistCount(res.data);
      });
    }
  }, [user]);
  return (
    <>
      <div className="flex items-center px-8 py-4 space-x-3">
        <Link href={"/"}>EduMarket</Link>
        <div className="grow flex">
          <input
            type="text"
            placeholder="Tìm khoá học"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
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
                    <Badge badgeContent={wishlistCount} color="error">
                      <Heart size={18} />
                    </Badge>
                  </Link>
                  <Link
                    href={"/cart"}
                    className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer"
                  >
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCart size={18} />
                    </Badge>
                  </Link>

                  <>
                    <div
                      className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer"
                      onClick={handleAvatarClick}
                    >
                      <Badge
                        overlap="circular"
                        color="error"
                        variant="dot"
                        invisible={
                          !messageHasNotSeenCount &&
                          !cartCount &&
                          !wishlistCount
                        }
                      >
                        <MyAvatar
                          user={{
                            isDeleted: false,
                            isActive: true,
                            img: user.image,
                            name: user.name,
                          }}
                          width={32}
                          height={32}
                        />
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
                      <Link
                        href={"/profile"}
                        onClick={handleClose}
                        className="group flex items-center space-x-3 px-4 py-6"
                      >
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
                          <div className="font-bold text-lg group-hover:text-indigo-600">
                            {user.name}
                          </div>
                          <Typography fontSize={14} color="text.secondary">
                            {user.email}
                          </Typography>
                        </div>
                      </Link>

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
                          {cartCount > 0 && (
                            <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                              {cartCount}
                            </div>
                          )}
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          href={"home/my-courses/wishlist"}
                          className="flex items-center justify-between grow"
                        >
                          <ListItemText>Mong muốn</ListItemText>
                          {wishlistCount > 0 && (
                            <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                              {wishlistCount}
                            </div>
                          )}
                        </Link>
                      </MenuItem>
                      {user.role === "INSTRUCTOR" && (
                        <MenuItem onClick={handleClose}>
                          <Link href={"/instructor"}>
                            Bảng điều khiển của giảng viên
                          </Link>
                        </MenuItem>
                      )}

                      <Divider />

                      <MenuItem onClick={handleClose}>
                        <Link
                          href={"/message"}
                          className="flex items-center justify-between grow"
                        >
                          <ListItemText>Tin nhắn</ListItemText>
                          {messageHasNotSeenCount > 0 && (
                            <div className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-500 rounded-full">
                              {messageHasNotSeenCount}
                            </div>
                          )}
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
                  <Link href="/auth/login" passHref>
                    <Button variant="primary">Đăng nhập</Button>
                  </Link>
                  <Link href="/auth/register" passHref>
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
