import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingBag,
  Wand2,
  User,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Flag,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isAdmin?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
  activePage?: string;
}

const Sidebar = ({
  isAdmin = false,
  isCollapsed = false,
  onToggleCollapse = () => {},
  userName = "Jane Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  userRole = "User",
  activePage = "social",
}: SidebarProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const NavItem = ({
    icon: Icon,
    label,
    path,
    active = false,
    hasSubmenu = false,
    submenuOpen = false,
    onClick,
  }: {
    icon: React.ElementType;
    label: string;
    path?: string;
    active?: boolean;
    hasSubmenu?: boolean;
    submenuOpen?: boolean;
    onClick?: () => void;
  }) => {
    const content = (
      <div
        className={cn(
          "flex items-center py-3 px-3 rounded-md cursor-pointer transition-colors",
          active ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent",
          isCollapsed ? "justify-center" : "justify-between",
        )}
        onClick={onClick}
      >
        <div className="flex items-center">
          <Icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
          {!isCollapsed && <span>{label}</span>}
        </div>
        {!isCollapsed && hasSubmenu && (
          <div>
            {submenuOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              {path ? <Link to={path}>{content}</Link> : <div>{content}</div>}
            </TooltipTrigger>
            <TooltipContent side="right" className="font-normal">
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return path ? <Link to={path}>{content}</Link> : <div>{content}</div>;
  };

  const sidebarContent = (
    <div
      className={cn(
        "h-full flex flex-col bg-background border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header with logo */}
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <div className="font-bold text-xl">Social Commerce</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronDown />}
        </Button>
      </div>

      {/* User profile section */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <Avatar className={isCollapsed ? "h-8 w-8" : "h-10 w-10"}>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-medium text-sm">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          <NavItem
            icon={Home}
            label="Dashboard"
            path="dashboard"
            active={activePage === "dashboard"}
          />
          <NavItem
            icon={Users}
            label="Social Feed"
            path="social"
            active={activePage === "social"}
          />
          <NavItem
            icon={ShoppingBag}
            label="Marketplace"
            path="marketplace"
            active={activePage === "marketplace"}
          />
          <NavItem
            icon={Wand2}
            label="AI Tools"
            path="ai-tools"
            active={activePage === "ai-tools"}
          />
          <NavItem
            icon={User}
            label="Profile"
            path="profile"
            active={activePage === "profile"}
          />
          <NavItem
            icon={MessageSquare}
            label="Messages"
            path="messages"
            active={activePage === "messages"}
          />

          {/* Admin section */}
          {isAdmin && (
            <>
              <div
                className={cn(
                  "mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground",
                  isCollapsed && "text-center",
                )}
              >
                {!isCollapsed ? "ADMIN" : "---"}
              </div>

              <Collapsible
                open={openSubmenu === "admin"}
                onOpenChange={() => toggleSubmenu("admin")}
              >
                <CollapsibleTrigger asChild>
                  <div>
                    <NavItem
                      icon={Settings}
                      label="Admin Panel"
                      hasSubmenu={!isCollapsed}
                      submenuOpen={openSubmenu === "admin"}
                      active={activePage.startsWith("admin")}
                    />
                  </div>
                </CollapsibleTrigger>
                {!isCollapsed && (
                  <CollapsibleContent className="pl-8 space-y-1">
                    <NavItem
                      icon={BarChart3}
                      label="Content Moderation"
                      path="admin/content"
                      active={activePage === "admin-content"}
                    />
                    <NavItem
                      icon={Users}
                      label="User Management"
                      path="admin/users"
                      active={activePage === "admin-users"}
                    />
                    <NavItem
                      icon={Flag}
                      label="Reports"
                      path="admin/reports"
                      active={activePage === "admin-reports"}
                    />
                    <NavItem
                      icon={Settings}
                      label="Settings"
                      path="admin/settings"
                      active={activePage === "admin-settings"}
                    />
                  </CollapsibleContent>
                )}
              </Collapsible>
            </>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t mt-auto">
        <NavItem icon={LogOut} label="Logout" path="/" />
      </div>
    </div>
  );

  // Mobile menu button (only visible on small screens)
  const mobileMenuButton = (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMobileMenu}
        className="rounded-full"
      >
        {mobileMenuOpen ? <X /> : <Menu />}
      </Button>
    </div>
  );

  return (
    <>
      {mobileMenuButton}

      {/* Desktop sidebar */}
      <div className="hidden lg:block h-full">{sidebarContent}</div>

      {/* Mobile sidebar (overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 z-50 w-64 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
          <div className="fixed inset-0 z-30" onClick={toggleMobileMenu} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
