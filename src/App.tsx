import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard/Dashboard";
import Marketplace from "./components/marketplace/Marketplace";
import AuctionListing from "./components/marketplace/AuctionListing";
import AIChatbot from "./components/ai/AIChatbot";
import DownloadPage from "./components/download/DownloadPage";
import AITools from "./components/ai/AITools";
import UserProfile from "./components/profile/UserProfile";
import MessageCenter from "./components/messages/MessageCenter";
import AdminPanel from "./components/admin/AdminPanel";
import AdminLogin from "./components/admin/AdminLogin";
import SocialFeed from "./components/social/SocialFeed";
import AboutUs from "./components/pages/AboutUs";
import Careers from "./components/pages/Careers";
import Blog from "./components/pages/Blog";
import Contact from "./components/pages/Contact";
import TermsOfService from "./components/pages/TermsOfService";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import CookiePolicy from "./components/pages/CookiePolicy";
import AIModelInfo from "./components/ai/AIModelInfo";
import { useApp } from "./context/AppContext";
import { initDatabase } from "./lib/db";
import { useEffect } from "react";

function App() {
  const { isPreviewMode, setIsDbInitialized } = useApp();

  // Initialize the database when the app loads
  useEffect(() => {
    const init = async () => {
      const success = await initDatabase();
      setIsDbInitialized(success);
    };
    init();
  }, [setIsDbInitialized]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="dashboard"
          element={<Dashboard isPreviewMode={isPreviewMode} />}
        />
        <Route
          path="marketplace"
          element={<Marketplace isPreviewMode={isPreviewMode} />}
        />
        <Route
          path="auctions"
          element={<AuctionListing isPreviewMode={isPreviewMode} />}
        />
        <Route path="chatbot" element={<AIChatbot />} />
        <Route path="download" element={<DownloadPage />} />
        <Route
          path="ai-tools"
          element={<AITools isPreviewMode={isPreviewMode} />}
        />
        <Route path="ai-models" element={<AIModelInfo />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="messages" element={<MessageCenter />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="social" element={<SocialFeed />} />

        {/* Company Pages */}
        <Route path="about-us" element={<AboutUs />} />
        <Route path="careers" element={<Careers />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />

        {/* Legal Pages */}
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="cookie-policy" element={<CookiePolicy />} />

        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
