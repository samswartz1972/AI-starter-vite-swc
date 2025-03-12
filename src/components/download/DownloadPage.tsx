import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Check,
  Copy,
  Github,
  ExternalLink,
  Package,
  Code,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DownloadPage = () => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState("");

  const handleDownload = () => {
    setDownloadStarted(true);

    // Create a link element
    const link = document.createElement("a");
    link.href = "/premium-auction-platform.zip"; // This would be your actual download URL
    link.download = "premium-auction-platform.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset the state after 3 seconds
    setTimeout(() => {
      setDownloadStarted(false);
    }, 3000);
  };

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(""), 2000);
  };

  const installCommands = {
    npm: "npm install",
    yarn: "yarn",
    pnpm: "pnpm install",
    bun: "bun install",
  };

  const startCommands = {
    npm: "npm run dev",
    yarn: "yarn dev",
    pnpm: "pnpm dev",
    bun: "bun dev",
  };

  const buildCommands = {
    npm: "npm run build",
    yarn: "yarn build",
    pnpm: "pnpm build",
    bun: "bun build",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              Premium Auction Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive auction system with AI integration, responsive
              design, and admin dashboard
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-purple-500" />
                  Complete Package
                </CardTitle>
                <CardDescription>
                  Everything you need to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    React + TypeScript
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Tailwind CSS styling
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Responsive design for all devices
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Shadcn/ui components
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5 text-blue-500" />
                  Premium Features
                </CardTitle>
                <CardDescription>
                  Advanced functionality included
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    AI chatbot integration
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Real-time auction system
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Admin dashboard & management
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    User authentication ready
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-indigo-500" />
                  Developer Friendly
                </CardTitle>
                <CardDescription>
                  Built with modern best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Clean, modular code structure
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    TypeScript for type safety
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Vite for fast development
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Easy to customize and extend
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-12"
        >
          <div className="p-6 md:p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h2 className="text-2xl font-bold mb-2">Download & Installation</h2>
            <p>Get started with the Premium Auction Platform in minutes</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-1/3">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  onClick={handleDownload}
                  disabled={downloadStarted}
                >
                  {downloadStarted ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Source Code
                    </>
                  )}
                </Button>
                <div className="mt-4 flex items-center justify-center">
                  <Badge variant="outline" className="text-xs">
                    v1.0.0
                  </Badge>
                  <span className="mx-2 text-xs text-gray-500">•</span>
                  <Badge variant="outline" className="text-xs">
                    MIT License
                  </Badge>
                </div>
                <div className="mt-6">
                  <a
                    href="https://github.com/yourusername/premium-auction-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="md:w-2/3">
                <Tabs defaultValue="npm">
                  <TabsList className="mb-4">
                    <TabsTrigger value="npm">npm</TabsTrigger>
                    <TabsTrigger value="yarn">yarn</TabsTrigger>
                    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                    <TabsTrigger value="bun">bun</TabsTrigger>
                  </TabsList>

                  {Object.keys(installCommands).map((manager) => (
                    <TabsContent
                      key={manager}
                      value={manager}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">
                            1. Install dependencies
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() =>
                              copyToClipboard(
                                installCommands[
                                  manager as keyof typeof installCommands
                                ],
                              )
                            }
                          >
                            {copiedCommand ===
                            installCommands[
                              manager as keyof typeof installCommands
                            ] ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-sm overflow-x-auto">
                          <code>
                            {
                              installCommands[
                                manager as keyof typeof installCommands
                              ]
                            }
                          </code>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">
                            2. Start development server
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() =>
                              copyToClipboard(
                                startCommands[
                                  manager as keyof typeof startCommands
                                ],
                              )
                            }
                          >
                            {copiedCommand ===
                            startCommands[
                              manager as keyof typeof startCommands
                            ] ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-sm overflow-x-auto">
                          <code>
                            {
                              startCommands[
                                manager as keyof typeof startCommands
                              ]
                            }
                          </code>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">
                            3. Build for production
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() =>
                              copyToClipboard(
                                buildCommands[
                                  manager as keyof typeof buildCommands
                                ],
                              )
                            }
                          >
                            {copiedCommand ===
                            buildCommands[
                              manager as keyof typeof buildCommands
                            ] ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-sm overflow-x-auto">
                          <code>
                            {
                              buildCommands[
                                manager as keyof typeof buildCommands
                              ]
                            }
                          </code>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Need help with installation or have questions? Check out our
            documentation or contact support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Documentation
            </Button>
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadPage;
