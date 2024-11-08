import { ScheduleItem } from "@/types";

export const schedule: ScheduleItem[] = [
  {
    title: "Math Assignment",
    type: "deadline",
    timestamp: new Date("2024-11-04T23:59:00").getTime(),
  },
  {
    title: "Team Project Meeting",
    type: "meeting",
    timestamp: new Date("2024-11-04T15:00:00").getTime(),
    endTimestamp: new Date("2024-11-04TT16:00:00").getTime(),
    description: "Discuss project progress",
  },

  {
    title: "Study Group",
    type: "study",
    timestamp: new Date("2024-11-05T14:00:00").getTime(),
  },

  {
    title: "Webinar",
    type: "event",
    timestamp: new Date("2024-11-06T10:00:00").getTime(),
    endTimestamp: new Date("2024-11-06T12:00:00").getTime(),
    description: "Web development trends",
  },
  {
    title: "Physics Lab Report",
    type: "deadline",
    timestamp: new Date("2024-11-07T23:59:00").getTime(),
  },
  {
    title: "Study Group",
    type: "study",
    timestamp: new Date("2024-11-07T14:00:00").getTime(),
  },
  {
    title: "Club Meeting",
    type: "meeting",
    timestamp: new Date("2024-11-07T18:00:00").getTime(),
  },
  {
    title: "Club Event",
    type: "event",
    timestamp: new Date("2024-11-07T20:00:00").getTime(),
  },
  {
    title: "Study Group",
    type: "study",
    timestamp: new Date("2024-11-08T14:00:00").getTime(),
  },
  {
    title: "Free Day",
    type: "event",
    timestamp: new Date("2024-11-09T00:00:00").getTime(),
    endTimestamp: new Date("2024-11-09T23:59:00").getTime(),
  },
  {
    title: "Final Exam",
    type: "deadline",
    timestamp: new Date("2024-11-10T09:00:00").getTime(),
  },
  {
    title: "Assignment Due",
    type: "deadline",
    timestamp: new Date("2024-11-11T19:00:00").getTime(),
  },
  {
    title: "Study Group",
    type: "study",
    timestamp: new Date("2024-11-13T14:00:00").getTime(),
  },
  {
    title: "Suspicous Meeting",
    type: "meeting",
    timestamp: new Date("2024-11-13T18:00:00").getTime(),
  },
  {
    title: "Long Event",
    type: "event",
    timestamp: new Date("2024-11-01T10:00:00").getTime(),
  },
  {
    title: "Afternoon Event",
    type: "event",
    timestamp: new Date("2024-11-03T15:00:00").getTime(),
  },
];
