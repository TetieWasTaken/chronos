export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Weekly Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <div
            key={day}
            className="bg-gray-800 rounded-lg p-4 flex flex-col space-y-4 shadow-lg"
          >
            <h2 className="text-xl font-semibold border-b border-gray-700 pb-2">{day}</h2>
            <ul className="space-y-2 text-sm">
              <li className="bg-gray-700 p-2 rounded">Sample Assignment 1</li>
              <li className="bg-gray-700 p-2 rounded">Sample Assignment 2</li>
              <li className="bg-gray-700 p-2 rounded">Sample Assignment 3</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
