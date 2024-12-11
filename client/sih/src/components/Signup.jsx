import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo2.png";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    gender: "",
    address: "",
    city: "",
    state: "",

    // Student Fields
    studentId: "",
    programName: "",
    yearSemester: "",
    department: "",
    skills: "",
    instituteName: "",
    dateOfBirth: "",

    // Optional Fields (both Student and Faculty)
    linkedinProfile: "",
    portfolio: "",
    emergencyContact: "",
    innovationInterests: "",

    // Faculty Fields
    employeeId: "",
    designation: "",
    educationalQualification: "",
    specialization: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          ...formData,
          userType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-8 py-6 mt-4 w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <div className="flex justify-center space-x-4 mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <img src={logo2} alt="Logo 2" className="h-12 w-auto" />
        </div>

        <h3 className="mb-8 text-2xl font-bold text-center text-gray-800">
          Create Account
          <p className="mt-1 text-sm font-normal text-gray-600">
            Please fill in your details to register
          </p>
        </h3>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="student"
                checked={userType === "student"}
                onChange={(e) => setUserType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">Student</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="faculty"
                checked={userType === "faculty"}
                onChange={(e) => setUserType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">Faculty</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="administrator"
                checked={userType === "administrator"}
                onChange={(e) => setUserType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">Administrator</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role-specific Fields */}
            {userType === "student" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Program/Course
                  </label>
                  <input
                    type="text"
                    name="programName"
                    value={formData.programName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year/Semester
                  </label>
                  <input
                    type="text"
                    name="yearSemester"
                    value={formData.yearSemester}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            ) : userType === "faculty" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation/Role
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            ) : null}

            {/* Optional Fields (shown for both student and faculty) */}
            {userType !== "administrator" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Portfolio/Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 w-40 text-white bg-blue-600 rounded-lg transition-colors duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
