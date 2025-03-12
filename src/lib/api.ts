import { db, Auction, Bid, Message, Conversation, AiPrompt } from "./db";
import { useAuth } from "./auth";

// Auctions API
export async function getAuctions(filters?: {
  category?: string;
  status?: string;
  featured?: boolean;
  priceRange?: [number, number];
  search?: string;
  sort?: string;
}) {
  let query = db.auctions.toCollection();

  if (filters) {
    // Apply filters
    if (filters.category) {
      query = query.filter((auction) => auction.category === filters.category);
    }

    if (filters.status) {
      query = query.filter((auction) => auction.status === filters.status);
    }

    if (filters.featured !== undefined) {
      query = query.filter((auction) => auction.featured === filters.featured);
    }

    if (filters.priceRange) {
      query = query.filter(
        (auction) =>
          auction.currentBid >= filters.priceRange![0] &&
          auction.currentBid <= filters.priceRange![1],
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      query = query.filter(
        (auction) =>
          auction.title.toLowerCase().includes(searchLower) ||
          auction.description.toLowerCase().includes(searchLower),
      );
    }
  }

  let auctions = await query.toArray();

  // Apply sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case "ending-soon":
        auctions.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
        break;
      case "price-low":
        auctions.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case "price-high":
        auctions.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "newest":
        auctions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        break;
    }
  }

  // Fetch seller details for each auction
  const auctionsWithSellers = await Promise.all(
    auctions.map(async (auction) => {
      const seller = await db.users.get(auction.sellerId);
      if (!seller) return auction;

      const { password: _, ...sellerWithoutPassword } = seller;

      return {
        ...auction,
        seller: sellerWithoutPassword,
      };
    }),
  );

  return auctionsWithSellers;
}

export async function getAuctionById(id: number) {
  const auction = await db.auctions.get(id);
  if (!auction) return null;

  // Get seller info
  const seller = await db.users.get(auction.sellerId);
  if (!seller) return auction;

  const { password: _, ...sellerWithoutPassword } = seller;

  // Get bids for this auction
  const bids = await db.bids
    .where("auctionId")
    .equals(id)
    .reverse()
    .sortBy("timestamp");

  // Get bidder info for each bid
  const bidsWithUsers = await Promise.all(
    bids.map(async (bid) => {
      const user = await db.users.get(bid.userId);
      if (!user) return bid;

      return {
        ...bid,
        userName: user.name,
        userAvatar: user.avatar,
      };
    }),
  );

  return {
    ...auction,
    seller: sellerWithoutPassword,
    bids: bidsWithUsers,
  };
}

export async function createAuction(
  auctionData: Omit<Auction, "id" | "currentBid" | "watchCount" | "createdAt">,
) {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to create an auction");

  const newAuction: Auction = {
    ...auctionData,
    sellerId: user.id!,
    currentBid: auctionData.startingBid,
    watchCount: 0,
    createdAt: new Date(),
  };

  const id = await db.auctions.add(newAuction);
  return { ...newAuction, id };
}

export async function placeBid(auctionId: number, amount: number) {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to place a bid");

  const auction = await db.auctions.get(auctionId);
  if (!auction) throw new Error("Auction not found");

  if (auction.status !== "active") {
    throw new Error("This auction is not active");
  }

  if (auction.endDate < new Date()) {
    throw new Error("This auction has ended");
  }

  if (amount <= auction.currentBid) {
    throw new Error("Bid must be higher than current bid");
  }

  if (auction.sellerId === user.id) {
    throw new Error("You cannot bid on your own auction");
  }

  // Create the bid
  const bid: Bid = {
    auctionId,
    userId: user.id!,
    amount,
    timestamp: new Date(),
  };

  const bidId = await db.bids.add(bid);

  // Update the auction's current bid
  await db.auctions.update(auctionId, { currentBid: amount });

  return { ...bid, id: bidId };
}

