import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  LogIn,
  ShoppingBag,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  isLoggedIn?: boolean;
  isPreviewMode?: boolean;
  togglePreviewMode?: () => void;
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onSignUp?: () => void;
}

const Header = ({
  isLoggedIn = false,
  isPreviewMode = false,
  togglePreviewMode = () => {},
  userName = "Jane Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  onLogin = () => {},
  onSignUp = () => {},
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    setAuthDialogOpen(false);
    onLogin();
  };

  const handleSignUp = () => {
    setAuthDialogOpen(false);
    onSignUp();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">SocialCommerce</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/social" className="text-sm font-medium hover:text-primary">
            Social Feed
          </Link>
          <Link
            to="/marketplace"
            className="text-sm font-medium hover:text-primary"
          >
            Marketplace
          </Link>
          <Link
            to="/ai-tools"
            className="text-sm font-medium hover:text-primary"
          >
            AI Tools
          </Link>
        </nav>

        {/* Preview Mode Toggle */}
        {isPreviewMode && (
          <div className="hidden md:flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
            Preview Mode
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePreviewMode}
              className="ml-2 h-6 px-2"
            >
              Exit
            </Button>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Alex Johnson</span>{" "}
                            liked your post
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 minutes ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=emma" />
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Emma Wilson</span>{" "}
                            commented on your post
                          </p>
                          <p className="text-xs text-muted-foreground">
                            15 minutes ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ShoppingBag className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm">Your order has been shipped</p>
                          <p className="text-xs text-muted-foreground">
                            1 hour ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 p-0"
                  >
                    <Avatar>
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>
                        {userName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center gap-2 p-2 border-b">
                    <Avatar>
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>
                        {userName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">
                        @{userName.toLowerCase().replace(" ", "")}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/ai-tools" className="cursor-pointer">
                      <Wand2 className="mr-2 h-4 w-4" />
                      AI Tools
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Auth Dialog Trigger */}
              <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="hidden md:flex"
                  >
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="flex flex-col space-y-4 py-4">
                    <h2 className="text-xl font-bold text-center">
                      Welcome to SocialCommerce
                    </h2>
                    <p className="text-center text-muted-foreground">
                      Sign in to access all features
                    </p>
                    <div className="grid gap-3 mt-4">
                      <Button onClick={handleLogin} className="w-full">
                        Login
                      </Button>
                      <Button
                        onClick={handleSignUp}
                        variant="outline"
                        className="w-full"
                      >
                        Create Account
                      </Button>
                      <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Google
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Try Preview Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={togglePreviewMode}
                className="hidden md:flex"
              >
                Try Preview
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 space-y-1 border-b">
            <Link
              to="/social"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Social Feed
            </Link>
            <Link
              to="/marketplace"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Marketplace
            </Link>
            <Link
              to="/ai-tools"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              AI Tools
            </Link>
          </div>
          {!isLoggedIn && (
            <div className="px-4 py-3 border-t flex flex-col space-y-2">
              <Button
                onClick={() => {
                  setAuthDialogOpen(true);
                  toggleMobileMenu();
                }}
              >
                Sign In
              </Button>
              <Button variant="outline" onClick={togglePreviewMode}>
                Try Preview
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Preview Mode Banner (Mobile) */}
      {isPreviewMode && (
        <div className="md:hidden bg-yellow-100 text-yellow-800 p-2 text-center text-sm">
          Preview Mode
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePreviewMode}
            className="ml-2 h-6 px-2"
          >
            Exit
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
