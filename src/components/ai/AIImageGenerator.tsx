import React, { useState, useEffect } from "react";
import {
  Wand2,
  RefreshCw,
  Save,
  Share2,
  ShoppingBag,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface AIImageGeneratorProps {
  userPlan?: "free" | "standard" | "pro" | "lifetime";
  onSaveImage?: (imageUrl: string) => void;
}

const AIImageGenerator = ({
  userPlan = "free",
  onSaveImage = () => {},
}: AIImageGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [styleIntensity, setStyleIntensity] = useState([50]);
  const [imageStyle, setImageStyle] = useState("photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [remainingGenerations, setRemainingGenerations] = useState(5); // Default for free plan
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const { isPreviewMode } = useApp();

  // Set remaining generations based on plan
  useEffect(() => {
    switch (userPlan) {
      case "free":
        setRemainingGenerations(5);
        break;
      case "standard":
        setRemainingGenerations(50);
        break;
      case "pro":
      case "lifetime":
        setRemainingGenerations(999); // Effectively unlimited
        break;
      default:
        setRemainingGenerations(5);
    }
  }, [userPlan]);

  const getMaxResolution = () => {
    switch (userPlan) {
      case "free":
        return "512x512";
      case "standard":
        return "1024x1024";
      case "pro":
        return "2048x2048";
      case "lifetime":
        return "4096x4096";
      default:
        return "512x512";
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim() || remainingGenerations <= 0) return;

    setGenerating(true);
    setRemainingGenerations((prev) => prev - 1);

    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we'll use a random image from Unsplash
      const imageIds = [
        "photo-1579546929518-9e396f3cc809",
        "photo-1682685797366-715d29e33f9d",
        "photo-1506905925346-21bda4d32df4",
        "photo-1493246507139-91e8fad9978e",
        "photo-1518895949257-7621c3c786d7",
      ];
      const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
      const resolution = getMaxResolution().split("x")[0];

      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const imageUrl = `https://images.unsplash.com/${randomId}?w=${resolution}&q=90&t=${timestamp}`;

      setGeneratedImage(imageUrl);
      setGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setNegativePrompt("");
    setStyleIntensity([50]);
    setImageStyle("photorealistic");
    setAspectRatio("1:1");
    setGeneratedImage(null);
  };

  const handleSave = () => {
    if (generatedImage) {
      onSaveImage(generatedImage);
    }
  };

  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Image Generator</CardTitle>
            <CardDescription>
              Create stunning images with AI.{" "}
              {userPlan !== "free" &&
                "No watermarks, commercial usage allowed."}
            </CardDescription>
            <div className="flex items-center mt-2">
              <Badge
                variant={remainingGenerations > 10 ? "outline" : "destructive"}
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
                      <p>
                        Upgrade to get more generations and higher resolution
                      </p>
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
                  placeholder="Describe the image you want to generate in detail..."
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
                  <Select value={imageStyle} onValueChange={setImageStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photorealistic">
                        Photorealistic
                      </SelectItem>
                      <SelectItem value="digital-art">Digital Art</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="oil-painting">Oil Painting</SelectItem>
                      <SelectItem value="watercolor">Watercolor</SelectItem>
                      <SelectItem value="3d-render">3D Render</SelectItem>
                      <SelectItem value="pixel-art">Pixel Art</SelectItem>
                      <SelectItem value="sketch">Sketch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="aspect-ratio"
                    className="block text-sm font-medium mb-1"
                  >
                    Aspect Ratio
                  </label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">Square (1:1)</SelectItem>
                      <SelectItem value="4:3">Standard (4:3)</SelectItem>
                      <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                      <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                      <SelectItem value="3:2">Photo (3:2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium">
                    Style Intensity
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {styleIntensity[0]}%
                  </span>
                </div>
                <Slider
                  value={styleIntensity}
                  onValueChange={setStyleIntensity}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Subtle</span>
                  <span>Balanced</span>
                  <span>Dramatic</span>
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="w-full mt-2"
                >
                  {showAdvancedOptions ? "Hide" : "Show"} Advanced Options
                </Button>
              </div>

              {showAdvancedOptions && (
                <div className="space-y-4 pt-2 border-t">
                  <div>
                    <label
                      htmlFor="negative-prompt"
                      className="block text-sm font-medium mb-1"
                    >
                      Negative Prompt
                    </label>
                    <Textarea
                      id="negative-prompt"
                      placeholder="Elements you want to exclude from the image..."
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Resolution: {getMaxResolution()}
                    </label>
                    {userPlan === "free" && (
                      <p className="text-xs text-muted-foreground">
                        Upgrade to Standard or higher for better resolution
                      </p>
                    )}
                  </div>
                </div>
              )}
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
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              {generatedImage
                ? "Your image has been generated"
                : "Your image will appear here after generation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[300px] bg-muted/30 rounded-md">
            {generatedImage ? (
              <div className="w-full h-full flex flex-col items-center">
                <img
                  src={generatedImage}
                  alt="Generated content"
                  className="max-w-full max-h-[300px] object-contain rounded-md"
                />
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
                  <Wand2 className="w-12 h-12 mx-auto opacity-20" />
                </div>
                <p>No image generated yet</p>
                <p className="text-xs mt-1">
                  Fill in the prompt and click Generate
                </p>
              </div>
            )}
          </CardContent>
          {generatedImage && (
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
          Preview Mode: Limited to 3 generations. Purchase a plan for full
          access.
        </div>
      )}
    </div>
  );
};

export default AIImageGenerator;
