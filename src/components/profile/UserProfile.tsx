import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Settings,
  User,
  History,
  Bookmark,
  Edit,
  Camera,
  LogOut,
} from "lucide-react";

interface UserProfileProps {
  user?: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
  };
}

const UserProfile = ({
  user = {
    name: "Jane Smith",
    username: "@janesmith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    bio: "Digital creator and social media enthusiast. Passionate about AI-generated content and connecting with like-minded individuals.",
    followers: 1248,
    following: 567,
    posts: 42,
  },
}: UserProfileProps) => {
  return (
    <div className="w-full h-full bg-background p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
              aria-label="Change profile picture"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.username}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <p className="mt-2 text-sm">{user.bio}</p>

            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="font-bold">{user.posts}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="profile">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="activity">
              <History className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved Items
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Bio</h3>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    San Francisco, CA
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Website</h3>
                  <p className="text-sm text-primary">https://janesmith.com</p>
                </div>
                <div>
                  <h3 className="font-medium">Joined</h3>
                  <p className="text-sm text-muted-foreground">March 2022</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Information
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Your latest content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg overflow-hidden bg-muted aspect-square relative group"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${1570000000000 + item * 100}?w=300&q=80`}
                        alt={`Post ${item}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" size="sm">
                          View Post
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View All Posts
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>
                  Your recent actions on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted"
                    >
                      <div className="bg-primary/10 p-2 rounded-full">
                        <History className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          You {item % 2 === 0 ? "commented on" : "liked"} a post
                        </p>
                        <p className="text-sm text-muted-foreground">
                          "This is amazing content! Love the creativity."
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item} hour{item !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View Full History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Items</CardTitle>
                <CardDescription>
                  Content you've bookmarked for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 p-3 rounded-lg hover:bg-muted"
                    >
                      <div className="rounded-md overflow-hidden w-20 h-20 flex-shrink-0">
                        <img
                          src={`https://images.unsplash.com/photo-${1580000000000 + item * 100}?w=150&q=80`}
                          alt={`Saved item ${item}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">
                          AI-Generated Landscape #{item}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          Beautiful landscape created using our AI image
                          generator tool. Perfect for inspiration.
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                          >
                            <Bookmark className="h-3 w-3 mr-1" />
                            Unsave
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View All Saved Items
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Email Address</h3>
                  <p className="text-sm text-muted-foreground">
                    jane.smith@example.com
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">••••••••••••</p>
                </div>
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-10 h-5 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Privacy</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-10 h-5 bg-muted rounded-full relative">
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-muted-foreground rounded-full"></div>
                    </div>
                    <span className="text-sm">Private Account</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
