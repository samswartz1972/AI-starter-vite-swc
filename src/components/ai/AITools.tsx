import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Wand2,
  Image,
  Video,
  Share2,
  Sparkles,
  Zap,
  Crown,
  Infinity,
  ArrowRight,
  Info,
} from "lucide-react";
import AIChatbot from "./AIChatbot";
import AIImageGenerator from "./AIImageGenerator";
import AIVideoGenerator from "./AIVideoGenerator";
import PricingPlans from "../pricing/PricingPlans";

interface AIToolsProps {
  isPreviewMode?: boolean;
}

const AITools = ({ isPreviewMode = false }: AIToolsProps) => {
  const [activeTab, setActiveTab] = useState("image");
  const [userPlan, setUserPlan] = useState<
    "free" | "standard" | "pro" | "lifetime"
  >("free");
  const [showPricingModal, setShowPricingModal] = useState(true);
  const [recentlyGenerated, setRecentlyGenerated] = useState([
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=75",
      title: "Mountain landscape",
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?w=400&q=75",
      title: "Abstract art",
      date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: 3,
      type: "video",
      url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&q=75",
      title: "City timelapse",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 4,
      type: "image",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&q=75",
      title: "Nature scene",
      date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    },
  ]);

  const handleSaveImage = (imageUrl: string) => {
    const newGeneration = {
      id: Date.now(),
      type: "image",
      url: imageUrl,
      title: "New generated image",
      date: new Date(),
    };
    setRecentlyGenerated([newGeneration, ...recentlyGenerated.slice(0, 7)]);
  };

  const handleSaveVideo = (videoUrl: string) => {
    const newGeneration = {
      id: Date.now(),
      type: "video",
      url: videoUrl,
      title: "New generated video",
      date: new Date(),
    };
    setRecentlyGenerated([newGeneration, ...recentlyGenerated.slice(0, 7)]);
  };

  const handleSelectPlan = (plan: "free" | "standard" | "pro" | "lifetime") => {
    setUserPlan(plan);
    setShowPricingModal(false);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const getPlanBadge = () => {
    switch (userPlan) {
      case "standard":
        return (
          <div className="flex items-center gap-1 text-purple-500">
            <Zap className="h-4 w-4" /> Standard Plan
          </div>
        );
      case "pro":
        return (
          <div className="flex items-center gap-1 text-amber-500">
            <Crown className="h-4 w-4" /> Pro Plan
          </div>
        );
      case "lifetime":
        return (
          <div className="flex items-center gap-1 text-green-500">
            <Infinity className="h-4 w-4" /> Lifetime Plan
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-blue-500">
            <Sparkles className="h-4 w-4" /> Free Plan
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Content Tools</h1>
            <p className="text-muted-foreground mt-2">
              Generate custom images and videos using AI to enhance your social
              posts and marketplace listings.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {getPlanBadge()}
            <Button
              onClick={() => setShowPricingModal(true)}
              variant={userPlan === "free" ? "default" : "outline"}
            >
              {userPlan === "free" ? "Upgrade Plan" : "Change Plan"}
            </Button>
            <Link to="/ai-models">
              <Button variant="outline" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                AI Models Info
              </Button>
            </Link>
          </div>
        </div>

        {isPreviewMode && (
          <div className="mb-6 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm">
            Preview Mode: Limited to 3 generations per day. Purchase a plan for
            full access.
          </div>
        )}

        {showPricingModal ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <Button
                variant="ghost"
                onClick={() => setShowPricingModal(false)}
              >
                Back to AI Tools
              </Button>
            </div>
            <PricingPlans onSelectPlan={handleSelectPlan} />
          </div>
        ) : (
          <>
            <Tabs
              defaultValue="image"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-[400px] mb-6">
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Image Generator
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video Creator
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="mt-0">
                <AIImageGenerator
                  userPlan={userPlan}
                  onSaveImage={handleSaveImage}
                />
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <AIVideoGenerator
                  userPlan={userPlan}
                  onSaveVideo={handleSaveVideo}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recently Generated</h2>
                {recentlyGenerated.length > 0 && (
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
              {recentlyGenerated.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentlyGenerated.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <CardFooter className="p-2 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-xs truncate font-medium">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(item.date)}
                          </span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Wand2 className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">
                    No generations yet
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Start creating images or videos to see them here
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
              <div className="h-[400px]">
                <AIChatbot isFullPage={false} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AITools;
