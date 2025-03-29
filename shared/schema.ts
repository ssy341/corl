import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Waitlist for interested clients
export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company"),
  serviceInterest: text("service_interest"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Coal services (main service categories)
export const coalServices = pgTable("coal_services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  
  // Multi-language content
  nameEn: text("name_en").notNull(),
  nameCn: text("name_cn").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionCn: text("description_cn").notNull(),
  
  featuresEn: jsonb("features_en").notNull(),
  featuresCn: jsonb("features_cn").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Service pages (detailed pages for each service)
export const servicePages = pgTable("service_pages", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull().references(() => coalServices.id),
  slug: text("slug").notNull().unique(),
  
  // Multi-language content
  titleEn: text("title_en").notNull(),
  titleCn: text("title_cn").notNull(),
  contentEn: text("content_en").notNull(),
  contentCn: text("content_cn").notNull(),
  
  imageUrl: text("image_url"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Consultation requests
export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  message: text("message").notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas for inserting data
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertWaitlistSchema = createInsertSchema(waitlistEntries).pick({
  name: true,
  email: true,
  company: true,
  serviceInterest: true,
  message: true,
});

export const insertCoalServiceSchema = createInsertSchema(coalServices).pick({
  slug: true,
  icon: true,
  nameEn: true,
  nameCn: true,
  descriptionEn: true,
  descriptionCn: true,
  featuresEn: true,
  featuresCn: true,
});

export const insertServicePageSchema = createInsertSchema(servicePages).pick({
  serviceId: true,
  slug: true,
  titleEn: true,
  titleCn: true,
  contentEn: true,
  contentCn: true,
  imageUrl: true,
  metaDescription: true,
  isPublished: true,
});

export const insertConsultationRequestSchema = createInsertSchema(consultationRequests).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  serviceType: true,
  message: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistSchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export type InsertCoalService = z.infer<typeof insertCoalServiceSchema>;
export type CoalService = typeof coalServices.$inferSelect;

export type InsertServicePage = z.infer<typeof insertServicePageSchema>;
export type ServicePage = typeof servicePages.$inferSelect;

export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
