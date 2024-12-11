import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo2.png";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    role: "student",
    otp: "",
  });

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const requestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First check if user exists
      const response = await fetch(
        "http://localhost:5000/api/auth/check-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: "+91" + formData.phoneNumber,
          }),
        }
      );

      const data = await response.json();

      if (!data.exists) {
        // User doesn't exist, redirect to signup
        navigate("/signup", {
          state: {
            phoneNumber: formData.phoneNumber,
          },
        });
        return;
      }

      // If user exists, proceed with OTP
      const phoneNumber = "+91" + formData.phoneNumber;
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setShowOTP(true);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await window.confirmationResult.confirm(formData.otp);
      const user = result.user;

      // Get the Firebase ID token
      const idToken = await user.getIdToken();

      // Send to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/firebase-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            firebaseUID: user.uid,
            role: formData.role,
            phoneNumber: user.phoneNumber,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        switch (formData.role) {
          case "student":
            navigate("/dashboard/student");
            break;
          case "faculty":
            navigate("/dashboard/faculty");
            break;
          case "administrator":
            navigate("/dashboard/admin");
            break;
          default:
            navigate("/");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-8 py-6 mt-4 w-full max-w-md bg-white rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <div className="flex justify-center space-x-4 mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <img src={logo2} alt="Logo 2" className="h-12 w-auto" />
        </div>

        <h3 className="mb-8 text-2xl font-bold text-center text-gray-800">
          Welcome Back
          <p className="mt-1 text-sm font-normal text-gray-600">
            Please sign in to continue
          </p>
        </h3>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={showOTP ? verifyOTP : requestOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty / Institute</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={showOTP}
            />
          </div>

          {showOTP && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="px-4 py-3 mt-1 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 w-40 text-white bg-blue-600 rounded-lg transition-colors duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? "Please wait..." : showOTP ? "Verify OTP" : "Get OTP"}
            </button>
            <Link
              to="/signup"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
