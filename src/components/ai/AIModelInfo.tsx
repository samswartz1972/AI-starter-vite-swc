import React from "react";
import { Info, ExternalLink, Server, Cpu, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const AIModelInfo = () => {
  const imageModels = [
    {
      name: "Stable Diffusion XL",
      description:
        "High-quality image generation with excellent detail and composition",
      type: "Open Source",
      provider: "Stability AI",
      capabilities: [
        "Photorealistic images",
        "Artistic styles",
        "Detailed compositions",
      ],
      availableIn: ["free", "standard", "pro", "lifetime"],
      link: "https://stability.ai/stable-diffusion",
    },
    {
      name: "Midjourney-like",
      description: "Artistic image generation with stunning visual quality",
      type: "Custom",
      provider: "SocialCommerce AI",
      capabilities: [
        "Artistic renderings",
        "Creative compositions",
        "Unique styles",
      ],
      availableIn: ["standard", "pro", "lifetime"],
      link: null,
    },
    {
      name: "DALL-E 3 Compatible",
      description:
        "Advanced image generation with excellent prompt understanding",
      type: "API Integration",
      provider: "OpenAI Compatible",
      capabilities: [
        "Text-accurate images",
        "Complex scenes",
        "Conceptual art",
      ],
      availableIn: ["pro", "lifetime"],
      link: null,
    },
  ];

  const videoModels = [
    {
      name: "Stable Video Diffusion",
      description: "Generate short video clips from text prompts",
      type: "Open Source",
      provider: "Stability AI",
      capabilities: [
        "Short animations",
        "Scene transitions",
        "Simple movements",
      ],
      availableIn: ["free", "standard", "pro", "lifetime"],
      link: "https://stability.ai/stable-video",
    },
    {
      name: "Gen-2 Compatible",
      description: "Create high-quality videos with complex motion and scenes",
      type: "API Integration",
      provider: "Runway Compatible",
      capabilities: ["Realistic motion", "Longer sequences", "Style control"],
      availableIn: ["standard", "pro", "lifetime"],
      link: null,
    },
    {
      name: "Sora-like",
      description:
        "Advanced video generation with cinematic quality (coming soon)",
      type: "Premium",
      provider: "SocialCommerce AI",
      capabilities: [
        "Cinematic quality",
        "Complex scenes",
        "Realistic physics",
      ],
      availableIn: ["lifetime"],
      link: null,
      comingSoon: true,
    },
  ];

  return (
    <div className="w-full bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <BackButton to="/ai-tools" label="Back to AI Tools" />
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">AI Models Information</h1>
          <p className="text-muted-foreground">
            Learn about the AI models powering our image and video generation
            tools
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Server className="mr-2 h-5 w-5 text-blue-500" />
            Image Generation Models
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageModels.map((model, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{model.name}</CardTitle>
                    <Badge variant="outline">{model.type}</Badge>
                  </div>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm font-medium mb-2">
                    Provider: {model.provider}
                  </p>
                  <p className="text-sm font-medium mb-2">Capabilities:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground mb-4">
                    {model.capabilities.map((capability, i) => (
                      <li key={i}>{capability}</li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">
                      Available in plans:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.availableIn.includes("free") && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Free
                        </Badge>
                      )}
                      {model.availableIn.includes("standard") && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800"
                        >
                          Standard
                        </Badge>
                      )}
                      {model.availableIn.includes("pro") && (
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800"
                        >
                          Pro
                        </Badge>
                      )}
                      {model.availableIn.includes("lifetime") && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Lifetime
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                {model.link && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={model.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Cpu className="mr-2 h-5 w-5 text-purple-500" />
            Video Generation Models
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoModels.map((model, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{model.name}</CardTitle>
                    <Badge variant="outline">
                      {model.comingSoon ? "Coming Soon" : model.type}
                    </Badge>
                  </div>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm font-medium mb-2">
                    Provider: {model.provider}
                  </p>
                  <p className="text-sm font-medium mb-2">Capabilities:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground mb-4">
                    {model.capabilities.map((capability, i) => (
                      <li key={i}>{capability}</li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">
                      Available in plans:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.availableIn.includes("free") && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Free
                        </Badge>
                      )}
                      {model.availableIn.includes("standard") && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800"
                        >
                          Standard
                        </Badge>
                      )}
                      {model.availableIn.includes("pro") && (
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800"
                        >
                          Pro
                        </Badge>
                      )}
                      {model.availableIn.includes("lifetime") && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Lifetime
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                {model.link && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={model.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Info className="mr-2 h-5 w-5 text-blue-500" />
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do the AI models work?</AccordionTrigger>
              <AccordionContent>
                Our AI models use diffusion-based technology to generate images
                and videos from text prompts. They've been trained on diverse
                datasets to understand and create visual content based on your
                descriptions. The models interpret your text, understand the
                concepts, and generate corresponding visual output.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Are the models running locally or in the cloud?
              </AccordionTrigger>
              <AccordionContent>
                Our platform uses a hybrid approach. Some lightweight models run
                directly in your browser for quick generations, while more
                complex and higher-quality models run on our cloud
                infrastructure for better results. This gives you the best
                balance of speed and quality.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Do I own the content I create with these models?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you own all content you generate using our platform. For
                Free plan users, generated content includes a small watermark.
                Standard, Pro, and Lifetime plans include commercial usage
                rights with no watermarks, allowing you to use the content for
                business purposes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                What are the limitations of these AI models?
              </AccordionTrigger>
              <AccordionContent>
                While our AI models are powerful, they do have limitations. They
                may sometimes misinterpret complex prompts, struggle with
                certain specific details like human hands or text, and have
                varying quality depending on the complexity of your request.
                Higher-tier plans provide access to more advanced models with
                fewer limitations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                How often are new models added?
              </AccordionTrigger>
              <AccordionContent>
                We regularly update our platform with new and improved AI
                models. Standard plan subscribers get access to new models
                quarterly, Pro plan users receive updates monthly, and Lifetime
                members get immediate access to all new models as soon as
                they're available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <Lock className="mr-2 h-5 w-5 text-green-500" />
            Ready to unlock premium AI models?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Upgrade your plan to access our most powerful AI models and create
            stunning content without limitations.
          </p>
          <Link to="/ai-tools">
            <Button size="lg">
              <Zap className="mr-2 h-5 w-5" />
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIModelInfo;
