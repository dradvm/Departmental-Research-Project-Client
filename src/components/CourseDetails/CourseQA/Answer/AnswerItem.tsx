import { Menu, MenuItem, Stack } from "@mui/material";
import Image from "next/image";
import { getInitials } from "utils/text";
import { getTimeAgo } from "utils/time";
import Answer from "types/answer";
import { EllipsisVertical, User } from "lucide-react";
import AnswerForm from "./AnswerForm";
import { useState } from "react";
import qaService from "services/qa.service";
import { useSession } from "next-auth/react";
export default function AnswerItem({
  answer,
  handleSave,
  loadAnswers,
}: {
  answer: Answer;
  handleSave: (
    formData: FormData,
    handleAfterSave: () => void,
    isUpdate: boolean
  ) => void;
  loadAnswers: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOption, setIsOption] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: session } = useSession();
  const handleOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOption(true);
  };

  const handleIsUpdate = () => {
    setIsUpdate(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOption(false);
  };
  const handleCancel = () => {
    setIsUpdate(false);
  };
  const handleSaveAnswer = (
    formData: FormData,
    handleAfterSave: () => void,
    isUpdate: boolean
  ) => {
    const newHandleAfterSave = () => {
      handleAfterSave();
      setIsUpdate(false);
    };
    handleSave(formData, newHandleAfterSave, isUpdate);
  };
  const handleDelele = () => {
    handleClose();
    setIsDisabled(true);
    qaService
      .deleteAnswer(answer.answerId)
      .then(() => {
        loadAnswers();
        setIsDisabled(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex space-x-3">
      <div className="rounded-full w-12 h-12 overflow-hidden flex-shrink-0">
        {!answer.User.isDeleted && answer.User.isActive ? (
          answer.User.img ? (
            <Image src={answer.User.img} alt="image" width={64} height={64} />
          ) : (
            <div className="bg-black h-full w-full flex items-center justify-around">
              <div className="text-white font-medium text-lg">
                {getInitials(answer.User.name)}
              </div>
            </div>
          )
        ) : (
          <div className="bg-black h-full w-full flex items-center justify-around">
            <User size={20} color="white" />
          </div>
        )}
      </div>
      <Stack className="gap-y-1 grow">
        <div className="font-medium flex space-x-3">
          <div className="underline text-indigo-600">
            {!answer.User.isDeleted && answer.User.isActive
              ? answer.User.name
              : "Tài khoản người dùng"}
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          {getTimeAgo(answer.createdAt)}
        </div>
        <Stack className="gap-y-1">
          {!isUpdate ? (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: answer.answerContent }}
              ></div>
              {answer.AnswerImage.map((image, index) => (
                <div key={index} className="flex">
                  <Image
                    src={image.secureUrl}
                    alt={`answer-image-${index}`}
                    unoptimized
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-w-full  object-scale-down"
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="">
              <AnswerForm
                isUpdate={true}
                handleSave={handleSaveAnswer}
                content={answer.answerContent}
                oldImages={answer.AnswerImage}
                handleCancel={handleCancel}
                answerId={answer.answerId.toString()}
              />
            </div>
          )}
        </Stack>
      </Stack>
      {!isUpdate && answer.userId === session?.user.userId && (
        <div className="flex-shrink-0">
          <div
            className="relative cursor-pointer py-1 rounded hover:bg-gray-300"
            onClick={handleOption}
          >
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
            <MenuItem onClick={handleIsUpdate} disabled={isDisabled}>
              Chỉnh sửa
            </MenuItem>
            <MenuItem onClick={handleDelele} disabled={isDisabled}>
              Xoá
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
