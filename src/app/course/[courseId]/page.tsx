export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId }: { courseId: string } = await params; // fix this line
  console.log("Course ID:", courseId);

  return <></>;
}
