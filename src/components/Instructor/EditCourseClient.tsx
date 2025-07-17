'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InstructorCreateCourse from "components/Instructor/instructor-update-course";
import { useUser } from '../../../context/UserContext';

export default function EditCoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        // Chờ user có access_token rồi mới fetch
        if (!user?.access_token) return;

        const fetchCourse = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch course");
                }

                const data = await res.json();
                setCourse(data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, [id, user?.access_token]); // 👈 trigger khi token có

    if (!user?.access_token) {
        return <p className="p-6">Waiting for authentication...</p>;
    }

    if (!course) {
        return <p className="p-6">Loading course...</p>;
    }

    return <InstructorCreateCourse mode="edit" courseData={course} />;
}
