"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModalUnstyled from "./addcoupon-modal";
import withRole from "../WithRole/withRole";
import courseService from "services/course.service";

function CourseDashboard() {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [showBanner, setShowBanner] = useState(true);

    const handleOpenModal = (courseId: number) => {
        setSelectedCourseId(courseId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCourseId(null);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const res = await courseService.getMyCourses();
                setCourses(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Đã xảy ra lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter((course: any) =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Thanh tìm kiếm và nút tạo khóa học mới */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-1 items-center gap-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học của bạn"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-sm px-4 py-2 border rounded-md"
                    />
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md">🔍</button>
                </div>
                <button onClick={() => router.push("/instructor/createcourse")} className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md">
                    Tạo khóa học mới
                </button>
            </div>

            {/* Banner thông báo */}
            {showBanner && (
                <div className="bg-gray-100 p-4 rounded-md border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                            MỚI
                        </span>
                        <span className="font-semibold">Chúng tôi đã nâng cấp phiên bản mới, bạn có thể cập nhật ngay.</span>
                        <p className="text-sm text-gray-600 mt-1">
                            Cải thiện trình tạo khóa học, thêm các dạng câu hỏi mới...
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowBanner(false)}
                            className="text-sm text-gray-700"
                        >
                            Bỏ qua
                        </button>
                    </div>
                </div>
            )}

            {/* Danh sách khóa học */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">Đang tải...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course: any) => (
                        <div key={course.courseId} className="flex items-center justify-between border p-4 rounded-md">
                            {/* Bên trái */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt="Ảnh khóa học"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl">📚</span>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-semibold">{course.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-bold">
                                            {course.isAccepted ? "ĐÃ CÔNG KHAI" : "BẢN NHÁP"}
                                        </span>{" "}
                                        · {course.isPublic ? "Công khai" : "Riêng tư"}
                                    </p>
                                </div>
                            </div>

                            {/* Bên phải */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span
                                    onClick={() => router.push(`/instructor/updatecourse/${course.courseId}`)}
                                    className="font-semibold text-purple-600 cursor-pointer hover:underline"
                                >
                                    Chỉnh sửa / Quản lý
                                </span>
                                <span className="text-gray-400 select-none">|</span>
                                <span
                                    onClick={() => handleOpenModal(course.courseId)}
                                    className="font-semibold text-purple-700 cursor-pointer hover:underline"
                                >
                                    Thêm mã giảm giá
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy khóa học nào.</p>
                )}
                {modalOpen && selectedCourseId !== null && (
                    <ModalUnstyled
                        open={modalOpen}
                        onClose={handleCloseModal}
                        courseId={selectedCourseId}
                    />
                )}
            </div>
        </div>
    );
}

export default withRole(CourseDashboard, ["INSTRUCTOR"]);
