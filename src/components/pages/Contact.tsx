import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <BackButton to="/" label="Back to Home" />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                For general inquiries and support
              </p>
              <a
                href="mailto:info@socialcommerce.com"
                className="text-primary hover:underline"
              >
                info@socialcommerce.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">
                Monday to Friday, 9am to 6pm EST
              </p>
              <a
                href="tel:+1-800-123-4567"
                className="text-primary hover:underline"
              >
                +1 (800) 123-4567
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-4">
                Our headquarters location
              </p>
              <address className="not-italic">
                123 Tech Plaza, Suite 400
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="partnership">
                      Partnership Opportunity
                    </SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
            <div className="rounded-lg overflow-hidden h-[400px] bg-muted">
              {/* This would be a map in a real implementation */}
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800&q=80"
                  alt="Map location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Business Hours</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Check out our
            comprehensive FAQ section.
          </p>
          <Link to="/faq">
            <Button variant="outline">View FAQs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
