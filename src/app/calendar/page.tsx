import { ScheduleItem } from "@/types";

const weeklySchedule: Record<string, ScheduleItem[]> = {
  Monday: [
    { title: "Math Assignment", type: "deadline", timestamp: new Date("2022-01-10T23:59:00").getTime() },
    { title: "Team Project Meeting", type: "meeting", timestamp: new Date("2022-01-10T15:00:00").getTime(), description: "Discuss project progress" },
  ],
  Tuesday: [
    { title: "Physics Quiz", type: "deadline", timestamp: new Date("2022-01-11T23:59:00").getTime() },
    { title: "Study Group", type: "study", timestamp: new Date("2022-01-11T18:00:00").getTime(), description: "Prepare for upcoming exams" },
    { title: "Webinar", type: "event", timestamp: new Date("2022-01-11T20:00:00").getTime(), description: "Learn about new technologies" },
  ],
  Wednesday: [
    { title: "Chemistry Assignment", type: "deadline", timestamp: new Date("2022-01-12T23:59:00").getTime() },
    { title: "Lunch Meeting", type: "meeting", timestamp: new Date("2022-01-12T12:00:00").getTime(), description: "Discuss project requirements" },
  ],
  Thursday: [
    { title: "Biology Quiz", type: "deadline", timestamp: new Date("2022-01-13T23:59:00").getTime() },
  ],
  Friday: [
    { title: "History Assignment", type: "deadline", timestamp: new Date("2022-01-14T23:59:00").getTime() },
    { title: "Team Meeting", type: "meeting", timestamp: new Date("2022-01-14T15:00:00").getTime(), description: "Discuss project updates" },
    { title: "Webinar", type: "event", timestamp: new Date("2022-01-14T20:00:00").getTime(), description: "Learn about new technologies" },
    { title: "Study Group", type: "study", timestamp: new Date("2022-01-14T18:00:00").getTime(), description: "Prepare for upcoming exams" },
  ],
  Saturday: [],
  Sunday: [
    { title: "Weekly Review", type: "event", timestamp: new Date("2022-01-16T10:00:00").getTime(), description: "Reflect on the past week" },
  ],
};

export default function CalendarPage() {
  const formatTimestamp = (timestamp: number) => {
    // todo: correct locale/timezone

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4 sm:mb-6">Weekly Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {Object.entries(weeklySchedule).map(([day, items]) => {
          const sortedItems = [...items].sort((a, b) => a.timestamp - b.timestamp);

          return (
            <div key={day} className="bg-gray-800 rounded-md p-3 shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold border-b border-gray-700 pb-1 mb-2">{day}</h2>
              <div className="grid grid-rows-24 gap-1 text-xs">
                {Array.from({ length: 24 }, (_, hour) => {
                  const itemsAtThisHour = sortedItems.filter(
                    (item) => new Date(item.timestamp).getHours() === hour
                  );

                  return (
                    <div key={hour} className="relative h-8 sm:h-10">
                      {itemsAtThisHour.map((item, index) => (
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
                            top: `${index * 30}px`, // Offset overlapping items
                          }}
                        >
                          <div className="flex justify-between">
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-[10px] sm:text-xs">{formatTimestamp(item.timestamp)}</span>
                          </div>
                          {item.description && <p className="text-[10px] sm:text-xs mt-1">{item.description}</p>}
                          <span className="text-[10px] sm:text-xs font-bold uppercase">{item.type}</span>
                        </div>
                      ))}
                      {/* Hour label */}
                      <div className="text-gray-500 text-[10px] sm:text-xs">{`${hour}:00`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}