import React, { useState, useEffect } from "react";
import {
  Video,
  RefreshCw,
  Save,
  Share2,
  ShoppingBag,
  AlertCircle,
  Info,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";

interface AIVideoGeneratorProps {
  userPlan?: "free" | "standard" | "pro" | "lifetime";
  onSaveVideo?: (videoUrl: string) => void;
}

const AIVideoGenerator = ({
  userPlan = "free",
  onSaveVideo = () => {},
}: AIVideoGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [videoDuration, setVideoDuration] = useState("15");
  const [videoStyle, setVideoStyle] = useState("realistic");
  const [generating, setGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [remainingGenerations, setRemainingGenerations] = useState(3); // Default for free plan
  const [isPlaying, setIsPlaying] = useState(false);
  const { isPreviewMode } = useApp();

  // Set remaining generations based on plan
  useEffect(() => {
    switch (userPlan) {
      case "free":
        setRemainingGenerations(3);
        break;
      case "standard":
        setRemainingGenerations(20);
        break;
      case "pro":
        setRemainingGenerations(50);
        break;
      case "lifetime":
        setRemainingGenerations(999); // Effectively unlimited
        break;
      default:
        setRemainingGenerations(3);
    }
  }, [userPlan]);

  const getMaxDuration = () => {
    switch (userPlan) {
      case "free":
        return 15;
      case "standard":
        return 30;
      case "pro":
        return 60;
      case "lifetime":
        return 120;
      default:
        return 15;
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim() || remainingGenerations <= 0) return;

    setGenerating(true);
    setRemainingGenerations((prev) => prev - 1);

    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we'll use a placeholder image as video isn't actually generated
      const videoPlaceholders = [
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
        "https://images.unsplash.com/photo-1576097449818-d83ce9d5d4f3?w=800&q=80",
      ];
      const randomPlaceholder =
        videoPlaceholders[Math.floor(Math.random() * videoPlaceholders.length)];

      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const videoUrl = `${randomPlaceholder}&t=${timestamp}`;

      setGeneratedVideo(videoUrl);
      setGenerating(false);
    }, 3000);
  };

  const handleReset = () => {
    setPrompt("");
    setVideoDuration("15");
    setVideoStyle("realistic");
    setGeneratedVideo(null);
    setIsPlaying(false);
  };

  const handleSave = () => {
    if (generatedVideo) {
      onSaveVideo(generatedVideo);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Video Generator</CardTitle>
            <CardDescription>
              Create engaging videos with AI.{" "}
              {userPlan !== "free" &&
                "No watermarks, commercial usage allowed."}
            </CardDescription>
            <div className="flex items-center mt-2">
              <Badge
                variant={remainingGenerations > 5 ? "outline" : "destructive"}
                className="mr-2"
              >
                {remainingGenerations} generations remaining
              </Badge>
              {userPlan === "free" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upgrade to get more generations and longer videos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium mb-1"
                >
                  Prompt
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the video scene, style, and action you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="style"
                    className="block text-sm font-medium mb-1"
                  >
                    Style
                  </label>
                  <Select value={videoStyle} onValueChange={setVideoStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="3d-animation">3D Animation</SelectItem>
                      <SelectItem value="stop-motion">Stop Motion</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium mb-1"
                  >
                    Duration (seconds)
                  </label>
                  <Select
                    value={videoDuration}
                    onValueChange={setVideoDuration}
                    disabled={userPlan === "free"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                      {userPlan !== "free" && (
                        <>
                          <SelectItem value="30">30 seconds</SelectItem>
                          {(userPlan === "pro" || userPlan === "lifetime") && (
                            <>
                              <SelectItem value="45">45 seconds</SelectItem>
                              <SelectItem value="60">60 seconds</SelectItem>
                            </>
                          )}
                          {userPlan === "lifetime" && (
                            <>
                              <SelectItem value="90">90 seconds</SelectItem>
                              <SelectItem value="120">120 seconds</SelectItem>
                            </>
                          )}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  {userPlan === "free" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Free plan limited to 15 seconds. Upgrade for longer
                      videos.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium">
                    Motion Intensity
                  </label>
                  <span className="text-xs text-muted-foreground">50%</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Subtle</span>
                  <span>Balanced</span>
                  <span>Dynamic</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Duration: {getMaxDuration()} seconds
                  </label>
                  {userPlan === "free" && (
                    <p className="text-xs text-muted-foreground">
                      Upgrade to Standard or higher for longer videos
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={
                !prompt.trim() || generating || remainingGenerations <= 0
              }
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Generate Video
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              {generatedVideo
                ? "Your video has been generated"
                : "Your video will appear here after generation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[300px] bg-muted/30 rounded-md">
            {generatedVideo ? (
              <div className="w-full h-full flex flex-col items-center relative">
                <img
                  src={generatedVideo}
                  alt="Generated video preview"
                  className="max-w-full max-h-[300px] object-contain rounded-md"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute inset-0 m-auto bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                <div className="mt-2 text-sm text-muted-foreground">
                  {isPlaying ? "Playing video..." : "Click to play"}
                </div>
                {userPlan === "free" && (
                  <div className="mt-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    Free plan includes watermark
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="mb-2">
                  <Video className="w-12 h-12 mx-auto opacity-20" />
                </div>
                <p>No video generated yet</p>
                <p className="text-xs mt-1">
                  Fill in the prompt and click Generate
                </p>
              </div>
            )}
          </CardContent>
          {generatedVideo && (
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button variant="secondary" size="sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Use in Listing
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {isPreviewMode && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm">
          <AlertCircle className="h-4 w-4 inline mr-1" />
          Preview Mode: Limited to 2 generations. Purchase a plan for full
          access.
        </div>
      )}
    </div>
  );
};

export default AIVideoGenerator;
