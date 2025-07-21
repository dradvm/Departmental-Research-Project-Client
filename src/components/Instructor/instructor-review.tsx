"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import withRole from "../WithRole/withRole";
import CourseReviews from "components/Course/CourseDetails/CourseReviews";
import courseService from "services/course.service";

function CourseDashboard() {
  const { user } = useUser();
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
        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
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
      {/* Top controls */}
      {!selectedCourseId && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              placeholder="Search your courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-sm px-4 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md">
              🔍
            </button>
          </div>
        </div>
      )}

      {/* Banner */}
      {!selectedCourseId && showBanner && (
        <div className="bg-gray-100 p-4 rounded-md border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
              NEW
            </span>
            <span className="font-semibold">
              We upgraded new version so you can upgrade yours.
            </span>
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

      {/* Course content or reviews */}
      <div className="space-y-4">
        {selectedCourseId ? (
          <div>
            <button
              onClick={() => setSelectedCourseId(null)}
              className="mb-4 px-4 py-2 bg-gray-200 rounded-md text-sm"
            >
              ← Quay lại danh sách khóa học
            </button>
            <CourseReviews courseId={selectedCourseId} />
          </div>
        ) : loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course: any) => (
            <div
              key={course.courseId}
              className="flex items-center justify-between border p-4 rounded-md"
            >
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
                  onClick={() => setSelectedCourseId(course.courseId)}
                  className="font-semibold text-purple-600 cursor-pointer hover:underline"
                >
                  Xem đánh giá
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default withRole(CourseDashboard, ["INSTRUCTOR", "ADMIN"]);
