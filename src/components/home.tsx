import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Header from "./layout/Header";
import HeroSection from "./landing/HeroSection";
import FeatureShowcase from "./landing/FeatureShowcase";
import AuthModal from "./auth/AuthModal";
import PreviewModeOverlay from "./preview/PreviewModeOverlay";
import Dashboard from "./dashboard/Dashboard";
import { useApp } from "@/context/AppContext";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { isPreviewMode, togglePreviewMode } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const handleLogin = async (username: string, password: string) => {
    // For demo purposes, we'll provide hardcoded logins
    if (
      (username === "admin" && password === "admin123") ||
      (username === "admin@example.com" && password === "admin123") ||
      (username === "user" && password === "password123") ||
      (username === "user@example.com" && password === "password123")
    ) {
      const isAdmin = username === "admin" || username === "admin@example.com";
      setIsLoggedIn(true);
      setUser({
        name: isAdmin ? "Admin User" : "Jane Smith",
        role: isAdmin ? "admin" : "user",
        avatar: isAdmin
          ? "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          : "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      });
      setShowAuthModal(false);
      return true;
    }
    alert("Login failed. Try admin/admin123 or user@example.com/password123");
    return false;
  };

  const handleSignUp = async (userData: any) => {
    // For demo purposes, we'll just log them in
    setIsLoggedIn(true);
    setUser({
      name: userData.name,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
    });
    setShowAuthModal(false);
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const openLoginModal = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const openSignUpModal = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  // If user is logged in or in preview mode, show dashboard
  if (isLoggedIn || isPreviewMode) {
    return (
      <div className="min-h-screen bg-background">
        {isPreviewMode && (
          <PreviewModeOverlay
            isActive={isPreviewMode}
            onClose={togglePreviewMode}
            onPurchase={() => {
              togglePreviewMode();
              openSignUpModal();
            }}
          />
        )}
        <Dashboard
          isPreviewMode={isPreviewMode}
          isAdmin={user?.role === "admin"}
          defaultActiveTab="social"
          userName={user?.name || "Guest User"}
          userAvatar={
            user?.avatar ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"
          }
          userRole={user?.role || "Guest"}
        />
      </div>
    );
  }

  // Otherwise show landing page
  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        isPreviewMode={isPreviewMode}
        togglePreviewMode={togglePreviewMode}
        onLogin={openLoginModal}
        onSignUp={openSignUpModal}
        userName={user?.name}
        userAvatar={user?.avatar}
      />

      <main>
        <HeroSection
          onSignUp={openSignUpModal}
          onLogin={openLoginModal}
          onPreview={togglePreviewMode}
        />

        <FeatureShowcase />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join our platform today and experience the future of social
                commerce with integrated AI tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openSignUpModal}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium"
                >
                  Create Free Account
                </button>
                <button
                  onClick={togglePreviewMode}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-medium"
                >
                  Try Preview Mode
                </button>
                <Link to="admin-login">
                  <button className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-3 rounded-md font-medium mt-4 sm:mt-0 sm:ml-4">
                    Admin Login
                  </button>
                </Link>
                <Link to="download">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-md font-medium mt-4 sm:mt-0 sm:ml-4">
                    Download Platform
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SocialCommerce</h3>
              <p className="text-gray-400">
                A comprehensive social platform that combines social networking,
                content sharing, and e-commerce with integrated AI capabilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="social" className="text-gray-400 hover:text-white">
                    Social Feed
                  </Link>
                </li>
                <li>
                  <Link
                    to="marketplace"
                    className="text-gray-400 hover:text-white"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="ai-tools"
                    className="text-gray-400 hover:text-white"
                  >
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link
                    to="messages"
                    className="text-gray-400 hover:text-white"
                  >
                    Messaging
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="about-us"
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="terms-of-service"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="privacy-policy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="cookie-policy"
                    className="text-gray-400 hover:text-white"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} SocialCommerce. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </div>
  );
};

export default Home;
