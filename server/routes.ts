import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertWaitlistSchema, 
  insertConsultationRequestSchema,
  insertServicePageSchema,
  insertCoalServiceSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // General API endpoints
  app.get("/api/hello", (req, res) => {
    res.json({ 
      success: true,
      message: "Hello from server!" 
    });
  });

  // Language selection
  app.get("/api/language/:lang", (req, res) => {
    const { lang } = req.params;
    if (lang === 'en' || lang === 'cn') {
      res.cookie('preferredLanguage', lang, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
      return res.json({ success: true, language: lang });
    }
    return res.status(400).json({ 
      success: false, 
      message: "Invalid language selection" 
    });
  });

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
          serviceInterest: entry.serviceInterest,
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

  // Coal Services endpoints
  app.get("/api/coal-services", async (req, res) => {
    try {
      const services = await storage.getAllCoalServices();
      return res.json(services);
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch services"
      });
    }
  });

  app.get("/api/coal-services/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const service = await storage.getCoalServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          message: "Service not found" 
        });
      }
      
      return res.json(service);
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service"
      });
    }
  });

  // Service Pages endpoints
  app.get("/api/service-pages", async (req, res) => {
    try {
      const pages = await storage.getAllServicePages();
      return res.status(200).json({
        success: true,
        data: pages
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service pages"
      });
    }
  });

  app.get("/api/service-pages/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const page = await storage.getServicePageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ 
          success: false, 
          message: "Service page not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: page
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service page"
      });
    }
  });

  app.get("/api/coal-services/:serviceId/pages", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      
      if (isNaN(serviceId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid service ID" 
        });
      }
      
      const pages = await storage.getServicePagesByServiceId(serviceId);
      return res.json(pages);
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service pages"
      });
    }
  });

  // Consultation Request endpoints
  app.post("/api/consultation-requests", async (req, res) => {
    try {
      const result = insertConsultationRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const request = await storage.createConsultationRequest(result.data);
      return res.status(201).json({
        success: true,
        message: "Consultation request submitted successfully",
        data: {
          id: request.id,
          name: request.name,
          email: request.email,
          serviceType: request.serviceType,
          status: request.status,
          createdAt: request.createdAt
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to submit consultation request"
      });
    }
  });
  
  // Get all consultation requests (admin endpoint)
  app.get("/api/consultation-requests", async (req, res) => {
    try {
      const requests = await storage.getAllConsultationRequests();
      return res.status(200).json({
        success: true,
        data: requests
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch consultation requests"
      });
    }
  });
  
  // Get specific consultation request (admin endpoint)
  app.get("/api/consultation-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request ID" 
        });
      }
      
      const request = await storage.getConsultationRequestById(id);
      
      if (!request) {
        return res.status(404).json({ 
          success: false, 
          message: "Consultation request not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: request
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch consultation request"
      });
    }
  });
  
  // Update consultation request status (admin endpoint)
  app.patch("/api/consultation-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request ID" 
        });
      }
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Status is required" 
        });
      }
      
      const updatedRequest = await storage.updateConsultationRequestStatus(id, status);
      
      if (!updatedRequest) {
        return res.status(404).json({ 
          success: false, 
          message: "Consultation request not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        data: updatedRequest
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update status"
      });
    }
  });

  // Admin endpoints (would require authentication in production)
  app.post("/api/admin/services", async (req, res) => {
    try {
      const result = insertCoalServiceSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const service = await storage.createCoalService(result.data);
      return res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: service
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create service"
      });
    }
  });

  app.post("/api/admin/service-pages", async (req, res) => {
    try {
      const result = insertServicePageSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const page = await storage.createServicePage(result.data);
      return res.status(201).json({
        success: true,
        message: "Service page created successfully",
        data: page
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create service page"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
