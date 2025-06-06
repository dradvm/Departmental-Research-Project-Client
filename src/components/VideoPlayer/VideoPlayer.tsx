import dynamic from "next/dynamic";
import LinearIndeterminate from "./LinearIndeterminate";
import { Slider, Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  NotebookPen,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume,
} from "lucide-react";
import React, { useRef } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
  width?: string | number;
  height?: string | number;
  playing?: boolean;
  controls?: boolean;
  loop?: boolean;
}

export default function VideoPlayer({
  url,
  width = "100%",
  height = "450px",
  playing = false,
  controls = true,
  loop = false,
}: VideoPlayerProps) {
  const [showControls, setShowControls] = React.useState(true);
  const hideTimerShowControls = useRef<NodeJS.Timeout | null>(null);
  const [volume, setVolume] = React.useState(30);
  const [showVolumeSlider, setShowVolumeSlider] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [firstTimeAccess, setFirstTimeAccess] = React.useState(true);
  const hideTimerPlay = useRef<NodeJS.Timeout | null>(null);
  const [showOverlay, setShowOverlay] = React.useState(false);

  const handleFirstTimeAccess = () => {
    setFirstTimeAccess(false);
  };

  const togglePlay = () => {
    setPlay((prev) => !prev);
    setShowOverlay(true);
    if (firstTimeAccess) {
      handleFirstTimeAccess();
      setShowOverlay(false);
    } else {
      if (hideTimerPlay.current) {
        clearTimeout(hideTimerPlay.current);
      }
      hideTimerPlay.current = setTimeout(() => {
        setShowOverlay(false);
      }, 500);
    }
  };

  const handleVolumeChange = (event: Event, newValue: number) => {
    setVolume(newValue);
  };

  const handleMouseEnterShowControls = () => {
    setShowControls(true);
    if (hideTimerShowControls.current) {
      clearTimeout(hideTimerShowControls.current);
    }
    hideTimerShowControls.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleMouseEnterVolume = () => {
    setShowVolumeSlider(true);
  };
  const handleMouseLeaveVolume = () => {
    setShowVolumeSlider(false);
  };
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="flex items-center justify-center">
        <ReactPlayer
          url={url}
          width={width}
          height={height}
          playing={playing}
          controls={controls}
          loop={loop}
        />
      </div>
      <div
        className="w-full h-full absolute top-0 left-0 flex flex-col"
        onMouseMove={handleMouseEnterShowControls}
      >
        <div className="flex-grow" onClick={togglePlay}></div>
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              className="v-stack px-3 text-white relative"
            >
              <LinearIndeterminate />
              <div className="flex items-center justify-between py-2 h-12 relative z-50">
                <div className="flex items-center space-x-2 h-full">
                  <Tooltip placement="top" title="Bắt đầu">
                    {play ? (
                      <Pause
                        size={20}
                        className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                        strokeWidth={2}
                        onClick={togglePlay}
                      />
                    ) : (
                      <Play
                        size={20}
                        className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                        strokeWidth={2}
                        onClick={togglePlay}
                      />
                    )}
                  </Tooltip>
                  <Tooltip placement="top" title="Tua lại 5s">
                    <RotateCcw
                      size={20}
                      className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                      strokeWidth={2}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Tua tới 5s">
                    <RotateCw
                      size={20}
                      className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                      strokeWidth={2}
                    />
                  </Tooltip>
                  <div className="font-bold text-sm select-none">
                    1:01<span className="mx-1">/</span>5:48
                  </div>
                  <Tooltip placement="top" title="Ghi chú">
                    <NotebookPen
                      size={20}
                      className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                      strokeWidth={2}
                    />
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2 h-full">
                  <div className="w-7 px-1 h-full flex items-center justify-between relative">
                    <Volume
                      size={20}
                      className="absolute cursor-pointer text-slate-300 hover:text-white rounded-sm "
                      strokeWidth={2}
                      onMouseEnter={handleMouseEnterVolume}
                    />
                    {showVolumeSlider && (
                      <div
                        className="absolute h-24 -translate-y-14 -translate-x-2 flex flex-col"
                        onMouseLeave={handleMouseLeaveVolume}
                      >
                        <div className="flex-grow">
                          <Slider
                            aria-label="Temperature"
                            orientation="vertical"
                            valueLabelDisplay="auto"
                            value={volume}
                            onChange={handleVolumeChange}
                            sx={{
                              color: "white",
                            }}
                          />
                        </div>
                        <div className="h-4"></div>
                      </div>
                    )}
                  </div>
                  <Tooltip placement="top" title="Cài đặt">
                    <Settings
                      size={20}
                      className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                      strokeWidth={2}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Toàn màn hình">
                    <Maximize2
                      size={20}
                      className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                      strokeWidth={2}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-white/0" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {firstTimeAccess ? (
            <div
              onClick={togglePlay}
              className="text-white bg-black rounded-full p-5 flex items-center justify-center shadow-2xl pointer-events-auto"
            >
              <Play size={56} className="cursor-pointer" strokeWidth={2} />
            </div>
          ) : (
            <>
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 0, scale: 1 }}
                  className="text-white relative flex items-center justify-center shadow-2xl pointer-events-auto"
                >
                  <div className="absolute rounded-full p-12 bg-black opacity-60"></div>
                  {play ? (
                    <Play size={56} strokeWidth={2} className="absolute" />
                  ) : (
                    <Pause size={56} strokeWidth={2} className="absolute" />
                  )}
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
