import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { useEffect, useState } from "react";

export default function Input({
  value,
  handleValue,
  placeholder,
  maxLength = 0,
}: {
  value: string;
  handleValue: (newValue: string) => void;
  placeholder: string;
  maxLength?: number;
}) {
  const { setEnabledBlock } = useLearnContext();
  const [remainingLength, setRemainingLength] = useState<number>(maxLength);

  useEffect(() => {
    if (maxLength) {
      setRemainingLength(maxLength - remainingLength);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxLength]);

  return (
    <div className="w-full relative">
      <input
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        onFocus={() => setEnabledBlock(false)}
        onBlur={() => setEnabledBlock(true)}
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      {maxLength > 0 && (
        <div className="absolute top-0 right-0 py-2 px-4 text-slate-600">
          {remainingLength}
        </div>
      )}
    </div>
  );
}
