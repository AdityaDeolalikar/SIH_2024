import React, { useState } from "react";
import axios from "axios";

const VerificationComp = () => {
  const [achievementData, setAchievementData] = useState({
    category: "",
    // Technical fields
    innovationIndicator: "",
    Founder: "",
    publisherName: "",
    mentorDetails: "",
    Domain: "",
    nameOfPlatform: "",
    // Non-Technical fields
    innovationTitle: "",
    description: "",
    applicationImpact: "",
    innovatorNames: "",
    // Common fields
    Date: "",
  });

  const innovationTypes = ["Patent", "Research Paper", "Project", "Startup"];
  const domains = ["AI/ML", "Web Development", "IoT", "Blockchain", "Other"];
  const categories = ["Technical", "Non Technical"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://sih-2024-e9z6.onrender.com/api/achievements",
        achievementData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setAchievementData({
          category: "",
          innovationIndicator: "",
          Founder: "",
          publisherName: "",
          mentorDetails: "",
          Domain: "",
          nameOfPlatform: "",
          innovationTitle: "",
          description: "",
          applicationImpact: "",
          innovatorNames: "",
          Date: "",
        });
        alert("Achievement submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting achievement:", error);
      if (error.response?.status === 401) {
        alert("Authentication failed. Please login again.");
      } else {
        alert("Failed to submit achievement. Please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Achievement</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement Category *
              </label>
              <select
                name="category"
                value={achievementData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Technical Achievement Fields */}
            {achievementData.category === "Technical" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Innovation Type *
                  </label>
                  <select
                    name="innovationIndicator"
                    value={achievementData.innovationIndicator}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Innovation Type</option>
                    {innovationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    name="Founder"
                    value={achievementData.Founder}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher Name
                  </label>
                  <input
                    type="text"
                    name="publisherName"
                    value={achievementData.publisherName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mentor Details
                  </label>
                  <textarea
                    name="mentorDetails"
                    value={achievementData.mentorDetails}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mentor's name and details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domain *
                  </label>
                  <select
                    name="Domain"
                    value={achievementData.Domain}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Domain</option>
                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    name="nameOfPlatform"
                    value={achievementData.nameOfPlatform}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the platform name"
                  />
                </div>
              </>
            )}

            {/* Non-Technical Achievement Fields */}
            {achievementData.category === "Non Technical" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Innovation Title *
                  </label>
                  <input
                    type="text"
                    name="innovationTitle"
                    value={achievementData.innovationTitle}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description of the Innovation *
                  </label>
                  <textarea
                    name="description"
                    value={achievementData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application/Impact *
                  </label>
                  <textarea
                    name="applicationImpact"
                    value={achievementData.applicationImpact}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Innovator Name(s) *
                  </label>
                  <input
                    type="text"
                    name="innovatorNames"
                    value={achievementData.innovatorNames}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            {achievementData.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="Date"
                  value={achievementData.Date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {achievementData.category && (
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Submit Achievement
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationComp;
