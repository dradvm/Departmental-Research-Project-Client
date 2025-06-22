import { Stack } from "@mui/material";
import { useLearnContext } from "app/course/[courseId]/learn/lecture/layout";
import { Button } from "components/Button/Button";
import Editor from "components/Editor/Editor";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import noteService from "services/note.service";
import { Note } from "types/note";
import { formatTime } from "utils/time";

export default function CourseNotes() {
  const { currentTimeNote, courseId, lectureId, lectures } = useLearnContext();
  const [isDislay, setIsDisplay] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [timeNote, setTimeNote] = useState<number>(currentTimeNote);
  const placeholderText = useMemo(() => {
    const existNote = notes.filter(
      (note) =>
        note.lectureId.toString() === lectureId && note.timeNote === timeNote
    );
    if (existNote.length > 0) {
      return `Chỉnh sửa ghi chú của bạn tại ${formatTime(timeNote)}`;
    } else {
      return `Tạo ghi chú của bạn tại ${formatTime(timeNote)}`;
    }
  }, [timeNote, lectureId, notes]);

  const handleOpen = () => {
    setIsDisplay(true);
  };

  const handleCancel = () => {
    setIsDisplay(false);
  };
  const handleSave = () => {
    setIsDisabled(true);
    const existNote = notes.filter(
      (note) =>
        note.lectureId.toString() === lectureId && note.timeNote === timeNote
    );
    console.log(existNote);
    if (existNote.length === 0) {
      console.log(timeNote);
      noteService
        .addNote(timeNote, value, parseInt(lectureId))
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
    noteService
      .getNotes(parseInt(courseId))
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, [courseId]);

  const handleUpdateNote = useCallback((note: Note) => {
    setTimeNote(note.timeNote);
    setValue(note.note);
    setIsDisplay(true);
  }, []);

  const handleDeleteNote = useCallback(
    (noteId: number) => {
      noteService
        .deleteNote(noteId)
        .then(() => {
          loadNotes();
        })
        .catch((err) => console.log(err));
    },
    [loadNotes]
  );

  useEffect(() => {
    loadNotes();
  }, [courseId, lectureId, loadNotes]);

  return (
    <div className="flex justify-around mt-6">
      <Stack className="w-[800px] gap-y-3">
        <div className={`${isDislay ? "" : "hidden"}`}>
          <div className="flex space-x-3  justify-around">
            <div>
              <div className="bg-black text-white font-medium rounded-full px-2">
                {formatTime(timeNote)}
              </div>
            </div>
            <Editor value={value} setValue={setValue} isDisplay={isDislay} />
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
            isDislay ? "hidden" : ""
          } flex rounded border border-2 border-slate-300 px-4 py-2 text-gray-700 justify-between items-center cursor-pointer hover:bg-gray-100`}
        >
          <div>{placeholderText}</div>
          <div>
            <CirclePlus size={16} className="text-black" />
          </div>
        </div>
        {notes.length > 0 ? (
          <Stack className="gap-y-8 mt-10">
            {notes.map((note) => (
              <div key={note.noteId} className="flex space-x-3">
                <div>
                  <div className="bg-black text-white font-medium rounded-full px-2">
                    {formatTime(note.timeNote)}
                  </div>
                </div>
                <Stack className="w-full gap-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-center">
                      <div className="me-3 font-medium">
                        {note.Lecture.Section.order}.{" "}
                        {note.Lecture.Section.nameSection}
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
                        onClick={() => handleUpdateNote(note)}
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
