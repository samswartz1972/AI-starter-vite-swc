import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Gavel,
  Grid3X3,
  List,
  ArrowUpDown,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import AuctionItem from "./AuctionItem";

interface AuctionListingProps {
  isPreviewMode?: boolean;
}

const AuctionListing = ({ isPreviewMode = false }: AuctionListingProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("ending-soon");
  const [showFilters, setShowFilters] = useState(false);

  // Sample auction items
  const auctionItems = [
    {
      id: "1",
      title: "Vintage Leica M3 Camera with Original Lens",
      description:
        "Rare vintage Leica M3 camera in excellent condition. Includes the original 50mm f/2 Summicron lens. Serial numbers matching. Recently serviced and fully functional. A true collector's item.",
      images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
        "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&q=80",
        "https://images.unsplash.com/photo-1582993728648-1f29c748e5ad?w=800&q=80",
      ],
      currentBid: 2450,
      startingBid: 1000,
      reservePrice: 3000,
      seller: {
        id: "s1",
        name: "VintageCollectibles",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintage",
        rating: 4.9,
        verified: true,
      },
      endTime: new Date(Date.now() + 86400000 * 3), // 3 days from now
      category: "Cameras & Photography",
      condition: "Excellent",
      watchCount: 24,
      bidCount: 8,
      featured: true,
    },
    {
      id: "2",
      title: "Handcrafted Artisan Ceramic Vase Set",
      description:
        "Set of three handcrafted ceramic vases by renowned artist Maria Chen. Each piece is unique with a beautiful blue glaze finish. Perfect for modern home decor.",
      images: [
        "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
        "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80",
      ],
      currentBid: 320,
      startingBid: 150,
      seller: {
        id: "s2",
        name: "ArtisanCrafts",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artisan",
        rating: 4.7,
        verified: true,
      },
      endTime: new Date(Date.now() + 86400000 * 5), // 5 days from now
      category: "Home Decor",
      condition: "New",
      watchCount: 15,
      bidCount: 6,
    },
    {
      id: "3",
      title: "Signed First Edition 'The Great Gatsby' by F. Scott Fitzgerald",
      description:
        "Extremely rare first edition of 'The Great Gatsby' signed by F. Scott Fitzgerald himself. In remarkable condition with original dust jacket. Includes certificate of authenticity and protective case.",
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
      ],
      currentBid: 12500,
      startingBid: 10000,
      reservePrice: 15000,
      seller: {
        id: "s3",
        name: "RareBooks",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=books",
        rating: 5.0,
        verified: true,
      },
      endTime: new Date(Date.now() + 86400000 * 1), // 1 day from now
      category: "Books & Manuscripts",
      condition: "Very Good",
      watchCount: 47,
      bidCount: 12,
    },
    {
      id: "4",
      title: "Vintage Mid-Century Modern Eames Lounge Chair",
      description:
        "Authentic Herman Miller Eames lounge chair and ottoman from the 1960s. Original rosewood veneer and black leather. Some patina consistent with age but in excellent structural condition.",
      images: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
      ],
      currentBid: 3800,
      startingBid: 2500,
      seller: {
        id: "s4",
        name: "ModernVintage",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=modern",
        rating: 4.8,
        verified: false,
      },
      endTime: new Date(Date.now() + 86400000 * 2), // 2 days from now
      category: "Furniture",
      condition: "Good",
      watchCount: 31,
      bidCount: 9,
    },
    {
      id: "5",
      title: "Limited Edition Mechanical Watch - Only 100 Made",
      description:
        "Exclusive limited edition mechanical watch with sapphire crystal and exhibition caseback. Swiss movement, 100m water resistance. Number 42 of only 100 ever produced.",
      images: [
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
        "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80",
      ],
      currentBid: 5600,
      startingBid: 3000,
      reservePrice: 6000,
      seller: {
        id: "s5",
        name: "LuxuryTimepieces",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luxury",
        rating: 4.9,
        verified: true,
      },
      endTime: new Date(Date.now() + 86400000 * 0.5), // 12 hours from now
      category: "Watches & Jewelry",
      condition: "New",
      watchCount: 53,
      bidCount: 15,
      featured: true,
    },
    {
      id: "6",
      title: "Original Abstract Oil Painting by Contemporary Artist",
      description:
        "Large-scale original abstract oil painting on canvas by rising contemporary artist Jane Doe. Vibrant colors and dynamic composition. Gallery-wrapped, ready to hang. Signed and dated on the back.",
      images: [
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
      ],
      currentBid: 950,
      startingBid: 500,
      seller: {
        id: "s6",
        name: "ArtGallery",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gallery",
        rating: 4.6,
        verified: true,
      },
      endTime: new Date(Date.now() + 86400000 * 4), // 4 days from now
      category: "Art",
      condition: "New",
      watchCount: 19,
      bidCount: 7,
    },
  ];

  // Available categories
  const categories = [
    "Art",
    "Books & Manuscripts",
    "Cameras & Photography",
    "Collectibles",
    "Electronics",
    "Fashion",
    "Furniture",
    "Home Decor",
    "Jewelry & Watches",
    "Musical Instruments",
    "Sports Memorabilia",
    "Toys & Hobbies",
    "Vehicles",
    "Vintage & Antiques",
  ];

  // Filter items based on search query, price range, and categories
  const filteredItems = auctionItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      item.currentBid >= priceRange[0] && item.currentBid <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Sort items based on selected option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case "ending-soon":
        return a.endTime.getTime() - b.endTime.getTime();
      case "price-low":
        return a.currentBid - b.currentBid;
      case "price-high":
        return b.currentBid - a.currentBid;
      case "bids":
        return b.bidCount - a.bidCount;
      case "watching":
        return b.watchCount - a.watchCount;
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Premium Auctions
            </h1>
            <p className="text-muted-foreground">
              Discover unique items from verified sellers
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
              variant="outline"
              className="flex-shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Categories
                </h3>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Ending
                </h3>
                <div className="space-y-2">
                  {[
                    "Ending today",
                    "Ending tomorrow",
                    "Ending this week",
                    "Newly listed",
                  ].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={`time-${option}`} />
                      <Label
                        htmlFor={`time-${option}`}
                        className="text-sm cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Price Range
                </h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    min={0}
                    max={15000}
                    step={100}
                    minStepsBetweenThumbs={1}
                    onValueChange={handlePriceRangeChange}
                    className="mb-6"
                  />
                  <div className="flex justify-between items-center">
                    <div className="bg-muted rounded-md px-2 py-1 text-sm">
                      {formatCurrency(priceRange[0])}
                    </div>
                    <Separator className="w-8" />
                    <div className="bg-muted rounded-md px-2 py-1 text-sm">
                      {formatCurrency(priceRange[1])}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 15000]);
                }}
              >
                Reset Filters
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Gavel className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {sortedItems.length}{" "}
              {sortedItems.length === 1 ? "auction" : "auctions"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="bids">Most Bids</SelectItem>
                <SelectItem value="watching">Most Watched</SelectItem>
              </SelectContent>
            </Select>
            <div className="border rounded-md overflow-hidden flex">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="all" className="flex-1">
              All Auctions
            </TabsTrigger>
            <TabsTrigger value="ending" className="flex-1">
              Ending Soon
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex-1">
              Featured
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {sortedItems.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {sortedItems.map((item) =>
                  viewMode === "grid" ? (
                    <AuctionItem key={item.id} {...item} />
                  ) : (
                    <Card
                      key={item.id}
                      className="overflow-hidden bg-white border-0 shadow-md rounded-xl"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-full h-full object-cover aspect-square md:aspect-auto"
                            />
                            {item.featured && (
                              <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium px-2 py-1">
                                Featured
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-4 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <Badge variant="outline">{item.condition}</Badge>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4 justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Current Bid
                                </p>
                                <p className="text-xl font-bold">
                                  {formatCurrency(item.currentBid)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Time Left
                                </p>
                                <p className="text-sm font-medium flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {Math.ceil(
                                    (item.endTime.getTime() - Date.now()) /
                                      86400000,
                                  )}{" "}
                                  days
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Bids
                                </p>
                                <p className="text-sm font-medium">
                                  {item.bidCount}
                                </p>
                              </div>
                            </div>

                            <div className="mt-auto pt-4 flex justify-end">
                              <Button>
                                <Gavel className="h-4 w-4 mr-2" />
                                Bid Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Gavel className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No auctions found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ending" className="mt-0">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {sortedItems
                .filter(
                  (item) => item.endTime.getTime() - Date.now() < 86400000,
                ) // Less than 1 day
                .map((item) => (
                  <AuctionItem key={item.id} {...item} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {sortedItems
                .filter((item) => item.featured)
                .map((item) => (
                  <AuctionItem key={item.id} {...item} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isPreviewMode && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-max bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Preview Mode: Some auction features are limited
        </div>
      )}
    </div>
  );
};

export default AuctionListing;
