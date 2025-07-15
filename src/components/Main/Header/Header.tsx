'use client';

import { Badge, Divider, LinearProgress, Stack, Menu, MenuItem } from '@mui/material';
import { Button } from 'components/Button/Button';
import { Bell, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useUser } from '../../../../context/UserContext';

export default function Header() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const [isInstructor, setIsInstructor] = useState(false);
  const { user } = useUser();

  if (!user) return null;
  const token = user?.access_token;

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
    await signOut({ callbackUrl: '/' });
  };

  const handleRoleChange = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${user.userId}/role/instructor`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update role");

      const data = await res.json();
      alert(`Cập nhật role thành công, Vui long đăng nhập lại để thấy thay đổi!`);
      // Optional: thông báo UI, redirect, hoặc reload
    } catch (err) {
      console.error("Lỗi khi cập nhật role:", err);
    }
  };

  return (
    <>
      <div className="flex items-center px-8 py-4 space-x-3">
        <div>Udemy</div>
        <div className="relative font-sm  select-none h-10 cursor-pointer group hover:text-indigo-700">
          <div className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent">
            Khám phá
          </div>
          <div className="px-5 py-3 absolute left-0 bottom-0 translate-y-[110%] w-40 bg-white border border-gray-200 invisible opacity-0 rounded shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-100 scale-95 group-hover:scale-100"></div>
        </div>
        <input
          type="text"
          placeholder="Tìm đánh giá"
          className="grow rounded-full px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <div className="flex">
          <div className="relative font-sm  select-none h-10 cursor-pointer group hover:text-indigo-700">
            {isInstructor ? (
              <div className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent">
                Giảng dạy
              </div>
            ) : (
              <>
                <div className="hover:bg-violet-100  w-full h-full flex items-center px-3 rounded before:content-[''] before:absolute before:bg-black before:w-full before:h-4 before:left-0 before:bottom-0 before:translate-y-4 before:bg-transparent">
                  Giảng dạy trên EduMarket
                </div>
                <Stack className="gap-y-3 p-4 absolute right-0 bottom-0 translate-y-[110%] w-64 bg-white border border-gray-200 invisible opacity-0 rounded-lg shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-100 scale-95 group-hover:scale-100">
                  <div className="text-black text-center font-medium">
                    Biến kiến thức của bạn thành cơ hội và tiếp cận với hàng
                    triệu người trên thế giới.
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
            <Stack className="absolute right-0 bottom-0 translate-y-[110%] bg-white border border-gray-200 invisible opacity-0 rounded-lg shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-100 scale-95 group-hover:scale-100">
              <div className="">
                <div className="flex space-x-3 p-4">
                  <div className="rounded overflow-hidden w-16 h-16">
                    <Image src="/test.jpg" width={100} height={100} alt="Ảnh" />
                  </div>
                  <Stack className="gap-y-1">
                    <div className="font-medium text-sm lh-1 line-clamp-2 w-64 text-black">
                      Vỡ lòng về Automation với N8n Vỡ lòng về Automation với
                      N8n Vỡ lòng về Automation với N8n Vỡ lòng về Automation
                      với N8n Vỡ lòng về Automation với N8n
                    </div>
                    <LinearProgress variant="determinate" value={60} />
                  </Stack>
                </div>
                <Divider />
              </div>
              <div className="p-3">
                <Link href={"/home/my-courses/learning"}>
                  <Stack>
                    <Button variant="filled">
                      Chuyển đến Quá trình học tập của tôi
                    </Button>
                  </Stack>
                </Link>
              </div>
            </Stack>
          </div>

          {isLoggedIn && (
            <div className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer">
              <Heart size={18} />
            </div>
          )}
          <div className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer">
            <ShoppingCart size={18} />
          </div>
          {isLoggedIn && (
            <div className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer">
              <Badge badgeContent={1} color="error">
                <Bell size={18} />
              </Badge>
            </div>
          )}

          {/* 👇 Avatar + Dropdown thêm vào đây 👇 */}
          {isLoggedIn && (
            <>
              <div
                className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <Badge overlap="circular" color="error" variant="dot">
                  <div className="rounded-full w-8 h-8 overflow-hidden">
                    <Image
                      src={session?.user?.image || '/default-avatar.jpg'}
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
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1,
                    minWidth: 160,
                    borderRadius: '10px',
                  },
                }}
              >
                <MenuItem component={Link} href="/profile">
                  Manage Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </>
          )}
          {/* 👆 Hết phần thêm 👆 */}

          {!isLoggedIn && (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login" passHref legacyBehavior>
                <Button variant="primary">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/auth/login" passHref legacyBehavior>
                <Button variant="filled">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
      <Divider />
    </>
  );
}
