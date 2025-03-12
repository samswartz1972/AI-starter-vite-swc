import React, { useState } from "react";
import {
  Search,
  Filter,
  ShoppingBag,
  Heart,
  Plus,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  rating: number;
  description: string;
}

interface MarketplaceProps {
  products?: Product[];
  categories?: string[];
  isPreviewMode?: boolean;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Vintage Camera",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    category: "Electronics",
    seller: "RetroTech",
    rating: 4.5,
    description:
      "A beautiful vintage camera in excellent condition. Perfect for collectors or photography enthusiasts.",
  },
  {
    id: "2",
    title: "Handcrafted Ceramic Vase",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&q=80",
    category: "Home Decor",
    seller: "ArtisanCrafts",
    rating: 5.0,
    description:
      "Handmade ceramic vase with unique glaze pattern. Each piece is one-of-a-kind.",
  },
  {
    id: "3",
    title: "Wireless Headphones",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    category: "Electronics",
    seller: "AudioPlus",
    rating: 4.2,
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life.",
  },
  {
    id: "4",
    title: "Handwoven Basket",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=400&q=80",
    category: "Home Decor",
    seller: "EcoLiving",
    rating: 4.8,
    description:
      "Sustainable handwoven basket made from natural materials. Perfect for storage or decoration.",
  },
  {
    id: "5",
    title: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    category: "Electronics",
    seller: "TechGadgets",
    rating: 4.4,
    description:
      "Feature-rich smartwatch with health tracking, notifications, and customizable watch faces.",
  },
  {
    id: "6",
    title: "Leather Journal",
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
    category: "Stationery",
    seller: "PaperCrafts",
    rating: 4.9,
    description:
      "Handbound leather journal with premium paper. Perfect for sketching, journaling, or note-taking.",
  },
];

const defaultCategories = [
  "All Categories",
  "Electronics",
  "Home Decor",
  "Clothing",
  "Stationery",
  "Jewelry",
  "Art",
  "Sports",
  "Toys",
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-white">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full hover:bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base truncate">{product.title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{product.seller}</p>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductListingForm = ({
  onClose = () => {},
}: {
  onClose?: () => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Product Title
        </label>
        <Input id="title" placeholder="Enter product title" />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <Select defaultValue="Electronics">
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {defaultCategories.slice(1).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">
          Price ($)
        </label>
        <Input id="price" type="number" placeholder="0.00" />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
          placeholder="Describe your product"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Product Images</label>
        <div className="border-2 border-dashed rounded-md p-6 text-center">
          <Plus className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag & drop images or click to browse
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Upload Images
          </Button>
        </div>
      </div>
    </div>
  );
};

const Marketplace = ({
  products = defaultProducts,
  categories = defaultCategories,
  isPreviewMode = false,
}: MarketplaceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showListingDialog, setShowListingDialog] = useState(false);

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">
            Discover unique products from our community
          </p>
        </div>

        <Dialog open={showListingDialog} onOpenChange={setShowListingDialog}>
          <DialogTrigger asChild>
            <Button className="shrink-0" disabled={isPreviewMode}>
              <Plus className="mr-2 h-4 w-4" /> List Item for Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Listing</DialogTitle>
              <DialogDescription>
                Fill out the details below to list your item on the marketplace.
              </DialogDescription>
            </DialogHeader>
            <ProductListingForm onClose={() => setShowListingDialog(false)} />
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowListingDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowListingDialog(false)}>
                Create Listing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="lg:w-1/4 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Search</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <button
                    className={`text-sm w-full text-left py-1.5 px-2 rounded-md ${selectedCategory === category ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-100"}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="flex items-center space-x-2">
              <Input type="number" placeholder="Min" className="w-full" />
              <span>-</span>
              <Input type="number" placeholder="Max" className="w-full" />
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Apply Filter
            </Button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">More Filters</h3>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Rating</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      className="text-gray-300 hover:text-yellow-400"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    & Up
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Condition</h4>
                <div className="space-y-1">
                  {["New", "Used - Like New", "Used - Good", "Used - Fair"].map(
                    (condition) => (
                      <div key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          id={condition}
                          className="mr-2"
                        />
                        <label htmlFor={condition} className="text-sm">
                          {condition}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="lg:w-3/4">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "result" : "results"}
                </span>
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No products found
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              {filteredProducts.length > 0 ? (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden bg-white">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-48">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {product.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {product.seller}
                              </p>
                            </div>
                            <p className="font-bold text-lg">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                          <Badge variant="secondary" className="mt-2">
                            {product.category}
                          </Badge>
                          <p className="mt-2 text-sm line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 ml-1">
                                ({product.rating})
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Heart className="mr-1 h-4 w-4" /> Save
                              </Button>
                              <Button size="sm">
                                <ShoppingBag className="mr-1 h-4 w-4" /> Add to
                                Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No products found
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {isPreviewMode && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-max bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Preview Mode: Some marketplace features are limited
        </div>
      )}
    </div>
  );
};

export default Marketplace;
