export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId }: { courseId: string } = await params; // fix this line
  console.log("Course ID:", courseId);

  return (
    <div>
      <h1>Course ID: {params.courseId}</h1>
    </div>
  );
}
