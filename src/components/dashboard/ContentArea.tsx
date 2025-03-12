import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Import all the content components
import SocialFeed from "@/components/social/SocialFeed";
import Marketplace from "@/components/marketplace/Marketplace";
import AITools from "@/components/ai/AITools";
import UserProfile from "@/components/profile/UserProfile";
import MessageCenter from "@/components/messages/MessageCenter";
import AdminPanel from "@/components/admin/AdminPanel";

interface ContentAreaProps {
  activeTab?: string;
  isAdmin?: boolean;
  isPreviewMode?: boolean;
}

const ContentArea = ({
  activeTab = "social",
  isAdmin = false,
  isPreviewMode = false,
}: ContentAreaProps) => {
  // State to track the active tab
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Update current tab when activeTab prop changes
  React.useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <div className="w-full h-full bg-gray-50 overflow-auto">
      <Tabs value={currentTab} className="w-full h-full">
        {/* Social Feed */}
        <TabsContent value="social" className="w-full h-full m-0 p-0">
          <SocialFeed />
        </TabsContent>

        {/* Marketplace */}
        <TabsContent value="marketplace" className="w-full h-full m-0 p-0">
          <Marketplace isPreviewMode={isPreviewMode} />
        </TabsContent>

        {/* AI Tools */}
        <TabsContent value="ai" className="w-full h-full m-0 p-0">
          <AITools isPreviewMode={isPreviewMode} />
        </TabsContent>

        {/* User Profile */}
        <TabsContent value="profile" className="w-full h-full m-0 p-0">
          <UserProfile />
        </TabsContent>

        {/* Messages */}
        <TabsContent value="messages" className="w-full h-full m-0 p-0">
          <MessageCenter />
        </TabsContent>

        {/* Admin Panel - only shown for admin users */}
        {isAdmin && (
          <TabsContent value="admin" className="w-full h-full m-0 p-0">
            <AdminPanel />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ContentArea;
