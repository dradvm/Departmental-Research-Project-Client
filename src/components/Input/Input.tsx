import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";

export default function Input({
  value,
  handleValue,
  placeholder,
}: {
  value: string;
  handleValue: (newValue: string) => void;
  placeholder: string;
}) {
  const { setEnabledBlock } = useLearnContext();
  return (
    <input
      value={value}
      onChange={(e) => handleValue(e.target.value)}
      onFocus={() => setEnabledBlock(false)}
      onBlur={() => setEnabledBlock(true)}
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
    />
  );
}
