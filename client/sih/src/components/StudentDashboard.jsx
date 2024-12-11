import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isLoading, setIsLoading] = useState(true);
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

  // Sidebar menu items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "achievements", label: "Excellence metrics", icon: "🏆" },
    { id: "verification", label: "Verification", icon: "✓" },
    { id: "team", label: "Team", icon: "👥" },
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
        setIsLoading(true);
        setError(null);

        // Create query string from filters
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        const response = await fetch(
          `https://sih-2024-e9z6.onrender.com/api/achievements?${queryParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched achievements:", data);
        setAchievements(data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderDashboardContent = () => {
    return (
      <div className="space-y-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-sm shadow-custom hover:shadow-custom-hover transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-2xl font-bold text-gray-900">
                  {stat.count}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-600">
                {stat.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white rounded-sm shadow-custom hover:shadow-custom-hover transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">📝</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Project Submission
                </p>
                <p className="text-sm text-gray-500">
                  Submitted final project report
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">🏆</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Achievement Unlocked
                </p>
                <p className="text-sm text-gray-500">
                  Earned Innovation Champion badge
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="p-6 bg-white rounded-sm shadow-custom hover:shadow-custom-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Personalized Recommendations
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Opportunities matching your profile and interests
              </p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Research Papers */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">📚</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Research Papers
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Call for papers in International Journal of AI & ML
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Deadline: 15 Mar 2024
                </span>
                <button className="px-3 py-1 text-sm text-blue-600 bg-white rounded-lg hover:bg-blue-50">
                  Learn More
                </button>
              </div>
            </div>

            {/* Certifications & Grants */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🎓</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Certification
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                AWS Cloud Practitioner Certification Program
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  100% Scholarship Available
                </span>
                <button className="px-3 py-1 text-sm text-green-600 bg-white rounded-lg hover:bg-green-50">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Startups */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Startup Program
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Campus Startup Challenge 2024
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Prize Pool: ₹10L</span>
                <button className="px-3 py-1 text-sm text-purple-600 bg-white rounded-lg hover:bg-purple-50">
                  Register
                </button>
              </div>
            </div>

            {/* Awards */}
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🏆</span>
                <h3 className="text-lg font-semibold text-gray-900">Awards</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Young Innovator Award 2024
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Nominations Open</span>
                <button className="px-3 py-1 text-sm text-yellow-600 bg-white rounded-lg hover:bg-yellow-50">
                  Nominate
                </button>
              </div>
            </div>

            {/* Hackathons */}
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💻</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Hackathon
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                National AI/ML Hackathon
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Starts: 1 Apr 2024
                </span>
                <button className="px-3 py-1 text-sm text-red-600 bg-white rounded-lg hover:bg-red-50">
                  Join Team
                </button>
              </div>
            </div>

            {/* Grants */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💰</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Research Grant
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Student Innovation Research Grant
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Grant: ₹5L</span>
                <button className="px-3 py-1 text-sm text-indigo-600 bg-white rounded-lg hover:bg-indigo-50">
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Achievements section
  const renderAchievementsContent = () => {
    if (isLoading) {
      return (
        <div className="p-8 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    // Add these filter options
    const filterOptions = {
      innovationIndicator: ["Patent", "Research Paper", "Project", "Startup"],
      domain: ["AI/ML", "Web Development", "IoT", "Blockchain", "Other"],
      currentStatus: ["Pending", "Approved", "Rejected", "In Progress"],
    };

    return (
      <div className="p-8 bg-white rounded-xl shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
          <p className="mt-1 text-gray-600">
            Track your innovation and research accomplishments
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Innovation Indicator Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <div className="text-center py-12">
            <p className="text-gray-500">No achievements found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Sr. No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Innovation Indicator
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Founder
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Publisher Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Mentor Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Domain
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Platform Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Document
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Current Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {achievements.map((achievement, index) => (
                  <tr
                    key={achievement._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                          className="w-4 h-4 mr-1"
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
    );
  };

  const renderTeamContent = () => {
    return (
      <div className="p-8 bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hosting Team</h2>
            <p className="mt-1 text-gray-600">Manage your project teams</p>
          </div>
          <button
            onClick={() => setShowTeamForm(!showTeamForm)}
            className={`px-6 py-2.5 rounded-lg transition-all duration-300 ${
              showTeamForm
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            {showTeamForm ? (
              <span className="flex items-center">
                <i className="mr-2 fas fa-times"></i>
                Cancel
              </span>
            ) : (
              <span className="flex items-center">
                <i className="mr-2 fas fa-plus"></i>
                Create Team
              </span>
            )}
          </button>
        </div>

        {/* Team Creation Form */}
        {showTeamForm && (
          <form
            onSubmit={handleTeamSubmit}
            className="p-6 mb-8 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter team name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <input
                  type="text"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter project type"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Team Description
              </label>
              <textarea
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                rows="3"
                className="px-4 py-3 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your team's purpose and goals"
                required
              />
            </div>

            {/* Mentor Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mentor Assignment
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <select
                    value={mentorType}
                    onChange={(e) => setMentorType(e.target.value)}
                    className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="assign">Assign Mentor</option>
                    <option value="request">Request Mentor</option>
                  </select>
                </div>

                {mentorType === "assign" && (
                  <div className="flex-1">
                    <input
                      type="text"
                      value={mentorName}
                      onChange={(e) => setMentorName(e.target.value)}
                      placeholder="Enter mentor name"
                      className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Team Members
              </label>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={member}
                      onChange={(e) =>
                        handleMemberChange(index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter member name"
                      required
                    />
                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="p-2 text-red-600 transition-colors duration-200 hover:text-red-800"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddMember}
                className="mt-3 text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                <i className="mr-2 fas fa-plus"></i>
                Add Member
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowTeamForm(false)}
                className="px-6 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Create Team
              </button>
            </div>
          </form>
        )}

        {/* Teams List */}
        <div className="space-y-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-6 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {team.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {team.projectType}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    title="Delete Team"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="mb-4 text-gray-700">{team.description}</p>

              {/* Mentor Status */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Mentor Status
                </h4>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      team.mentorType === "assign"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {team.mentorType === "assign"
                      ? `Mentor: ${team.mentor}`
                      : "Mentor: Not Assigned (Requested)"}
                  </span>
                </div>
              </div>

              {/* Existing team members section */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Team Members
                </h4>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm text-gray-700 bg-white rounded-full border border-gray-200"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {teams.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-gray-400">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No teams created
              </h3>
              <p className="text-gray-500">Start by creating your first team</p>
            </div>
          )}
        </div>
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
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 border-b">
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center space-x-2">
                <IoNotifications className="text-blue-600 text-xl" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Notifications
                </h3>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Mark all as read
              </button>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                  notification.unread ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      notification.unread ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-sm ${
                        notification.unread
                          ? "text-gray-900 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="py-2 border-t">
            <div className="px-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all notifications
              </button>
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
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none "
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <FiUser className="text-blue-600" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">
            {user?.fullName || "Student"}
          </p>
          <p className="text-xs text-white  ">
            {user?.phoneNumber || "student@example.com"}
          </p>
        </div>
      </button>

      {/* Profile Dropdown Menu */}
      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {/* User Info Section */}
          <div className="p-4 border-b">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || "Student"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
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
      {/* Profile Header */}
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.name || "Student Name"}
            </h2>
            <p className="text-gray-600">
              {user?.email || "student@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.rollNo}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.class}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Division
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.division}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent's Phone
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.parentPhone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <p className="mt-1 text-gray-900">{studentInfo.address}</p>
          </div>
        </div>
      </div>

      {/* Academic Progress */}
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Academic Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-700">Projects</h4>
            <p className="mt-2 text-2xl font-bold text-blue-900">12</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-medium text-green-700">Achievements</h4>
            <p className="mt-2 text-2xl font-bold text-green-900">8</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="text-sm font-medium text-purple-700">
              Certifications
            </h4>
            <p className="mt-2 text-2xl font-bold text-purple-900">5</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeaderboardContent = () => {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Institute Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            {activeMenuItem === "verification" && (
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                  Request Verification
                </h2>
                {/* Verification content */}
              </div>
            )}
            {activeMenuItem === "team" && renderTeamContent()}
            {activeMenuItem === "communities" && renderLeaderboardContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
