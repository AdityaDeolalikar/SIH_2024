import React, { useState, useEffect } from "react";
import axios from "axios";

const ApprovalAdd = () => {
  const [pendingAchievements, setPendingAchievements] = useState([]);

  useEffect(() => {
    fetchPendingAchievements();
  }, []);

  const fetchPendingAchievements = async () => {
    try {
      const _user = localStorage.getItem("user");
      const user = JSON.parse(_user);
      const response = await axios.get(
        `https://sih-2024-e9z6.onrender.com/api/achievements?institution=${user?.institution}`
      );
      setPendingAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(
        `https://sih-2024-e9z6.onrender.com/api/achievements/${id}`,
        {
          currentStatus: newStatus,
        }
      );
      fetchPendingAchievements();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>
      <div className="grid gap-6">
        {pendingAchievements.map((achievement) => (
          <div key={achievement._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">
                  {achievement.innovationIndicator}
                </h3>
                <p className="text-gray-600">By: {achievement.Founder}</p>
                <p className="text-gray-600">Domain: {achievement.Domain}</p>
                <p className="text-gray-600">
                  Date: {new Date(achievement.Date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleStatusUpdate(achievement._id, "Approved")
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(achievement._id, "Rejected")
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalAdd;
