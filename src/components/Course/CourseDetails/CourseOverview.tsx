import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Stack } from "@mui/material";
import MyAvatar from "components/Avatar/Avatar";
import { useCallback, useEffect, useMemo, useState } from "react";
import courseService from "services/course.service";
import { Course } from "types/course";
import { ReviewOverview } from "types/review";
import { formatDuration } from "utils/time";

export default function CourseOverview({ courseId }: { courseId: number }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [reviewOverview, setReviewOverview] = useState<ReviewOverview | null>(
    null
  );
  const totalTime = useMemo(() => {
    return course?.Section?.reduce(
      (total, section) =>
        total +
        section.Lecture.reduce((time, lecture) => time + lecture.time, 0),
      0
    );
  }, [course]);
  const fetchReviewOverview = useCallback(() => {
    courseService
      .getCourseById(courseId.toString())
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
    courseService
      .getCourseReviewOverview(courseId.toString())
      .then((res) => {
        setReviewOverview(res.data);
      })
      .catch((err) => console.log(err));
  }, [courseId]);

  useEffect(() => {
    fetchReviewOverview();
  }, [fetchReviewOverview]);

  return (
    <>
      {course && (
        <Stack className="space-y-4">
          <div className="text-2xl">{course?.title}</div>
          <div className="text-xl text-gray-800">{course?.subTitle}</div>
          <div className="flex space-x-5">
            <Stack>
              <div className="flex items-center font-bold text-yellow-700">
                {reviewOverview?.average ?? 0}
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-600 ms-1"
                />
              </div>
              <div className="text-xs text-gray-500">
                {course._count?.Review ?? 0} đánh giá
              </div>
            </Stack>
            <Stack>
              <div className="font-bold">{course._count?.Enrollment}</div>
              <div className="text-xs text-gray-500">học viên</div>
            </Stack>
            <Stack>
              <div className="font-bold">{formatDuration(totalTime ?? 0)}</div>
              <div className="text-xs text-gray-500">Tổng thời lượng</div>
            </Stack>
          </div>
          <Divider />
          <div className="grid grid-cols-3 gap-4">
            <div>Mô tả</div>
            <div
              className="col-span-2 ql-editor"
              dangerouslySetInnerHTML={{ __html: course?.description }}
            ></div>
          </div>
          <Divider />
          <div className="grid grid-cols-3 gap-4">
            <div>Giảng viên</div>
            <Stack className="col-span-2 gap-7">
              <Stack className="gap-3">
                <div className="flex items-center space-x-5">
                  <MyAvatar
                    user={{
                      img: course.User?.img,
                      isActive: !!course.User?.isActive,
                      isDeleted: !!course.User?.isDeleted,
                      name: course.User?.name ?? "",
                    }}
                  />
                  <Stack>
                    <div className="font-semibold">{course.User?.name}</div>
                    <div className="text-sm text-slate-700 font-medium">
                      {course.User?.email}
                    </div>
                  </Stack>
                </div>
              </Stack>
              <div>{course.User?.biography}</div>
            </Stack>
          </div>
        </Stack>
      )}
    </>
  );
}
