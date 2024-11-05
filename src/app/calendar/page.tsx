import { ScheduleItem } from "@/types";

const weeklySchedule: Record<string, ScheduleItem[]> = {
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
  // todo: locale based on location
  const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  const calculateHeight = (start: number, end?: number) => {
    const durationMinutes = end ? (end - start) / (1000 * 60) : 10;
    return durationMinutes * 0.75;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4 sm:mb-6">Weekly Schedule</h1>
      <div className="grid grid-cols-7 gap-3">
        {Object.entries(weeklySchedule).map(([day, items]) => {
          const sortedItems = [...items].sort((a, b) => a.timestamp - b.timestamp);

          return (
            <div key={day} className="bg-gray-800 rounded-md p-3 shadow-md">
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
