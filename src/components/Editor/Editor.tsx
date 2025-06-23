"use client";

import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
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
}: {
  isDisplay: boolean;
  value?: string;
  setValue?: (val: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const { setEnabledBlock } = useLearnContext();
  const MAX_LENGTH = 500;
  const [remainingLength, setRemainingLength] = useState(MAX_LENGTH);
  const [isFocus, setIsFocus] = useState<boolean>(isDisplay);
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
      ["code"], // Kiểu code (inline)
    ],
  };

  const formats = ["bold", "italic", "list", "code"];

  const handleChange = (content: string) => {
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
    console.log(plainText);
    if (plainText.length > MAX_LENGTH) {
      const truncated = plainText.substring(0, MAX_LENGTH);
      setValue(truncated);
    } else {
      setRemainingLength(MAX_LENGTH - plainText.length);
      setValue(content);
    }
  };

  useEffect(() => {
    setMounted(true);
    // const editor = document.querySelector(".ql-editor");
    // console.log(editor);
    // if (editor instanceof HTMLElement) {
    //   editor.focus();
    // }
  }, []); // 👈 chạy sau khi component mount

  useEffect(() => {
    setIsFocus(isDisplay);
  }, [isDisplay]);

  if (!mounted) return null;

  return (
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
  );
}
