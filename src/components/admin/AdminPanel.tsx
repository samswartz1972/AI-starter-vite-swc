import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminSettings from "./AdminSettings";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      navigate("/admin-login");
    } else {
      setAdminUser(JSON.parse(adminSession));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    navigate("/");
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <span className="text-sm text-gray-500">
              Welcome, {adminUser.name}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex">
        {/* Sidebar */}
        <aside className="w-64 mr-8">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md ${activeTab === "dashboard" ? "bg-primary text-white" : "hover:bg-gray-100"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md ${activeTab === "users" ? "bg-primary text-white" : "hover:bg-gray-100"}`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md ${activeTab === "content" ? "bg-primary text-white" : "hover:bg-gray-100"}`}
            >
              Content Moderation
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md ${activeTab === "settings" ? "bg-primary text-white" : "hover:bg-gray-100"}`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md ${activeTab === "analytics" ? "bg-primary text-white" : "hover:bg-gray-100"}`}
            >
              Analytics
            </button>
          </nav>

          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">
              Admin Instructions
            </h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
              <li>
                Use the Settings tab to configure pricing plans and payment
                gateways
              </li>
              <li>Manage users and their subscription plans</li>
              <li>Add premium templates for Pro and Lifetime users</li>
              <li>View analytics and platform performance</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow">
          {activeTab === "dashboard" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="text-green-800 font-medium mb-1">
                    Total Users
                  </h3>
                  <p className="text-3xl font-bold text-green-900">1,245</p>
                  <p className="text-sm text-green-700 mt-1">
                    +12% from last month
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-blue-800 font-medium mb-1">Revenue</h3>
                  <p className="text-3xl font-bold text-blue-900">$24,500</p>
                  <p className="text-sm text-blue-700 mt-1">
                    +8% from last month
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-md">
                  <h3 className="text-purple-800 font-medium mb-1">
                    AI Generations
                  </h3>
                  <p className="text-3xl font-bold text-purple-900">45,678</p>
                  <p className="text-sm text-purple-700 mt-1">
                    +32% from last month
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">New user registered</p>
                      <p className="text-sm text-gray-500">
                        John Doe (john@example.com)
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">2 minutes ago</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">Subscription upgraded</p>
                      <p className="text-sm text-gray-500">
                        Alice Johnson upgraded to Pro
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-sm text-gray-500">
                        $24.99 from Bob Williams
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && <AdminSettings />}

          {activeTab === "users" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              <p>
                This section allows you to manage users, edit their plans, and
                more.
              </p>
            </div>
          )}

          {activeTab === "content" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Content Moderation</h2>
              <p>Review and moderate user-generated content here.</p>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              <p>View detailed platform analytics and reports.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
