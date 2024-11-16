// todo: pragmatic-drag-and-drop?

"use client";

// Imports
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import type { APIScheduleItem, ScheduleItem } from "@/types";
import { addDays, endOfWeek, format, startOfWeek } from "date-fns";
import { FirebaseAuth } from "@/utils/firebase/auth";
import { User } from "firebase/auth";

// Firebase
import { Calendar } from "@/utils/firebase/calendar";

const auth = new FirebaseAuth();

// The different types that a schedule item can have
const scheduleTypes = [
  { value: "deadline", label: "Deadline" },
  { value: "meeting", label: "Meeting" },
  { value: "study", label: "Study" },
  { value: "event", label: "Event" },
];

// Page
export default function CalendarPage() {
  // States
  const [weeklySchedule, setWeeklySchedule]: [
    Record<string, ScheduleItem[]>,
    Dispatch<SetStateAction<Record<string, ScheduleItem[]>>>,
  ] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<APIScheduleItem>({
    title: "",
    type: "deadline",
    timestamp: Date.now(),
    endTimestamp: undefined,
    description: "",
  });

  const [user, setUser] = useState<User | null>(null);
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorising, setAuthorising] = useState(true);
  const memoisedAuthorising = useMemo(() => authorising, [authorising]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [showMorning, setShowMorning] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    /* if (!user) {
      router.push("/auth");
    } */

    router.push("/auth");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setCalendar(new Calendar(user.uid));
      } else {
        router.push("/auth");
      }

      setAuthorising(false);
    });
  }, [router]);

  // Week handling
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: 1 }),
  );

  const handlePreviousWeek = () => {
    setLoading(true);
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const handleNextWeek = () => {
    setLoading(true);
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };
  const currentWeekEnd = useMemo(
    () => endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
    [currentWeekStart],
  );
  const formatDate = (date: Date) => format(date, "MMM d");

  // Calculate the height of the schedule item based on the duration
  const calculateHeight = (start: number, end?: number) => {
    const durationMinutes = end ? (end - start) / (1000 * 60) : 30;

    // 2.5rem is 40px
    return (durationMinutes / 60) * 40;
  };

  useEffect(() => {
    // Load the schedule items that are within the current week
    if (!authorising) {
      if (calendar) {
        const loadCalendar = async () => {
          setLoading(true);

          const schedule = await calendar.getCalendar();

          const itemsInWeek = schedule.filter(
            (item) =>
              new Date(item.timestamp) >= currentWeekStart &&
              new Date(item.timestamp) <= currentWeekEnd,
          );

          // Group the items by day
          const daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];

          const itemsByDay: Record<string, ScheduleItem[]> = daysOfWeek.reduce(
            (acc, day) => {
              return { ...acc, [day]: [] };
            },
            {},
          );

          itemsInWeek.forEach((item) => {
            const day = new Intl.DateTimeFormat("en-US", { weekday: "long" })
              .format(
                new Date(item.timestamp),
              );

            if (new Date(item.timestamp).getHours() < 8 && !showMorning) {
              setShowMorning(true);
            }

            itemsByDay[day].push(item);
          });

          setWeeklySchedule(itemsByDay);
          setLoading(false);
        };

        loadCalendar();
      } else {
        // Redirect to the auth page because the user is not signed in
        // router.push("/auth");
      }
    }
  }, [
    calendar,
    currentWeekStart,
    currentWeekEnd,
    memoisedAuthorising,
    authorising,
  ]);

  //  Add a new schedule item to the weekly schedule
  const handleAddScheduleItem = async () => {
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(newItem.timestamp),
    );

    let id: string | undefined = undefined;

    // Add the new item to the firebase collection
    if (calendar) {
      id = await calendar.addAssignment(newItem);
    } else {
      console.log("No calendar found");
    }

    if (!id) {
      console.error("Failed to add item");
      return;
    }

    setWeeklySchedule((prev: Record<string, ScheduleItem[]>) => {
      const itemToAdd = { ...newItem, id };

      const updatedDayItems = [...(prev[day] || []), itemToAdd];
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

  // Set the day border colour ranging from gray to red based on the amount of items
  // todo: change to amount of day occupied and severity later?
  const dayBorderColor = (day: string) => {
    const items = weeklySchedule[day] || [];
    const itemCount = items.length;

    if (itemCount === 0) return "border-gray-700";
    if (itemCount === 1) return "border-emerald-500";
    if (itemCount === 2) return "border-green-500";
    if (itemCount === 3) return "border-lime-500";
    if (itemCount === 4) return "border-yellow-500";
    if (itemCount === 5) return "border-amber-500";
    if (itemCount === 6) return "border-orange-500";
    return "border-red-500";
  };

  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  return (
    <div
      className={`min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 transition-all duration-500`}
    >
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <span className="text-2xl font-semibold text-white">
            Loading...
          </span>
        </div>
      )}
      <div
        className={`flex justify-between items-center mb-4 ${
          loading ? "blur-lg" : "blur-0"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold">Weekly Schedule</h1>
        <button
          onClick={() => {
            setSelectedItem(null);
            setModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add
        </button>
        {/* </div> */}

        <button
          onClick={handleProfileClick}
          className={`${
            user ? "bg-green-600" : "bg-gray-700"
          } text-white font-semibold py-2 px-4 rounded hover:bg-green-500`}
        >
          {user ? "Profile (Signed In)" : "Sign In"}
        </button>
      </div>

      {/* Navigation for the weeks */}
      <div
        className={`flex items-center justify-center space-x-4 mb-4 ${
          loading ? "blur-lg" : "blur-0"
        }`}
      >
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

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-md p-5 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Schedule Item</h2>

            <input
              type="text"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 mb-3 border rounded border-gray-600 bg-gray-700 text-gray-200"
            />

            <Select
              value={scheduleTypes.find((option) =>
                option.value === newItem.type
              )}
              onChange={(option) =>
                setNewItem({
                  ...newItem,
                  type: (option?.value as
                    | "deadline"
                    | "meeting"
                    | "study"
                    | "event") || "deadline",
                })}
              options={scheduleTypes}
              className="mb-3"
              styles={{
                singleValue: (base) => ({ ...base, color: "white" }),
                control: (base) => ({
                  ...base,
                  background: "#374151",
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
              onChange={(date) =>
                setNewItem({
                  ...newItem,
                  timestamp: date?.getTime() || Date.now(),
                })}
              className="mb-3 w-full p-2 border rounded border-gray-600 bg-gray-700 text-gray-200"
              showTimeSelect
              dateFormat="Pp"
            />

            <label className="block mb-2 text-sm">End Time (optional):</label>
            <DatePicker
              selected={newItem.endTimestamp
                ? new Date(newItem.endTimestamp)
                : null}
              onChange={(date) =>
                setNewItem({ ...newItem, endTimestamp: date?.getTime() })}
              className="mb-3 w-full p-2 border rounded border-gray-600 bg-gray-700 text-gray-200"
              showTimeSelect
              dateFormat="Pp"
            />

            <textarea
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })}
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

      {/* Display the weekly schedule */}
      <div
        className={`grid grid-cols-[4rem_repeat(7,_1fr)] gap-3 ${
          loading ? "blur-lg" : "blur-0"
        } ${selectedItem ? "pb-4" : ""}`}
      >
        {/* Hour column */}
        <div className="flex flex-col">
          <div className="h-[9px]"></div>
          <div
            className="flex items-center justify-center text-gray-500 text-xs border-b border-gray-700 cursor-pointer"
            onClick={() => setShowMorning(!showMorning)}
          >
            {showMorning ? "Hide Early Hours ▲" : "Show Early Hours ▼"}
          </div>

          {/* Morning Hours */}
          <div
            className={`transition-all duration-500 overflow-hidden`}
            style={{
              height: showMorning ? "320px" : "0",
            }}
          >
            {Array.from({ length: 8 }, (_, hour) => (
              <div
                key={hour}
                className="h-10 flex items-center justify-center text-gray-500 text-xs border-b border-gray-700"
              >
                {`${hour}:00`}
              </div>
            ))}
          </div>

          {/* Remaining Hours */}
          {Array.from({ length: 16 }, (_, hour) => (
            <div
              key={hour + 8}
              className="h-10 flex items-center justify-center text-gray-500 text-xs border-b border-gray-700"
            >
              {`${hour + 8}:00`}
            </div>
          ))}
        </div>

        {/* For each day of the week, display the schedule items */}
        {Object.entries(weeklySchedule).map(([day, items], index) => {
          const dayDate = new Date(currentWeekStart);
          dayDate.setDate(currentWeekStart.getDate() + index);
          const isToday = dayDate.toDateString() === today.toDateString();

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
            <div key={day} className="bg-gray-800 rounded-md p-3 shadow-md">
              <div
                className={`border-b ${dayBorderColor(day)} pb-2 mb-2`}
              >
                <h2
                  className={`text-lg sm:text-xl font-semibold ${
                    isToday ? "text-blue-500" : ""
                  }`}
                >
                  {day}
                </h2>
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
                {Array.from(
                  { length: showMorning ? 24 : 16 },
                  (_, hour = 0) => {
                    hour = showMorning ? hour : hour + 8;

                    const itemsAtThisHour = sortedItems.filter(
                      (item) => new Date(item.timestamp).getHours() === hour,
                    );

                    return (
                      <div
                        key={hour}
                        className="relative h-10 border-t border-gray-700"
                      >
                        {/* Schedule items */}
                        <div className="relative w-full flex">
                          {itemsAtThisHour.map((item, itemIndex) => {
                            const height = calculateHeight(
                              item.timestamp,
                              item.endTimestamp,
                            );
                            const isPast =
                              (item.endTimestamp || item.timestamp) <
                                Date.now();
                            const isShortDuration = height <= 40;

                            const id = `${day}-${hour}-${itemIndex}`;
                            const isHovered = hoveredItem === id;

                            return (
                              <div
                                key={itemIndex}
                                onMouseEnter={() => setHoveredItem(id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onClick={() => {
                                  if (
                                    selectedItem && selectedItem.id === item.id
                                  ) {
                                    setSelectedItem(null);
                                  } else {
                                    setSelectedItem(item);
                                  }
                                }}
                                className={`absolute w-full p-2 rounded text-xs sm:text-sm ${
                                  isShortDuration
                                    ? "flex items-center justify-center"
                                    : "flex items-start"
                                } ${
                                  item.type === "deadline"
                                    ? "bg-red-500"
                                    : item.type === "meeting"
                                    ? "bg-blue-500"
                                    : item.type === "study"
                                    ? "bg-green-500"
                                    : "bg-purple-500"
                                } text-white transition-all duration-200`}
                                style={{
                                  height: `${height}px`,
                                  top: `${itemIndex * height}px`,
                                  zIndex: isHovered ? 20 : 10 - itemIndex,
                                  transform: isHovered
                                    ? "scale(1.05)"
                                    : "scale(1)",
                                  opacity:
                                    (hoveredItem !== null && !isHovered) ||
                                      (isPast && !isHovered)
                                      ? 0.5
                                      : 1,
                                }}
                              >
                                <span
                                  className={`font-semibold text-xs leading-tight overflow-hidden text-ellipsis whitespace-nowrap ${
                                    isShortDuration ? "max-h-[40px]" : ""
                                  }`}
                                >
                                  {item.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  },
                )}

                {/* Current hour line */}
                {isToday && (
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-blue-500"
                    style={{
                      top: `${
                        showMorning
                          ? currentHour * 40 +
                            currentMinute / 60 * 40
                          : currentHour * 40 - (8 * 40) +
                            currentMinute / 60 * 40
                      }px`,
                    }}
                  >
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <div className="sticky bottom-0 fixed left-0 w-full bg-gray-800 p-4 border-t border-gray-700 shadow-lg transition-transform transform translate-y-0 z-50">
          <button
            onClick={() => setSelectedItem(null)}
            className="mb-4 text-gray-400 hover:text-white"
          >
            Close
          </button>
          <h2 className="text-lg font-semibold text-white mb-2">
            {selectedItem.title}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {format(new Date(selectedItem.timestamp), "MMM d, yyyy h:mm a")}
            {selectedItem.endTimestamp &&
              ` - ${format(new Date(selectedItem.endTimestamp), "h:mm a")}`}
          </p>
          <p className="text-gray-300">{selectedItem.description}</p>

          <p className="text-sm text-gray-400 mt-4">{selectedItem.id}</p>
        </div>
      )}
    </div>
  );
}
