import React from "react";
import { motion } from "framer-motion";
import { Check, X, Zap, Crown, Infinity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingPlansProps {
  onSelectPlan?: (plan: "free" | "standard" | "pro" | "lifetime") => void;
}

const PricingPlans = ({ onSelectPlan = () => {} }: PricingPlansProps) => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access to AI generation tools with limitations",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      features: [
        { included: true, text: "5 AI image generations per day" },
        { included: true, text: "3 AI video generations per day" },
        { included: true, text: "Basic image resolution (512x512)" },
        { included: true, text: "15-second max video length" },
        { included: false, text: "No watermarks" },
        { included: false, text: "Marketplace access" },
        { included: false, text: "Auction features" },
        { included: false, text: "Commercial usage rights" },
      ],
      popular: false,
      buttonText: "Get Started",
      id: "free",
    },
    {
      name: "Standard",
      price: "$9.99",
      period: "per month",
      description: "Enhanced AI generation with more daily credits",
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      features: [
        { included: true, text: "50 AI image generations per day" },
        { included: true, text: "20 AI video generations per day" },
        { included: true, text: "HD image resolution (1024x1024)" },
        { included: true, text: "30-second max video length" },
        { included: true, text: "No watermarks" },
        { included: true, text: "Marketplace access" },
        { included: false, text: "Auction features" },
        { included: true, text: "Commercial usage rights" },
      ],
      popular: true,
      buttonText: "Subscribe",
      id: "standard",
    },
    {
      name: "Pro",
      price: "$24.99",
      period: "per month",
      description: "Professional AI tools with auction capabilities",
      icon: <Crown className="h-5 w-5 text-amber-500" />,
      features: [
        { included: true, text: "Unlimited AI image generations" },
        { included: true, text: "50 AI video generations per day" },
        { included: true, text: "4K image resolution (2048x2048)" },
        { included: true, text: "60-second max video length" },
        { included: true, text: "No watermarks" },
        { included: true, text: "Full marketplace access" },
        { included: true, text: "Complete auction system" },
        { included: true, text: "Commercial usage rights" },
      ],
      popular: false,
      buttonText: "Go Pro",
      id: "pro",
    },
    {
      name: "Lifetime",
      price: "$299",
      period: "one-time payment",
      description: "Permanent access to all current and future features",
      icon: <Infinity className="h-5 w-5 text-green-500" />,
      features: [
        { included: true, text: "Unlimited AI image generations" },
        { included: true, text: "Unlimited AI video generations" },
        { included: true, text: "8K image resolution (4096x4096)" },
        { included: true, text: "120-second max video length" },
        { included: true, text: "No watermarks" },
        { included: true, text: "Full marketplace access" },
        { included: true, text: "Complete auction system" },
        { included: true, text: "Commercial usage rights" },
      ],
      popular: false,
      buttonText: "Buy Lifetime",
      id: "lifetime",
    },
  ];

  return (
    <div className="w-full bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your AI content generation needs.
            Upgrade anytime as your requirements grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {plan.icon}
                        <span className="ml-2">{plan.name}</span>
                      </CardTitle>
                      <p className="text-muted-foreground text-sm mt-2">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                        )}
                        <span
                          className={
                            feature.included ? "" : "text-muted-foreground"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                    onClick={() => onSelectPlan(plan.id as any)}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include access to our basic social networking features.{" "}
            <br />
            Need a custom enterprise solution? Contact our sales team.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
