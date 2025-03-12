import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Wand2,
  Image,
  Video,
  RefreshCw,
  Save,
  Share2,
  ShoppingBag,
} from "lucide-react";
import AIChatbot from "./AIChatbot";

interface AIToolsProps {
  isPreviewMode?: boolean;
}

const AITools = ({ isPreviewMode = false }: AIToolsProps) => {
  const [activeTab, setActiveTab] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  // Mock image generation
  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      if (activeTab === "image") {
        setGeneratedContent(
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
        );
      } else {
        // For video, we'll just use a placeholder image
        setGeneratedContent(
          "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
        );
      }
      setGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setGeneratedContent(null);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Content Tools</h1>
          <p className="text-muted-foreground mt-2">
            Generate custom images and videos using AI to enhance your social
            posts and marketplace listings.
          </p>
          {isPreviewMode && (
            <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md text-sm">
              Preview Mode: Limited to 3 generations per day. Purchase full
              access for unlimited creations.
            </div>
          )}
        </div>

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "image"
                    ? "Create AI Image"
                    : "Create AI Video"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "image"
                    ? "Describe the image you want to generate in detail."
                    : "Describe the video scene, style, and action you want to create."}
                </CardDescription>
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
                      placeholder={
                        activeTab === "image"
                          ? "E.g., A serene mountain landscape with a lake at sunset, photorealistic style"
                          : "E.g., A 360-degree pan of a modern living room with sunlight streaming through windows"
                      }
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  {activeTab === "image" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1">
                        Style Intensity
                      </label>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtle</span>
                        <span>Balanced</span>
                        <span>Dramatic</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "video" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1">
                        Video Duration
                      </label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          5 seconds
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          10 seconds
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          15 seconds
                        </Button>
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
                  disabled={!prompt.trim() || generating}
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate {activeTab === "image" ? "Image" : "Video"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  {generatedContent
                    ? `Your ${activeTab} has been generated.`
                    : `Your ${activeTab} will appear here after generation.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[300px] bg-muted/30 rounded-md">
                {generatedContent ? (
                  <div className="w-full h-full flex flex-col items-center">
                    <img
                      src={generatedContent}
                      alt="Generated content"
                      className="max-w-full max-h-[300px] object-contain rounded-md"
                    />
                    {activeTab === "video" && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Video preview (tap to play)
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="mb-2">
                      {activeTab === "image" ? (
                        <Image className="w-12 h-12 mx-auto opacity-20" />
                      ) : (
                        <Video className="w-12 h-12 mx-auto opacity-20" />
                      )}
                    </div>
                    <p>No {activeTab} generated yet</p>
                    <p className="text-xs mt-1">
                      Fill in the prompt and click Generate
                    </p>
                  </div>
                )}
              </CardContent>
              {generatedContent && (
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
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
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recently Generated</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=75&random=${item}`}
                    alt={`Recent generation ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardFooter className="p-2 flex justify-between items-center">
                  <span className="text-xs truncate">
                    {item % 2 === 0 ? "Mountain landscape" : "Abstract art"}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
          <div className="h-[400px]">
            <AIChatbot isFullPage={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
