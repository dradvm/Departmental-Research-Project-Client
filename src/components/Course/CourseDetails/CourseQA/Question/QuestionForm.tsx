import { Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import Editor from "components/Editor/Editor";
import Input from "components/Input/Input";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Image as ImageType } from "types/image";
export default function QuestionForm({
  handleSave,
  lectureId,
  isUpdate = false,
  title = "",
  content = "",
  oldImages = [],
  handleCancel = () => {},
  questionId = "",
}: {
  handleSave: (formData: FormData) => void;
  lectureId: string;
  isUpdate?: boolean;
  title?: string;
  content?: string;
  oldImages?: ImageType[];
  width?: number;
  questionId?: string;
  handleCancel?: () => void;
}) {
  const [questionTitle, setQuestionTitle] = useState<string>(title);
  const [questionContent, setQuestionContent] = useState<string>(content);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const maxLength = 5000;
  const [images, setImages] = useState<(File | ImageType)[]>(oldImages);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const save = () => {
    const formData = new FormData();
    setIsDisabled(true);

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else {
        formData.append("oldImages", image.publicId);
      }
    });
    if (isUpdate) {
      formData.append("questionId", questionId);
    }
    formData.append("questionTitle", questionTitle);
    formData.append("questionContent", questionContent);
    formData.append("lectureId", lectureId);
    handleSave(formData);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remainingSlots = 3 - images.length;
    const filesArray = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots);

    setImages((prev) => [...prev, ...filesArray]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack className="gap-y-3">
      <Stack className="gap-y-2">
        <div className="font-medium">Tiêu đề hoặc tóm tắt</div>
        <Input
          value={questionTitle}
          handleValue={setQuestionTitle}
          placeholder="Ví dụ: vì sao chúng ta sử dụng giá trị này?"
        />
      </Stack>
      <Stack className="gap-y-2">
        <div className="font-medium">Chi tiết (tuỳ chọn)</div>
        <div className="flex justify-around">
          <Editor
            value={questionContent}
            setValue={setQuestionContent}
            isDisplay={true}
            isDisabled={isDisabled}
            maxLength={maxLength}
            minLength={0}
            isButton={false}
            warningMessageMaxLength={`Bạn không thể lưu nội dung dài hơn ${maxLength}`}
            isFocusEditor={false}
          />
        </div>
        <div className="">
          <div className="grid grid-cols-3 gap-5 mb-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative border rounded overflow-hidden"
              >
                <Image
                  src={
                    img instanceof File
                      ? URL.createObjectURL(img)
                      : img.secureUrl
                  }
                  width={100}
                  height={100}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div
            className="border-2 border-dashed border-indigo-600 rounded p-14 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p className="text-gray-600">
              Kéo thả hoặc bấm để chọn ảnh (tối đa 3 ảnh)
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Stack>
      {isUpdate ? (
        <div className="flex justify-end space-x-3 mt-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCancel}
            disabled={isDisabled}
          >
            Huỷ
          </Button>
          <Button
            variant="filled"
            size="sm"
            disabled={questionTitle.trim().length === 0 || isDisabled}
            onClick={save}
          >
            Lưu
          </Button>
        </div>
      ) : (
        <Button
          className="mt-3"
          variant="filled"
          size="lg"
          disabled={questionTitle.trim().length === 0 || isDisabled}
          onClick={save}
        >
          Xuất bản
        </Button>
      )}
    </Stack>
  );
}
