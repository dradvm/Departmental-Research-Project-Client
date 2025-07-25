"use client";

import { Alert, Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import { useLearnContext } from "context/LearnContext";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export default function Editor({
  isDisplay,
  value = "",
  setValue = (val: string) => {
    console.log(val);
  },
  handleCancel = () => {},
  handleSave = () => {},
  isDisabled,
  warningMessageMaxLength = "",
  warningMessageMinLength = "",
  saveButtonMessage = "",
  maxLength = 500,
  minLength = 1,
  isButton = true,
  isFocusEditor = true,
}: {
  isDisplay: boolean;
  value?: string;
  setValue?: (val: string) => void;
  handleCancel?: () => void;
  handleSave?: () => void;
  isDisabled: boolean;
  warningMessageMaxLength?: string;
  warningMessageMinLength?: string;
  saveButtonMessage?: string;
  maxLength?: number;
  minLength?: number;
  isButton?: boolean;
  isFocusEditor?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { setEnabledBlock } = useLearnContext();
  const [remainingLength, setRemainingLength] = useState(maxLength);
  const [isFocus, setIsFocus] = useState<boolean>(isFocusEditor);
  const handleFocus = () => {
    setEnabledBlock(false);
    setIsFocus(true);
  };
  const handleBlur = () => {
    setEnabledBlock(true);
    setIsFocus(false);
  };

  const modules = {
    toolbar: [
      ["bold", "italic"], // Kiểu chữ
      [{ list: "ordered" }, { list: "bullet" }], // OL, UL
      ["code-block"], // Kiểu code (inline)
    ],
  };

  const formats = ["bold", "italic", "list", "code-block"];

  const handleChange = (content: string) => {
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
    setRemainingLength(maxLength - plainText.length);
    setValue(content);
  };

  useEffect(() => {
    setMounted(true);
  }, []); // 👈 chạy sau khi component mount

  useEffect(() => {
    if (isDisplay) {
      setRemainingLength(maxLength);
    }
  }, [isDisplay, maxLength]);
  if (!mounted) return null;

  return (
    <Stack className="gap-y-5">
      <div className="relative w-[750px]">
        <ReactQuill
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          modules={modules}
          formats={formats}
          className={`break-words whitespace-pre-wrap rounded ${
            isFocus ? "border border-indigo-600 border-2" : "border border-2"
          } `}
        />
        <div className="absolute top-0 right-0 py-2 px-4 text-slate-600">
          {remainingLength}
        </div>
      </div>
      {remainingLength < 0 && (
        <Alert severity="warning">{warningMessageMaxLength}</Alert>
      )}
      {value.replace(/<\/?[^>]+(>|$)/g, "").trim().length < minLength && (
        <Alert severity="warning">{warningMessageMinLength}</Alert>
      )}
      {isButton ? (
        <div className="flex justify-end">
          <div className="flex space-x-3">
            <Button variant="primary" onClick={handleCancel}>
              Huỷ
            </Button>
            <Button
              variant="filled"
              onClick={handleSave}
              disabled={
                isDisabled ||
                remainingLength < 0 ||
                value.replace(/<\/?[^>]+(>|$)/g, "").trim().length === 0
              }
            >
              {saveButtonMessage}
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Stack>
  );
}
