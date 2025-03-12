import React, { useState } from "react";
import {
  Gavel,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowUpDown,
  Download,
  Upload,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Auction {
  id: string;
  title: string;
  category: string;
  currentBid: number;
  bidCount: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "pending" | "ended" | "sold" | "cancelled";
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  featured: boolean;
  reserveMet: boolean;
}

interface AuctionManagementProps {}

const AuctionManagement: React.FC<AuctionManagementProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [showAuctionDetails, setShowAuctionDetails] = useState(false);
  const [showCreateAuction, setShowCreateAuction] = useState(false);

  // Sample auction data
  const auctions: Auction[] = [
    {
      id: "A1001",
      title: "Vintage Leica M3 Camera with Original Lens",
      category: "Cameras & Photography",
      currentBid: 2450,
      bidCount: 8,
      startDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
      endDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
      status: "active",
      seller: {
        id: "S1",
        name: "VintageCollectibles",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintage",
      },
      featured: true,
      reserveMet: false,
    },
    {
      id: "A1002",
      title: "Handcrafted Artisan Ceramic Vase Set",
      category: "Home Decor",
      currentBid: 320,
      bidCount: 6,
      startDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
      endDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
      status: "active",
      seller: {
        id: "S2",
        name: "ArtisanCrafts",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artisan",
      },
      featured: false,
      reserveMet: true,
    },
    {
      id: "A1003",
      title: "Signed First Edition 'The Great Gatsby'",
      category: "Books & Manuscripts",
      currentBid: 12500,
      bidCount: 12,
      startDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
      endDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
      status: "active",
      seller: {
        id: "S3",
        name: "RareBooks",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=books",
      },
      featured: true,
      reserveMet: true,
    },
    {
      id: "A1004",
      title: "Vintage Mid-Century Modern Eames Lounge Chair",
      category: "Furniture",
      currentBid: 3800,
      bidCount: 9,
      startDate: new Date(Date.now() - 86400000 * 10), // 10 days ago
      endDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
      status: "sold",
      seller: {
        id: "S4",
        name: "ModernVintage",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=modern",
      },
      featured: false,
      reserveMet: true,
    },
    {
      id: "A1005",
      title: "Limited Edition Mechanical Watch - Only 100 Made",
      category: "Watches & Jewelry",
      currentBid: 0,
      bidCount: 0,
      startDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
      endDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
      status: "pending",
      seller: {
        id: "S5",
        name: "LuxuryTimepieces",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luxury",
      },
      featured: false,
      reserveMet: false,
    },
    {
      id: "A1006",
      title: "Original Abstract Oil Painting by Contemporary Artist",
      category: "Art",
      currentBid: 950,
      bidCount: 7,
      startDate: new Date(Date.now() - 86400000 * 6), // 6 days ago
      endDate: new Date(Date.now() - 86400000 * 1), // 1 day ago
      status: "ended",
      seller: {
        id: "S6",
        name: "ArtGallery",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gallery",
      },
      featured: false,
      reserveMet: true,
    },
    {
      id: "A1007",
      title: "Antique Gold Pocket Watch with Chain",
      category: "Watches & Jewelry",
      currentBid: 1200,
      bidCount: 3,
      startDate: new Date(Date.now() - 86400000 * 4), // 4 days ago
      endDate: new Date(Date.now() - 86400000 * 1), // 1 day ago
      status: "cancelled",
      seller: {
        id: "S7",
        name: "AntiqueCollector",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=antique",
      },
      featured: false,
      reserveMet: false,
    },
  ];

  // Filter auctions based on search query and status
  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch = auction.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || auction.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewAuction = (auction: Auction) => {
    setSelectedAuction(auction);
    setShowAuctionDetails(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Pending
          </Badge>
        );
      case "ended":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Ended
          </Badge>
        );
      case "sold":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Sold
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Auction Management</h1>
            <p className="text-muted-foreground">
              Manage all auction listings and settings
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search auctions..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowCreateAuction(true)}
              className="flex-shrink-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Auction
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Auctions</CardTitle>
              <Gavel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auctions.length}</div>
              <p className="text-xs text-muted-foreground">
                +{auctions.filter((a) => a.status === "pending").length} pending
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auctions.filter((a) => a.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {auctions.filter((a) => {
                  const timeLeft = a.endDate.getTime() - Date.now();
                  return a.status === "active" && timeLeft < 86400000; // Less than 1 day
                }).length}{" "}
                ending soon
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auctions.reduce((sum, auction) => sum + auction.bidCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all auctions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Auctions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auctions.filter((a) => a.featured).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {auctions.filter((a) => a.featured && a.status === "active").length}{" "}
                currently active
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all">All Auctions</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="ended">Ended</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ended">Ended</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort By
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auction ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Bid</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuctions.length > 0 ? (
                      filteredAuctions.map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">
                            {auction.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate max-w-[200px]">
                                {auction.title}
                              </span>
                              {auction.featured && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{auction.category}</TableCell>
                          <TableCell>
                            {auction.currentBid > 0
                              ? formatCurrency(auction.currentBid)
                              : "No bids"}
                          </TableCell>
                          <TableCell>{auction.bidCount}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{formatDate(auction.endDate)}</span>
                              {auction.status === "active" && (
                                <span className="text-xs text-muted-foreground">
                                  {Math.ceil(
                                    (auction.endDate.getTime() - Date.now()) /
                                      86400000
                                  )}{" "}
                                  days left
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(auction.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewAuction(auction)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-24 text-center"
                        >
                          No auctions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredAuctions.length} of {auctions.length} auctions
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auction ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Bid</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuctions
                      .filter((auction) => auction.status === "active")
                      .map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">
                            {auction.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate max-w-[200px]">
                                {auction.title}
                              </span>
                              {auction.featured && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 border-amber-200"
                                >
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{auction.category}</TableCell>
                          <TableCell>
                            {formatCurrency(auction.currentBid)}
                          </TableCell>
                          <TableCell>{auction.bidCount}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{formatDate(auction.endDate)}</span>
                              <span className="text-xs text-muted-foreground">
                                {Math.ceil(
                                  (auction.endDate.getTime() - Date.now()) /
                                    86400000
                                )}{" "}
                                days left
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewAuction(auction)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Auction
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Clock className="mr-2 h-4 w-4" />
                                    Extend Time
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auction ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuctions
                      .filter((auction) => auction.status === "pending")
                      .map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">
                            {auction.id}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium truncate max-w-[200px]">
                              {auction.title}
                            </span>
                          </TableCell>
                          <TableCell>{auction.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={auction.seller.avatar}
                                  alt={auction.seller.name}
                                />
                                <AvatarFallback>
                                  {auction.seller.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{auction.seller.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(auction.startDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewAuction(auction)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
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

          <TabsContent value="ended" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auction ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Final Bid</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Reserve Met</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuctions
                      .filter(
                        (auction) =>
                          auction.status === "ended" ||
                          auction.status === "sold"
                      )
                      .map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">
                            {auction.id}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium truncate max-w-[200px]">
                              {auction.title}
                            </span>
                          </TableCell>
                          <TableCell>
                            {formatCurrency(auction.currentBid)}
                          </TableCell>
                          <TableCell>{auction.bidCount}</TableCell>
                          <TableCell>{formatDate(auction.endDate)}</TableCell>
                          <TableCell>
                            {auction.reserveMet ? (
                              <Badge className="bg-green-100 text-green-800">
                                Yes
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">
                                No
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewAuction(auction)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {auction.status === "ended" &&
                                auction.reserveMet && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Sold
                                  </Button>
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

          <TabsContent value="sold" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auction ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Final Bid</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuctions
                      .filter((auction) => auction.status === "sold")
                      .map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">
                            {auction.id}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium truncate max-w-[200px]">
                              {auction.title}
                            </span>
                          </TableCell>
                          <TableCell>
                            {formatCurrency(auction.currentBid)}
                          </TableCell>
                          <TableCell>{auction.bidCount}</TableCell>
                          <TableCell>{formatDate(auction.endDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewAuction(auction)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export Details
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
        </Tabs>
      </div>

      {/* Auction Details Dialog */}
      <Dialog
        open={showAuctionDetails}
        onOpenChange={setShowAuctionDetails}
      >
        <DialogContent className="max-w-3xl">
          {selectedAuction && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Auction Details: {selectedAuction.id}
                </DialogTitle>
                <DialogDescription>
                  View and manage auction information
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h3 className="font-medium mb-2">Auction Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Title</p>
                      <p className="font-medium">{selectedAuction.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p>{selectedAuction.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div>{getStatusBadge(selectedAuction.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Featured</p>
                      <p>
                        {selectedAuction.featured ? "Yes" : "No"}{" "}
                        {selectedAuction.featured && (
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Remove Featured
                          </Button>
                        )}
                        {!selectedAuction.featured && (
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Make Featured
                          </Button>
                        )}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium mt-6 mb-2">Seller Information</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedAuction.seller.avatar}
                        alt={selectedAuction.seller.name}
                      />
                      <AvatarFallback>
                        {selectedAuction.seller.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {selectedAuction.seller.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Seller ID: {selectedAuction.seller.id}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Auction Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Current Bid
                      </p>
                      <p className="font-medium">
                        {formatCurrency(selectedAuction.currentBid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bid Count</p>
                      <p>{selectedAuction.bidCount} bids</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Reserve Met
                      </p>
                      <p>
                        {selectedAuction.reserveMet ? "Yes" : "No"}{" "}
                        {!selectedAuction.reserveMet &&
                          selectedAuction.status === "active" && (
                            <Badge variant="outline" className="ml-2">
                              Reserve not met
                            </Badge>
                          )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Start Date
                      </p>
                      <p>{formatDate(selectedAuction.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p>{formatDate(selectedAuction.endDate)}</p>
                    </div>
                    {selectedAuction.status === "active" && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Time Remaining
                        </p>
                        <p>
                          {Math.ceil(
                            (selectedAuction.endDate.getTime() - Date.now()) /
                              86400000
                          )}{" "}
                          days
                        </p>
                      </div>
                    )}
                  </div>

                  <h3 className="font-medium mt-6 mb-2">Admin Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Auction
                    </Button>
                    {selectedAuction.status === "active" && (
                      <Button variant="outline" size="sm">
                        <Clock className="mr-2 h-4 w-4" />
                        Extend Time
                      </Button>
                    )}
                    {selectedAuction.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </>
                    )}
                    {selectedAuction.status === "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Auction
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAuctionDetails(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Auction Dialog */}
      <Dialog
        open={showCreateAuction}
        onOpenChange={setShowCreateAuction}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Auction</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new auction listing
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Auction Title</Label>
                <Input id="title" placeholder="Enter auction title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="books">Books & Manuscripts</SelectItem>
                    <SelectItem value="cameras">Cameras & Photography</SelectItem>
                    <SelectItem value="collectibles">Collectibles</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="home">Home Decor</SelectItem>
                    <SelectItem value="jewelry">Jewelry & Watches</SelectItem>
                    <SelectItem value="music">Musical Instruments</SelectItem>
                    <SelectItem value="sports">Sports Memorabilia</SelectItem>
                    <SelectItem value="toys">Toys & Hobbies</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="vintage">Vintage & Antiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the item"
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="starting-bid">Starting Bid ($)</Label>
                <Input
                  id="starting-bid"
                  type="number"
                  placeholder="0.00"
                  min="0"
                />
              </div>