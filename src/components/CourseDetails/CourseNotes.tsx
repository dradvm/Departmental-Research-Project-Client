import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { Button } from "components/Button/Button";
import Editor from "components/Editor/Editor";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import noteService from "services/note.service";
import { LectureStudyProgress } from "types/lecture";
import { Note } from "types/note";
import { formatTime } from "utils/time";
import CourseLoading from "./CourseLoading";

const NoteItem = ({
  note,
  lectures,
  loadNotes,
  handleDeleteNote,
  isDisplayMain,
  setIsDisplayMain,
}: {
  note: Note;
  lectures: LectureStudyProgress[];
  loadNotes: () => void;
  handleDeleteNote: (noteId: number) => void;
  isDisplayMain: boolean;
  setIsDisplayMain: (isDisplay: boolean) => void;
}) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [value, setValue] = useState<string>(note.note);
  const handleOpen = () => {
    setIsDisplay(true);
    setIsDisplayMain(false);
  };

  const handleCancel = () => {
    setIsDisplay(false);
  };

  const handleSave = () => {
    noteService.updateNote(note.noteId, value).then(() => {
      loadNotes();
      setIsDisabled(false);
      setIsDisplay(false);
      setValue("");
    });
  };

  useEffect(() => {
    if (isDisplay) {
      setValue(note.note);
    }
  }, [isDisplay, note]);

  useEffect(() => {
    if (isDisplayMain) {
      setIsDisplay(false);
    }
  }, [isDisplayMain]);

  return (
    <div className="flex space-x-3">
      <div>
        <div className="bg-black text-white font-medium rounded-full px-2">
          {formatTime(note.timeNote)}
        </div>
      </div>
      <div className={`${isDisplay ? "" : "hidden"}`}>
        <Editor value={value} setValue={setValue} isDisplay={isDisplay} />
        <div className="flex justify-end mt-4">
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={handleCancel}
              disabled={isDisabled}
            >
              Huỷ
            </Button>
            <Button variant="filled" onClick={handleSave} disabled={isDisabled}>
              Lưu ghi chú
            </Button>
          </div>
        </div>
      </div>

      <div className={`w-full  ${isDisplay ? "hidden" : ""}`}>
        <Stack className="w-full gap-y-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center">
              <div className="me-3 font-medium">
                {note.Lecture.Section.order}. {note.Lecture.Section.nameSection}
              </div>
              <div className="text-sm">
                {lectures.findIndex(
                  (lecture) => lecture.lectureId === note.lectureId
                ) + 1}
                . {note.Lecture.nameLecture}
              </div>
            </div>
            <div className="flex items-center">
              <div
                className="hover:bg-slate-200 rounded px-2 py-1 cursor-pointer"
                onClick={handleOpen}
              >
                <Pencil size={12} />
              </div>
              <div
                className="hover:bg-slate-200 rounded px-2 py-1 cursor-pointer"
                onClick={() => handleDeleteNote(note.noteId)}
              >
                <Trash2 size={12} />
              </div>
            </div>
          </div>
          <div
            className="w-full bg-gray-100 min-h-20 px-5 py-3 text-sm ql-editor"
            dangerouslySetInnerHTML={{ __html: note.note }}
          ></div>
        </Stack>
      </div>
    </div>
  );
};

