export type ScheduleItem = {
  title: string;
  type: "deadline" | "meeting" | "study" | "event";
  time: string;
  description?: string;
};
