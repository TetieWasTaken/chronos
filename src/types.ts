export type APIScheduleItem = {
  title: string;
  type: "deadline" | "meeting" | "study" | "event";
  timestamp: number;
  endTimestamp?: number;
  description?: string;
};

export type ScheduleItem = APIScheduleItem & {
  id: string;
};
