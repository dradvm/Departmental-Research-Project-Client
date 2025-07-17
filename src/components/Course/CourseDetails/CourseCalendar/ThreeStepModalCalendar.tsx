"use client";
import { FcGoogle } from "react-icons/fc";
import { Box, Typography, Dialog, Stack, Alert } from "@mui/material";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import { BadgeCheck, Check, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import studyRemindService from "services/study-remind.service";

const steps = ["Nhắc nhở học tập", "Thiết lập thời gian", "Xác nhận"];

export default function ThreeStepModal({
  handleCloseModal,
  content = "",
  handleLoginGoogle,
  handleReloadStudyRemind,
}: {
  handleCloseModal: () => void;
  content?: string;
  handleLoginGoogle: (loadingFunction: () => void) => void;
  handleReloadStudyRemind: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);

  const [name, setName] = useState("Nhắc nhở học tập");
  const [frequence, setFrequence] = useState<string | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<number[]>([]);
  const [contentInput, setContentInput] = useState(content);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [isErrorDateOfWeek, setIsErrorDateOfWeek] = useState(false);
  const [isErrorFrequence, setIsErrorPrequence] = useState(false);

  const [code, setCode] = useState<string | null>(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [isErrorGoogle, setIsErrorGoogle] = useState<boolean>(false);

  const handleClose = () => {
    handleCloseModal();
    setActiveStep(0);
  };
  const handleClear = () => {
    setContentInput("");
  };

  const handleNext = () => {
    setIsErrorGoogle(false);
    if (activeStep == 1) {
      if (!frequence) {
        setIsErrorPrequence(true);
        return;
      }
      if (frequence == "weekly") {
        if (dayOfWeek.length == 0) {
          setIsErrorDateOfWeek(true);
          return;
        }
      }
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      if (code && frequence) {
        const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
        const isoStart = startDateTime.toISOString();
        const isoEnd = startDateTime.toISOString();

        const payload: {
          code: string;
          summary: string;
          description?: string;
          start: string;
          end: string;
          frequency: string;
          daysOfWeek?: string[];
          timeZone: string;
        } = {
          code,
          summary: name || "Lịch nhắc nhở",
          description: contentInput || "",
          start: isoStart,
          end: isoEnd,
          frequency: frequence,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        if (frequence === "weekly") {
          const rfcDays = dayOfWeek.map((d) => {
            const map: Record<number, string> = {
              0: "SU",
              1: "MO",
              2: "TU",
              3: "WE",
              4: "TH",
              5: "FR",
              6: "SA",
            };
            return map[d];
          });

          payload.daysOfWeek = rfcDays;
        }
        studyRemindService
          .addStudyRemind(payload)
          .then(() => {
            handleReloadStudyRemind();
          })
          .catch((err) => console.log(err));

        handleClose();
      }
    }
  };

  const handleLoginGoogleThreeStep = () => {
    handleLoginGoogle(() => {
      setIsLoadingGoogle(true);
    });
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const code = event.data?.code;
      if (code) {
        setCode(code);
      } else {
        setIsErrorGoogle(true);
      }
      setIsLoadingGoogle(false);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return (
    <>
      <Dialog open={true}>
        <Box
          sx={{
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
          }}
        >
          <div className="flex items-center justify-between">
            <Typography variant="h6" fontWeight={600}>
              Nhắc nhở học tập
            </Typography>
            <div
              className="cursor-pointer text-gray-700 p-2 hover:bg-indigo-50 rounded-sm"
              onClick={handleClose}
            >
              <X size={18} />
            </div>
          </div>
          <Typography fontSize={14} color="text.secondary" mt={0.5} mb={2}>
            Bước {activeStep + 1}/3
          </Typography>

          {activeStep === 0 && (
            <Stack className="gap-y-5">
              <Stack className="gap-y-1">
                <div className="flex justify-between items-cente">
                  <div className="font-medium text-sm">Nhắc nhở học tập</div>
                  <div className="text-gray-600 text-xs">không bắt buộc</div>
                </div>
                <Input
                  value={name}
                  handleValue={setName}
                  placeholder="Nhắc nhở học tập"
                />
              </Stack>

              <Stack className="gap-y-1">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm">Đính kèm nội dung</div>
                  <div className="text-gray-600 text-xs">không bắt buộc</div>
                </div>
                <Stack className="relative group">
                  <div className="flex items-center">
                    <Input
                      value={contentInput}
                      handleValue={setContentInput}
                      placeholder="Tìm kiếm"
                    />
                    {contentInput.trim().length > 0 && (
                      <Button variant="primary" size="sm" onClick={handleClear}>
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                </Stack>
              </Stack>
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack className="gap-y-5">
              <Stack className="gap-y-1">
                <div className="flex space-x-1 items-cente">
                  <div className="font-medium text-sm">Tần suất</div>
                  <div className="text-red-600 text-xs">*</div>
                </div>
                <div className="flex space-x-2">
                  {[
                    {
                      text: "Hằng ngày",
                      value: "daily",
                    },
                    {
                      text: "Hằng tuần",
                      value: "weekly",
                    },
                    {
                      text: "Một lần",
                      value: "onetime",
                    },
                  ].map((item) => (
                    <Button
                      key={item.value}
                      variant={frequence == item.value ? "filled" : "primary"}
                      onClick={() => {
                        if (isErrorFrequence) {
                          setIsErrorPrequence(false);
                        }
                        if (item.value != "weekly") {
                          setDayOfWeek([]);
                        }
                        setFrequence(item.value);
                      }}
                      className="rounded-full flex space-x-1 items-center"
                      size="sm"
                    >
                      {frequence == item.value && <Check size={16} />}
                      <div>{item.text}</div>
                    </Button>
                  ))}
                </div>
                {isErrorFrequence && (
                  <Alert severity="error" className="mt-3">
                    Đây là trường bắt buộc
                  </Alert>
                )}
              </Stack>

              <Stack className="gap-y-1">
                <div className="flex space-x-1 items-center">
                  <div className="font-medium text-sm">Thời gian</div>
                  <div className="text-red-600 text-xs">*</div>
                </div>
                <div className="relative">
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="text-sm w-40 px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </Stack>
              {frequence == "weekly" && (
                <Stack className="gap-y-1">
                  <div className="flex space-x-1 items-center">
                    <div className="font-medium text-sm">Ngày</div>
                    <div className="text-red-600 text-xs">*</div>
                  </div>
                  <div className="flex space-x-2">
                    {[
                      { text: "Su", value: 0 },
                      { text: "Mo", value: 1 },
                      { text: "Tu", value: 2 },
                      { text: "We", value: 3 },
                      { text: "Th", value: 4 },
                      { text: "Fr", value: 5 },
                      { text: "Sa", value: 6 },
                    ].map((item) => (
                      <Button
                        key={item.value}
                        variant={
                          dayOfWeek.includes(item.value) ? "filled" : "primary"
                        }
                        onClick={() => {
                          if (isErrorDateOfWeek) {
                            setIsErrorDateOfWeek(false);
                          }
                          if (dayOfWeek.includes(item.value)) {
                            setDayOfWeek((prev) =>
                              prev.filter((day) => day !== item.value)
                            );
                          } else {
                            setDayOfWeek((prev) => [...prev, item.value]);
                          }
                        }}
                        className="rounded-full flex space-x-1 items-center"
                        size="sm"
                      >
                        {dayOfWeek.includes(item.value) ? (
                          <Check size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                        <div>{item.text}</div>
                      </Button>
                    ))}
                  </div>
                  {isErrorDateOfWeek && (
                    <Alert severity="error" className="mt-3">
                      Đây là trường bắt buộc
                    </Alert>
                  )}
                </Stack>
              )}
              {frequence == "onetime" && (
                <Stack className="gap-y-1">
                  <div className="flex space-x-1 items-center">
                    <div className="font-medium text-sm">Ngày</div>
                    <div className="text-red-600 text-xs">*</div>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="text-sm w-full px-4 py-2 placeholder:text-slate-700 placeholder border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </Stack>
              )}
            </Stack>
          )}

          {activeStep === 2 && (
            <Stack className="gap-y-5">
              <Stack className="gap-y-1">
                <div className="flex ">
                  <div className="font-medium text-sm">Thêm vào lịch</div>
                </div>
                <div>
                  <Button
                    variant="primary"
                    className="flex space-x-2"
                    onClick={handleLoginGoogleThreeStep}
                  >
                    <FcGoogle size={20} />
                    <span className="font-medium">Google</span>
                    {isLoadingGoogle ? (
                      <div className="m-2 animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>
                    ) : (
                      <>{code && <BadgeCheck size={18} />}</>
                    )}
                  </Button>
                </div>
                {isErrorGoogle && (
                  <Alert severity="error" className="mt-3">
                    Có lỗi xảy ra, vui lòng thử lại
                  </Alert>
                )}
              </Stack>
            </Stack>
          )}

          <div className="flex justify-end mt-3">
            <div className="flex space-x-3 items-center">
              {activeStep > 0 && (
                <Button variant="primary" onClick={handleBack}>
                  Quay lại
                </Button>
              )}

              <Button
                variant="filled"
                onClick={handleNext}
                disabled={activeStep === 2 && !code}
              >
                {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp theo"}
              </Button>
            </div>
          </div>
        </Box>
      </Dialog>
    </>
  );
}
