"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { ScheduleItem } from "@/types";

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
    { title: "Math Assignment", type: "deadline", timestamp: new Date("2022-01-10T23:59:00").getTime() },
    {
      title: "Team Project Meeting",
      type: "meeting",
      timestamp: new Date("2022-01-10T15:00:00").getTime(),
      endTimestamp: new Date("2022-01-10T16:00:00").getTime(),
      description: "Discuss project progress",
    },
  ],
  Tuesday: [
    { title: "Study Group", type: "study", timestamp: new Date("2022-01-11T14:00:00").getTime() },
  ],
  Wednesday: [
    {
      title: "Webinar",
      type: "event",
      timestamp: new Date("2022-01-12T10:00:00").getTime(),
      endTimestamp: new Date("2022-01-12T12:00:00").getTime(),
      description: "Web development trends",
    },
  ],
  Thursday: [
    { title: "Physics Lab Report", type: "deadline", timestamp: new Date("2022-01-13T23:59:00").getTime() },
    { title: "Study Group", type: "study", timestamp: new Date("2022-01-13T14:00:00").getTime() },
    { title: "Club Meeting", type: "meeting", timestamp: new Date("2022-01-13T18:00:00").getTime() },
    { title: "Club Event", type: "event", timestamp: new Date("2022-01-13T20:00:00").getTime() },
  ],
  Friday: [
    { title: "Study Group", type: "study", timestamp: new Date("2022-01-14T14:00:00").getTime() },
  ],
  Saturday: [],
  Sunday: [{ title: "Final Exam", type: "deadline", timestamp: new Date("2022-01-16T09:00:00").getTime() }],
};

export default function CalendarPage() {
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

  // Calculate the height of the schedule item based on the duration
  const calculateHeight = (start: number, end?: number) => {
    const durationMinutes = end ? (end - start) / (1000 * 60) : 30;
    return durationMinutes * 0.75;
  };

  //  Add a new schedule item to the weekly schedule
  const handleAddScheduleItem = () => {
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(newItem.timestamp));
    
    setWeeklySchedule((prev) => {
      const updatedDayItems = [...(prev[day] || []), newItem];
      return { ...prev, [day]: updatedDayItems };
    });

    setNewItem({ title: "", type: "deadline", timestamp: Date.now(), endTimestamp: undefined, description: "" });
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

      { /* Modal for adding a new schedule item */ }
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-md p-5 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Schedule Item</h2>

            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 mb-3 border rounded border-gray-600 bg-gray-700 text-gray-200"
            />

            <Select
              value={scheduleTypes.find(option => option.value === newItem.type)}
              onChange={(option) => setNewItem({ ...newItem, type: option?.value || "deadline" })}
              options={scheduleTypes}
              className="mb-3"
              styles={{
                singleValue: (base) => ({ ...base, color: "white" }),
                control: (base, state) => ({
                  ...base,
                  background: "#374151"
                }),
                option: (styles, { isFocused }) => {
                  return {
                    ...styles,
                    backgroundColor: isFocused ? "#4B5563" : "#374151",
                    color: "white",
                  };
                },
              }}
              placeholder="Select Type"
            />

            <label className="block mb-2 text-sm">Start Time:</label>
            <DatePicker
              selected={new Date(newItem.timestamp)}
              onChange={(date) => setNewItem({ ...newItem, timestamp: date?.getTime() || Date.now() })}
              className="mb-3 w-full p-2 border rounded border-gray-600 bg-gray-700 text-gray-200"
              showTimeSelect
              dateFormat="Pp"
            />

            <label className="block mb-2 text-sm">End Time (optional):</label>
            <DatePicker
              selected={newItem.endTimestamp ? new Date(newItem.endTimestamp) : null}
              onChange={(date) => setNewItem({ ...newItem, endTimestamp: date?.getTime() })}
              className="mb-3 w-full p-2 border rounded border-gray-600 bg-gray-700 text-gray-200"
              showTimeSelect
              dateFormat="Pp"
            />

            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 mb-3 border rounded border-gray-600 bg-gray-700 text-gray-200"
              rows={3}
            />

            <div className="flex justify-between">
              <button
                onClick={handleAddScheduleItem}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-3">
        {Object.entries(weeklySchedule).map(([day, items]) => {
          const sortedItems = [...items].sort((a, b) => a.timestamp - b.timestamp);

          return (
            <div key={day} className="bg-gray-800 rounded-md p-3 shadow-md z-10">
              <h2 className="text-lg sm:text-xl font-semibold border-b border-gray-700 pb-1 mb-2">{day}</h2>
              <div className="relative">
                <div className="grid grid-rows-24 gap-1">
                  {Array.from({ length: 24 }, (_, hour) => {
                    const itemsAtThisHour = sortedItems.filter(
                      (item) => new Date(item.timestamp).getHours() === hour
                    );

                    return (
                      <div key={hour} className="relative h-8 sm:h-10 flex">
                        {itemsAtThisHour.map((item, index) => {
                          const height = calculateHeight(item.timestamp, item.endTimestamp);
                          return (
                            <div
                              key={index}
                              className={`absolute left-0 right-0 mt-1 p-2 rounded text-xs sm:text-sm ${
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
                              <div className="flex justify-between">
                                <span className="font-semibold">{item.title}</span>
                                <span className="text-[10px] sm:text-xs">
                                  {formatTimestamp(item.timestamp)} {item.endTimestamp ? `- ${formatTimestamp(item.endTimestamp)}` : ""}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-[10px] sm:text-xs mt-1">
                                  {item.description}
                                </p>
                              )}
                              <span className="text-[10px] sm:text-xs font-bold uppercase">
                                {item.type}
                              </span>
                            </div>
                          );
                        })}
                        <div className="text-gray-500 text-[10px] sm:text-xs ml-auto">{`${hour}:00`}</div>
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
