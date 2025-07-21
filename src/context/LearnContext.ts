import { createContext, useContext } from "react";
import { Course } from "types/course";
import { Lecture } from "types/lecture";

type LearnContextType = {
  enabledBlock: boolean;
  setEnabledBlock: React.Dispatch<React.SetStateAction<boolean>>;
  course: Course | null;
  lectures: Lecture[];
  handleSetTotalWatched: (checked: boolean) => void;
  currentTimeNote: number;
  setCurrentTimeNote: React.Dispatch<React.SetStateAction<number>>;
  lectureId: string;
  courseId: string;
};

const LearnContext = createContext<LearnContextType>({
  enabledBlock: true,
  setEnabledBlock: () => {},
  course: null,
  lectures: [],
  handleSetTotalWatched: () => {},
  currentTimeNote: 0,
  setCurrentTimeNote: () => {},
  lectureId: "",
  courseId: "",
});
export function useLearnContext() {
  return useContext(LearnContext);
}

export { LearnContext };
