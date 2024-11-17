import type { scheduleTypesType } from "./types";
import colours from "tailwindcss/colors";

export const COLOURS: Record<scheduleTypesType, string> = {
  test: colours.orange[600],
  assignment: colours.blue[600],
  lecture: colours.fuchsia[600],
  deadline: colours.rose[600],
};

export const SCHEDULE_TYPES = [
  "test",
  "assignment",
  "lecture",
  "deadline",
] as const;
