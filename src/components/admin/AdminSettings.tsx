import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  DollarSign,
  Wallet,
  Banknote,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  Check,
} from "lucide-react";

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pricing");

  // Pricing settings
  const [pricingPlans, setPricingPlans] = useState([
    {
      id: "free",
      name: "Free",
      price: 0,
      billingCycle: "monthly",
      features: [
        "5 AI image generations per day",
        "3 AI video generations per day",
        "Basic image resolution (512x512)",
        "15-second max video length",
      ],
      isEditable: false,
    },
    {
      id: "standard",
      name: "Standard",
      price: 9.99,
      billingCycle: "monthly",
      features: [
        "50 AI image generations per day",
        "20 AI video generations per day",
        "HD image resolution (1024x1024)",
        "30-second max video length",
        "No watermarks",
        "Marketplace access",
        "Commercial usage rights",
      ],
      isEditable: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: 24.99,
      billingCycle: "monthly",
      features: [
        "Unlimited AI image generations",
        "50 AI video generations per day",
        "4K image resolution (2048x2048)",
        "60-second max video length",
        "No watermarks",
        "Full marketplace access",
        "Complete auction system",
        "Commercial usage rights",
        "Premium templates",
      ],
      isEditable: true,
    },
    {
      id: "lifetime",
      name: "Lifetime",
      price: 299,
      billingCycle: "one-time",
      features: [
        "Unlimited AI image generations",
        "Unlimited AI video generations",
        "8K image resolution (4096x4096)",
        "120-second max video length",
        "No watermarks",
        "Full marketplace access",
        "Complete auction system",
        "Commercial usage rights",
        "All premium templates",
        "Priority support",
      ],
      isEditable: true,
    },
  ]);

  // Payment gateway settings
  const [paymentGateways, setPaymentGateways] = useState([
    {
      id: "stripe",
      name: "Stripe",
      enabled: true,
      apiKey: "pk_test_51HG7...",
      secretKey: "sk_test_51HG7...",
      webhookSecret: "whsec_...",
    },
    {
      id: "paypal",
      name: "PayPal",
      enabled: true,
      clientId: "AeJIH...",
      clientSecret: "ELJ2S...",
    },
    {
      id: "cashapp",
      name: "Cash App",
      enabled: false,
      apiKey: "",
      clientId: "",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      enabled: true,
      accountName: "SocialCommerce Inc",
      accountNumber: "1234567890",
      routingNumber: "123456789",
      bankName: "Chase Bank",
    },
  ]);

  // Template settings
  const [templates, setTemplates] = useState([
    {
      id: "t1",
      name: "Modern Portfolio",
      category: "Portfolio",
      tier: "pro",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    },
    {
      id: "t2",
      name: "E-commerce Storefront",
      category: "E-commerce",
      tier: "pro",
      thumbnail:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    },
    {
      id: "t3",
      name: "Creative Agency",
      category: "Business",
      tier: "lifetime",
      thumbnail:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
    },
    {
      id: "t4",
      name: "Luxury Real Estate",
      category: "Real Estate",
      tier: "lifetime",
      thumbnail:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    },
    {
      id: "t5",
      name: "Restaurant Menu",
      category: "Food & Beverage",
      tier: "pro",
      thumbnail:
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&q=80",
    },
    {
      id: "t6",
      name: "Fashion Lookbook",
      category: "Fashion",
      tier: "lifetime",
      thumbnail:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
    },
  ]);

  // User management
  const [users, setUsers] = useState([
    {
      id: "u1",
      name: "Jane Smith",
      email: "jane@example.com",
      plan: "standard",
      status: "active",
      joinDate: "2023-05-15",
    },
    {
      id: "u2",
      name: "John Doe",
      email: "john@example.com",
      plan: "pro",
      status: "active",
      joinDate: "2023-04-22",
    },
    {
      id: "u3",
      name: "Alice Johnson",
      email: "alice@example.com",
      plan: "free",
      status: "active",
      joinDate: "2023-06-10",
    },
    {
      id: "u4",
      name: "Bob Williams",
      email: "bob@example.com",
      plan: "lifetime",
      status: "active",
      joinDate: "2023-03-05",
    },
    {
      id: "u5",
      name: "Carol Brown",
      email: "carol@example.com",
      plan: "standard",
      status: "suspended",
      joinDate: "2023-05-30",
    },
  ]);

  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Settings saved successfully!");
    }, 1500);
  };

  const updatePlanPrice = (id: string, newPrice: number) => {
    setPricingPlans((plans) =>
      plans.map((plan) =>
        plan.id === id ? { ...plan, price: newPrice } : plan,
      ),
    );
  };

  const togglePaymentGateway = (id: string) => {
    setPaymentGateways((gateways) =>
      gateways.map((gateway) =>
        gateway.id === id ? { ...gateway, enabled: !gateway.enabled } : gateway,
      ),
    );
  };

  const deleteUser = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      setUsers((users) => users.filter((user) => user.id !== id));
    }
  };

  const addNewTemplate = () => {
    const newTemplate = {
      id: `t${templates.length + 1}`,
      name: "New Template",
      category: "Other",
      tier: "pro",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    };
    setTemplates([...templates, newTemplate]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-8">
          <TabsTrigger value="pricing" className="text-sm">
            <DollarSign className="mr-2 h-4 w-4" />
            Pricing & Plans
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-sm">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Gateways
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-sm">
            <Wallet className="mr-2 h-4 w-4" />
            Premium Templates
          </TabsTrigger>
          <TabsTrigger value="users" className="text-sm">
            <Wallet className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
        </TabsList>

        {/* Pricing & Plans Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={
                  plan.isEditable ? "border-blue-200" : "border-gray-200"
                }
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>
                        {plan.billingCycle === "one-time"
                          ? "One-time payment"
                          : "Monthly subscription"}
                      </CardDescription>
                    </div>
                    {!plan.isEditable && (
                      <Badge variant="outline" className="bg-gray-100">
                        Non-editable
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`price-${plan.id}`}>Price (USD)</Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Input
                          id={`price-${plan.id}`}
                          type="number"
                          step="0.01"
                          min="0"
                          value={plan.price}
                          onChange={(e) =>
                            updatePlanPrice(
                              plan.id,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="pl-7"
                          disabled={!plan.isEditable}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Features</Label>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payment Gateways Tab */}
        <TabsContent value="payment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentGateways.map((gateway) => (
              <Card key={gateway.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{gateway.name}</CardTitle>
                    <Switch
                      checked={gateway.enabled}
                      onCheckedChange={() => togglePaymentGateway(gateway.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gateway.id === "stripe" && (
                      <>
                        <div>
                          <Label htmlFor="stripe-api-key">API Key</Label>
                          <Input
                            id="stripe-api-key"
                            value={gateway.apiKey}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="stripe-secret-key">Secret Key</Label>
                          <Input
                            id="stripe-secret-key"
                            type="password"
                            value={gateway.secretKey}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                          <Input
                            id="stripe-webhook"
                            value={gateway.webhookSecret}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                      </>
                    )}

                    {gateway.id === "paypal" && (
                      <>
                        <div>
                          <Label htmlFor="paypal-client-id">Client ID</Label>
                          <Input
                            id="paypal-client-id"
                            value={gateway.clientId}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="paypal-secret">Client Secret</Label>
                          <Input
                            id="paypal-secret"
                            type="password"
                            value={gateway.clientSecret}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                      </>
                    )}

                    {gateway.id === "cashapp" && (
                      <>
                        <div>
                          <Label htmlFor="cashapp-api-key">API Key</Label>
                          <Input
                            id="cashapp-api-key"
                            value={gateway.apiKey}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cashapp-client-id">Client ID</Label>
                          <Input
                            id="cashapp-client-id"
                            value={gateway.clientId}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                      </>
                    )}

                    {gateway.id === "bank" && (
                      <>
                        <div>
                          <Label htmlFor="bank-name">Bank Name</Label>
                          <Input
                            id="bank-name"
                            value={gateway.bankName}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-name">Account Name</Label>
                          <Input
                            id="account-name"
                            value={gateway.accountName}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-number">Account Number</Label>
                          <Input
                            id="account-number"
                            value={gateway.accountNumber}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                        <div>
                          <Label htmlFor="routing-number">Routing Number</Label>
                          <Input
                            id="routing-number"
                            value={gateway.routingNumber}
                            className="mt-1"
                            disabled={!gateway.enabled}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Premium Templates</h2>
            <Button onClick={addNewTemplate} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New Template
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={
                        template.tier === "lifetime"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {template.tier === "lifetime" ? "Lifetime" : "Pro"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.category}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Name</th>
                    <th className="py-3 px-4 text-left font-medium">Email</th>
                    <th className="py-3 px-4 text-left font-medium">Plan</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">
                      Join Date
                    </th>
                    <th className="py-3 px-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}
                    >
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <Select defaultValue={user.plan}>
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="pro">Pro</SelectItem>
                            <SelectItem value="lifetime">Lifetime</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.joinDate}</td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
