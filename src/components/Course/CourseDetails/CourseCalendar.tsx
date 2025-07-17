"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ThreeStepModalCalendar from "./CourseCalendar/ThreeStepModalCalendar";
import { Button } from "components/Button/Button";
import { Course } from "types/course";
import { Menu, MenuItem, Stack } from "@mui/material";
import { AlarmClock, EllipsisVertical, Infinity, Plus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { StudyRemind } from "types/study-remind";
import studyRemindService from "services/study-remind.service";
import { formatDateVN, formatWeekdaysToVietnamese } from "utils/time";
import { Bounce, toast, ToastContainer } from "react-toastify";
// pages/login.tsx

const StudyRemindItem = ({
  studyRemind,
  handleSync,
  handleDelete,
}: {
  studyRemind: StudyRemind;
  handleSync: (studyRemindId: number) => void;
  handleDelete: (studyRemindId: number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOption, setIsOption] = useState<boolean>(false);
  const handleOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOption(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOption(false);
  };

  const getFrequence = (studyRemind: StudyRemind) => {
    switch (studyRemind.frequency) {
      case "daily":
        return "Hàng ngày";
      case "weekly":
        return formatWeekdaysToVietnamese(studyRemind.daysOfWeek ?? "");
      case "onetime":
        return formatDateVN(new Date(studyRemind.time));
      default:
        return "";
    }
  };

  const handleSyncOnClick = () => {
    handleSync(studyRemind.studyRemindId);
    handleClose();
  };
  const handleDeleteOnclick = () => {
    handleDelete(studyRemind.studyRemindId);
    handleClose();
  };
  return (
    <Stack className="border border-gray-300 px-4 py-6 gap-y-1">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">{studyRemind.summary}</div>
        <div>
          <div className="cursor-pointer" onClick={handleOption}>
            <EllipsisVertical size={16} />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={isOption}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            elevation={1}
            MenuListProps={{
              sx: {
                "& .MuiMenuItem-root": {
                  fontSize: "0.875rem",
                  px: 2,
                  py: 1,
                },
              },
            }}
          >
            <MenuItem onClick={handleSyncOnClick}>Đồng bộ</MenuItem>
            <MenuItem onClick={handleDeleteOnclick}>Xoá</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="flex space-x-8 items-center font-medium mt-2">
        <div className="flex space-x-2 items-center">
          <AlarmClock size={20} />
          <div>
            {new Date(studyRemind.time).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <Infinity size={20} />
          <div>{getFrequence(studyRemind)}</div>
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <FcGoogle size={30} />
        <div>Đã thêm vào Google Calendar</div>
      </div>
      {studyRemind.description && (
        <div className="text-gray-700">{studyRemind.description}</div>
      )}
    </Stack>
  );
};

export default function CourseCalendar({ course }: { course: Course | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [studyRemindList, setStudyRemindList] = useState<StudyRemind[]>([]);
  const popupRef = useRef<Window | null>(null);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleLoginGoogle = async (loadingFunction?: () => void) => {
    if (loadingFunction) {
      loadingFunction();
    }
    const res = await fetch("/api/google/login");
    const data = await res.json();
    const authUrl = data.authUrl;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    popupRef.current = window.open(
      authUrl,
      "google-login",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const waitForGoogleCode = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const handler = (event: MessageEvent) => {
        const code = event.data?.code;
        if (code) {
          resolve(code);
        } else {
          reject(new Error("Không nhận được mã code"));
        }
        window.removeEventListener("message", handler); // Dừng sau 1 lần
      };

      window.addEventListener("message", handler);
    });
  };

  const handleSync = (studyRemindId: number) => {
    handleLoginGoogle()
      .then(() => waitForGoogleCode())
      .then((code) => studyRemindService.resyncStudyRemind(studyRemindId, code))

      .then(() => {
        toast.success("Đồng bộ thành công");
      })
      .catch(() => {
        toast.error("Đồng bộ  thất bại, vui lòng thử lại sau");
      });
  };

  const handleDelete = (studyRemindId: number) => {
    handleLoginGoogle()
      .then(() => waitForGoogleCode())
      .then((code) => studyRemindService.deleteStudyRemind(studyRemindId, code))

      .then(() => {
        loadStudyRemindList();
        toast.success("Xoá thành công");
      })
      .catch(() => {
        toast.error("Xoá thất bại, vui lòng thử lại sau");
      });
  };

  const loadStudyRemindList = useCallback(() => {
    studyRemindService
      .getAll()
      .then((res) => setStudyRemindList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    loadStudyRemindList();
  }, [loadStudyRemindList]);

  useEffect(() => {
    console.log(studyRemindList);
  }, [studyRemindList]);

  return (
    <Stack className="px-32 py-6 gap-y-3">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />{" "}
      <div className="font-medium text-2xl">Nhắc nhở học tập</div>
      <div className="text-gray-900">
        Học một chút mỗi ngày sẽ giúp bạn tích lũy kiến thức. Nghiên cứu cho
        thấy rằng những học viên biến việc học thành thói quen sẽ có nhiều khả
        năng đạt được mục tiêu hơn. Hãy dành thời gian để học và nhận lời nhắc
        bằng cách sử dụng trình lên lịch học tập.
      </div>
      {studyRemindList.map((studyRemind) => (
        <StudyRemindItem
          studyRemind={studyRemind}
          key={studyRemind.studyRemindId}
          handleSync={handleSync}
          handleDelete={handleDelete}
        />
      ))}
      <div>
        <Button
          variant="filled"
          className="flex space-x-1"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <Plus size={16} />
          <div>Thêm nhắc nhở học tập</div>
        </Button>
      </div>
      {isOpen && (
        <ThreeStepModalCalendar
          handleCloseModal={handleCloseModal}
          content={course ? `Khoá học: ${course.title}` : ""}
          handleLoginGoogle={handleLoginGoogle}
          handleReloadStudyRemind={loadStudyRemindList}
        />
      )}
    </Stack>
  );
}
