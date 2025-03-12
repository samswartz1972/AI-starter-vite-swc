import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdminInstructions = () => {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Admin Panel Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Accessing the Admin Panel
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to the homepage of your SocialCommerce platform</li>
            <li>Click on the "Admin Login" button at the bottom of the page</li>
            <li>
              Enter your admin credentials:
              <ul className="list-disc pl-5 mt-1">
                <li>
                  <strong>Username:</strong> admin or admin@example.com
                </li>
                <li>
                  <strong>Password:</strong> admin123
                </li>
              </ul>
            </li>
            <li>Once logged in, you'll be redirected to the Admin Dashboard</li>
          </ol>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-2">Managing Pricing Plans</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              In the Admin Panel, click on the "Settings" tab in the sidebar
            </li>
            <li>Select the "Pricing & Plans" tab at the top</li>
            <li>
              Here you can modify the pricing for Standard, Pro, and Lifetime
              plans
            </li>
            <li>
              The Free plan cannot be modified as it's the default entry-level
              plan
            </li>
            <li>Click "Save All Changes" after making your adjustments</li>
          </ol>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Configuring Payment Gateways
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              In the Admin Panel, click on the "Settings" tab in the sidebar
            </li>
            <li>Select the "Payment Gateways" tab at the top</li>
            <li>
              You can enable or disable the following payment methods:
              <ul className="list-disc pl-5 mt-1">
                <li>
                  <strong>Stripe:</strong> For credit card payments
                </li>
                <li>
                  <strong>PayPal:</strong> For PayPal account payments
                </li>
                <li>
                  <strong>Cash App:</strong> For Cash App transfers
                </li>
                <li>
                  <strong>Bank Transfer:</strong> For direct bank deposits
                </li>
              </ul>
            </li>
            <li>
              For each enabled gateway, enter the required API keys and
              credentials
            </li>
            <li>Click "Save All Changes" to apply your settings</li>
          </ol>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Managing Premium Templates
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              In the Admin Panel, click on the "Settings" tab in the sidebar
            </li>
            <li>Select the "Premium Templates" tab at the top</li>
            <li>
              Here you can view all available templates for Pro and Lifetime
              users
            </li>
            <li>Click "Add New Template" to create a new template</li>
            <li>
              For each template, you can set:
              <ul className="list-disc pl-5 mt-1">
                <li>Template name and category</li>
                <li>Thumbnail image</li>
                <li>Access tier (Pro or Lifetime)</li>
              </ul>
            </li>
            <li>Click the trash icon to delete a template</li>
            <li>Click "Save All Changes" to apply your modifications</li>
          </ol>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-2">User Management</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              In the Admin Panel, click on the "Settings" tab in the sidebar
            </li>
            <li>Select the "User Management" tab at the top</li>
            <li>Here you can view all registered users</li>
            <li>
              For each user, you can:
              <ul className="list-disc pl-5 mt-1">
                <li>Change their subscription plan</li>
                <li>Update their account status (active/suspended)</li>
                <li>Delete their account if necessary</li>
              </ul>
            </li>
            <li>Changes to user accounts take effect immediately</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-md mt-6">
          <h3 className="text-blue-800 font-medium mb-2">Important Notes</h3>
          <ul className="list-disc pl-5 text-blue-700 space-y-1">
            <li>
              Always save your changes before navigating away from a settings
              page
            </li>
            <li>
              User deletions cannot be undone - use this feature with caution
            </li>
            <li>
              For security reasons, log out of the admin panel when not in use
            </li>
            <li>
              Regularly check the dashboard for important platform metrics and
              activity
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminInstructions;
