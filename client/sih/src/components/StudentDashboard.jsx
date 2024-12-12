import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerificationComp from "./dashboard/Verification";
import axios from "axios";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const notificationRef = useRef(null);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([""]);
  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem("teams");
    return savedTeams
      ? JSON.parse(savedTeams)
      : [
          {
            id: 1,
            name: "Tech Innovators",
            projectType: "Web Development",
            description: "Building innovative web solutions",
            members: ["John Doe", "Jane Smith", "Mike Johnson"],
            mentorType: "assign",
            mentor: "Dr. Sarah Wilson",
          },
        ];
  });
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    class: "BE Computer Engineering",
    rollNo: "21CE1234",
    division: "A",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123, College Road, Mumbai, Maharashtra - 400001",
    parentPhone: "+91 9876543211",
  });
  const [editedStudentInfo, setEditedStudentInfo] = useState(studentInfo);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const [filters, setFilters] = useState({
    innovationIndicator: "",
    domain: "",
    currentStatus: "",
    date: "",
  });
  const [mentorType, setMentorType] = useState("assign"); // 'assign' or 'request'
  const [mentorName, setMentorName] = useState("");
  const [studentLeaderboard] = useState([
    { id: 1, name: "Arjun Patel", points: 950 },
    { id: 2, name: "Priya Sharma", points: 920 },
    { id: 3, name: "Rahul Verma", points: 885 },
    { id: 4, name: "Ananya Reddy", points: 850 },
    { id: 5, name: "Rohan Mehta", points: 820 },
    { id: 6, name: "Neha Gupta", points: 795 },
    { id: 7, name: "Aditya Kumar", points: 780 },
    { id: 8, name: "Shreya Singh", points: 765 },
    { id: 9, name: "Vikram Malhotra", points: 740 },
    { id: 10, name: "Riya Desai", points: 725 },
  ]);

  const [instituteLeaderboard] = useState([
    { id: 1, name: "IIT Bombay", innovationIndex: 94.5 },
    { id: 2, name: "IIT Delhi", innovationIndex: 92.8 },
    { id: 3, name: "IIT Madras", innovationIndex: 91.4 },
    { id: 4, name: "BITS Pilani", innovationIndex: 89.7 },
    { id: 5, name: "IIT Kharagpur", innovationIndex: 88.9 },
    { id: 6, name: "VIT Vellore", innovationIndex: 87.5 },
    { id: 7, name: "NIT Trichy", innovationIndex: 86.8 },
    { id: 8, name: "IIT Roorkee", innovationIndex: 85.9 },
    { id: 9, name: "IIIT Hyderabad", innovationIndex: 85.2 },
    { id: 10, name: "DTU Delhi", innovationIndex: 84.6 },
  ]);

  const [selectedStat, setSelectedStat] = useState(null);
  const [showStatModal, setShowStatModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Sidebar menu items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "achievements", label: "Excellence metrics", icon: "🏆" },
    { id: "verification", label: "Verification", icon: "✓" },
    { id: "team", label: "Team", icon: "👥" },
    { id: "test-analysis", label: "Test Analysis", icon: "📈" },
    { id: "communities", label: "Leaderboard", icon: "🌐" },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      text: "New research paper submitted",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      text: "Patent application updated",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      text: "Grant application approved",
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

  // Sample statistics data
  const statistics = [
    { title: "Patents", count: 3, icon: "📜" },
    { title: "Research Papers", count: 5, icon: "📚" },
    { title: "Grants Received", count: "₹5L", icon: "💰" },
    { title: "Startups Incubated", count: 2, icon: "🚀" },
    { title: "Awards Won", count: 4, icon: "🏆" },
  ];

  // Team management functions
  const handleAddMember = () => {
    setTeamMembers([...teamMembers, ""]);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = teamMembers.map((member, i) =>
      i === index ? value : member
    );
    setTeamMembers(updatedMembers);
  };

  const handleRemoveMember = (index) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const handleDeleteTeam = (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        const updatedTeams = teams.filter((team) => team.id !== teamId);
        setTeams(updatedTeams);
        localStorage.setItem("teams", JSON.stringify(updatedTeams));

        toast.success("Team deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        toast.error("Error deleting team", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      id: Date.now(),
      name: teamName,
      projectType,
      description: teamDescription,
      members: teamMembers.filter((member) => member.trim() !== ""),
      mentorType,
      mentor: mentorType === "assign" ? mentorName : "Not Assigned",
    };
    setTeams([...teams, newTeam]);

    // Reset form
    setTeamName("");
    setProjectType("");
    setTeamDescription("");
    setTeamMembers([""]);
    setMentorType("assign");
    setMentorName("");
    setShowTeamForm(false);

    // Toast notification
    toast.success("Team created successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleEditInfoSubmit = (e) => {
    e.preventDefault();
    setStudentInfo(editedStudentInfo);
    setIsEditingInfo(false);
  };

  const handleInfoChange = (field, value) => {
    setEditedStudentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  // Fetch achievements from backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        // Fetch both technical and non-technical achievements
        const response = await axios.get(
          "https://sih-2024-e9z6.onrender.com/api/achievements",
          {
            // Add any filters you need
            params: {
              // You might want to filter by the current user's institution
              // institution: currentUser.institution
            },
          }
        );

        setAchievements(response.data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderDashboardContent = () => {
    return (
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="overflow-hidden relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col gap-6 justify-between items-start md:flex-row md:items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, {user?.fullName || "Innovator"} 👋
                </h1>
                <p className="max-w-2xl text-blue-100">
                  Track your innovation journey, manage projects, and explore new opportunities. Your current innovation score is <span className="font-semibold">850</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md"
              onClick={() => {
                setSelectedStat(stat);
                setShowStatModal(true);
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className={`p-3 rounded-xl ${
                  index % 4 === 0 ? 'bg-blue-50 text-blue-600' :
                  index % 4 === 1 ? 'bg-purple-50 text-purple-600' :
                  index % 4 === 2 ? 'bg-green-50 text-green-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className={`px-2.5 py-1 text-sm font-medium rounded-full ${
                  index % 2 === 0 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  +{Math.floor(Math.random() * 30)}%
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                {stat.title}
              </h3>
              <div className="flex gap-2 items-baseline">
                <span className="text-3xl font-bold text-gray-900">{stat.count}</span>
                <span className="text-sm text-gray-500">total</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Innovation Progress */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Innovation Progress</h2>
              {/* <select className="text-sm rounded-lg border-gray-200 focus:ring-blue-500">
                <option>This Month</option>
                <option>Last Quarter</option>
                <option>This Year</option>
              </select> */}
            </div>
            <div className="space-y-6">
              {[
                { label: 'Research Papers', progress: 75, total: 15, color: 'blue' },
                { label: 'Patents Filed', progress: 45, total: 8, color: 'green' },
                { label: 'Projects', progress: 60, total: 12, color: 'purple' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="ml-2 text-sm text-gray-400">({item.total})</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.progress}%</span>
                  </div>
                  <div className="overflow-hidden h-2 bg-gray-100 rounded-full">
                    <div
                      className={`h-full rounded-full bg-${item.color}-600`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              {/* <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </button> */}
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: "🎯",
                  title: "Project Milestone Achieved",
                  desc: "Completed phase 1 of AI research project",
                  time: "2 hours ago",
                  color: "blue"
                },
                {
                  icon: "📝",
                  title: "Research Paper Submitted",
                  desc: "Submitted to International Journal of Innovation",
                  time: "1 day ago",
                  color: "green"
                },
                {
                  icon: "🏆",
                  title: "Achievement Unlocked",
                  desc: "Received Innovation Excellence Badge",
                  time: "2 days ago",
                  color: "purple"
                }
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-lg transition-colors hover:bg-gray-50">
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-${activity.color}-50`}>
                    <span className="text-2xl">{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
              {/* <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View Calendar
              </button> */}
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Innovation Workshop",
                  date: "Mar 15",
                  time: "10:00 AM",
                  type: "Workshop",
                  color: "blue"
                },
                {
                  title: "Project Presentation",
                  date: "Mar 18",
                  time: "2:30 PM",
                  type: "Presentation",
                  color: "green"
                },
                {
                  title: "Hackathon 2024",
                  date: "Mar 20",
                  time: "9:00 AM",
                  type: "Competition",
                  color: "purple"
                }
              ].map((event, idx) => (
                <div key={idx} className="flex gap-4 items-center p-4 rounded-lg transition-colors hover:bg-gray-50">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-semibold text-gray-900">{event.date}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${event.color}-50 text-${event.color}-700`}>
                      {event.type}
                    </span>
                  </div>
                  <button className={`text-${event.color}-600 hover:text-${event.color}-700`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
              {/* <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </button> */}
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Research Grant Opportunity",
                  desc: "Apply for the Innovation Research Grant 2024",
                  deadline: "Deadline: Mar 30",
                  type: "Grant",
                  amount: "₹5L"
                },
                {
                  title: "Patent Writing Workshop",
                  desc: "Learn effective patent writing techniques",
                  deadline: "Starts: Apr 5",
                  type: "Workshop",
                  amount: "Free"
                }
              ].map((rec, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-gray-100 transition-colors hover:border-blue-100">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                      <p className="text-sm text-gray-500">{rec.desc}</p>
                      <p className="text-xs text-gray-400">{rec.deadline}</p>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                      {rec.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Achievements section
  const renderAchievementsContent = () => {
    if (loading) {
      return (
        <div className="p-8 bg-white rounded-xl shadow-sm">
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 rounded-full border-b-2 border-blue-600 animate-spin"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 bg-white rounded-xl shadow-sm">
          <div className="text-center text-red-600">
            <p>Error loading achievements: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    // Filter achievements by category
    const technicalAchievements = achievements.filter(
      (achievement) => achievement.category === "Technical"
    );

    const nonTechnicalAchievements = achievements.filter(
      (achievement) => achievement.category === "Non Technical"
    );

    return (
      <div className="space-y-8">
        {/* Technical Achievements */}
        <div className="p-8 bg-white rounded-xl shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Technical Achievements
            </h2>
            <p className="mt-1 text-gray-600">
              Track your innovation and research accomplishments
            </p>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
            {/* Innovation Indicator Filter */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Innovation Type
              </label>
              <select
                value={filters.innovationIndicator}
                onChange={(e) =>
                  handleFilterChange("innovationIndicator", e.target.value)
                }
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {filterOptions.innovationIndicator.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Domain Filter */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Domain
              </label>
              <select
                value={filters.domain}
                onChange={(e) => handleFilterChange("domain", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Domains</option>
                {filterOptions.domain.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={filters.currentStatus}
                onChange={(e) =>
                  handleFilterChange("currentStatus", e.target.value)
                }
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {filterOptions.currentStatus.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {achievements.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No achievements found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Sr. No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Innovation Indicator
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Founder
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Publisher Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Mentor Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Domain
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Platform Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Document
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                    >
                      Current Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {technicalAchievements.map((achievement, index) => (
                    <tr
                      key={achievement._id}
                      className="transition-colors duration-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}
                        >
                          {achievement.innovationIndicator}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {achievement.Founder}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {achievement.publisherName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {moment(achievement.Date).format("DD-MM-YYYY")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {achievement.mentorDetails}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {achievement.Domain}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {achievement.nameOfPlatform}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`/documents/${achievement.document}`}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="mr-1 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                          </svg>
                          View
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          
                              :bg-gray-100 text-gray-800
                          `}
                        >
                          {achievement.currentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Non-Technical Achievements */}
        <div className="p-8 bg-white rounded-xl shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Non-Technical Achievements
            </h2>
            <p className="mt-1 text-gray-600">
              Track your extracurricular and co-curricular accomplishments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Impact
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Innovators
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nonTechnicalAchievements.map((achievement) => (
                  <tr key={achievement._id} className="transition-colors duration-200 hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {achievement.innovationTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {achievement.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {achievement.applicationImpact}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {achievement.innovatorNames}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {moment(achievement.Date).format("DD-MM-YYYY")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        achievement.currentStatus === "Approved"
                          ? "bg-green-100 text-green-800"
                          : achievement.currentStatus === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {achievement.currentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTeamContent = () => {
    return (
      <div className="space-y-8">
        {/* Team Overview Section */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-6 justify-between items-start md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Your Innovation Teams</h2>
              <p className="text-blue-100">Collaborate, innovate, and track your team's progress</p>
            </div>
            <button
              onClick={() => setShowTeamForm(true)}
              className="inline-flex items-center px-4 py-2 text-blue-600 bg-white rounded-lg transition-all duration-200 hover:bg-blue-50"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Team
            </button>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div key={team.id} className="bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                {/* Team Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                    <p className="text-sm text-gray-500">{team.projectType}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 rounded-lg transition-colors hover:text-blue-600 hover:bg-blue-50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 rounded-lg transition-colors hover:text-red-600 hover:bg-red-50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Team Description */}
                <p className="mb-4 text-gray-600">{team.description}</p>

                {/* Team Members */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((member, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mentor Section */}
                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Mentor</h4>
                      <p className="text-sm text-gray-600">{team.mentor || 'Not assigned'}</p>
                    </div>
                    <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg transition-colors hover:bg-blue-100">
                      {team.mentorType === 'assign' ? 'Change Mentor' : 'Request Mentor'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Actions */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="flex w-3 h-3">
                      <span className="inline-flex absolute w-3 h-3 bg-green-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="inline-flex relative w-3 h-3 bg-green-500 rounded-full"></span>
                    </span>
                    <span className="text-sm text-gray-600">Active Project</span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Team Modal */}
        {showTeamForm && (
          <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Create New Team</h3>
                <button
                  onClick={() => setShowTeamForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="px-3 py-2 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter team name"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="px-3 py-2 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select project type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="IoT">IoT</option>
                    <option value="Blockchain">Blockchain</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    className="px-3 py-2 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Describe your team's project"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Team Members
                  </label>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => {
                          const newMembers = [...teamMembers];
                          newMembers[index] = e.target.value;
                          setTeamMembers(newMembers);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter member name"
                      />
                      {teamMembers.length > 1 && (
                        <button
                          onClick={() => {
                            const newMembers = teamMembers.filter((_, i) => i !== index);
                            setTeamMembers(newMembers);
                          }}
                          className="p-2 text-red-600 rounded-lg transition-colors hover:bg-red-50"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setTeamMembers([...teamMembers, ""])}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Member
                  </button>
                </div>
              </div>

              <div className="flex gap-3 justify-end px-6 py-4 bg-gray-50 rounded-b-xl">
                <button
                  onClick={() => setShowTeamForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle team creation logic here
                    const newTeam = {
                      id: teams.length + 1,
                      name: teamName,
                      projectType,
                      description: teamDescription,
                      members: teamMembers.filter(member => member.trim() !== ""),
                      mentorType: "request",
                      mentor: null
                    };
                    setTeams([...teams, newTeam]);
                    setShowTeamForm(false);
                    setTeamName("");
                    setProjectType("");
                    setTeamDescription("");
                    setTeamMembers([""]);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Notifications section in the navbar
  const renderNotificationsSection = () => (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none group"
      >
        <span className="sr-only">Notifications</span>
        {notifications.some((n) => n.unread) ? (
          <BsBellFill className="text-2xl transition-transform group-hover:scale-110" />
        ) : (
          <BsBell className="text-2xl transition-transform group-hover:scale-110" />
        )}
        {notifications.some((n) => n.unread) && (
          <span className="flex absolute -top-1 -right-1">
            <span className="inline-flex absolute w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
            <span className="inline-flex relative w-3 h-3 bg-red-500 rounded-full"></span>
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 z-50 mt-2 w-80 bg-white rounded-xl ring-1 ring-black ring-opacity-5 shadow-lg">
          <div className="py-2 border-b">
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center space-x-2">
                <div className="flex relative w-3 h-3">
                  <span className="inline-flex absolute w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="inline-flex relative w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-sm font-medium text-white">Active</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
              >
                <i className="mr-2 fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-white">
              <span>Version 1.0.0</span>
              <span>© 2024</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Profile dropdown section
  const renderProfileSection = () => (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center p-2 space-x-3 rounded-lg transition-colors hover:bg-gray-100 focus:outline-none"
      >
        <div className="flex justify-center items-center w-8 h-8 bg-blue-100 rounded-full">
          <FiUser className="text-blue-600" />
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-white">
            {user?.fullName || "Student"}
          </p>
          <p className="text-xs text-white">
            {user?.phoneNumber || "student@example.com"}
          </p>
        </div>
      </button>

      {/* Profile Dropdown Menu */}
      {showProfileMenu && (
        <div className="absolute right-0 z-50 mt-2 w-56 bg-white rounded-xl ring-1 ring-black ring-opacity-5 shadow-lg">
          {/* User Info Section */}
          <div className="p-4 border-b">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || "Student"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {user?.email || "student@example.com"}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {profileMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setShowProfileMenu(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                  item.className || "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Profile content section
  const renderProfileContent = () => (
    <div className="space-y-6">
      {/* Profile Header with Cover Image */}
      <div className="overflow-hidden relative bg-white rounded-xl shadow-sm">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col gap-4 items-center -mt-12 sm:flex-row">
            <div className="relative">
              <div className="p-1 w-24 h-24 bg-white rounded-full shadow-lg">
                <div className="flex justify-center items-center w-full h-full bg-blue-100 rounded-full">
                  <FiUser className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{studentInfo.name}</h2>
              <p className="text-gray-600">{studentInfo.class}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-colors hover:bg-blue-100">
                Edit Profile
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          { label: 'Projects', value: '12', icon: '🎯', color: 'blue' },
          { label: 'Publications', value: '5', icon: '📚', color: 'green' },
          { label: 'Patents', value: '3', icon: '📜', color: 'purple' },
          { label: 'Awards', value: '8', icon: '🏆', color: 'yellow' }
        ].map((stat, idx) => (
          <div key={idx} className="p-6 bg-white rounded-xl shadow-sm transition-all hover:shadow-md">
            <div className={`w-12 h-12 mb-4 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <h4 className="text-sm font-medium text-gray-500">{stat.label}</h4>
            <div className="flex gap-2 items-baseline mt-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm font-medium text-green-600">+2 this year</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="p-6 bg-white rounded-xl shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button className="flex gap-2 items-center text-blue-600 hover:text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { label: 'Full Name', value: studentInfo.name },
              { label: 'Roll Number', value: studentInfo.rollNo },
              { label: 'Email', value: studentInfo.email },
              { label: 'Phone', value: studentInfo.phone },
              { label: 'Class', value: studentInfo.class },
              { label: 'Division', value: studentInfo.division }
            ].map((field, idx) => (
              <div key={idx} className="space-y-2">
                <label className="text-sm font-medium text-gray-500">{field.label}</label>
                <p className="pb-2 text-gray-900 border-b border-gray-100">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Skills & Expertise</h3>
          <div className="space-y-4">
            {[
              { skill: 'Innovation Management', level: 85 },
              { skill: 'Research & Development', level: 75 },
              { skill: 'Patent Writing', level: 65 },
              { skill: 'Project Leadership', level: 90 }
            ].map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="overflow-hidden h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="p-6 bg-white rounded-xl shadow-sm lg:col-span-3">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Recent Activities</h3>
          <div className="space-y-6">
            {[
              { type: 'Project', title: 'AI Research Paper Published', date: '2 days ago', status: 'Completed' },
              { type: 'Patent', title: 'Filed New Patent Application', date: '1 week ago', status: 'Pending' },
              { type: 'Award', title: 'Won Innovation Challenge', date: '2 weeks ago', status: 'Achieved' }
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-lg transition-colors hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className="flex justify-center items-center w-10 h-10 bg-blue-50 rounded-full">
                    <span className="text-lg text-blue-600">
                      {activity.type === 'Project' ? '📝' : activity.type === 'Patent' ? '📜' : '🏆'}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  activity.status === 'Completed' ? 'bg-green-50 text-green-700' :
                  activity.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeaderboardContent = () => {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Student Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Student Leaderboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Top performing students based on innovation points
              </p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentLeaderboard.map((student, index) => (
                      <tr
                        key={student.id}
                        className={`${
                          index < 3 ? "bg-blue-50/50" : ""
                        } hover:bg-gray-50 transition-colors duration-200`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              index < 3
                                ? "font-semibold text-blue-600"
                                : "text-gray-900"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.points.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Institute Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Institute Leaderboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Top institutes based on innovation index
              </p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Institute Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Innovation Index
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {instituteLeaderboard.map((institute, index) => (
                      <tr
                        key={institute.id}
                        className={`${
                          index < 3 ? "bg-green-50/50" : ""
                        } hover:bg-gray-50 transition-colors duration-200`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              index < 3
                                ? "font-semibold text-green-600"
                                : "text-gray-900"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {institute.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {institute.innovationIndex.toFixed(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add this constant near the other state declarations at the top of the component
  const filterOptions = {
    innovationIndicator: [
      "Patent",
      "Research Paper",
      "Project",
      "Startup",
      "Competition",
      "Grant",
    ],
    domain: [
      "Computer Science",
      "Electronics",
      "Mechanical",
      "Civil",
      "Biotechnology",
      "Chemical",
      "Other",
    ],
    currentStatus: [
      "Pending",
      "In Progress",
      "Completed",
      "Approved",
      "Rejected",
    ],
  };

  const StatDetailsModal = ({ stat, onClose }) => {
    const getStatDetails = (type) => {
      switch (type) {
        case 'Patents':
          return [
            { title: 'AI-Based Healthcare System', status: 'Granted', date: '2024-02-15', ref: 'PAT2024-001', domain: 'Healthcare' },
            { title: 'Smart Agriculture Solution', status: 'Pending', date: '2024-01-20', ref: 'PAT2024-002', domain: 'Agriculture' },
            { title: 'IoT Security Framework', status: 'Filed', date: '2023-12-10', ref: 'PAT2023-045', domain: 'Cybersecurity' }
          ];
        case 'Research Papers':
          return [
            { title: 'Machine Learning in Healthcare', journal: 'International Journal of Innovation', status: 'Published', date: '2024-02-01', citations: '12' },
            { title: 'Blockchain Technology Impact', journal: 'Tech Innovation Review', status: 'Under Review', date: '2024-01-15' },
            { title: 'Sustainable Computing', journal: 'Green Technology Journal', status: 'Accepted', date: '2024-02-20' }
          ];
        case 'Startups Incubated':
          return [
            { title: 'EcoTech Solutions', sector: 'CleanTech', stage: 'Seed', funding: '₹10L', team: '5 members' },
            { title: 'HealthAI', sector: 'Healthcare', stage: 'Ideation', funding: 'Bootstrapped', team: '3 members' }
          ];
        case 'Awards Won':
          return [
            { title: 'Best Innovation Award', event: 'National Innovation Fair 2024', date: '2024-02-01', prize: '₹50,000' },
            { title: 'Young Innovator Award', event: 'State Science Congress', date: '2024-01-15', prize: '₹25,000' }
          ];
        default:
          return [];
      }
    };

    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex gap-3 items-center">
              <div className={`p-2 rounded-lg ${
                stat.label === 'Patents' ? 'bg-blue-50 text-blue-600' :
                stat.label === 'Research Papers' ? 'bg-purple-50 text-purple-600' :
                stat.label === 'Startups Incubated' ? 'bg-green-50 text-green-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-3">
              {getStatDetails(stat.label).map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <div className="mt-1 space-y-1">
                    {item.journal && (
                      <p className="text-sm text-gray-600">Journal: {item.journal}</p>
                    )}
                    {item.sector && (
                      <p className="text-sm text-gray-600">
                        Sector: {item.sector} • Team: {item.team}
                      </p>
                    )}
                    {item.event && (
                      <p className="text-sm text-gray-600">Event: {item.event}</p>
                    )}
                    {item.date && (
                      <p className="text-sm text-gray-500">Date: {item.date}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      {item.status && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'Granted' || item.status === 'Published' ? 
                          'bg-green-50 text-green-700' :
                          item.status === 'Pending' || item.status === 'Under Review' ? 
                          'bg-yellow-50 text-yellow-700' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {item.status}
                        </span>
                      )}
                      {(item.funding || item.prize) && (
                        <span className="text-sm font-medium text-blue-600">
                          {item.funding || item.prize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTestAnalysisContent = () => {
    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-4 justify-between items-start md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Innovation Assessment Analysis</h2>
              <p className="text-purple-100">Track your performance across different innovation parameters</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 text-purple-600 bg-white rounded-lg transition-all duration-200 hover:bg-purple-50">
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Take New Assessment
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overall Score</h3>
                <p className="text-sm text-gray-500">Last 6 months</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-50 rounded-full">
                +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">85.6</div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full w-[85.6%] bg-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Tests Completed */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Tests Completed</h3>
            <div className="mb-2 text-3xl font-bold text-gray-900">12</div>
            <p className="text-sm text-gray-500">Out of 15 available tests</p>
          </div>

          {/* Next Assessment */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Next Assessment</h3>
            <div className="mb-2 text-xl font-medium text-gray-900">Innovation Strategy</div>
            <p className="text-sm text-gray-500">Available in 2 days</p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Skills Breakdown */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Skills Breakdown</h3>
            <div className="space-y-4">
              {[
                { skill: 'Problem Solving', score: 92 },
                { skill: 'Critical Thinking', score: 88 },
                { skill: 'Innovation Design', score: 85 },
                { skill: 'Market Analysis', score: 78 },
                { skill: 'Technical Knowledge', score: 90 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                    <span className="text-sm text-gray-600">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Recent Assessments</h3>
            <div className="space-y-4">
              {[
                { title: 'Innovation Strategy', date: '2024-02-15', score: 88, status: 'Completed' },
                { title: 'Market Analysis', date: '2024-02-10', score: 92, status: 'Completed' },
                { title: 'Technical Assessment', date: '2024-02-05', score: 85, status: 'Completed' },
                { title: 'Design Thinking', date: 'Scheduled', status: 'Pending' }
              ].map((assessment, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">{assessment.title}</h4>
                    <p className="text-sm text-gray-500">{assessment.date}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    {assessment.score && (
                      <span className="text-lg font-semibold text-gray-900">{assessment.score}%</span>
                    )}
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      assessment.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {assessment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AboutModal = ({ onClose }) => {
    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">About Srujan</h3>
            <button 
              onClick={onClose}
              className="p-1 text-gray-400 transition-colors hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="max-w-none prose">
              <p className="mb-4">
                Welcome to Srujan - India's Premier Innovation Tracking Platform
              </p>
              
              Terms and Conditions and Privacy Policy for Importing Data

By clicking "Import Data" to access and import information from existing systems (including patents, research papers, project details, startup ideas, innovation concepts, and other intellectual property-related materials) into the Innovation Excellence Portal, you agree to the following terms and conditions:

Data Ownership and Access Rights
You acknowledge that all imported data, including patents, research papers, project details, startup ideas, and innovation concepts, remain the intellectual property of their respective owners. You confirm that you have the necessary rights and permissions to access and import this data into the Innovation Excellence Portal.

Use of Data
The data imported will be used solely within the Innovation Excellence Portal for purposes related to tracking, showcasing, and measuring innovation excellence. Unauthorized distribution, modification, or commercial use of this data is strictly prohibited.

Confidentiality and Security
You agree to maintain the confidentiality of all imported data. The platform will take appropriate measures to protect the data’s privacy and integrity, ensuring it is only used for the intended purposes. However, you acknowledge that the security of the imported data is ultimately your responsibility.

Prohibited Activities
By importing the data, you confirm that you will not misuse or share the data in any way that would violate intellectual property laws, ethical standards, or the rights of the original creators. Any violation of these terms may result in immediate suspension of access to the portal and legal action if necessary.

Privacy and Data Protection
The data imported will be handled in compliance with applicable privacy laws and regulations. Any personal or sensitive information will be processed in accordance with our Privacy Policy, and we will ensure that it is used only for the purposes of enhancing innovation excellence tracking and reporting.

Liability
You agree to assume full responsibility for the data you import and its use within the Innovation Excellence Portal. The portal administrators are not responsible for any legal issues, privacy violations, or unauthorized use of the data.

Agreement
By clicking "Import Data," you confirm that you have read, understood, and agree to comply with the terms and conditions outlined above. If you do not agree with these terms, you will not be able to proceed with the data import process.
            </div>
          </div>
        </div>
      </div>
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
                <span className="text-3xl">🎓</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  Srujan Portal
                </span>
                <p className="text-sm text-gray-300">
                  {user?.name || "Student"}
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

          {/* Bottom Section */}
          {/* <div className="p-6 bg-[#002449] border-t border-gray-200 ">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="flex relative w-3 h-3">
                  <span className="inline-flex absolute w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="inline-flex relative w-3 h-3 bg-green-500 rounded-full"></span>
                </span>
                <span className="text-sm font-medium text-white">
                  Active
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
              >
                <i className="mr-2 fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-white">
              <span>Version 1.0.0</span>
              <span>© 2024</span>
            </div>
          </div> */}
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
                {/* About Us Link */}
                <button
                  onClick={() => setShowAboutModal(true)}
                  className="text-sm text-white transition-colors hover:text-blue-200"
                >
                  Guidelines
                </button>

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
            {/* Render content based on active menu item */}
            {activeMenuItem === "dashboard" && renderDashboardContent()}
            {activeMenuItem === "profile" && renderProfileContent()}
            {activeMenuItem === "achievements" && renderAchievementsContent()}
            {activeMenuItem === "verification" && <VerificationComp />}
            {activeMenuItem === "team" && renderTeamContent()}
            {activeMenuItem === "test-analysis" && renderTestAnalysisContent()}
            {activeMenuItem === "communities" && renderLeaderboardContent()}
          </div>
        </main>
      </div>

      {/* Add this at the end of renderDashboardContent return statement */}
      {showStatModal && selectedStat && (
        <StatDetailsModal 
          stat={selectedStat} 
          onClose={() => {
            setSelectedStat(null);
            setShowStatModal(false);
          }} 
        />
      )}

      {showAboutModal && (
        <AboutModal onClose={() => setShowAboutModal(false)} />
      )}
    </div>
  );
};

export default StudentDashboard;
