export interface StudyRemind {
  studyRemindId: number;
  summary: string;
  description: string;
  time: string | Date;
  frequency: "daily" | "weekly" | "onetime";
  daysOfWeek: string | null;
}
