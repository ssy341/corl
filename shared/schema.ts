import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, date } from "drizzle-orm/pg-core";
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

// Testing agencies (third-party coal quality inspection agencies)
export const testingAgencies = pgTable("testing_agencies", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // Unique agency code
  
  // Multi-language content
  nameEn: text("name_en").notNull(),
  nameCn: text("name_cn").notNull(),
  descriptionEn: text("description_en"),
  descriptionCn: text("description_cn"),
  
  address: text("address"),
  contactPerson: text("contact_person"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  
  // Agency certifications and accreditations
  certifications: jsonb("certifications"),
  
  // API connection information (for direct data integration)
  apiEndpoint: text("api_endpoint"),
  apiKey: text("api_key"),
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testing items (parameters that can be tested)
export const testingItems = pgTable("testing_items", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // Unique item code (e.g., CV, MT, ASH)
  
  // Multi-language content
  nameEn: text("name_en").notNull(),
  nameCn: text("name_cn").notNull(),
  descriptionEn: text("description_en"),
  descriptionCn: text("description_cn"),
  
  unit: text("unit").notNull(), // Measurement unit
  minValue: decimal("min_value"), // Minimum possible value
  maxValue: decimal("max_value"), // Maximum possible value
  standardValue: decimal("standard_value"), // Reference standard value
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testing records (actual test results)
export const testingRecords = pgTable("testing_records", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id").notNull().references(() => testingAgencies.id),
  userId: integer("user_id").references(() => users.id),
  
  // Coal sample information
  sampleId: text("sample_id").notNull(),
  sampleDate: date("sample_date").notNull(),
  sampleLocation: text("sample_location"),
  coalType: text("coal_type"),
  
  // Test information
  testDate: date("test_date").notNull(),
  testReport: text("test_report"), // Report number or identifier
  
  // Test results (stored as JSON for flexibility)
  results: jsonb("results").notNull(), // Array of {itemCode, value, weight}
  
  // Weighted average results (calculated)
  weightedResults: jsonb("weighted_results"),
  
  notes: text("notes"),
  attachments: jsonb("attachments"), // URLs to attached documents, images
  
  status: text("status").default("completed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

// Testing agencies schema
export const insertTestingAgencySchema = createInsertSchema(testingAgencies).pick({
  code: true,
  nameEn: true,
  nameCn: true,
  descriptionEn: true,
  descriptionCn: true,
  address: true,
  contactPerson: true,
  contactPhone: true,
  contactEmail: true,
  certifications: true,
  apiEndpoint: true,
  apiKey: true,
  isActive: true,
});

// Testing items schema
export const insertTestingItemSchema = createInsertSchema(testingItems).pick({
  code: true,
  nameEn: true,
  nameCn: true,
  descriptionEn: true,
  descriptionCn: true,
  unit: true,
  minValue: true,
  maxValue: true,
  standardValue: true,
});

// Testing records schema
export const insertTestingRecordSchema = createInsertSchema(testingRecords).pick({
  agencyId: true,
  userId: true,
  sampleId: true,
  sampleDate: true,
  sampleLocation: true,
  coalType: true,
  testDate: true,
  testReport: true,
  results: true,
  weightedResults: true,
  notes: true,
  attachments: true,
  status: true,
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

export type InsertTestingAgency = z.infer<typeof insertTestingAgencySchema>;
export type TestingAgency = typeof testingAgencies.$inferSelect;

export type InsertTestingItem = z.infer<typeof insertTestingItemSchema>;
export type TestingItem = typeof testingItems.$inferSelect;

export type InsertTestingRecord = z.infer<typeof insertTestingRecordSchema>;
export type TestingRecord = typeof testingRecords.$inferSelect;
