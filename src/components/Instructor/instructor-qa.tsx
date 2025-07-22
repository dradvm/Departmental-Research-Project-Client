"use client";

import React, { useEffect, useState } from "react";
import withRole from "../WithRole/withRole";
import CourseQAInstructor from "./CourseQA/CourseQAInstructor";
import courseService from "services/course.service";

function CourseDashboard() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [showBanner, setShowBanner] = useState(true);

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
            {/* Thanh tìm kiếm */}
            {!selectedCourseId && (
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
                </div>
            )}

            {/* Banner thông báo */}
            {!selectedCourseId && showBanner && (
                <div className="bg-gray-100 p-4 rounded-md border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                            MỚI
                        </span>
                        <span className="font-semibold">Chúng tôi đã nâng cấp phiên bản mới, hãy cập nhật ngay.</span>
                        <p className="text-sm text-gray-600 mt-1">
                            Với các cải tiến mới trong việc tạo khóa học, thêm loại câu hỏi mới...
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* <button className="bg-purple-600 text-white px-4 py-1 rounded-md text-sm">Tìm hiểu thêm</button> */}
                        <button
                            onClick={() => setShowBanner(false)}
                            className="text-sm text-gray-700"
                        >
                            Bỏ qua
                        </button>
                    </div>
                </div>
            )}

            {/* Nội dung khóa học hoặc Q&A */}
            <div className="space-y-4">
                {selectedCourseId ? (
                    <div>
                        <button
                            onClick={() => setSelectedCourseId(null)}
                            className="mb-4 px-4 py-2 bg-gray-200 rounded-md text-sm"
                        >
                            ← Quay lại danh sách khóa học
                        </button>
                        <CourseQAInstructor courseId={selectedCourseId} />
                    </div>
                ) : loading ? (
                    <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course: any) => (
                        <div
                            key={course.courseId}
                            className="flex items-center justify-between border p-4 rounded-md"
                        >
                            {/* Thông tin khóa học bên trái */}
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
                                            {course.isAccepted ? "ĐÃ XUẤT BẢN" : "BẢN NHÁP"}
                                        </span>{" "}
                                        · {course.isPublic ? "Công khai" : "Riêng tư"}
                                    </p>
                                </div>
                            </div>

                            {/* Tùy chọn bên phải */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span
                                    onClick={() => setSelectedCourseId(course.courseId)}
                                    className="font-semibold text-purple-600 cursor-pointer hover:underline"
                                >
                                    Q&A của khóa học
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy khóa học nào.</p>
                )}
            </div>

        </div>
    );
}

export default withRole(CourseDashboard, ["INSTRUCTOR", "ADMIN"]);
