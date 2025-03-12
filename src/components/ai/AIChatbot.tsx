import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, Download, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AIChatbotProps {
  initialMessages?: Message[];
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  isFullPage?: boolean;
  onSendMessage?: (message: string) => Promise<string>;
}

const AIChatbot = ({
  initialMessages = [],
  botName = "Tempo AI",
  botAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=tempo",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  isFullPage = true,
  onSendMessage,
}: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const sampleResponses = [
    "I can help you generate images, videos, and other content using AI. What would you like to create today?",
    "That's an interesting question! AI-generated content can be used in many ways, including social media posts, product listings, and creative projects.",
    "To get the best results from the AI image generator, try to be specific about what you want to see. Include details about style, colors, and composition.",
    "The video generation tool works best with clear descriptions of scenes, actions, and transitions. Would you like me to help you craft a prompt?",
    "I've analyzed your request and can suggest a few approaches. Would you like me to explain the options in more detail?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(async () => {
      let responseContent = "";

      if (onSendMessage) {
        try {
          responseContent = await onSendMessage(inputValue);
        } catch (error) {
          responseContent =
            "Sorry, I encountered an error processing your request.";
        }
      } else {
        // Use sample responses for demo
        const randomIndex = Math.floor(Math.random() * sampleResponses.length);
        responseContent = sampleResponses[randomIndex];
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.role === "user";

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
      >
        {!isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={botAvatar} alt={botName} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        )}

        <div
          className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`px-4 py-2 rounded-lg ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{formatTimestamp(message.timestamp)}</span>
            {!isUser && (
              <div className="flex gap-1">
                <button
                  onClick={() => copyToClipboard(message.content)}
                  className="opacity-50 hover:opacity-100"
                  title="Copy to clipboard"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt="You" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        )}
      </motion.div>
    );
  };

  const WelcomeMessage = () => (
    <div className="text-center py-8">
      <Avatar className="h-16 w-16 mx-auto mb-4">
        <AvatarImage src={botAvatar} alt={botName} />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-medium mb-2">{botName}</h3>
      <p className="text-muted-foreground mb-4">
        I can help you generate AI content and answer questions about the
        platform.
      </p>
      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
        {[
          "Generate an image of a mountain landscape",
          "How do I create a video?",
          "What can you help me with?",
          "Suggest content for my product listing",
        ].map((suggestion, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-accent py-2"
            onClick={() => {
              setInputValue(suggestion);
            }}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Card
      className={`${isFullPage ? "h-full" : "h-[600px]"} flex flex-col bg-background`}
    >
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={botAvatar} alt={botName} />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg">{botName}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            title="Clear conversation"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={botAvatar} alt={botName} />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-2 rounded-lg bg-muted max-w-[80%]">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="shrink-0 self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-center text-muted-foreground">
          AI responses are generated for demonstration purposes.
        </div>
      </div>
    </Card>
  );
};

export default AIChatbot;