export async function watchAuction(auctionId: number, watch: boolean) {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to watch an auction");

  const auction = await db.auctions.get(auctionId);
  if (!auction) throw new Error("Auction not found");

  // In a real app, you would have a separate table for watched auctions
  // For simplicity, we're just incrementing/decrementing the watchCount
  const newWatchCount = watch
    ? auction.watchCount + 1
    : Math.max(0, auction.watchCount - 1);

  await db.auctions.update(auctionId, { watchCount: newWatchCount });

  return { watched: watch };
}

// Messages API
export async function getConversations() {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to view conversations");

  // Find all conversations where the user is a participant
  const conversations = await db.conversations
    .filter((conv) => conv.participantIds.includes(user.id!))
    .toArray();

  // Get the last message and other participant for each conversation
  const conversationsWithDetails = await Promise.all(
    conversations.map(async (conv) => {
      const lastMessage = await db.messages.get(conv.lastMessageId);

      // Get the other participant's info
      const otherParticipantId = conv.participantIds.find(
        (id) => id !== user.id!,
      );
      const otherParticipant = otherParticipantId
        ? await db.users.get(otherParticipantId)
        : null;

      // Count unread messages
      const unreadCount = await db.messages
        .where("receiverId")
        .equals(user.id!)
        .and(
          (msg) =>
            msg.read === false && conv.participantIds.includes(msg.senderId),
        )
        .count();

      return {
        id: conv.id,
        otherParticipant: otherParticipant
          ? {
              id: otherParticipant.id,
              name: otherParticipant.name,
              avatar: otherParticipant.avatar,
              username: otherParticipant.username,
            }
          : null,
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              timestamp: lastMessage.timestamp,
              isOwn: lastMessage.senderId === user.id,
            }
          : null,
        unreadCount,
        updatedAt: conv.updatedAt,
      };
    }),
  );

  // Sort by updatedAt (most recent first)
  return conversationsWithDetails.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  );
}

export async function getMessages(conversationId: number) {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to view messages");

  const conversation = await db.conversations.get(conversationId);
  if (!conversation) throw new Error("Conversation not found");

  if (!conversation.participantIds.includes(user.id!)) {
    throw new Error("You are not a participant in this conversation");
  }

  // Get all messages between these participants
  const messages = await db.messages
    .where("senderId")
    .anyOf(conversation.participantIds)
    .and((msg) => conversation.participantIds.includes(msg.receiverId))
    .sortBy("timestamp");

  // Mark messages as read
  const unreadMessages = messages.filter(
    (msg) => msg.receiverId === user.id && !msg.read,
  );

  if (unreadMessages.length > 0) {
    await Promise.all(
      unreadMessages.map((msg) => db.messages.update(msg.id!, { read: true })),
    );
  }

  return messages.map((msg) => ({
    id: msg.id,
    content: msg.content,
    timestamp: msg.timestamp,
    isOwn: msg.senderId === user.id,
  }));
}

export async function sendMessage(receiverId: number, content: string) {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to send messages");

  const receiver = await db.users.get(receiverId);
  if (!receiver) throw new Error("Recipient not found");

  const message: Message = {
    senderId: user.id!,
    receiverId,
    content,
    read: false,
    timestamp: new Date(),
  };

  const messageId = await db.messages.add(message);

  // Find or create conversation
  let conversation = await db.conversations
    .filter(
      (conv) =>
        conv.participantIds.includes(user.id!) &&
        conv.participantIds.includes(receiverId),
    )
    .first();

  if (conversation) {
    // Update existing conversation
    await db.conversations.update(conversation.id!, {
      lastMessageId: messageId as number,
      updatedAt: new Date(),
    });
  } else {
    // Create new conversation
    const newConversation: Conversation = {
      participantIds: [user.id!, receiverId],
      lastMessageId: messageId as number,
      updatedAt: new Date(),
    };

    await db.conversations.add(newConversation);
  }

  return {
    id: messageId,
    content,
    timestamp: message.timestamp,
    isOwn: true,
  };
}

