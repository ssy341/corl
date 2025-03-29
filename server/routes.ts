import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Waitlist submission endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const result = insertWaitlistSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      // Create waitlist entry
      const waitlistEntry = await storage.createWaitlistEntry(result.data);
      
      return res.status(201).json({
        success: true,
        message: "Successfully joined the waitlist",
        data: {
          id: waitlistEntry.id,
          email: waitlistEntry.email,
          createdAt: waitlistEntry.createdAt
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Email already registered on waitlist") {
          return res.status(409).json({ 
            success: false, 
            message: "This email is already on our waitlist"
          });
        }
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to join waitlist. Please try again later."
      });
    }
  });

  // Get all waitlist entries
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      
      return res.status(200).json({
        success: true,
        data: entries.map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          company: entry.company,
          createdAt: entry.createdAt
        }))
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch waitlist entries"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
