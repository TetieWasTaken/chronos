"use client";

// Imports
import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { ScheduleItem } from "@/types";
import { addDays, endOfWeek, format, startOfWeek } from "date-fns";

// The different types that a schedule item can have
const scheduleTypes = [
  { value: "deadline", label: "Deadline" },
  { value: "meeting", label: "Meeting" },
  { value: "study", label: "Study" },
  { value: "event", label: "Event" },
];

// Temporary data for the initial weekly schedule
const initialWeeklySchedule: Record<string, ScheduleItem[]> = {
  Monday: [
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
  ],
  Tuesday: [
    {
      title: "Study Group",
      type: "study",
      timestamp: new Date("2024-11-05T14:00:00").getTime(),
    },
  ],
  Wednesday: [
    {
      title: "Webinar",
      type: "event",
      timestamp: new Date("2024-11-06T10:00:00").getTime(),
      endTimestamp: new Date("2024-11-06T12:00:00").getTime(),
      description: "Web development trends",
    },
  ],
  Thursday: [
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
  ],
  Friday: [
    {
      title: "Study Group",
      type: "study",
      timestamp: new Date("2024-11-08T14:00:00").getTime(),
    },
  ],
  Saturday: [],
  Sunday: [{
    title: "Final Exam",
    type: "deadline",
    timestamp: new Date("2024-11-10T09:00:00").getTime(),
  }],
};

// Page
export default function CalendarPage() {
  // States
  const [weeklySchedule, setWeeklySchedule] = useState(initialWeeklySchedule);
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<ScheduleItem>({
    title: "",
    type: "deadline",
    timestamp: Date.now(),
    endTimestamp: undefined,
    description: "",
  });

  // todo: format the timestamp in the correct locale
  const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  // Week handling
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: 1 }),
  );

  const handlePreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const formatDate = (date: Date) => format(date, "MMM d");

  // Calculate the height of the schedule item based on the duration
  const calculateHeight = (start: number, end?: number) => {
    const durationMinutes = end ? (end - start) / (1000 * 60) : 30;
    return durationMinutes * 0.75;
  };

  //  Add a new schedule item to the weekly schedule
  const handleAddScheduleItem = () => {
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(newItem.timestamp),
    );

    setWeeklySchedule((prev) => {
      const updatedDayItems = [...(prev[day] || []), newItem];
      return { ...prev, [day]: updatedDayItems };
    });

    setNewItem({
      title: "",
      type: "deadline",
      timestamp: Date.now(),
      endTimestamp: undefined,
      description: "",
    });
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Weekly Schedule</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Navigation for the weeks */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={handlePreviousWeek}
          className="text-gray-400 hover:text-white"
        >
          ◀
        </button>
        <span className="text-lg font-semibold">
          {`${formatDate(currentWeekStart)} - ${formatDate(currentWeekEnd)}`}
        </span>
        <button
          onClick={handleNextWeek}
          className="text-gray-400 hover:text-white"
        >
          ▶
        </button>
      </div>

      {/* Display the weekly schedule */}
      <div className="grid grid-cols-[4rem_repeat(7,_1fr)] gap-3" // The hour column takes up 4rem, and the 7 day columns take up the remaining space
      >
        {/* Hour column */}
        <div className="flex flex-col justify-between w-16">
          {/* empty space */}
          <div className="h-[2.5rem]"></div>
          {Array.from({ length: 25 }, (_, hour) => (
            <div
              key={hour}
              className="text-gray-500 text-xs text-center border-b border-gray-700"
            >
              {`${hour}:00`}
            </div>
          ))}
        </div>

        {/* For each day of the week, display the schedule items */}
        {Object.entries(weeklySchedule).map(([day, items], index) => {
          // Filter and sort the schedule items
          const itemsInWeek = items
            .map((item) => ({
              ...item,
              endTimestamp: item.endTimestamp ||
                item.timestamp + 30 * 60 * 1000,
            }))
            .filter(
              (item) =>
                new Date(item.timestamp) >= currentWeekStart &&
                new Date(item.timestamp) <= currentWeekEnd,
            );

          const sortedItems = itemsInWeek.sort((a, b) =>
            a.timestamp - b.timestamp
          );

          return (
            <div
              key={day}
              className="bg-gray-800 rounded-md p-3 shadow-md z-10"
            >
              <div className="border-b border-gray-500 pb-2 mb-2">
                <h2 className="text-lg sm:text-xl font-semibold">{day}</h2>
                <span className="text-xs sm:text-sm text-gray-500">
                  {format(
                    new Date(currentWeekStart).setDate(
                      currentWeekStart.getDate() + index,
                    ),
                    "MMM d",
                  )}
                </span>
              </div>

              <div className="relative">
                <div className="grid grid-rows-24 gap-1">
                  {/* For each hour of the day, display the schedule items */}
                  {Array.from({ length: 24 }, (_, hour) => {
                    const itemsAtThisHour = sortedItems.filter(
                      (item) => new Date(item.timestamp).getHours() === hour,
                    );

                    return (
                      <div key={hour} className="relative flex">
                        {
                          /* Hour label for testing:
                        <div className="w-16 text-gray-500 text-xs text-center">
                          {`${hour}:00`}
                        </div>
                         */
                        }

                        {/* Horizontal line for each hour */}
                        <div className="absolute w-full border-t border-gray-700">
                        </div>

                        {/* Schedule items */}
                        <div className="relative h-8 sm:h-10 w-full flex">
                          {itemsAtThisHour.map((item, index) => {
                            const height = calculateHeight(
                              item.timestamp,
                              item.endTimestamp,
                            );
                            return (
                              <div
                                key={index}
                                className={`w-full p-2 rounded text-xs sm:text-sm flex items-center justify-center ${
                                  item.type === "deadline"
                                    ? "bg-red-500 text-white"
                                    : item.type === "meeting"
                                    ? "bg-blue-500 text-white"
                                    : item.type === "study"
                                    ? "bg-green-500 text-white"
                                    : "bg-purple-500 text-white"
                                }`}
                                style={{
                                  height: `${height}px`,
                                  top: `${index * 30}px`,
                                }}
                              >
                                <span className="font-semibold text-xs text-center">
                                  {item.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
