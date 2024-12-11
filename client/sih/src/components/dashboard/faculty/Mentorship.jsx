import React, { useState } from "react";

const Mentorship = () => {
  const [mentees, setMentees] = useState([
    { id: 1, name: "John Doe", project: "AI Research", progress: 75 },
    { id: 2, name: "Jane Smith", project: "IoT Solution", progress: 60 },
    // Add more mentees as needed
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mentorship Dashboard</h2>
      <div className="grid gap-6">
        {mentees.map((mentee) => (
          <div key={mentee.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{mentee.name}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {mentee.progress}% Complete
              </span>
            </div>
            <p className="text-gray-600 mb-4">Project: {mentee.project}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${mentee.progress}%` }}
              ></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Schedule Meeting
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship;
