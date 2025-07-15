export default function TextField({
  value,
  handleValue,
  placeholder,
  handleSubmit,
}: {
  value: string;
  handleValue: (newValue: string) => void;
  placeholder: string;
  handleSubmit: () => void;
}) {
  return (
    <div className="w-full relative">
      <textarea
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }

          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = value.slice(0, start) + "\n" + value.slice(end);
            handleValue(newValue);

            // Đặt lại vị trí con trỏ sau khi thêm dòng mới
            requestAnimationFrame(() => {
              textarea.selectionStart = textarea.selectionEnd = start + 1;
              textarea.scrollTop = textarea.scrollHeight;
            });
          }
        }}
        placeholder={placeholder}
        className="text-sm w-full px-4 py-2 placeholder:text-slate-700 border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none overflow-y-auto"
        rows={2}
      />
    </div>
  );
}
