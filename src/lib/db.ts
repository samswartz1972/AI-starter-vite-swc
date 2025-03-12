import Dexie, { Table } from "dexie";

// Define types for our database tables
type User = {
  id?: number;
  username: string;
  email: string;
  password: string; // In a real app, this would be hashed
  name: string;
  avatar: string;
  role: "user" | "admin";
  createdAt: Date;
};

type Auction = {
  id?: number;
  title: string;
  description: string;
  images: string[];
  currentBid: number;
  startingBid: number;
  reservePrice?: number;
  sellerId: number;
  category: string;
  condition: string;
  startDate: Date;
  endDate: Date;
  status: "pending" | "active" | "ended" | "sold" | "cancelled";
  featured: boolean;
  watchCount: number;
  createdAt: Date;
};

type Bid = {
  id?: number;
  auctionId: number;
  userId: number;
  amount: number;
  timestamp: Date;
};

type Message = {
  id?: number;
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
  timestamp: Date;
};

type Conversation = {
  id?: number;
  participantIds: number[];
  lastMessageId: number;
  updatedAt: Date;
};

type AiPrompt = {
  id?: number;
  userId: number;
  prompt: string;
  result: string;
  type: "image" | "text" | "video";
  createdAt: Date;
};

export type { User, Auction, Bid, Message, Conversation, AiPrompt };

// Define the database
class AppDatabase extends Dexie {
  users!: Table<User>;
  auctions!: Table<Auction>;
  bids!: Table<Bid>;
  messages!: Table<Message>;
  conversations!: Table<Conversation>;
  aiPrompts!: Table<AiPrompt>;

  constructor() {
    super("auctionPlatformDB");
    this.version(1).stores({
      users: "++id, username, email, role",
      auctions: "++id, sellerId, category, status, featured, endDate",
      bids: "++id, auctionId, userId, timestamp",
      messages: "++id, senderId, receiverId, read, timestamp",
      conversations: "++id, participantIds, lastMessageId, updatedAt",
      aiPrompts: "++id, userId, type, createdAt",
    });
  }
}

export const db = new AppDatabase();

