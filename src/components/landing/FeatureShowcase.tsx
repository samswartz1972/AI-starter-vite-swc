import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, ShoppingBag, MessageSquare, Users } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  color?: string;
}

interface FeatureShowcaseProps {
  features?: FeatureProps[];
}

const Feature = ({
  icon,
  title,
  description,
  badge,
  color = "bg-primary/10",
}: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
            {badge && (
              <Badge variant="outline" className="ml-auto">
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Feature preview</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const FeatureShowcase = ({
  features = [
    {
      icon: <Wand2 className="h-6 w-6 text-primary" />,
      title: "AI Content Generation",
      description:
        "Create stunning images and videos with our advanced AI tools.",
      badge: "Popular",
      color: "bg-purple-100",
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      title: "Marketplace",
      description: "Buy and sell products with integrated payment processing.",
      color: "bg-blue-100",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Social Networking",
      description:
        "Connect with others, share content, and build your community.",
      color: "bg-green-100",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "User Management",
      description:
        "Comprehensive tools for profile creation and account settings.",
      color: "bg-amber-100",
    },
  ],
}: FeatureShowcaseProps) => {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Platform Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive social commerce platform combines social
            networking, content sharing, and e-commerce with integrated AI
            capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="px-8">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
