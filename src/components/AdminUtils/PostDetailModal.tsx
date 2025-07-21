import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { X } from "lucide-react";
import { CourseAdminUI } from "types/course";
import { formatVND } from "utils/money";

interface PostDetailModalProps {
  postDetail: CourseAdminUI;
  handleClose: () => void;
  acceptCourse: (courseId: number) => void;
}

export default function PostDetailModal({
  postDetail,
  handleClose,
  acceptCourse,
}: PostDetailModalProps) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[90vw] max-w-[900px] transform -translate-x-1/2 -translate-y-1/2 p-6 sm:p-8 bg-white rounded-xl shadow-xl max-h-[700px] overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 p-1 text-gray-600 hover:bg-red-500 hover:text-white rounded-full transition"
        onClick={handleClose}
        title="Đóng"
      >
        <X size={20} />
      </button>

      {/* Post Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{postDetail.title}</h1>
        <p className="text-lg text-gray-500">{postDetail.subTitle}</p>
      </div>

      {/* General Information */}
      <div className="space-y-4">
        {/* Teacher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Giảng viên:</span>{" "}
            {postDetail.teacherName}
          </p>
          <p>
            <span className="font-semibold">Liên hệ:</span>{" "}
            {postDetail.teacherEmail}
          </p>
        </div>

        {/* Course Description */}
        <div className="space-y-2 text-gray-700">
          <div>
            <span className="font-semibold">Mô tả khóa học:</span>{" "}
            <div
              dangerouslySetInnerHTML={{ __html: postDetail.description }}
            ></div>
          </div>
          <div>
            <span className="font-semibold">Học phí:</span>{" "}
            {formatVND(parseInt(postDetail.price))}
          </div>
          <div>
            <span className="font-semibold">Mục tiêu khóa học:</span>{" "}
            <div
              dangerouslySetInnerHTML={{ __html: postDetail.targetAudience }}
            ></div>
          </div>
          <div>
            <span className="font-semibold">Yêu cầu khóa học:</span>{" "}
            <div
              dangerouslySetInnerHTML={{ __html: postDetail.requirement }}
            ></div>
          </div>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Nội dung khóa học
        </h2>
        {postDetail.sections.length > 0 ? (
          <div className="max-h-[240px] overflow-y-auto pr-2">
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              {postDetail.sections.map((section, section_idx) => (
                <div key={`section-${section.sectionId}`}>
                  <ListSubheader
                    sx={{
                      bgcolor: "#f9fafb",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#374151",
                    }}
                  >
                    {`Chương ${section_idx + 1}: ${section.sectionName}`}
                  </ListSubheader>
                  <List disablePadding>
                    {section.lectures.map((lecture, lecture_idx) => (
                      <ListItem
                        key={`lecture-${lecture.lectureId}`}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          primary={`Bài ${lecture_idx + 1}: ${lecture.lectureName}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </List>
          </div>
        ) : (
          <h1>Khóa học chưa có nội dung</h1>
        )}
      </div>

      {/* Accept Button */}
      <div className="mt-2 flex gap-[8px] justify-end">
        <button
          className="px-4 py-1 mt-4 bg-green-700 shadow-md shadow-blue-700/70 rounded-[8px] font-bold text-white"
          onClick={() => {
            acceptCourse(parseInt(postDetail.courseId));
            handleClose();
          }}
        >
          Duyệt
        </button>
        <button
          className="px-4 py-1 mt-4 bg-red-700 shadow-md shadow-red-700 rounded-[8px] font-bold text-white"
          onClick={handleClose}
        >
          Thoát
        </button>
      </div>
    </div>
  );
}
