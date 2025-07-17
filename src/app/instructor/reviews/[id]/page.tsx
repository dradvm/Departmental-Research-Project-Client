'use client';

import CourseReviews from 'components/Course/CourseDetails/CourseReviews';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const courseId = params.id;

    return (
        <div>
            <CourseReviews courseId={courseId as string} />
        </div>
    );
}