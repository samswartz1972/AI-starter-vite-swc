import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const featuredPost = {
    title: "The Future of AI in Social Commerce",
    excerpt:
      "Explore how artificial intelligence is revolutionizing the way we shop, share, and connect online. From personalized recommendations to AI-generated content, discover the technologies shaping the future of social commerce.",
    image:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80",
    date: "June 15, 2023",
    author: "Alex Johnson",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    category: "Technology",
    readTime: "8 min read",
  };

  const blogPosts = [
    {
      title: "How to Create Stunning Product Images with AI",
      excerpt:
        "Learn how to use our AI image generation tools to create professional-quality product images for your marketplace listings without expensive photography equipment.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      date: "May 28, 2023",
      author: "Emily Patel",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      category: "Tutorials",
      readTime: "6 min read",
    },
    {
      title: "Building a Community Around Your Brand",
      excerpt:
        "Discover strategies for leveraging social features to build a loyal community around your products and services, increasing engagement and driving sales.",
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80",
      date: "May 15, 2023",
      author: "Michael Rodriguez",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      category: "Marketing",
      readTime: "5 min read",
    },
    {
      title: "Privacy and Security in the Age of Social Commerce",
      excerpt:
        "An in-depth look at the challenges and best practices for maintaining user privacy and data security in integrated social and e-commerce platforms.",
      image:
        "https://images.unsplash.com/photo-1563237023-b1e970526dcb?w=800&q=80",
      date: "April 30, 2023",
      author: "Sarah Chen",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      category: "Security",
      readTime: "10 min read",
    },
    {
      title: "The Psychology of Social Shopping",
      excerpt:
        "Explore the psychological factors that influence purchasing decisions in social contexts and how businesses can ethically leverage these insights.",
      image:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
      date: "April 12, 2023",
      author: "David Kim",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      category: "Research",
      readTime: "7 min read",
    },
    {
      title: "From Browsing to Buying: Optimizing the Customer Journey",
      excerpt:
        "Learn how to create a seamless path from social engagement to purchase completion, reducing friction and increasing conversion rates.",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80",
      date: "March 25, 2023",
      author: "Olivia Martinez",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
      category: "E-commerce",
      readTime: "6 min read",
    },
    {
      title: "Sustainable Practices in Online Marketplaces",
      excerpt:
        "Discover how social commerce platforms are implementing eco-friendly initiatives and supporting sustainable businesses.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      date: "March 10, 2023",
      author: "James Wilson",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      category: "Sustainability",
      readTime: "8 min read",
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Tutorials",
    "Marketing",
    "Security",
    "Research",
    "E-commerce",
    "Sustainability",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">Blog</h1>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full md:w-64"
            />
            <Button>Subscribe</Button>
          </div>
        </div>

        <div className="flex overflow-x-auto py-2 mb-8 gap-2">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <Badge className="mb-2">{featuredPost.category}</Badge>
                  <h2 className="text-2xl font-bold mb-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {featuredPost.date}
                      <span className="mx-2">•</span>
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="w-full">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-xs">{post.author}</span>
                  <span className="mx-2 text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="ghost" className="w-full">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-card p-8 rounded-lg shadow-sm text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles,
            tutorials, and updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-grow"
            />
            <Button>Subscribe</Button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-primary text-primary-foreground"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
