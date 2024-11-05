export type ScheduleItem = {
  title: string;
  type: "deadline" | "meeting" | "study" | "event";
  timestamp: number;
  description?: string;
};
