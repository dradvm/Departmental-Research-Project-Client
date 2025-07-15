import { CircleUser } from "lucide-react";
import Image from "next/image";
import { CourseAdminUI } from "types/course";
import { formatVND } from "utils/money";
import { getHourFormSecond } from "utils/time";
import { Button } from "../Button/Button";

export function PostItem({
  post,
  handleOpen,
  setSelectedPost,
  acceptCourse,
}: {
  post: CourseAdminUI;
  handleOpen: () => void;
  setSelectedPost: React.Dispatch<
    React.SetStateAction<CourseAdminUI | undefined>
  >;
  acceptCourse: (courseId: number) => void;
}) {
  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition w-full max-w-xl overflow-hidden">
      {/* Course avatar */}
      <div className="w-32 h-36 flex-shrink-0 overflow-hidden">
        <Image
          src={post.thumbnail ?? "/thumbnail.webp"}
          alt={post.title}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Course information */}
      <div className="flex flex-col justify-between p-3 grow gap-1">
        <h1 className="text-lg font-bold text-indigo-600 truncate">
          {post.title}
        </h1>

        <div className="flex items-center gap-1 font-bold text-blue-700">
          <CircleUser size={14} />
          <span className="truncate">{post.teacherName ?? "Chưa rõ"}</span>
        </div>

        <h3 className="font-bold text-red-600">
          {post.price ? `${formatVND(parseInt(post.price))}` : "Không xác định"}
        </h3>

        <h3>{getHourFormSecond(parseInt(post.totalTime))} giờ học</h3>
        <h3>{post.lectureCount} bài học</h3>

        <h3 className={post.isAccepted ? "text-green-500" : "text-red-500"}>
          {post.isAccepted ? "Đã duyệt" : "Chưa duyệt"}
        </h3>

        <div className="flex gap-2 justify-end">
          {!post.isAccepted && (
            <Button
              variant="filled"
              size="sm"
              onClick={() => {
                acceptCourse(parseInt(post.courseId));
              }}
            >
              Duyệt ngay
            </Button>
          )}
          <Button
            variant="filled"
            size="sm"
            onClick={() => {
              setSelectedPost(post);
              handleOpen();
            }}
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
}
