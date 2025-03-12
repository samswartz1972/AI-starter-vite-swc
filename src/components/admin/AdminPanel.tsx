import React, { useState } from "react";
import {
  Users,
  Flag,
  BarChart3,
  Settings,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Ban,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | "pending";
  joinDate: string;
}

interface ContentItem {
  id: string;
  title: string;
  type: "post" | "product" | "comment";
  author: string;
  reportCount: number;
  status: "approved" | "pending" | "rejected";
  date: string;
}

interface Report {
  id: string;
  contentId: string;
  contentTitle: string;
  reportedBy: string;
  reason: string;
  date: string;
  status: "pending" | "reviewed";
}

interface AdminPanelProps {
  users?: User[];
  contentItems?: ContentItem[];
  reports?: Report[];
}

const AdminPanel = ({
  users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Moderator",
      status: "active",
      joinDate: "2023-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      status: "suspended",
      joinDate: "2023-03-10",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "User",
      status: "pending",
      joinDate: "2023-04-05",
    },
    {
      id: "5",
      name: "Alex Brown",
      email: "alex@example.com",
      role: "Moderator",
      status: "active",
      joinDate: "2023-05-12",
    },
  ] as User[],
  contentItems = [
    {
      id: "1",
      title: "Summer Fashion Collection",
      type: "product",
      author: "Jane Smith",
      reportCount: 0,
      status: "approved",
      date: "2023-05-15",
    },
    {
      id: "2",
      title: "How AI is changing e-commerce",
      type: "post",
      author: "John Doe",
      reportCount: 3,
      status: "pending",
      date: "2023-05-18",
    },
    {
      id: "3",
      title: "This product is misleading",
      type: "comment",
      author: "Mike Johnson",
      reportCount: 5,
      status: "rejected",
      date: "2023-05-20",
    },
    {
      id: "4",
      title: "Vintage Camera Collection",
      type: "product",
      author: "Sarah Williams",
      reportCount: 1,
      status: "pending",
      date: "2023-05-22",
    },
    {
      id: "5",
      title: "Best summer destinations",
      type: "post",
      author: "Alex Brown",
      reportCount: 0,
      status: "approved",
      date: "2023-05-25",
    },
  ] as ContentItem[],
  reports = [
    {
      id: "1",
      contentId: "2",
      contentTitle: "How AI is changing e-commerce",
      reportedBy: "User123",
      reason: "Misleading information",
      date: "2023-05-19",
      status: "pending",
    },
    {
      id: "2",
      contentId: "2",
      contentTitle: "How AI is changing e-commerce",
      reportedBy: "User456",
      reason: "Spam content",
      date: "2023-05-20",
      status: "pending",
    },
    {
      id: "3",
      contentId: "3",
      contentTitle: "This product is misleading",
      reportedBy: "User789",
      reason: "Offensive language",
      date: "2023-05-21",
      status: "reviewed",
    },
    {
      id: "4",
      contentId: "4",
      contentTitle: "Vintage Camera Collection",
      reportedBy: "User321",
      reason: "False advertising",
      date: "2023-05-23",
      status: "pending",
    },
    {
      id: "5",
      contentId: "3",
      contentTitle: "This product is misleading",
      reportedBy: "User654",
      reason: "Harassment",
      date: "2023-05-24",
      status: "reviewed",
    },
  ] as Report[],
}: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("content");
  const [searchQuery, setSearchQuery] = useState("");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null,
  );

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter content items based on search query
  const filteredContent = contentItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter reports based on search query
  const filteredReports = reports.filter(
    (report) =>
      report.contentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setUserDialogOpen(true);
  };

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
    setContentDialogOpen(true);
  };

  return (
    <div className="w-full h-full min-h-screen bg-background p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Content Items
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contentItems.length}</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reports.filter((report) => report.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="content"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="content">
              <BarChart3 className="mr-2 h-4 w-4" />
              Content Moderation
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Flag className="mr-2 h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Content Moderation Tab */}
          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Content Moderation</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.map((item) => (
                      <TableRow
                        key={item.id}
                        onClick={() => handleContentClick(item)}
                        className="cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.type}</Badge>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>
                          {item.reportCount > 0 ? (
                            <Badge variant="destructive">
                              {item.reportCount}
                            </Badge>
                          ) : (
                            <Badge variant="outline">0</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.status === "approved" && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Approved
                            </Badge>
                          )}
                          {item.status === "pending" && (
                            <Badge
                              variant="secondary"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Pending
                            </Badge>
                          )}
                          {item.status === "rejected" && (
                            <Badge
                              variant="secondary"
                              className="bg-red-100 text-red-800"
                            >
                              Rejected
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">User Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        onClick={() => handleUserClick(user)}
                        className="cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          {user.status === "active" && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Active
                            </Badge>
                          )}
                          {user.status === "suspended" && (
                            <Badge
                              variant="secondary"
                              className="bg-red-100 text-red-800"
                            >
                              Suspended
                            </Badge>
                          )}
                          {user.status === "pending" && (
                            <Badge
                              variant="secondary"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Content Reports</h2>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.contentTitle}
                        </TableCell>
                        <TableCell>{report.reportedBy}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          {report.status === "pending" ? (
                            <Badge
                              variant="secondary"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Pending
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Reviewed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {report.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Platform Settings</h2>
              <Button>Save Changes</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure platform-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable User Registration</h3>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register on the platform
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Content Pre-moderation</h3>
                    <p className="text-sm text-muted-foreground">
                      Review all content before it's published
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AI Content Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically detect inappropriate AI-generated content
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Put the platform in maintenance mode
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Details Dialog */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and manage user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Name</h3>
                <p>{selectedUser.name}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Email</h3>
                <p>{selectedUser.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Role</h3>
                <p>{selectedUser.role}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Status</h3>
                <p>{selectedUser.status}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Join Date</h3>
                <p>{selectedUser.joinDate}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserDialogOpen(false)}>
              Close
            </Button>
            <Button>Edit User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Details Dialog */}
      <Dialog open={contentDialogOpen} onOpenChange={setContentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Content Details</DialogTitle>
            <DialogDescription>
              Review and moderate content item.
            </DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Title</h3>
                <p>{selectedContent.title}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Type</h3>
                <p>{selectedContent.type}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Author</h3>
                <p>{selectedContent.author}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Reports</h3>
                <p>{selectedContent.reportCount}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Status</h3>
                <p>{selectedContent.status}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Date</h3>
                <p>{selectedContent.date}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContentDialogOpen(false)}
            >
              Close
            </Button>
            <Button variant="destructive">Reject</Button>
            <Button>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
