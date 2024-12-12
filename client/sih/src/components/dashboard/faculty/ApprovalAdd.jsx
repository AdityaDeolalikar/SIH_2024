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
        `https://sih-2024-e9z6.onrender.com/api/achievements?institution=${user?.institute?._id}`
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

  const renderTechnicalAchievement = (achievement) => (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">
        {achievement.innovationIndicator}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-600">Founder: {achievement.Founder}</p>
        <p className="text-gray-600">Domain: {achievement.Domain}</p>
        {achievement.publisherName && (
          <p className="text-gray-600">
            Publisher: {achievement.publisherName}
          </p>
        )}
        {achievement.mentorDetails && (
          <p className="text-gray-600">Mentor: {achievement.mentorDetails}</p>
        )}
        {achievement.nameOfPlatform && (
          <p className="text-gray-600">
            Platform: {achievement.nameOfPlatform}
          </p>
        )}
      </div>
    </div>
  );

  const renderNonTechnicalAchievement = (achievement) => (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">{achievement.innovationTitle}</h3>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-600">
          Innovators: {achievement.innovatorNames}
        </p>
        <p className="text-gray-600 col-span-2">
          Description: {achievement.description}
        </p>
        <p className="text-gray-600 col-span-2">
          Impact: {achievement.applicationImpact}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>
      <div className="grid gap-6">
        {pendingAchievements.map((achievement) => (
          <div
            key={achievement._id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium
                  ${achievement.category === 'Technical' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}"
                >
                  {achievement.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusUpdate(achievement._id, "Approved")
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(achievement._id, "Rejected")
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {achievement.category === "Technical"
                ? renderTechnicalAchievement(achievement)
                : renderNonTechnicalAchievement(achievement)}

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Submitted: {new Date(achievement.Date).toLocaleDateString()}
                </p>
                {achievement.document && (
                  <a
                    href={achievement.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View Document
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalAdd;
