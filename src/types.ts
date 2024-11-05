export type ScheduleItem = {
  title: string;
  type: "deadline" | "meeting" | "study" | "event";
  timestamp: number;
  endTimestamp?: number;
  description?: string;
};
