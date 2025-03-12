import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface MessageCenterProps {
  conversations?: Conversation[];
  activeConversationId?: string;
  messages?: Message[];
}

const MessageCenter: React.FC<MessageCenterProps> = ({
  conversations = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastMessage: "Hey, did you see the new AI feature?",
      timestamp: "10:23 AM",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      lastMessage: "I just listed a new product on the marketplace",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      lastMessage: "The AI generated image looks amazing!",
      timestamp: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: "4",
      name: "James Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      lastMessage: "Can you help me with my store setup?",
      timestamp: "Monday",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Olivia Parker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
      lastMessage: "Thanks for the feedback on my post!",
      timestamp: "Sunday",
      unread: 0,
      online: true,
    },
  ],
  activeConversationId = "1",
  messages = [
    {
      id: "1",
      content: "Hey, did you see the new AI feature?",
      sender: "Sarah Johnson",
      timestamp: "10:23 AM",
      isOwn: false,
    },
    {
      id: "2",
      content:
        "Yes! It's amazing. I've been generating some product images with it.",
      sender: "You",
      timestamp: "10:25 AM",
      isOwn: true,
    },
    {
      id: "3",
      content:
        "Can you share some of them? I'd love to see what you've created.",
      sender: "Sarah Johnson",
      timestamp: "10:26 AM",
      isOwn: false,
    },
    {
      id: "4",
      content:
        "Sure! I'll send you a few examples. The quality is really impressive.",
      sender: "You",
      timestamp: "10:28 AM",
      isOwn: true,
    },
    {
      id: "5",
      content: "Are you planning to use them for your marketplace listings?",
      sender: "Sarah Johnson",
      timestamp: "10:30 AM",
      isOwn: false,
    },
  ],
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId,
  );

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex h-full w-full bg-background border rounded-lg overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              Unread
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-1 pr-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent ${conversation.id === activeConversationId ? "bg-accent" : ""}`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.avatar}
                          alt={conversation.name}
                        />
                        <AvatarFallback>
                          {conversation.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="ml-2 rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-1 pr-2">
                {filteredConversations
                  .filter((conv) => conv.unread > 0)
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent ${conversation.id === activeConversationId ? "bg-accent" : ""}`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={conversation.avatar}
                            alt={conversation.name}
                          />
                          <AvatarFallback>
                            {conversation.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      <Badge variant="default" className="ml-2 rounded-full">
                        {conversation.unread}
                      </Badge>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Thread */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Conversation Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                  />
                  <AvatarFallback>
                    {activeConversation.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{activeConversation.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={activeConversation.avatar}
                        alt={message.sender}
                      />
                      <AvatarFallback>
                        {message.sender.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`max-w-md px-4 py-2 rounded-lg ${message.isOwn ? "bg-primary text-primary-foreground" : "bg-accent"}`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium">Select a conversation</h3>
            <p className="text-muted-foreground">
              Choose a conversation from the list to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;
