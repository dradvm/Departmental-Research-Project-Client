"use client";
import dynamic from "next/dynamic";
import { Box, LinearProgress, Slider, Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  NotebookPen,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatTime } from "utils/time";
import throttle from "lodash/throttle";
import screenfull from "screenfull";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import studyProgressService from "services/study-progress.service";
import { useLearnContext } from "context/LearnContext";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
type ReactPlayerRef = {
  seekTo: (amount: number, type?: "seconds" | "fraction") => void;
  getCurrentTime: () => number;
  getDuration: () => number;
};
interface VideoPlayerProps {
  url: string;
  width?: string | number;
  height?: string | number;
  playing?: boolean;
  controls?: boolean;
  loop?: boolean;
  startTime?: number;
}

export default function VideoPlayer({
  url,
  width = "100%",
  height = "100%",
  controls = false,
  loop = false,
  startTime = 0,
}: VideoPlayerProps) {
  const [showControls, setShowControls] = useState(true);
  const hideTimerShowControls = useRef<NodeJS.Timeout | null>(null);
  const [volume, setVolume] = useState(100);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [firstTimeAccess, setFirstTimeAccess] = useState(true);
  const hideTimerPlay = useRef<NodeJS.Timeout | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayerRef | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const playerWrapperRef = useRef(null);
  const [isMute, setIsMute] = useState(false);
  const [isFullscreen, setIsFullScreen] = useState(false);
  const { enabledBlock, lectures, setCurrentTimeNote } = useLearnContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { lectureId } = useParams<{ lectureId: string }>();
  const hasSeekedRef = useRef(false);
  const searchParams = useSearchParams();

  const getCurrrentLectureIndex = useCallback(() => {
    return lectures.findIndex(
      (lecture) => lecture.lectureId === Number(lectureId)
    );
  }, [lectureId, lectures]);

  const handleChangeLecture = useCallback(
    (isNext: boolean) => {
      const currentLectureId = Number(lectureId);
      if (
        (lectures[0].lectureId === currentLectureId && !isNext) ||
        (lectures[lectures.length - 1].lectureId === currentLectureId && isNext)
      ) {
        return;
      }
      const currentLectureIndex = getCurrrentLectureIndex();
      router.push(
        `./${lectures[currentLectureIndex + (isNext ? 1 : -1)].lectureId}`
      );
    },
    [lectures, router, lectureId, getCurrrentLectureIndex]
  );

  const handleFullScreen = () => {
    if (playerWrapperRef.current && screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request(playerWrapperRef.current);
      }
      setIsFullScreen(!screenfull.isFullscreen);
    }
  };
  const handleProgress = useCallback(
    throttle((progress: { playedSeconds: number }) => {
      setCurrentTime(progress.playedSeconds);
      setProgress((progress.playedSeconds / duration) * 100);
    }, 500),
    [duration]
  );

  const seekBy = useCallback(
    (second: number) => {
      if (currentTime + second >= 0 && currentTime + second <= duration) {
        playerRef.current?.seekTo(currentTime + second);
        setProgress(((currentTime + second) / duration) * 100);
        setCurrentTime(currentTime + second);
        return;
      }
      if (currentTime + second < 0) {
        playerRef.current?.seekTo(0);
        setProgress(0);
        setCurrentTime(0);
        return;
      }
      if (currentTime + second > duration) {
        playerRef.current?.seekTo(duration);
        setProgress(100);
        setCurrentTime(duration);
        return;
      }
    },
    [currentTime, duration]
  );

  const handleSetProgress = (e: { clientX: number }) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    let newValue = (clickX / width) * 100;

    newValue = Math.min(Math.max(newValue, 0), 100);

    if (playerRef.current) {
      playerRef.current.seekTo((duration * newValue) / 100);
      setProgress(newValue);
      setCurrentTime((duration * newValue) / 100);
    }
  };

  const handleFirstTimeAccess = () => {
    setFirstTimeAccess(false);
  };

  const toggleMute = useCallback(() => {
    setIsMute((prev) => !prev);
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying((prev) => !prev);
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
  }, [firstTimeAccess]);

  const handleVolumeChange = (e: Event, newValue: number) => {
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

  const handleReady = () => {
    if (!hasSeekedRef.current) {
      playerRef.current?.seekTo(startTime, "seconds");
      setCurrentTime(startTime);
      setProgress((startTime / duration) * 100);
      hasSeekedRef.current = true; // Đánh dấu đã seek
    } else {
      setIsLoading(false);
    }
  };

  const saveProgress = useCallback(() => {
    studyProgressService
      .trackStudyProgress(lectureId, playerRef.current?.getCurrentTime() || 0)
      .then()
      .catch((err) => console.log(err));
  }, [lectureId]);

  const handlePause = useCallback(
    throttle(() => {
      saveProgress();
    }, 3000),
    [saveProgress]
  );
  const handleSeek = useCallback(
    throttle(() => {
      saveProgress();
    }, 500),
    [saveProgress]
  );

  useEffect(() => {
    const handleKeyDown = (e: { code: string; preventDefault: () => void }) => {
      if (e.code === "Space" && enabledBlock) {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        seekBy(-5);
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        seekBy(5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [seekBy, togglePlay, enabledBlock]);

  useEffect(() => {
    const saveProgessInterval = setInterval(() => {
      saveProgress();
    }, 10000);
    return () => clearInterval(saveProgessInterval);
  }, [saveProgress]);

  useEffect(() => {
    setCurrentTimeNote(Math.floor(currentTime));
  }, [currentTime, setCurrentTimeNote]);

  useEffect(() => {
    const start = searchParams.get("start");
    if (start !== null) {
      const startNum: number = parseInt(start);
      playerRef.current?.seekTo(startNum);
      setProgress((startNum / duration) * 100);
      setCurrentTime(startNum);
    }
  }, [duration, searchParams, seekBy]);
  return (
    <div
      ref={playerWrapperRef}
      className="w-full h-full flex items-center justify-center relative"
    >
      <div className="flex items-center justify-center w-full h-full">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width={width}
          height={height}
          playing={playing}
          volume={isMute ? 0 : volume / 100}
          controls={controls}
          loop={loop}
          onDuration={(duration) => setDuration(duration)}
          onProgress={handleProgress}
          onReady={handleReady}
          onPause={handlePause}
          onSeek={handleSeek}
        />
      </div>
      {isLoading ? (
        <div
          className={`absolute w-full h-[450px] flex items-center justify-center bg-black`}
        >
          <div className="w-16 h-16 border-white border-4 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div
            className="w-full h-full absolute top-0 left-0 flex flex-col"
            onMouseMove={handleMouseEnterShowControls}
          >
            <div className="absolute w-full h-full flex items-center pointer-events-none">
              {lectures.length > 0 && (
                <div className="flex justify-between w-full">
                  <Tooltip
                    className={`${
                      lectures[0].lectureId === Number(lectureId)
                        ? "invisible"
                        : ""
                    }`}
                    title={
                      lectures[getCurrrentLectureIndex() - 1]
                        ? `${getCurrrentLectureIndex()}. ${
                            lectures[getCurrrentLectureIndex() - 1].nameLecture
                          }`
                        : ""
                    }
                    placement="right"
                  >
                    <ChevronLeft
                      onClick={() => handleChangeLecture(false)}
                      size={16}
                      strokeWidth={1}
                      className="text-white pointer-events-auto w-6 h-10 cursor-pointer border border-gray-400 bg-indigo-600 hover:bg-indigo-700 rounded"
                    />
                  </Tooltip>
                  <Tooltip
                    className={`${
                      lectures[lectures.length - 1].lectureId ===
                      Number(lectureId)
                        ? "invisible"
                        : ""
                    }`}
                    title={
                      lectures[getCurrrentLectureIndex() + 1]
                        ? `${getCurrrentLectureIndex() + 2}. ${
                            lectures[getCurrrentLectureIndex() + 1].nameLecture
                          }`
                        : ""
                    }
                    placement="left"
                  >
                    <ChevronRight
                      onClick={() => handleChangeLecture(true)}
                      size={16}
                      strokeWidth={1}
                      className="text-white pointer-events-auto w-6 h-10 cursor-pointer border border-gray-400 bg-indigo-600 hover:bg-indigo-700 rounded"
                    />
                  </Tooltip>
                </div>
              )}
            </div>
            <div
              className="flex-grow"
              onClick={togglePlay}
              onDoubleClick={handleFullScreen}
            ></div>
            <AnimatePresence>
              {(showControls || true) && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  className="v-stack px-3 text-white relative"
                >
                  <Box
                    sx={{ width: "100%" }}
                    className="text-indigo-600 relative z-50 h-3 flex items-center"
                  >
                    <div className="w-full">
                      <LinearProgress
                        ref={progressRef}
                        variant="determinate"
                        value={progress}
                        color="inherit"
                        sx={{
                          height: 6,
                          transition: "height 0.1s ease",
                          cursor: "pointer",
                          "&:hover": {
                            height: 12,
                          },
                          "& .MuiLinearProgress-bar": {
                            transition: "none !important",
                          },
                        }}
                        onClick={handleSetProgress}
                      />
                    </div>
                  </Box>
                  <div className="flex items-center justify-between py-2 h-12 relative z-50">
                    <div className="flex items-center space-x-2 h-full">
                      <Tooltip placement="top" title="Bắt đầu">
                        {playing ? (
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
                          onClick={() => seekBy(-5)}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Tua tới 5s">
                        <RotateCw
                          size={20}
                          className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                          strokeWidth={2}
                          onClick={() => seekBy(5)}
                        />
                      </Tooltip>
                      <div className="font-bold text-sm select-none">
                        {formatTime(currentTime)}
                        <span className="mx-1">/</span>
                        {formatTime(duration)}
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
                        {(volume === 0 || isMute) && (
                          <VolumeOff
                            size={20}
                            className="absolute cursor-pointer text-slate-300 hover:text-white rounded-sm "
                            strokeWidth={2}
                            onMouseEnter={handleMouseEnterVolume}
                            onClick={toggleMute}
                          />
                        )}
                        {volume <= 30 && volume > 0 && !isMute && (
                          <Volume1
                            size={20}
                            className="absolute cursor-pointer text-slate-300 hover:text-white rounded-sm "
                            strokeWidth={2}
                            onMouseEnter={handleMouseEnterVolume}
                            onClick={toggleMute}
                          />
                        )}
                        {volume <= 100 && volume > 30 && !isMute && (
                          <Volume2
                            size={20}
                            className="absolute cursor-pointer text-slate-300 hover:text-white rounded-sm "
                            strokeWidth={2}
                            onMouseEnter={handleMouseEnterVolume}
                            onClick={toggleMute}
                          />
                        )}
                        {showVolumeSlider && (
                          <div
                            className="cursor-pointer absolute h-24 -translate-y-14 -translate-x-2 flex flex-col "
                            onMouseLeave={handleMouseLeaveVolume}
                          >
                            <div className="absolute bg-transparent bottom-0 translate-y-6 left-0 w-full h-32"></div>
                            <div
                              className="absolute bg-transparent bottom-0 translate-y-6 left-0 w-full h-8"
                              onClick={toggleMute}
                            ></div>
                            <div className="flex-grow">
                              <Slider
                                aria-label="Temperature"
                                orientation="vertical"
                                valueLabelDisplay="auto"
                                value={isMute ? 0 : volume}
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
                      {!isFullscreen ? (
                        <Tooltip placement="top" title="Toàn màn hình">
                          <Maximize2
                            size={20}
                            className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                            strokeWidth={2}
                            onClick={handleFullScreen}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip placement="top" title="Thu nhỏ">
                          <Minimize2
                            size={20}
                            className="cursor-pointer text-slate-300 hover:text-white rounded-sm w-7 px-1 h-full"
                            strokeWidth={2}
                            onClick={handleFullScreen}
                          />
                        </Tooltip>
                      )}
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
                  onDoubleClick={handleFullScreen}
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
                      onDoubleClick={handleFullScreen}
                      className="text-white relative flex items-center justify-center shadow-2xl pointer-events-auto"
                    >
                      <div className="absolute rounded-full p-12 bg-black opacity-60"></div>
                      {playing ? (
                        <Play
                          size={56}
                          strokeWidth={2}
                          className="absolute pointer-events-none"
                        />
                      ) : (
                        <Pause
                          size={56}
                          strokeWidth={2}
                          className="absolute pointer-events-none"
                        />
                      )}
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
