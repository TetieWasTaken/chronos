import { SCHEDULE_TYPES } from "./constants";

export type ScheduleTypesType = typeof SCHEDULE_TYPES[number];

export type APIScheduleItem = {
  title: string;
  type: ScheduleTypesType;
  timestamp: number;
  endTimestamp?: number;
  description?: string;
};

export type ScheduleItem = APIScheduleItem & {
  id: string;
};

export type PreferencesType = {
  theme: Record<ScheduleTypesType, string>;
};
