"use client";

import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export default function Editor() {
  const [value, setValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const { setEnabledBlock } = useLearnContext();

  const modules = {
    toolbar: [
      [{ header: [false, 4] }], // Văn bản thường (false), Header 4
      ["bold", "italic"], // Kiểu chữ
      [{ list: "ordered" }, { list: "bullet" }], // OL, UL
      ["code"], // Kiểu code (inline)
    ],
  };

  const formats = ["header", "bold", "italic", "list", "code"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);

  if (!mounted) return null;

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={setValue}
        onFocus={() => setEnabledBlock(false)}
        onBlur={() => setEnabledBlock(true)}
        modules={modules}
        formats={formats}
      />
      <input />
    </div>
  );
}
