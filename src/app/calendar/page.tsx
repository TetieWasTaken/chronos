import { ScheduleItem } from "@/types";

const weeklySchedule: Record<string, ScheduleItem[]> = {
  Monday: [
    { title: "Math Assignment", type: "deadline", time: "11:59 PM" },
    { title: "Team Project Meeting", type: "meeting", time: "3:00 PM", description: "Discuss project milestones" },
  ],
  Tuesday: [
    { title: "Physics Study Session", type: "study", time: "10:00 AM" },
    { title: "Lab Report Submission", type: "deadline", time: "6:00 PM" },
  ],
  Wednesday: [
    { title: "Chemistry Assignment", type: "deadline", time: "11:59 PM" },
    { title: "Club Meeting", type: "event", time: "4:00 PM", description: "Discuss upcoming events" },
  ],
  Thursday: [
    { title: "History Study Session", type: "study", time: "2:00 PM" },
    { title: "Biology Assignment", type: "deadline", time: "11:59 PM" },
  ],
  Friday: [
    { title: "English Assignment", type: "deadline", time: "11:59 PM" },
    { title: "Social Event", type: "event", time: "7:00 PM", description: "End-of-week celebration" },
  ],
  Saturday: [
    { title: "Computer Science Assignment", type: "deadline", time: "11:59 PM" },
    { title: "Study Group", type: "meeting", time: "1:00 PM", description: "Review for upcoming exams" },
  ],
  Sunday: [
    { title: "Final Exam", type: "deadline", time: "9:00 AM" },
    { title: "Study Break", type: "event", time: "3:00 PM", description: "Relax and recharge" },
  ],
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Weekly Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {Object.entries(weeklySchedule).map(([day, items]) => (
          <div
            key={day}
            className="bg-gray-800 rounded-lg p-4 flex flex-col space-y-4 shadow-lg"
          >
            <h2 className="text-xl font-semibold border-b border-gray-700 pb-2">{day}</h2>
            <ul className="space-y-2 text-sm">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`p-3 rounded ${
                    item.type === "deadline"
                      ? "bg-red-500 text-white"
                      : item.type === "meeting"
                      ? "bg-blue-500 text-white"
                      : item.type === "study"
                      ? "bg-green-500 text-white"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-xs">{item.time}</span>
                  </div>
                  {item.description && (
                    <p className="text-xs mt-1">{item.description}</p>
                  )}
                  <span className="text-xs font-bold uppercase">
                    {item.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

