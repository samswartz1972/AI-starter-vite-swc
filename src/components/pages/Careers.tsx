import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for an experienced frontend developer with expertise in React, TypeScript, and modern web technologies to help build and improve our user interfaces.",
    },
    {
      title: "AI Research Scientist",
      department: "AI & Machine Learning",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Join our AI team to develop cutting-edge image and text generation models that power our platform's creative tools.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      description:
        "Lead the development of new features and improvements for our marketplace and social networking components.",
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description:
        "Create intuitive, beautiful user experiences that make our platform accessible and enjoyable for all users.",
    },
    {
      title: "Community Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      description:
        "Build and nurture our growing community of creators, businesses, and consumers through engagement strategies and content moderation.",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "London, UK",
      type: "Full-time",
      description:
        "Develop and execute marketing campaigns to grow our user base and increase platform engagement.",
    },
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Flexible remote work options",
    "Comprehensive health, dental, and vision insurance",
    "Unlimited PTO policy",
    "Professional development budget",
    "Home office stipend",
    "Wellness programs and gym membership",
    "Parental leave",
    "Regular team retreats and events",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of social commerce and AI-powered content
            creation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Work With Us</h2>
            <p className="text-muted-foreground mb-6">
              At SocialCommerce, we're building a platform that's changing how
              people connect, create, and conduct commerce online. Our team is
              passionate about innovation, user experience, and leveraging
              cutting-edge technology to solve real problems.
            </p>
            <p className="text-muted-foreground mb-6">
              We believe in fostering a collaborative, inclusive environment
              where diverse perspectives are valued and everyone has the
              opportunity to make an impact. Our work culture emphasizes
              autonomy, creativity, and continuous learning.
            </p>
            <p className="text-muted-foreground">
              If you're excited about the intersection of social media,
              e-commerce, and artificial intelligence, and want to be part of a
              team that's shaping the future of digital interaction, we'd love
              to hear from you.
            </p>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team working together"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card p-4 rounded-lg shadow-sm flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{job.department}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {job.type}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-sm text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Don't See a Perfect Fit?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always on the lookout for talented individuals who are
            passionate about our mission. Send us your resume and let us know
            how you can contribute to our team.
          </p>
          <Button>
            <Briefcase className="mr-2 h-4 w-4" />
            Submit General Application
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you have any questions about our open positions or the
            application process, feel free to reach out to our recruiting team.
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;
