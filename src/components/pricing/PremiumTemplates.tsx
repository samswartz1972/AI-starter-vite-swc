import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Infinity, Eye, Download } from "lucide-react";

interface PremiumTemplatesProps {
  userPlan?: "free" | "standard" | "pro" | "lifetime";
}

const PremiumTemplates = ({ userPlan = "free" }: PremiumTemplatesProps) => {
  const proTemplates = [
    {
      id: "t1",
      name: "Modern Portfolio",
      category: "Portfolio",
      description:
        "Showcase your work with this sleek, modern portfolio template featuring smooth animations and responsive design.",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=70",
      tier: "pro",
    },
    {
      id: "t2",
      name: "E-commerce Storefront",
      category: "E-commerce",
      description:
        "A complete e-commerce solution with product listings, cart functionality, and checkout process.",
      thumbnail:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=70",
      tier: "pro",
    },
    {
      id: "t5",
      name: "Restaurant Menu",
      category: "Food & Beverage",
      description:
        "Elegant digital menu with food categories, item descriptions, and online ordering capabilities.",
      thumbnail:
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&q=70",
      tier: "pro",
    },
  ];

  const lifetimeTemplates = [
    {
      id: "t3",
      name: "Creative Agency",
      category: "Business",
      description:
        "Premium agency template with case studies, team profiles, and service offerings sections.",
      thumbnail:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=70",
      tier: "lifetime",
    },
    {
      id: "t4",
      name: "Luxury Real Estate",
      category: "Real Estate",
      description:
        "Showcase high-end properties with this luxury real estate template featuring virtual tours and property filters.",
      thumbnail:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70",
      tier: "lifetime",
    },
    {
      id: "t6",
      name: "Fashion Lookbook",
      category: "Fashion",
      description:
        "Present fashion collections with this stunning lookbook template featuring fullscreen galleries and product details.",
      thumbnail:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=70",
      tier: "lifetime",
    },
  ];

  const canAccessProTemplates = userPlan === "pro" || userPlan === "lifetime";
  const canAccessLifetimeTemplates = userPlan === "lifetime";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Premium Templates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access professionally designed templates to enhance your content and
            marketplace listings. Upgrade your plan to unlock more premium
            templates.
          </p>
        </div>

        {/* Pro Templates */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Crown className="h-6 w-6 text-amber-500 mr-2" />
            <h3 className="text-2xl font-semibold">Pro Templates</h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {proTemplates.map((template) => (
              <motion.div key={template.id} variants={item}>
                <Card className="overflow-hidden h-full flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-amber-100 text-amber-800">Pro</Badge>
                    </div>
                    {!canAccessProTemplates && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <Lock />
                          <p className="mt-2">Upgrade to Pro to access</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold mb-1">
                        {template.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {template.category}
                      </p>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {template.description}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled={!canAccessProTemplates}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={!canAccessProTemplates}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lifetime Templates */}
        <div>
          <div className="flex items-center mb-8">
            <Infinity className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-2xl font-semibold">
              Lifetime Exclusive Templates
            </h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {lifetimeTemplates.map((template) => (
              <motion.div key={template.id} variants={item}>
                <Card className="overflow-hidden h-full flex flex-col bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-100 text-purple-800">
                        Lifetime
                      </Badge>
                    </div>
                    {!canAccessLifetimeTemplates && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <Lock />
                          <p className="mt-2">Upgrade to Lifetime to access</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold mb-1">
                        {template.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {template.category}
                      </p>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {template.description}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled={!canAccessLifetimeTemplates}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        disabled={!canAccessLifetimeTemplates}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Lock = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z"
      fill="white"
    />
  </svg>
);

export default PremiumTemplates;
