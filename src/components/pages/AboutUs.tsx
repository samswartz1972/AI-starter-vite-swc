import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              At SocialCommerce, our mission is to create a seamless platform
              that combines social networking, content sharing, and e-commerce
              with cutting-edge AI capabilities. We believe in empowering
              creators, businesses, and consumers to connect in meaningful ways
              while leveraging the latest technology to enhance their
              experience.
            </p>
            <p className="text-muted-foreground">
              We're dedicated to building a community where innovation thrives,
              creativity is celebrated, and commerce is accessible to all. Our
              platform is designed to break down barriers between social
              interaction and commercial activities, creating a more integrated
              and intuitive online experience.
            </p>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-6">
            SocialCommerce was founded in 2023 by a team of technology
            enthusiasts who saw the potential to revolutionize how people
            interact online. What started as a simple idea to bridge the gap
            between social media and e-commerce has evolved into a comprehensive
            platform that serves millions of users worldwide.
          </p>
          <p className="text-muted-foreground mb-6">
            Our journey began when we noticed that users were constantly
            switching between different apps for socializing, shopping, and
            content creation. We envisioned a single platform where all these
            activities could coexist harmoniously, enhanced by artificial
            intelligence to make the experience more personalized and efficient.
          </p>
          <p className="text-muted-foreground">
            Today, SocialCommerce stands at the forefront of digital innovation,
            continuously evolving to meet the changing needs of our diverse user
            base while staying true to our core values of connectivity,
            creativity, and commerce.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly push the boundaries of what's possible, embracing
                new technologies and ideas to create better experiences for our
                users.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of connection and work to foster a
                supportive, inclusive environment where everyone feels welcome.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-3">Integrity</h3>
              <p className="text-muted-foreground">
                We operate with transparency and honesty, ensuring that our
                users' trust is never compromised.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Co-Founder",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
              },
              {
                name: "Sarah Chen",
                role: "CTO & Co-Founder",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Product",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                name: "Emily Patel",
                role: "Head of Design",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our team and
            help shape the future of social commerce.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/careers">
              <Button>View Careers</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
