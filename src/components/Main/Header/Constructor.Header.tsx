'use client';

import { Badge, Menu, MenuItem, Stack } from '@mui/material';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated';

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

    return (
        <>
            <div className="flex items-center justify-between px-8 py-4 space-x-3">
                <div className="flex items-center space-x-4">
                    {/* Giảng dạy trên EduMarket */}
                    <div className="relative font-sm select-none h-10 cursor-pointer group hover:text-indigo-700">
                        <div className="hover:bg-violet-100 w-full h-full flex items-center px-3 rounded">
                            Giảng dạy trên EduMarket
                        </div>
                        <Stack className="gap-y-3 p-4 absolute right-0 bottom-0 translate-y-[110%] w-64 bg-white border border-gray-200 invisible opacity-0 rounded-lg shadow-lg group-hover:visible group-hover:opacity-100 transition-all duration-100 scale-95 group-hover:scale-100 z-50">
                            <div className="text-black text-center font-medium">
                                Biến kiến thức của bạn thành cơ hội và tiếp cận với hàng triệu người trên thế giới.
                            </div>
                            <Link href="#">
                                <button className="bg-indigo-600 text-white py-1.5 px-4 rounded-md text-sm hover:bg-indigo-500">
                                    Tìm hiểu thêm
                                </button>
                            </Link>
                        </Stack>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Icon thông báo */}
                    {isLoggedIn && (
                        <div className="relative font-sm h-10 select-none flex items-center px-3 rounded hover:bg-violet-100 hover:text-indigo-700 cursor-pointer">
                            <Badge badgeContent={1} color="error">
                                <Bell size={18} />
                            </Badge>
                        </div>
                    )}

                    {/* Avatar */}
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
                </div>
            </div>

            <hr className="border-gray-200" />
        </>
    );
}
