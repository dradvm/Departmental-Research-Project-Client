import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Trophy } from "lucide-react";

interface CircularIndeterminateProps {
  progress: number;
  size?: number;
}

export default function CircularIndeterminate({
  progress,
  size = 32,
}: CircularIndeterminateProps) {
  return (
    <div className="relative h-10 w-10">
      <div className="h-full w-full flex items-center justify-center absolute text-gray-500">
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          color="inherit"
        />
      </div>
      <div className="h-full w-full flex items-center justify-center absolute text-indigo-300 ">
        <CircularProgress
          variant="determinate"
          value={progress}
          size={size}
          color="inherit"
        />
      </div>
      <div className="h-full w-full flex items-center justify-center absolute text-white">
        <Trophy size={14} strokeWidth={1} />
      </div>
    </div>
  );
}
