import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  previewCtaText?: string;
  backgroundImage?: string;
  onSignUp?: () => void;
  onLogin?: () => void;
  onPreview?: () => void;
}

const HeroSection = ({
  title = "Social Commerce Platform with AI Integration",
  subtitle = "A comprehensive platform that combines social networking, content sharing, and e-commerce with integrated AI image and video generation capabilities.",
  ctaText = "Sign Up Free",
  secondaryCtaText = "Login",
  previewCtaText = "Try Preview Mode",
  backgroundImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
  onSignUp = () => console.log("Sign up clicked"),
  onLogin = () => console.log("Login clicked"),
  onPreview = () => console.log("Preview mode clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onSignUp}
              className="text-base font-semibold"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onLogin}
              className="text-base font-semibold text-white border-white hover:bg-white/10 hover:text-white"
            >
              {secondaryCtaText}
            </Button>
          </div>

          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={onPreview}
              className={cn(
                "text-white hover:bg-white/10 hover:text-white",
                "group flex items-center gap-2",
              )}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30">
                <Play className="h-3 w-3 text-white fill-white" />
              </div>
              {previewCtaText}
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Feature highlights */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              "Social Networking",
              "Marketplace",
              "AI Content Tools",
              "Real-time Messaging",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
              >
                <span className="text-sm text-white font-medium">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
