import React, { useState } from "react";

const Mentorship = () => {
  const [mentees, setMentees] = useState([
    { id: 1, name: "John Doe", project: "AI Research", progress: 75 },
    { id: 2, name: "Jane Smith", project: "IoT Solution", progress: 60 },
    // Add more mentees as needed
  ]);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Mentorship Dashboard</h2>
      <div className="grid gap-6">
        {mentees.map((mentee) => (
          <div key={mentee.id} className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{mentee.name}</h3>
              <span className="px-3 py-1 text-blue-800 bg-blue-100 rounded-full">
                {mentee.progress}% Complete
              </span>
            </div>
            <p className="mb-4 text-gray-600">Project: {mentee.project}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${mentee.progress}%` }}
              ></div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
               <a href="https://cal.com/aditya-deolalikar-wqordb" target="_blank">Schedule Meeting</a> 
              </button>
              <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">
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
