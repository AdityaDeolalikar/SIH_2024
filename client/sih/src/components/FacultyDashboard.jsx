import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
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
      action: () => {/* Handle help action */},
    },
    {
      icon: <FiSettings className="text-gray-500" />,
      label: "Settings",
      action: () => {/* Handle settings action */},
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
          <div className="absolute right-0 w-80 mt-2 bg-white rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-800">{notification.text}</p>
                  <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
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
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-gray-600" />
          </div>
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg z-50">
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
    name: "Indian Institute of Technology Bombay",
    code: "IITB123",
    rank: "#1 in Innovation",
    university: "Autonomous Institute",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png" // Replace with your image path
  });

  // Add this state for innovation metrics
  const [innovationMetrics] = useState({
    overall: 127,
    patents: 90,
    research: 82,
    startups: 88,
    projects: 80,
    grants: 85
  });

  // Add these new states
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default month
  const [monthlyData] = useState({
    January: [65, 68, 70, 72, 75, 78, 80, 82, 85, 83, 85, 85, 87, 85, 88, 90, 88, 85, 87, 89, 90, 92, 90, 88, 85, 87, 88, 90, 92, 95],
    February: [70, 72, 75, 78, 80, 82, 85, 87, 88, 90, 92, 95, 93, 90, 92, 95, 93, 90, 88, 85, 87, 88, 90, 92, 95, 93, 90],
    March: [75, 78, 80, 82, 85, 87, 88, 90, 92, 95, 93, 90, 92, 95, 93, 90, 88, 85, 87, 88, 90, 92, 95, 93, 90, 92, 95, 93, 90, 88, 85],
    // Add data for other months...
  });

  // Add this state for achievements
  const [achievements] = useState([
    {
      id: 1,
      title: "Competition & Events",
      description: "Won Smart India Hackathon 2023 in Software Edition",
      // image: "https://sih.gov.in/img/SIH2023-logo.png",
      count: "15+ Awards"
    },
    {
      id: 2,
      title: "Research & Development",
      description: "Published 25 research papers in top-tier journals",
      // image: "https://example.com/research.jpg",
      count: "25+ Publications"
    },
    {
      id: 3,
      title: "Hackathon Triumphs",
      description: "Students secured top positions in national hackathons",
      // image: "https://example.com/hackathon.jpg",
      count: "10+ Wins"
    },
    {
      id: 4,
      title: "Certifications",
      description: "Students achieved professional certifications from leading organizations",
      // image: "https://example.com/certifications.jpg",
      count: "100+ Certified"
    },
    {
      id: 5,
      title: "Patents Filed",
      description: "Innovation patents filed by students and faculty",
      // image: "https://example.com/patents.jpg",
      count: "8 Patents"
    },
    {
      id: 6,
      title: "Startup Success",
      description: "Student startups receiving significant funding",
      // image: "https://example.com/startup.jpg",
      count: "5 Startups"
    }
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
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Highlights & Achievements
          </h2>
          <Slider {...settings} className="achievement-slider -mx-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="px-2">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 h-full transition-transform hover:scale-105">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x225?text=Achievement';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {achievement.count}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Innovation Indicators */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Key Innovation Indicators
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-700">Research Papers</h3>
              <div className="mt-2 text-3xl font-bold text-blue-600">
                {innovationMetrics.research}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <h3 className="text-lg font-semibold text-green-700">Patents</h3>
              <div className="mt-2 text-3xl font-bold text-green-600">
                {innovationMetrics.patents}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
              <h3 className="text-lg font-semibold text-yellow-700">Startups</h3>
              <div className="mt-2 text-3xl font-bold text-yellow-600">
                {innovationMetrics.startups}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-700">Grants</h3>
              <div className="mt-2 text-3xl font-bold text-purple-600">
                {innovationMetrics.grants}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-pink-50 border border-pink-100">
              <h3 className="text-lg font-semibold text-pink-700">Awards</h3>
              <div className="mt-2 text-3xl font-bold text-pink-600">
                85
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Progress Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
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
              <line x1="50" y1="250" x2="750" y2="250" stroke="#E5E7EB" strokeWidth="2" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="#E5E7EB" strokeWidth="2" />
              
              {/* Plot line */}
              <path
                d={`M ${monthlyData[selectedMonth].map((value, index) => {
                  const x = 50 + (700 / (monthlyData[selectedMonth].length - 1)) * index;
                  const y = 250 - (value * 2);
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Data points */}
              {monthlyData[selectedMonth].map((value, index) => {
                const x = 50 + (700 / (monthlyData[selectedMonth].length - 1)) * index;
                const y = 250 - (value * 2);
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3B82F6"
                  />
                );
              })}

              {/* Y-axis labels */}
              <text x="30" y="250" textAnchor="end" className="text-sm">0%</text>
              <text x="30" y="150" textAnchor="end" className="text-sm">50%</text>
              <text x="30" y="50" textAnchor="end" className="text-sm">100%</text>

              {/* X-axis labels */}
              <text x="50" y="270" textAnchor="middle" className="text-sm">1</text>
              <text x="400" y="270" textAnchor="middle" className="text-sm">15</text>
              <text x="750" y="270" textAnchor="middle" className="text-sm">30</text>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Institute Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <img
                  src={instituteDetails.image}
                  alt="Institute Logo"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Institute Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Institute Name</label>
                    <p className="text-lg font-medium text-gray-900">
                      {instituteDetails.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Institute Code</label>
                    <p className="text-lg font-medium text-gray-900">
                      {instituteDetails.code}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Current Rank</label>
                    <p className="text-lg font-medium text-blue-600">
                      {instituteDetails.rank}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Affiliated to</label>
                    <p className="text-lg font-medium text-gray-900">
                      {instituteDetails.university}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation Excellence Indicator */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Innovation Excellence Indicator
            </h2>
            <div className="relative w-64 h-64 mx-auto">
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
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - innovationMetrics.patents / 100)}`}
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
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - innovationMetrics.research / 100)}`}
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
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - innovationMetrics.startups / 100)}`}
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">
                    {innovationMetrics.overall}
                  </div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Patents ({innovationMetrics.patents})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Research ({innovationMetrics.research})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Startups ({innovationMetrics.startups})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-600">Projects ({innovationMetrics.projects})</span>
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
                  {user?.name || "Faculty / Institute"}
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
            {/* Other menu item content... */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard; 