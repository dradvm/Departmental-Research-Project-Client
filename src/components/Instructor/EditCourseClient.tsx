'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InstructorCreateCourse from "components/Instructor/instructor-update-course";
import { useUser } from '../../../context/UserContext';
import courseService from 'services/course.service';

export default function EditCoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        // Chờ user có access_token rồi mới fetch
        if (!user?.access_token) return;

        const fetchCourse = async () => {
            try {
                if (!id) return;
                const res = await courseService.getCourseById(id.toString());
                const data = await res.data;
                setCourse(data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, [id, user?.access_token]);

    if (!user?.access_token) {
        return <p className="p-6">Waiting for authentication...</p>;
    }

    if (!course) {
        return <p className="p-6">Loading course...</p>;
    }

    return <InstructorCreateCourse mode="edit" courseData={course} />;
}
