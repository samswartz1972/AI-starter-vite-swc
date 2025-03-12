import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Info,
  ShoppingBag,
  Wand2,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PreviewModeOverlayProps {
  isActive?: boolean;
  onClose?: () => void;
  onPurchase?: () => void;
  limitedFeatures?: {
    name: string;
    description: string;
    icon: React.ReactNode;
    limitation: string;
  }[];
  timeRemaining?: number; // in minutes
}

const PreviewModeOverlay: React.FC<PreviewModeOverlayProps> = ({
  isActive = true,
  onClose = () => {},
  onPurchase = () => {},
  limitedFeatures = [
    {
      name: "Marketplace",
      description: "Browse products but cannot purchase or list items",
      icon: <ShoppingBag className="h-5 w-5" />,
      limitation: "View-only access",
    },
    {
      name: "AI Tools",
      description: "Limited to 3 generations per day",
      icon: <Wand2 className="h-5 w-5" />,
      limitation: "3/day limit",
    },
    {
      name: "Social Features",
      description: "Can view content but limited interaction",
      icon: <Users className="h-5 w-5" />,
      limitation: "Limited engagement",
    },
  ],
  timeRemaining = 30,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  if (!isActive) return null;

  return (
    <>
      {/* Fixed banner at the top */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground z-50 py-2 px-4 flex justify-between items-center shadow-md"
      >
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="font-medium">Preview Mode Active</span>
          <Badge
            variant="secondary"
            className="ml-2 bg-primary-foreground/20 text-primary-foreground"
          >
            {timeRemaining} min remaining
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View preview limitations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button size="sm" onClick={onPurchase}>
            Purchase Full Access
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Feature limitations panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[52px] left-0 right-0 bg-background border-b z-40 py-4 px-6 shadow-md"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Preview Mode Limitations
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {limitedFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-muted/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <Badge variant="outline" className="mt-1">
                          {feature.limitation}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    setShowDetails(false);
                    setShowDialog(true);
                  }}
                >
                  Purchase Full Access
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Full Access</DialogTitle>
            <DialogDescription>
              Remove all limitations and get full access to all platform
              features.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border p-4 mb-4">
              <h4 className="font-medium mb-2">What's included:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Unlimited AI image and video generation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>
                    Full marketplace functionality with selling capabilities
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>
                    Complete social features with unlimited engagement
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Admin dashboard and analytics</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Platform License</p>
                <p className="text-sm text-muted-foreground">
                  One-time purchase, lifetime access
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">$299</p>
                <p className="text-sm text-muted-foreground">USD</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={onPurchase}>Proceed to Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Semi-transparent overlay for the entire page */}
      <div className="fixed inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none z-10"></div>

      {/* Floating indicator at the bottom */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background border shadow-lg rounded-full py-2 px-6 z-20"
      >
        <div className="flex items-center gap-2">
          <span className="animate-pulse relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm font-medium">
            Preview Mode: Some features are limited
          </span>
          <Button
            variant="link"
            size="sm"
            className="text-xs"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default PreviewModeOverlay;
