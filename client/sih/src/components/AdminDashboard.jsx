import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Administrator Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
            {/* User Management Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">User Management</h2>
              <div className="space-y-4">
                <button className="px-4 py-2 w-full text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Add New User
                </button>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium">User Statistics</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">Students: 0</p>
                    <p className="text-sm text-gray-600">Faculty: 0</p>
                    <p className="text-sm text-gray-600">Administrators: 1</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Analytics Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">System Analytics</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium">Overview</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">Total Projects: 0</p>
                    <p className="text-sm text-gray-600">Active Users: 0</p>
                    <p className="text-sm text-gray-600">System Usage: 0%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">System Settings</h2>
              <div className="space-y-4">
                <button className="px-4 py-2 w-full text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Manage Settings
                </button>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium">System Status</h3>
                  <p className="text-sm text-green-600">All systems operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 