// Seed the database with initial data
export async function seedDatabase() {
  const userCount = await db.users.count();

  if (userCount === 0) {
    console.log("Seeding database with initial data...");

    // Add sample users
    const users = [
      {
        username: "admin",
        email: "admin@example.com",
        password: "admin123", // In a real app, this would be hashed
        name: "Admin User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
        role: "admin" as const,
        createdAt: new Date(),
      },
      {
        username: "vintage",
        email: "vintage@example.com",
        password: "password123",
        name: "VintageCollectibles",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vintage",
        role: "user" as const,
        createdAt: new Date(),
      },
      {
        username: "artisan",
        email: "artisan@example.com",
        password: "password123",
        name: "ArtisanCrafts",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artisan",
        role: "user" as const,
        createdAt: new Date(),
      },
      {
        username: "books",
        email: "books@example.com",
        password: "password123",
        name: "RareBooks",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=books",
        role: "user" as const,
        createdAt: new Date(),
      },
      {
        username: "modern",
        email: "modern@example.com",
        password: "password123",
        name: "ModernVintage",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=modern",
        role: "user" as const,
        createdAt: new Date(),
      },
      {
        username: "luxury",
        email: "luxury@example.com",
        password: "password123",
        name: "LuxuryTimepieces",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luxury",
        role: "user" as const,
        createdAt: new Date(),
      },
      {
        username: "gallery",
        email: "gallery@example.com",
        password: "password123",
        name: "ArtGallery",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gallery",
        role: "user" as const,
        createdAt: new Date(),
      },
      {
        username: "user",
        email: "user@example.com",
        password: "password123",
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        role: "user" as const,
        createdAt: new Date(),
      },
    ];

    const userIds = (await db.users.bulkAdd(users, {
      allKeys: true,
    })) as number[];

    // Add sample auctions
    const auctions = [
      {
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
        sellerId: userIds[1], // VintageCollectibles
        category: "Cameras & Photography",
        condition: "Excellent",
        startDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
        endDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
        status: "active" as const,
        featured: true,
        watchCount: 24,
        createdAt: new Date(),
      },
      {
        title: "Handcrafted Artisan Ceramic Vase Set",
        description:
          "Set of three handcrafted ceramic vases by renowned artist Maria Chen. Each piece is unique with a beautiful blue glaze finish. Perfect for modern home decor.",
        images: [
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
          "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80",
        ],
        currentBid: 320,
        startingBid: 150,
        sellerId: userIds[2], // ArtisanCrafts
        category: "Home Decor",
        condition: "New",
        startDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
        endDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
        status: "active" as const,
        featured: false,
        watchCount: 15,
        createdAt: new Date(),
      },
      {
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
        sellerId: userIds[3], // RareBooks
        category: "Books & Manuscripts",
        condition: "Very Good",
        startDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
        endDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
        status: "active" as const,
        featured: true,
        watchCount: 47,
        createdAt: new Date(),
      },
      {
        title: "Vintage Mid-Century Modern Eames Lounge Chair",
        description:
          "Authentic Herman Miller Eames lounge chair and ottoman from the 1960s. Original rosewood veneer and black leather. Some patina consistent with age but in excellent structural condition.",
        images: [
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
        ],
        currentBid: 3800,
        startingBid: 2500,
        sellerId: userIds[4], // ModernVintage
        category: "Furniture",
        condition: "Good",
        startDate: new Date(Date.now() - 86400000 * 10), // 10 days ago
        endDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
        status: "sold" as const,
        featured: false,
        watchCount: 31,
        createdAt: new Date(),
      },
      {
        title: "Limited Edition Mechanical Watch - Only 100 Made",
        description:
          "Exclusive limited edition mechanical watch with sapphire crystal and exhibition caseback. Swiss movement, 100m water resistance. Number 42 of only 100 ever produced.",
        images: [
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
          "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80",
        ],
        currentBid: 0,
        startingBid: 3000,
        reservePrice: 6000,
        sellerId: userIds[5], // LuxuryTimepieces
        category: "Watches & Jewelry",
        condition: "New",
        startDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
        endDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
        status: "pending" as const,
        featured: false,
        watchCount: 53,
        createdAt: new Date(),
      },
      {
        title: "Original Abstract Oil Painting by Contemporary Artist",
        description:
          "Large-scale original abstract oil painting on canvas by rising contemporary artist Jane Doe. Vibrant colors and dynamic composition. Gallery-wrapped, ready to hang. Signed and dated on the back.",
        images: [
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
          "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
        ],
        currentBid: 950,
        startingBid: 500,
        sellerId: userIds[6], // ArtGallery
        category: "Art",
        condition: "New",
        startDate: new Date(Date.now() - 86400000 * 6), // 6 days ago
        endDate: new Date(Date.now() - 86400000 * 1), // 1 day ago
        status: "ended" as const,
        featured: false,
        watchCount: 19,
        createdAt: new Date(),
      },
    ];

    const auctionIds = (await db.auctions.bulkAdd(auctions, {
      allKeys: true,
    })) as number[];

    // Add sample bids
    const bids = [
      // Bids for Leica Camera
      {
        auctionId: auctionIds[0],
        userId: userIds[7], // Jane Smith
        amount: 2450,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        auctionId: auctionIds[0],
        userId: userIds[4], // ModernVintage
        amount: 2350,
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      },
      {
        auctionId: auctionIds[0],
        userId: userIds[3], // RareBooks
        amount: 2200,
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      },

      // Bids for Ceramic Vase Set
      {
        auctionId: auctionIds[1],
        userId: userIds[7], // Jane Smith
        amount: 320,
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      },
      {
        auctionId: auctionIds[1],
        userId: userIds[6], // ArtGallery
        amount: 300,
        timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      },

      // Bids for Great Gatsby
      {
        auctionId: auctionIds[2],
        userId: userIds[1], // VintageCollectibles
        amount: 12500,
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      },
      {
        auctionId: auctionIds[2],
        userId: userIds[4], // ModernVintage
        amount: 12000,
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        auctionId: auctionIds[2],
        userId: userIds[7], // Jane Smith
        amount: 11500,
        timestamp: new Date(Date.now() - 129600000), // 1.5 days ago
      },
    ];

    await db.bids.bulkAdd(bids);

    // Add sample messages and conversations
    const conversation1 = {
      participantIds: [userIds[7], userIds[1]], // Jane and VintageCollectibles
      lastMessageId: 0, // Will update after adding messages
      updatedAt: new Date(),
    };

    const conversation2 = {
      participantIds: [userIds[7], userIds[3]], // Jane and RareBooks
      lastMessageId: 0, // Will update after adding messages
      updatedAt: new Date(),
    };

    const conversationIds = (await db.conversations.bulkAdd(
      [conversation1, conversation2],
      { allKeys: true },
    )) as number[];

    const messages = [
      // Conversation 1
      {
        senderId: userIds[1], // VintageCollectibles
        receiverId: userIds[7], // Jane
        content: "Hey, did you see the new AI feature?",
        read: true,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        senderId: userIds[7], // Jane
        receiverId: userIds[1], // VintageCollectibles
        content:
          "Yes! It's amazing. I've been generating some product images with it.",
        read: true,
        timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
      },
      {
        senderId: userIds[1], // VintageCollectibles
        receiverId: userIds[7], // Jane
        content:
          "Can you share some of them? I'd love to see what you've created.",
        read: true,
        timestamp: new Date(Date.now() - 3400000), // 56 minutes ago
      },
      {
        senderId: userIds[7], // Jane
        receiverId: userIds[1], // VintageCollectibles
        content:
          "Sure! I'll send you a few examples. The quality is really impressive.",
        read: true,
        timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
      },
      {
        senderId: userIds[1], // VintageCollectibles
        receiverId: userIds[7], // Jane
        content: "Are you planning to use them for your marketplace listings?",
        read: false,
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      },

      // Conversation 2
      {
        senderId: userIds[3], // RareBooks
        receiverId: userIds[7], // Jane
        content:
          "I noticed you bid on the Gatsby first edition. It's a beautiful piece.",
        read: true,
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        senderId: userIds[7], // Jane
        receiverId: userIds[3], // RareBooks
        content:
          "Yes, I've been looking for a signed first edition for my collection.",
        read: true,
        timestamp: new Date(Date.now() - 85000000), // 23.6 hours ago
      },
      {
        senderId: userIds[3], // RareBooks
        receiverId: userIds[7], // Jane
        content:
          "I might have some other rare books coming up soon that would interest you.",
        read: false,
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      },
    ];

    const messageIds = (await db.messages.bulkAdd(messages, {
      allKeys: true,
    })) as number[];

    // Update conversations with last message IDs
    await db.conversations.update(conversationIds[0], {
      lastMessageId: messageIds[4],
    });
    await db.conversations.update(conversationIds[1], {
      lastMessageId: messageIds[7],
    });

    // Add sample AI prompts
    const aiPrompts = [
      {
        userId: userIds[7], // Jane
        prompt:
          "Generate an image of a mountain landscape with a lake at sunset",
        result:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        type: "image" as const,
        createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
      },
      {
        userId: userIds[7], // Jane
        prompt: "Create a product description for a vintage camera",
        result:
          "This exquisite vintage camera combines classic aesthetics with remarkable functionality. Featuring a precision-engineered lens and robust mechanical components, it captures images with a distinctive character that digital cameras simply cannot replicate. The weathered brass finish and textured grip tell the story of photography's golden era, making this not just a tool, but a conversation piece and collector's treasure.",
        type: "text" as const,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        userId: userIds[1], // VintageCollectibles
        prompt:
          "Generate an image of a vintage record player on a wooden table",
        result:
          "https://images.unsplash.com/photo-1593078166039-c9878df5c520?w=800&q=80",
        type: "image" as const,
        createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
      },
    ];

    await db.aiPrompts.bulkAdd(aiPrompts);

    console.log("Database seeded successfully!");
  } else {
    console.log("Database already contains data, skipping seed.");
  }
}

// Auth functions
export async function login(username: string, password: string) {
  const user = await db.users.where({ username }).first();
  if (!user) return null;

  // In a real app, you would hash the password and compare hashes
  if (user.password !== password) return null;

  // Don't return the password to the client
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function register(
  userData: Omit<User, "id" | "createdAt" | "role">,
) {
  // Check if username or email already exists
  const existingUser = await db.users
    .where("username")
    .equals(userData.username)
    .or("email")
    .equals(userData.email)
    .first();

  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  // In a real app, you would hash the password here
  const newUser: User = {
    ...userData,
    role: "user",
    createdAt: new Date(),
  };

  const id = await db.users.add(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword, id };
}

// Initialize the database
export async function initDatabase() {
  try {
    await seedDatabase();
    return true;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return false;
  }
}
