export default function TextField({
  value,
  handleValue,
  placeholder,
}: {
  value: string;
  handleValue: (newValue: string) => void;
  placeholder: string;
}) {
  return (
    <div className="w-full relative">
      <textarea
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        placeholder={placeholder}
        className="text-sm w-full px-4 py-2 placeholder:text-slate-700 border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none overflow-y-auto"
        rows={2}
      />
    </div>
  );
}