// AI Tools API
export async function generateAiContent(
  prompt: string,
  type: "image" | "text" | "video",
) {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to use AI tools");

  // In a real app, this would call an external AI API
  // For demo purposes, we'll return mock responses
  let result = "";

  if (type === "image") {
    // Return a random unsplash image
    const imageIds = [
      "photo-1579546929518-9e396f3cc809",
      "photo-1682685797366-715d29e33f9d",
      "photo-1506905925346-21bda4d32df4",
      "photo-1493246507139-91e8fad9978e",
      "photo-1518895949257-7621c3c786d7",
    ];
    const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
    result = `https://images.unsplash.com/${randomId}?w=800&q=80`;
  } else if (type === "text") {
    // Generate a simple text response based on the prompt
    const responses = [
      `Here's a detailed response to your prompt: "${prompt}". This AI-generated content aims to provide valuable information while maintaining a natural, engaging tone.`,
      `Based on your request for "${prompt}", I've created this professional text that can be used for marketing, product descriptions, or content creation.`,
      `Your prompt "${prompt}" inspired this creative text. Feel free to use this as a starting point and customize it to better fit your specific needs.`,
    ];
    result = responses[Math.floor(Math.random() * responses.length)];
  } else if (type === "video") {
    // For demo purposes, we'll just return a message
    result =
      "Video generation is simulated in this demo. In a production environment, this would generate a real video based on your prompt.";
  }

  // Save the prompt and result to the database
  const aiPrompt: AiPrompt = {
    userId: user.id!,
    prompt,
    result,
    type,
    createdAt: new Date(),
  };

  const promptId = await db.aiPrompts.add(aiPrompt);

  return { ...aiPrompt, id: promptId };
}

export async function getAiHistory() {
  const user = useAuth.getState().user;
  if (!user) throw new Error("You must be logged in to view AI history");

  const history = await db.aiPrompts
    .where("userId")
    .equals(user.id!)
    .reverse()
    .sortBy("createdAt");

  return history;
}

// Admin API
export async function getAdminStats() {
  const user = useAuth.getState().user;
  if (!user || user.role !== "admin") {
    throw new Error("You must be an admin to access this data");
  }

  const userCount = await db.users.count();
  const auctionCount = await db.auctions.count();
  const activeAuctions = await db.auctions
    .where("status")
    .equals("active")
    .count();
  const pendingAuctions = await db.auctions
    .where("status")
    .equals("pending")
    .count();
  const totalBids = await db.bids.count();
  const featuredAuctions = await db.auctions
    .where("featured")
    .equals(true)
    .count();

  // Calculate total sales value (sum of sold auctions)
  const soldAuctions = await db.auctions
    .where("status")
    .equals("sold")
    .toArray();
  const totalSales = soldAuctions.reduce(
    (sum, auction) => sum + auction.currentBid,
    0,
  );

  return {
    userCount,
    auctionCount,
    activeAuctions,
    pendingAuctions,
    totalBids,
    featuredAuctions,
    totalSales,
    recentSales: soldAuctions.slice(0, 5),
  };
}

export async function updateAuctionStatus(
  auctionId: number,
  status: "pending" | "active" | "ended" | "sold" | "cancelled",
) {
  const user = useAuth.getState().user;
  if (!user || user.role !== "admin") {
    throw new Error("You must be an admin to update auction status");
  }

  const auction = await db.auctions.get(auctionId);
  if (!auction) throw new Error("Auction not found");

  await db.auctions.update(auctionId, { status });

  return { success: true };
}

export async function toggleAuctionFeatured(auctionId: number) {
  const user = useAuth.getState().user;
  if (!user || user.role !== "admin") {
    throw new Error("You must be an admin to feature auctions");
  }

  const auction = await db.auctions.get(auctionId);
  if (!auction) throw new Error("Auction not found");

  const featured = !auction.featured;
  await db.auctions.update(auctionId, { featured });

  return { featured };
}
