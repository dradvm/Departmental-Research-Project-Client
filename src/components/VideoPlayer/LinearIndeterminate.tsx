import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearIndeterminate() {
  return (
    <Box
      sx={{ width: "100%" }}
      className="text-indigo-600 relative z-50 h-3 flex items-center"
    >
      <div className="w-full">
        <LinearProgress
          variant="determinate"
          value={50}
          color="inherit"
          sx={{
            height: 6,
            transition: "height 0.1s ease",
            cursor: "pointer",
            "&:hover": {
              height: 12,
            },
          }}
        />
      </div>
    </Box>
  );
}
