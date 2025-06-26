import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
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
import FlexibleSelect from "components/FlexibleSelect/FlexibleSelect";
import { useRouter } from "next/navigation";
import studyProgressService from "services/study-progress.service";

const MAX_LENGTH_NOTE = 1000;

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
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const handleLink = () => {
    studyProgressService
      .trackStudyProgress(note.lectureId.toString(), note.timeNote)
      .then(() => {
        router.push(
          `/course/${note.Lecture.Section.courseId}/learn/lecture/${note.lectureId}?start=${note.timeNote}`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

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

  useEffect(() => {});

  return (
    <div className="flex space-x-3">
      <div>
        <div className="bg-black text-white font-medium rounded-full px-2">
          {formatTime(note.timeNote)}
        </div>
      </div>
      <div className={`${isDisplay ? "" : "hidden"}`}>
        <Editor
          value={value}
          setValue={setValue}
          isDisplay={isDisplay}
          isDisabled={isDisabled}
          handleCancel={handleCancel}
          handleSave={handleSave}
          warningMessageMaxLength={`Bạn không thể lưu ghi chú dài hơn ${MAX_LENGTH_NOTE} ký tự`}
          warningMessageMinLength={`Bạn không thể lưu ghi chú trống`}
          saveButtonMessage="Lưu ghi chú"
          maxLength={MAX_LENGTH_NOTE}
        />
      </div>

      <div className={`w-full  ${isDisplay ? "hidden" : ""}`}>
        <Stack className="w-full gap-y-3">
          <div className="flex justify-between items-center">
            <div
              onClick={handleLink}
              className="flex flex-wrap items-center cursor-pointer"
            >
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
                onClick={handleOpenDialog}
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
      <Dialog open={isOpenDialog} onClose={handleCloseDialog}>
        <DialogTitle>Vui lòng xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa ghi chú không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="primary" onClick={handleCloseDialog}>
            Huỷ
          </Button>
          <Button
            variant="filled"
            size="lg"
            onClick={() => handleDeleteNote(note.noteId)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default function CourseNotes() {
  const { currentTimeNote, courseId, lectureId, lectures } = useLearnContext();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteFilter, setNoteFilter] = useState<boolean>(true);
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

  const handleNoteFilter = (value: string) => {
    setNoteFilter(value === "course");
  };
  const handleOrderByFilter = (value: string) => {
    setOrderByFilter(value === "desc");
  };

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
              <Editor
                value={value}
                setValue={setValue}
                isDisplay={isDisplay}
                handleCancel={handleCancel}
                handleSave={handleSave}
                warningMessageMaxLength={`Bạn không thể lưu ghi chú dài hơn ${MAX_LENGTH_NOTE} ký tự`}
                warningMessageMinLength={`Bạn không thể lưu ghi chú trống`}
                saveButtonMessage="Lưu ghi chú"
                isDisabled={isDisabled}
                maxLength={MAX_LENGTH_NOTE}
              />
            )}
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
          <FlexibleSelect
            minWidth={160}
            value={noteFilter ? "course" : "lecture"}
            handleValue={handleNoteFilter}
            items={[
              { value: "course", text: "Tất cả các bài giảng" },
              { value: "lecture", text: "Bài giảng hiện tại" },
            ]}
          />
          <FlexibleSelect
            minWidth={160}
            value={orderByFilter ? "desc" : "asc"}
            handleValue={handleOrderByFilter}
            items={[
              { value: "desc", text: "Sắp xếp theo thứ tự gần nhất" },
              { value: "asc", text: "Sắp xếp theo thứ tự cũ nhất" },
            ]}
          />
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