export default function CourseNotes() {
  const { currentTimeNote, courseId, lectureId, lectures } = useLearnContext();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteFilter, setNotefilter] = useState<boolean>(true);
  const [orderByFilter, setOrderByFilter] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
  const placeholderText = useMemo(() => {
    const existNote = notes.filter(
      (note) =>
        note.lectureId.toString() === lectureId &&
        note.timeNote === currentTimeNote
    );
    if (existNote.length > 0) {
      return `Chỉnh sửa ghi chú của bạn tại ${formatTime(currentTimeNote)}`;
    } else {
      return `Tạo ghi chú của bạn tại ${formatTime(currentTimeNote)}`;
    }
  }, [currentTimeNote, lectureId, notes]);

  const handleOpen = () => {
    setIsDisplay(true);
    const existNote = notes.filter(
      (note) =>
        note.lectureId.toString() === lectureId &&
        note.timeNote === currentTimeNote
    );
    if (existNote.length > 0) {
      setValue(existNote[0].note);
    }
  };

  const handleCancel = () => {
    setIsDisplay(false);
  };
  const handleSave = () => {
    setIsDisabled(true);
    const existNote = notes.filter(
      (note) =>
        note.lectureId.toString() === lectureId &&
        note.timeNote === currentTimeNote
    );
    if (existNote.length === 0) {
      noteService
        .addNote(currentTimeNote, value, parseInt(lectureId))
        .then(() => {
          loadNotes();
          setIsDisabled(false);
          setIsDisplay(false);
          setValue("");
        })
        .catch((err) => console.log(err));
    } else {
      existNote.forEach((note) => {
        noteService.updateNote(note.noteId, value).then(() => {
          loadNotes();
          setIsDisabled(false);
          setIsDisplay(false);
          setValue("");
        });
      });
    }
  };

  const loadNotes = useCallback(() => {
    if (noteFilter) {
      noteService
        .getNotes(parseInt(courseId), orderByFilter)
        .then((res) => {
          setNotes(res.data);
          setIsLoading(false);
          setIsLoadingNotes(false);
        })
        .catch((err) => console.log(err));
    } else {
      noteService
        .getNotesLecture(parseInt(lectureId), orderByFilter)
        .then((res) => {
          setNotes(res.data);
          setIsLoading(false);
          setIsLoadingNotes(false);
        })
        .catch((err) => console.log(err));
    }
  }, [courseId, noteFilter, lectureId, orderByFilter]);

  const handleDeleteNote = useCallback(
    (noteId: number) => {
      noteService
        .deleteNote(noteId)
        .then(() => {
          loadNotes();
          setIsDisplay(false);
        })
        .catch((err) => console.log(err));
    },
    [loadNotes]
  );

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lectureId]);

  useEffect(() => {
    setIsLoadingNotes(true);
    loadNotes();
  }, [orderByFilter, noteFilter, loadNotes]);

  return isLoading ? (
    <CourseLoading />
  ) : (
    <div className="flex justify-around mt-6">
      <Stack className="w-[800px] gap-y-3">
        <div className={`${isDisplay ? "" : "hidden"}`}>
          <div className="flex space-x-3  justify-around">
            <div>
              <div className="bg-black text-white font-medium rounded-full px-2">
                {formatTime(currentTimeNote)}
              </div>
            </div>
            {isDisplay && (
              <Editor value={value} setValue={setValue} isDisplay={isDisplay} />
            )}
          </div>
          <div className="flex justify-end mt-4">
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleCancel}
                disabled={isDisabled}
              >
                Huỷ
              </Button>
              <Button
                variant="filled"
                onClick={handleSave}
                disabled={isDisabled}
              >
                Lưu ghi chú
              </Button>
            </div>
          </div>
        </div>
        <div
          onClick={handleOpen}
          className={`${
            isDisplay ? "hidden" : ""
          } flex rounded border border-2 border-slate-300 px-4 py-2 text-gray-700 justify-between items-center cursor-pointer hover:bg-gray-100`}
        >
          <div>{placeholderText}</div>
          <div>
            <CirclePlus size={16} className="text-black" />
          </div>
        </div>
        <div className="flex space-x-3">
          <FormControl sx={{ minWidth: 160 }} size="small" className="">
            <Select
              value={noteFilter ? "course" : "lecture"}
              onChange={(e) => setNotefilter(e?.target?.value === "course")}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                fontSize: "0.875rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(91, 73, 244)", // Khi hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  // Khi focus
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      fontSize: "0.875rem", // Giảm font size
                    },
                  },
                },
              }}
            >
              <MenuItem value="course">Tất cả các bài giảng</MenuItem>
              <MenuItem value="lecture">Bài giảng hiện tại</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 160 }} size="small" className="">
            <Select
              value={orderByFilter ? "desc" : "asc"}
              onChange={(e) => setOrderByFilter(e?.target?.value === "desc")}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                fontSize: "0.875rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(91, 73, 244)", // Khi hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  // Khi focus
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      fontSize: "0.875rem", // Giảm font size
                    },
                  },
                },
              }}
            >
              <MenuItem value="desc">Sắp xếp theo thứ tự gần đây nhất</MenuItem>
              <MenuItem value="asc">Sắp xếp theo thứ tự cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </div>
        {isLoadingNotes ? (
          <CourseLoading />
        ) : notes.length > 0 ? (
          <Stack className="gap-y-8 mt-10">
            {notes.map((note) => (
              <NoteItem
                key={note.noteId}
                note={note}
                loadNotes={loadNotes}
                handleDeleteNote={handleDeleteNote}
                lectures={lectures}
                isDisplayMain={isDisplay}
                setIsDisplayMain={setIsDisplay}
              />
            ))}
          </Stack>
        ) : (
          <div className="text-center text-slate-700 py-20">
            Nhấp vào hộp &quot;Tạo ghi chú mới&quot; để tạo ghi chú đầu tiên của
            bạn.
          </div>
        )}
      </Stack>
    </div>
  );
}
