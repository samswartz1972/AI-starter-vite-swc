import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";

interface DashboardProps {
  isAdmin?: boolean;
  isPreviewMode?: boolean;
  defaultActiveTab?: string;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
}

const Dashboard = ({
  isAdmin = false,
  isPreviewMode = false,
  defaultActiveTab = "social",
  userName = "Jane Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  userRole = "User",
}: DashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isAdmin={isAdmin}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        userName={userName}
        userAvatar={userAvatar}
        userRole={userRole}
        activePage={activeTab}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-0 lg:ml-64"}`}
      >
        <ContentArea
          activeTab={activeTab}
          isAdmin={isAdmin}
          isPreviewMode={isPreviewMode}
        />
      </div>

      {/* Preview Mode Indicator */}
      {isPreviewMode && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50">
          Preview Mode
        </div>
      )}
    </div>
  );
};

export default Dashboard;
