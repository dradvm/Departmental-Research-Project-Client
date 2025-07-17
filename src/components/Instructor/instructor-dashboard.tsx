"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import ModalUnstyled from "./addcoupon-modal";
import withRole from "../WithRole/withRole";

function CourseDashboard() {
    const { user } = useUser();
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
            if (!user?.access_token) return;

            try {
                setLoading(true);

                const res = await fetch("http://localhost:3001/api/courses/me", {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch courses");
                }

                const data = await res.json();
                setCourses(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [user?.access_token]); // đảm bảo gọi lại khi user thay đổi

    // useEffect(() => {
    //     console.log("access_token:", user?.access_token);
    // }, [user?.access_token]);


    const filteredCourses = courses.filter((course: any) =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Top controls */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-1 items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search your courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-sm px-4 py-2 border rounded-md"
                    />
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md">🔍</button>
                </div>
                <button onClick={() => router.push("/instructor/createcourse")} className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md">
                    New course
                </button>
            </div>

            {/* Banner */}
            {showBanner && (
                <div className="bg-gray-100 p-4 rounded-md border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                            NEW
                        </span>
                        <span className="font-semibold">We upgraded new version so you can upgrade yours.</span>
                        <p className="text-sm text-gray-600 mt-1">
                            With our creation improvements, new question types...
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* <button className="bg-purple-600 text-white px-4 py-1 rounded-md text-sm">Learn more</button> */}
                        <button
                            onClick={() => setShowBanner(false)}
                            className="text-sm text-gray-700"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            {/* Course list */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course: any) => (
                        <div key={course.courseId} className="flex items-center justify-between border p-4 rounded-md">
                            {/* Left */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt="Course thumbnail"
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
                                            {course.isAccepted ? "PUBLISHED" : "DRAFT"}
                                        </span>{" "}
                                        · {course.isPublic ? "Public" : "Private"}
                                    </p>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span
                                    onClick={() => router.push(`/instructor/updatecourse/${course.courseId}`)}
                                    className="font-semibold text-purple-600 cursor-pointer hover:underline"
                                >
                                    Edit / manage course
                                </span>
                                <span className="text-gray-400 select-none">|</span>
                                <span
                                    onClick={() => handleOpenModal(course.courseId)}
                                    className="font-semibold text-purple-700 cursor-pointer hover:underline"
                                >
                                    Add coupon
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No courses found.</p>
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

export default withRole(CourseDashboard, ["INSTRUCTOR", "ADMIN"]);