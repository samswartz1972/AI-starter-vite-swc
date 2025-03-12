import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Heart,
  Share2,
  Eye,
  ArrowRight,
  AlertCircle,
  Gavel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Bid {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  amount: number;
  timestamp: Date;
}

interface AuctionItemProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  currentBid: number;
  startingBid: number;
  reservePrice?: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  endTime: Date;
  category: string;
  condition: string;
  watchCount: number;
  bidCount: number;
  bids?: Bid[];
  featured?: boolean;
  onPlaceBid?: (amount: number) => void;
}

const AuctionItem = ({
  id = "1",
  title = "Vintage Leica M3 Camera with Original Lens",
  description = "Rare vintage Leica M3 camera in excellent condition. Includes the original 50mm f/2 Summicron lens. Serial numbers matching. Recently serviced and fully functional. A true collector's item.",
  images = [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&q=80",
    "https://images.unsplash.com/photo-1582993728648-1f29c748e5ad?w=800&q=80",
  ],
  currentBid = 2450,
  startingBid = 1000,
  reservePrice = 3000,
  seller = {
    id: "s1",
    name: "VintageCollectibles",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintage",
    rating: 4.9,
    verified: true,
  },
  endTime = new Date(Date.now() + 86400000 * 3), // 3 days from now
  category = "Cameras & Photography",
  condition = "Excellent",
  watchCount = 24,
  bidCount = 8,
  bids = [],
  featured = false,
  onPlaceBid = () => {},
}: Partial<AuctionItemProps>) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isWatched, setIsWatched] = useState(false);
  const [bidAmount, setBidAmount] = useState(currentBid + 50);
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });

      // Set isEnding flag if less than 1 hour remains
      setIsEnding(difference < 1000 * 60 * 60);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleBidAmountChange = (value: number[]) => {
    setBidAmount(value[0]);
  };

  const handlePlaceBid = () => {
    onPlaceBid(bidAmount);
    // In a real app, this would submit the bid to the backend
    console.log(`Placing bid of $${bidAmount} on item ${id}`);
  };

  const toggleWatch = () => {
    setIsWatched(!isWatched);
    // In a real app, this would update the backend
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Sample bid history for demo
  const sampleBids: Bid[] = [
    {
      id: "b1",
      userId: "u1",
      userName: "PhotoEnthusiast",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=photo",
      amount: currentBid,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "b2",
      userId: "u2",
      userName: "CameraCollector",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=camera",
      amount: currentBid - 100,
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: "b3",
      userId: "u3",
      userName: "VintageHunter",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hunter",
      amount: currentBid - 200,
      timestamp: new Date(Date.now() - 14400000),
    },
  ];

  const actualBids = bids.length > 0 ? bids : sampleBids;

  return (
    <Card className="overflow-hidden bg-white border-0 shadow-lg rounded-xl h-full flex flex-col">
      {featured && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-1 text-sm font-medium">
          Featured Auction
        </div>
      )}

      <div className="relative overflow-hidden aspect-square">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="absolute top-2 right-2 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-black/70 text-white hover:bg-black/80"
          >
            <Eye className="h-3 w-3 mr-1" />
            {watchCount}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-black/70 text-white hover:bg-black/80"
          >
            <Gavel className="h-3 w-3 mr-1" />
            {bidCount}
          </Badge>
        </div>

        {isEnding && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 animate-pulse"
          >
            <Clock className="h-3 w-3 mr-1" />
            Ending Soon
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold line-clamp-2">
              {title}
            </CardTitle>
            <div className="flex items-center mt-1">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarImage src={seller.avatar} />
                <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {seller.name}
              </span>
              {seller.verified && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-blue-100 text-blue-800 text-xs"
                >
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={isWatched ? "text-red-500" : ""}
              onClick={toggleWatch}
            >
              <Heart className={`h-4 w-4 ${isWatched ? "fill-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(currentBid)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Starting Bid</p>
                <p className="text-sm">{formatCurrency(startingBid)}</p>
              </div>
            </div>

            <div className="mt-2">
              <Progress
                value={(currentBid / (reservePrice || currentBid * 2)) * 100}
                className="h-2"
              />
              {reservePrice && currentBid < reservePrice && (
                <div className="flex items-center mt-1 text-xs text-amber-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Reserve price not met
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
            <Badge variant="outline">{condition}</Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div>
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => setShowBidHistory(!showBidHistory)}
            >
              View {showBidHistory ? "less" : "bid history"}
            </Button>

            {showBidHistory && (
              <div className="mt-2 space-y-2 bg-muted/30 p-2 rounded-md">
                {actualBids.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarImage src={bid.userAvatar} />
                        <AvatarFallback>
                          {bid.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px]">
                        {bid.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatCurrency(bid.amount)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(bid.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t bg-gray-50">
        <div className="w-full space-y-3">
          <div className="flex gap-2">
            <div className="flex-grow">
              <Slider
                defaultValue={[bidAmount]}
                min={currentBid + 1}
                max={currentBid * 2}
                step={1}
                onValueChange={handleBidAmountChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Min: {formatCurrency(currentBid + 1)}</span>
                <span>Max: {formatCurrency(currentBid * 2)}</span>
              </div>
            </div>
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="w-24"
              min={currentBid + 1}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Gavel className="h-4 w-4 mr-2" />
                Place Bid
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Your Bid</DialogTitle>
                <DialogDescription>
                  You are about to place a bid on {title}.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Your bid amount:</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(bidAmount)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span>Current highest bid:</span>
                    <span>{formatCurrency(currentBid)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Your bid increment:</span>
                    <span>{formatCurrency(bidAmount - currentBid)}</span>
                  </p>
                  {reservePrice && (
                    <p className="flex justify-between">
                      <span>Reserve price status:</span>
                      <span
                        className={
                          bidAmount >= reservePrice
                            ? "text-green-600"
                            : "text-amber-600"
                        }
                      >
                        {bidAmount >= reservePrice ? "Met" : "Not met"}
                      </span>
                    </p>
                  )}
                </div>
                <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                  <p className="font-medium mb-1">Important:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Your bid is binding and cannot be retracted</li>
                    <li>You will be notified if you are outbid</li>
                    <li>Payment is due within 3 days if you win</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handlePlaceBid} className="w-full sm:w-auto">
                  Confirm Bid
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuctionItem;
