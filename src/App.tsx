import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard/Dashboard";
import AuctionListing from "./components/marketplace/AuctionListing";
import AIChatbot from "./components/ai/AIChatbot";
import DownloadPage from "./components/download/DownloadPage";
import AITools from "./components/ai/AITools";
import UserProfile from "./components/profile/UserProfile";
import MessageCenter from "./components/messages/MessageCenter";
import AdminPanel from "./components/admin/AdminPanel";
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
          path="/dashboard"
          element={<Dashboard isPreviewMode={isPreviewMode} />}
        />
        <Route
          path="/auctions"
          element={<AuctionListing isPreviewMode={isPreviewMode} />}
        />
        <Route path="/chatbot" element={<AIChatbot />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route
          path="/ai-tools"
          element={<AITools isPreviewMode={isPreviewMode} />}
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/messages" element={<MessageCenter />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
