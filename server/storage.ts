import { users, type User, type InsertUser, waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, WaitlistEntry>;
  currentUserId: number;
  currentWaitlistId: number;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    // Check if email already exists
    const existingEntry = await this.getWaitlistEntryByEmail(insertEntry.email);
    if (existingEntry) {
      throw new Error("Email already registered on waitlist");
    }

    const id = this.currentWaitlistId++;
    // Create a properly typed entry without spreading insertEntry
    const entry: WaitlistEntry = { 
      id,
      name: insertEntry.name,
      email: insertEntry.email,
      company: insertEntry.company ?? null,
      createdAt: new Date() 
    };
    
    this.waitlist.set(id, entry);
    return entry;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlist.values()).find(
      (entry) => entry.email === email,
    );
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlist.values());
  }
}

export const storage = new MemStorage();
