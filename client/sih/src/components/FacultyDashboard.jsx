import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import image from '../assets/images/image.png'
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApprovalAdd from "./dashboard/faculty/ApprovalAdd";
import ChartCustomization from "./dashboard/faculty/ChartCustomization";
import ExcellenceMetrics from "./dashboard/faculty/ExcellenceMetrics";
import Mentorship from "./dashboard/faculty/Mentorship";
import Leaderboard from "./dashboard/faculty/Leaderboard";
import DashboardContent from "./dashboard/faculty/DashboardCount";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const notificationRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // Sidebar menu items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "excellence", label: "Excellence Metrics", icon: "🎯" },
    { id: "approval", label: "Approval & Add", icon: "✓" },
    { id: "mentorship", label: "Mentorship", icon: "👨‍🏫" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { id: "chart", label: "Chart Customization", icon: "📈" },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      text: "New verification request",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      text: "Student submitted new project",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      text: "Monthly report generated",
      time: "2 days ago",
      unread: false,
    },
  ];

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
    { code: "kn", name: "ಕನ್ನಡ" },
  ];

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Profile menu items
  const profileMenuItems = [
    {
      icon: <FiUser className="text-gray-500" />,
      label: "My Profile",
      action: () => setActiveMenuItem("profile"),
      className: "text-gray-700 hover:bg-gray-50",
    },
    {
      icon: <FiHelpCircle className="text-gray-500" />,
      label: "Help & Support",
      action: () => {
        /* Handle help action */
      },
    },
    {
      icon: <FiSettings className="text-gray-500" />,
      label: "Settings",
      action: () => {
        /* Handle settings action */
      },
    },
    {
      icon: <FiLogOut className="text-red-500" />,
      label: "Sign Out",
      action: handleLogout,
      className: "text-red-600 hover:bg-red-50",
    },
  ];

  // Render notifications section
  const renderNotificationsSection = () => {
    return (
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          {showNotifications ? (
            <BsBellFill className="w-6 h-6 text-white" />
          ) : (
            <BsBell className="w-6 h-6 text-white" />
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 z-50 mt-2 w-80 bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
              </h3>
            </div>
            <div className="overflow-y-auto max-h-96">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-800">{notification.text}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render profile section
  const renderProfileSection = () => {
    return (
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center space-x-3 focus:outline-none"
        >
          <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
            <FiUser className="w-5 h-5 text-gray-600" />
          </div>
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg">
            {profileMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-3 hover:bg-gray-50 ${
                  item.className || "text-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Add this new state for institute details
  const [instituteDetails] = useState({
    name: "All India Institute of Ayurveda",
    code: "AIIA123",
    rank: "#1 in Innovation",
    university: "Autonomous Institute",
    // image:
    //   "client\sih\src\assets\images\image.png", // Replace with your image path
  });

  // Add this state for innovation metrics
  const [innovationMetrics] = useState({
    overall: 127,
    patents: 90,
    research: 82,
    startups: 88,
    projects: 80,
    grants: 85,
  });

  // Add these new states
  const [selectedMonth, setSelectedMonth] = useState("January"); // Default month
  const [monthlyData] = useState({
    January: [
      65, 68, 70, 72, 75, 78, 80, 82, 85, 83, 85, 85, 87, 85, 88, 90, 88, 85,
      87, 89, 90, 92, 90, 88, 85, 87, 88, 90, 92, 95,
    ],
    February: [
      70, 72, 75, 78, 80, 82, 85, 87, 88, 90, 92, 95, 93, 90, 92, 95, 93, 90,
      88, 85, 87, 88, 90, 92, 95, 93, 90,
    ],
    March: [
      75, 78, 80, 82, 85, 87, 88, 90, 92, 95, 93, 90, 92, 95, 93, 90, 88, 85,
      87, 88, 90, 92, 95, 93, 90, 92, 95, 93, 90, 88, 85,
    ],
    // Add data for other months...
  });

  // Add this state for achievements
  const [achievements] = useState([
    {
      id: 1,
      title: "Competition & Events",
      description: "Won Smart India Hackathon 2023 in Software Edition",
      // image: "https://sih.gov.in/img/SIH2023-logo.png",
      count: "15+ Awards",
    },
    {
      id: 2,
      title: "Research & Development",
      description: "Published 25 research papers in top-tier journals",
      // image: "https://example.com/research.jpg",
      count: "25+ Publications",
    },
    {
      id: 3,
      title: "Hackathon Triumphs",
      description: "Students secured top positions in national hackathons",
      // image: "https://example.com/hackathon.jpg",
      count: "10+ Wins",
    },
    {
      id: 4,
      title: "Certifications",
      description:
        "Students achieved professional certifications from leading organizations",
      // image: "https://example.com/certifications.jpg",
      count: "100+ Certified",
    },
    {
      id: 5,
      title: "Patents Filed",
      description: "Innovation patents filed by students and faculty",
      // image: "https://example.com/patents.jpg",
      count: "8 Patents",
    },
    {
      id: 6,
      title: "Startup Success",
      description: "Student startups receiving significant funding",
      // image: "https://example.com/startup.jpg",
      count: "5 Startups",
    },
  ]);

  // Add this function to render the achievements slider
  const renderAchievementsSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="mt-8">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Highlights & Achievements
          </h2>
          <Slider {...settings} className="-mx-2 achievement-slider">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="px-2">
                <div className="p-6 h-full bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm transition-transform hover:scale-105">
                  <div className="overflow-hidden mb-4 bg-gray-100 rounded-lg aspect-video">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x225?text=Achievement";
                      }}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {achievement.title}
                  </h3>
                  <p className="mb-4 text-gray-600">
                    {achievement.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                      {achievement.count}
                    </span>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

  // Add this to your renderDashboardContent function, after the existing grid
  const renderInnovationMetrics = () => {
    return (
      <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
        {/* Key Innovation Indicators */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Key Innovation Indicators
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-700">
                Research Papers
              </h3>
              <div className="mt-2 text-3xl font-bold text-blue-600">
                {innovationMetrics.research}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-semibold text-green-700">Patents</h3>
              <div className="mt-2 text-3xl font-bold text-green-600">
                {innovationMetrics.patents}
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <h3 className="text-lg font-semibold text-yellow-700">
                Startups
              </h3>
              <div className="mt-2 text-3xl font-bold text-yellow-600">
                {innovationMetrics.startups}
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-700">Grants</h3>
              <div className="mt-2 text-3xl font-bold text-purple-600">
                {innovationMetrics.grants}
              </div>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
              <h3 className="text-lg font-semibold text-pink-700">Awards</h3>
              <div className="mt-2 text-3xl font-bold text-pink-600">85</div>
            </div>
          </div>
        </div>

        {/* Monthly Progress Chart */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Monthly Progress
            </h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(monthlyData).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="h-64">
            <svg className="w-full h-full" viewBox="0 0 800 300">
              {/* X and Y axes */}
              <line
                x1="50"
                y1="250"
                x2="750"
                y2="250"
                stroke="#E5E7EB"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="250"
                stroke="#E5E7EB"
                strokeWidth="2"
              />

              {/* Plot line */}
              <path
                d={`M ${monthlyData[selectedMonth]
                  .map((value, index) => {
                    const x =
                      50 +
                      (700 / (monthlyData[selectedMonth].length - 1)) * index;
                    const y = 250 - value * 2;
                    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ")}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Data points */}
              {monthlyData[selectedMonth].map((value, index) => {
                const x =
                  50 + (700 / (monthlyData[selectedMonth].length - 1)) * index;
                const y = 250 - value * 2;
                return (
                  <circle key={index} cx={x} cy={y} r="4" fill="#3B82F6" />
                );
              })}

              {/* Y-axis labels */}
              <text x="30" y="250" textAnchor="end" className="text-sm">
                0%
              </text>
              <text x="30" y="150" textAnchor="end" className="text-sm">
                50%
              </text>
              <text x="30" y="50" textAnchor="end" className="text-sm">
                100%
              </text>

              {/* X-axis labels */}
              <text x="50" y="270" textAnchor="middle" className="text-sm">
                1
              </text>
              <text x="400" y="270" textAnchor="middle" className="text-sm">
                15
              </text>
              <text x="750" y="270" textAnchor="middle" className="text-sm">
                30
              </text>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Update the renderDashboardContent function
  const renderDashboardContent = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Institute Details Card */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="w-full md:w-1/3">
                <img
                  src={image}
                  alt="Institute Logo"
                  className="object-contain w-full h-auto rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Institute Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">
                      Institute Name
                    </label>
                    <p className="text-lg font-medium text-gray-900">
                      {instituteDetails.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Institute Code
                    </label>
                    <p className="text-lg font-medium text-gray-900">
                      {instituteDetails.code}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Current Rank
                    </label>
                    <p className="text-lg font-medium text-blue-600">
                      {instituteDetails.rank}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Affiliated to
                    </label>
                    <p className="text-lg font-medium text-gray-900">
                      {instituteDetails.university}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation Excellence Indicator */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Innovation Excellence Indicator
            </h2>
            <div className="relative mx-auto w-64 h-64">
              {/* Circular Progress Indicators */}
              <div className="absolute inset-0">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Patents Indicator */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 45 * (1 - innovationMetrics.patents / 100)
                    }`}
                    className="transition-all duration-1000"
                  />
                  {/* Research Indicator */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="#10B981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 40 * (1 - innovationMetrics.research / 100)
                    }`}
                    className="transition-all duration-1000"
                  />
                  {/* Startups Indicator */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="35%"
                    stroke="#F59E0B"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 35 * (1 - innovationMetrics.startups / 100)
                    }`}
                    className="transition-all duration-1000"
                  />
                  {/* Center Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="30%"
                    fill="#F3F4F6"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>

              {/* Center Text */}
              <div className="flex absolute inset-0 justify-center items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    {innovationMetrics.overall}
                  </div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Patents ({innovationMetrics.patents})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Research ({innovationMetrics.research})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Startups ({innovationMetrics.startups})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Projects ({innovationMetrics.projects})
                </span>
              </div>
            </div>
          </div>
        </div>
        {renderInnovationMetrics()}
        {renderAchievementsSlider()}
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 w-64 bg-[#002449] shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  Srujan Portal
                </span>
                <p className="text-sm text-gray-300">
                  {user?.fullName || "Faculty / Institute"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="overflow-y-auto flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenuItem(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeMenuItem === item.id
                        ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                        : "text-white hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <nav className="bg-[#002449] shadow-lg">
          <div className="px-8 mx-auto">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">
                  {menuItems.find((item) => item.id === activeMenuItem)
                    ?.label || "Dashboard"}
                </h1>
              </div>
              <div className="flex items-center space-x-6">
                {/* Language Selector */}
                <div className="relative">
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notifications */}
                {renderNotificationsSection()}

                {/* Profile */}
                {renderProfileSection()}
              </div>
            </div>
          </div>
        </nav>

        <main className="py-8">
          <div className="px-8 mx-auto max-w-7xl">
            {activeMenuItem === "dashboard" && renderDashboardContent()}
            {activeMenuItem === "approval" && <ApprovalAdd />}
            {activeMenuItem === "mentorship" && <Mentorship />}
            {activeMenuItem === "leaderboard" && <Leaderboard />}
            {activeMenuItem === "chart" && <ChartCustomization />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;
