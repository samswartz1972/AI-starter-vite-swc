import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostProps {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

interface SocialFeedProps {
  posts?: PostProps[];
}

const PostCard = ({
  post = {
    id: "1",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    content:
      "Just tried the new AI image generator on this platform. The results are amazing! Check out what I created with just a simple text prompt.",
    image:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    likes: 42,
    comments: 12,
    shares: 5,
    timestamp: "2 hours ago",
  },
}: {
  post: PostProps;
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    console.log("Sharing post:", post.id);
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // Submit comment functionality would be implemented here
      console.log("Submitting comment:", commentText);
      setCommentText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className="overflow-hidden bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{post.user.username} · {post.timestamp}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save Post</DropdownMenuItem>
                <DropdownMenuItem>Report Post</DropdownMenuItem>
                <DropdownMenuItem>Hide Post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{post.content}</p>
          {post.image && (
            <div className="rounded-md overflow-hidden mb-4">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col border-t pt-4">
          <div className="flex justify-between w-full mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={liked ? "text-red-500" : ""}
            >
              <Heart
                className={`mr-1 h-5 w-5 ${liked ? "fill-red-500" : ""}`}
              />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleComment}>
              <MessageCircle className="mr-1 h-5 w-5" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="mr-1 h-5 w-5" />
              {post.shares}
            </Button>
          </div>

          {showComments && (
            <div className="w-full mt-2">
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">
                  Comments ({post.comments})
                </p>
                <div className="space-y-3">
                  {/* Sample comments - would be dynamically loaded */}
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                      <AvatarFallback>SL</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2 text-sm flex-1">
                      <p className="font-medium">Sarah Lee</p>
                      <p>This looks amazing! What prompt did you use?</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=mike" />
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2 text-sm flex-1">
                      <p className="font-medium">Mike Thompson</p>
                      <p>I need to try this feature out ASAP!</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex">
                  <Textarea
                    placeholder="Write a comment..."
                    className="min-h-[40px] flex-1 resize-none"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button
                    size="icon"
                    className="ml-2"
                    onClick={handleSubmitComment}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const CreatePostCard = () => {
  const [postText, setPostText] = useState("");

  const handleCreatePost = () => {
    if (postText.trim()) {
      // Create post functionality would be implemented here
      console.log("Creating post:", postText);
      setPostText("");
    }
  };

  return (
    <Card className="mb-6 bg-white">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[80px] resize-none"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <div className="flex justify-between mt-3">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  Photo
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" />
                  </svg>
                  Video
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  File
                </Button>
              </div>
              <Button onClick={handleCreatePost} disabled={!postText.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SocialFeed = ({
  posts = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      content:
        "Just tried the new AI image generator on this platform. The results are amazing! Check out what I created with just a simple text prompt.",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      likes: 42,
      comments: 12,
      shares: 5,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      },
      content:
        "Just listed my handmade jewelry collection on the marketplace! Each piece is unique and made with love. Check it out and let me know what you think!",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      likes: 28,
      comments: 7,
      shares: 3,
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "David Chen",
        username: "davidc",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
      content:
        "Has anyone tried the new video generation tool? I'm thinking of using it for my product demos but wanted to get some feedback first.",
      likes: 15,
      comments: 9,
      shares: 1,
      timestamp: "6 hours ago",
    },
  ],
}: SocialFeedProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-gray-50">
      <Tabs defaultValue="forYou" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="forYou" className="flex-1">
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
            Following
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex-1">
            Trending
          </TabsTrigger>
        </TabsList>
        <TabsContent value="forYou" className="mt-4">
          <CreatePostCard />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        <TabsContent value="following" className="mt-4">
          <CreatePostCard />
          {/* Filtered posts would go here */}
          <div className="text-center py-8 text-muted-foreground">
            Follow more users to see their content here.
          </div>
        </TabsContent>
        <TabsContent value="trending" className="mt-4">
          {/* Trending posts would go here */}
          <div className="text-center py-8 text-muted-foreground">
            Trending content from across the platform will appear here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialFeed;
