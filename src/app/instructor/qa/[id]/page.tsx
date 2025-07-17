
"use client";

import CourseQAInstructor from "components/Instructor/CourseQA/CourseQAInstructor";
import { useParams } from "next/navigation";

export default function QAInstructorPage() {
    const params = useParams();
    const courseId = params.id;


    if (!courseId) return null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Hỏi đáp khóa học</h1>
            <CourseQAInstructor courseId={courseId as string} />
        </div>
    );
}
