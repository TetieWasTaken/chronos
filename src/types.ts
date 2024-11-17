import { SCHEDULE_TYPES } from "./constants";

export type scheduleTypesType = typeof SCHEDULE_TYPES[number];

export type APIScheduleItem = {
  title: string;
  type: scheduleTypesType;
  timestamp: number;
  endTimestamp?: number;
  description?: string;
};

export type ScheduleItem = APIScheduleItem & {
  id: string;
};
