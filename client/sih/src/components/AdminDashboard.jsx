import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaChartBar, FaHandHoldingUsd, FaFileAlt, FaCertificate } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Innovation parameters data (Sample monthly data for India - 2023)
  const innovationData = {
    datasets: [
      {
        label: 'Research Papers',
        data: [
          { x: 1, y: 1250 }, // January
          { x: 2, y: 1400 }, // February
          { x: 3, y: 1320 }, // March
          { x: 4, y: 1500 }, // April
          { x: 5, y: 1600 }, // May
          { x: 6, y: 1450 }, // June
          { x: 7, y: 1550 }, // July
          { x: 8, y: 1700 }, // August
          { x: 9, y: 1800 }, // September
          { x: 10, y: 1650 }, // October
          { x: 11, y: 1900 }, // November
          { x: 12, y: 2000 }, // December
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Patents Filed',
        data: [
          { x: 1, y: 450 },
          { x: 2, y: 480 },
          { x: 3, y: 520 },
          { x: 4, y: 490 },
          { x: 5, y: 550 },
          { x: 6, y: 600 },
          { x: 7, y: 580 },
          { x: 8, y: 620 },
          { x: 9, y: 670 },
          { x: 10, y: 700 },
          { x: 11, y: 750 },
          { x: 12, y: 800 },
        ],
        backgroundColor: 'rgba(53, 162, 235, 0.6)',
      },
      {
        label: 'Startups Registered',
        data: [
          { x: 1, y: 300 },
          { x: 2, y: 320 },
          { x: 3, y: 340 },
          { x: 4, y: 360 },
          { x: 5, y: 380 },
          { x: 6, y: 400 },
          { x: 7, y: 420 },
          { x: 8, y: 440 },
          { x: 9, y: 460 },
          { x: 10, y: 480 },
          { x: 11, y: 500 },
          { x: 12, y: 520 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Grants Received (in lakhs)',
        data: [
          { x: 1, y: 2000 },
          { x: 2, y: 2200 },
          { x: 3, y: 2400 },
          { x: 4, y: 2600 },
          { x: 5, y: 2800 },
          { x: 6, y: 3000 },
          { x: 7, y: 3200 },
          { x: 8, y: 3400 },
          { x: 9, y: 3600 },
          { x: 10, y: 3800 },
          { x: 11, y: 4000 },
          { x: 12, y: 4200 },
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Awards Received',
        data: [
          { x: 1, y: 50 },
          { x: 2, y: 45 },
          { x: 3, y: 60 },
          { x: 4, y: 55 },
          { x: 5, y: 70 },
          { x: 6, y: 65 },
          { x: 7, y: 75 },
          { x: 8, y: 80 },
          { x: 9, y: 85 },
          { x: 10, y: 90 },
          { x: 11, y: 95 },
          { x: 12, y: 100 },
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Incubators',
        data: [
          { x: 1, y: 120 },
          { x: 2, y: 125 },
          { x: 3, y: 130 },
          { x: 4, y: 135 },
          { x: 5, y: 140 },
          { x: 6, y: 145 },
          { x: 7, y: 150 },
          { x: 8, y: 155 },
          { x: 9, y: 160 },
          { x: 10, y: 165 },
          { x: 11, y: 170 },
          { x: 12, y: 175 },
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Indian Innovation Parameters - Monthly Data (2023)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${label}: ${context.parsed.y} (${month[context.parsed.x - 1]})`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        ticks: {
          callback: function(value) {
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return month[value - 1];
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true
      }
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const navItems = [
    { 
      icon: <FaHome className="w-5 h-5" />, 
      text: "Dashboard", 
      path: "/admin/dashboard" 
    },
    { 
      icon: <FaChartBar className="w-5 h-5" />, 
      text: "Monitoring", 
      path: "/admin/monitoring" 
    },
    { 
      icon: <FaHandHoldingUsd className="w-5 h-5" />, 
      text: "Financial Aid", 
      path: "/admin/financial-aid" 
    },
    { 
      icon: <FaFileAlt className="w-5 h-5" />, 
      text: "Reports", 
      path: "/admin/reports" 
    },
    { 
      icon: <FaCertificate className="w-5 h-5" />, 
      text: "Generation", 
      path: "/admin/generation" 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center h-16 bg-blue-600">
            <Link to="/admin" className="text-xl font-bold text-white">
              Admin Panel
            </Link>
          </div>

          <div className="flex overflow-y-auto flex-col flex-1">
            <nav className="flex-1 px-2 py-4 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {item.icon}
                  <span className="ml-3">{item.text}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex overflow-hidden flex-col flex-1">
        {/* Navbar */}
        <header className="bg-white shadow-md">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none lg:hidden"
              >
                {isSidebarOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">Administrator Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <IoMdNotifications className="w-6 h-6" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <div className="flex justify-center items-center w-8 h-8 bg-blue-500 rounded-full">
                    <span className="text-sm text-white">{user?.fullName?.[0] ?? "A"}</span>
                  </div>
                  <span className="hidden md:block">{user?.fullName ?? "Admin"}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="overflow-y-auto overflow-x-hidden flex-1 p-6 bg-gray-100">
          <div className="mx-auto max-w-7xl">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Innovation Parameters Analysis</h2>
              <div className="h-[600px]"> {/* Fixed height for better visualization */}
                <Scatter data={innovationData} options={chartOptions} />
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {innovationData.datasets.map((dataset, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-700">{dataset.label}</h3>
                  <p className="mt-2 text-2xl font-bold">
                    {dataset.data[dataset.data.length - 1].y}
                  </p>
                  <p className="text-sm text-gray-500">Latest Count (December)</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
