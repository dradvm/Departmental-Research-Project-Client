interface CoursePageProps {
    params: { courseId: string };
  }
  
  export default function CoursePage({ params }: CoursePageProps) {
    const { courseId } = params;
  
    return (
      <div>
        <h1>Course Page</h1>
        <p>Course ID: {courseId}</p>
        {/* Add more course details here */}
      </div>
    );
  }
  