import { Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import Editor from "components/Editor/Editor";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Image as ImageType } from "types/image";
export default function AnswerForm({
  handleSave,
  isUpdate = false,
  content = "",
  oldImages = [],
  questionId = "",
  answerId = "",
  handleCancel = () => {},
}: {
  handleSave: (
    formData: FormData,
    handleAfterSave: () => void,
    isUpdate: boolean
  ) => void;
  isUpdate?: boolean;
  content?: string;
  oldImages?: ImageType[];
  width?: number;
  questionId?: string;
  answerId?: string;
  handleCancel?: () => void;
}) {
  const [answerContent, setAnswerContent] = useState<string>(content);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const maxLength = 5000;
  const [images, setImages] = useState<(File | ImageType)[]>(oldImages);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAfterSave = () => {
    setAnswerContent("");
    setImages([]);
    setIsDisabled(false);
  };

  const save = () => {
    const formData = new FormData();
    setIsDisabled(true);

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else {
        console.log(image);
        formData.append("oldImages", image.publicId);
      }
    });
    if (!isUpdate) {
      formData.append("questionId", questionId);
    } else {
      formData.append("answerId", answerId);
    }
    formData.append("answerContent", answerContent);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    handleSave(formData, handleAfterSave, isUpdate);
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
        <div className="font-medium">Viết phản hồi của bạn</div>
        <div className="flex">
          <Editor
            value={answerContent}
            setValue={setAnswerContent}
            isDisplay={true}
            isDisabled={isDisabled}
            maxLength={maxLength}
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
            disabled={answerContent.trim().length === 0 || isDisabled}
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
          disabled={answerContent.trim().length === 0 || isDisabled}
          onClick={save}
        >
          Thêm phản hồi mới
        </Button>
      )}
    </Stack>
  );
}
