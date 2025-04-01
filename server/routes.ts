import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertWaitlistSchema, 
  insertConsultationRequestSchema,
  insertServicePageSchema,
  insertCoalServiceSchema,
  insertTestingAgencySchema,
  insertTestingItemSchema,
  insertTestingRecordSchema
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
  
  // 获取热门行业内参
  app.get("/api/industry-insights", async (req, res) => {
    try {
      // 在实际项目中，这里应该从数据库获取内参数据
      // 现在我们返回模拟数据 - 这里是模拟API响应
      const insights = [
        {
          id: 1,
          titleCn: "2025年第一季度煤炭价格分析报告",
          titleEn: "2025 Q1 Coal Price Analysis Report",
          sourceCn: "中国煤炭经济研究院",
          sourceEn: "China Coal Economy Research Institute",
          publishDate: "2025-03-30",
          readCount: 1856,
          linkUrl: "/insights/1",
          isPremium: false
        },
        {
          id: 2,
          titleCn: "国内动力煤市场供需趋势预测",
          titleEn: "Supply and Demand Trends in Domestic Thermal Coal Market",
          sourceCn: "煤炭工业协会",
          sourceEn: "Coal Industry Association",
          publishDate: "2025-03-29",
          readCount: 1723,
          linkUrl: "/insights/2",
          isPremium: false
        },
        {
          id: 3,
          titleCn: "新能源替代下的煤炭行业转型路径研究",
          titleEn: "Research on Coal Industry Transformation Path under New Energy Substitution",
          sourceCn: "国家能源研究中心",
          sourceEn: "National Energy Research Center",
          publishDate: "2025-03-28",
          readCount: 1542,
          linkUrl: "/insights/3",
          isPremium: true
        },
        {
          id: 4,
          titleCn: "煤炭企业ESG发展报告：绿色矿山建设进展",
          titleEn: "Coal Enterprise ESG Development Report: Green Mine Construction Progress",
          sourceCn: "中国矿业大学",
          sourceEn: "China University of Mining and Technology",
          publishDate: "2025-03-27",
          readCount: 1429,
          linkUrl: "/insights/4",
          isPremium: false
        },
        {
          id: 5,
          titleCn: "环保政策调整对煤炭生产的影响分析",
          titleEn: "Analysis of Environmental Policy Adjustments on Coal Production",
          sourceCn: "生态环境部研究所",
          sourceEn: "Research Institute of Ministry of Ecology and Environment",
          publishDate: "2025-03-26",
          readCount: 1387,
          linkUrl: "/insights/5",
          isPremium: false
        },
        {
          id: 6,
          titleCn: "国际煤炭贸易格局变化与中国应对策略",
          titleEn: "Changes in International Coal Trade Pattern and China's Response Strategy",
          sourceCn: "对外经济贸易大学",
          sourceEn: "University of International Business and Economics",
          publishDate: "2025-03-25",
          readCount: 1246,
          linkUrl: "/insights/6",
          isPremium: true
        },
        {
          id: 7,
          titleCn: "煤炭智能开采技术最新进展",
          titleEn: "Latest Progress in Coal Intelligent Mining Technology",
          sourceCn: "中国矿业协会",
          sourceEn: "China Mining Association",
          publishDate: "2025-03-24",
          readCount: 1132,
          linkUrl: "/insights/7",
          isPremium: false
        },
        {
          id: 8,
          titleCn: "碳中和背景下煤炭行业发展战略研究",
          titleEn: "Research on Coal Industry Development Strategy under Carbon Neutrality",
          sourceCn: "国家发改委能源研究所",
          sourceEn: "Energy Research Institute of NDRC",
          publishDate: "2025-03-23",
          readCount: 1045,
          linkUrl: "/insights/8",
          isPremium: true
        },
        {
          id: 9,
          titleCn: "煤炭物流运输成本优化方案分析",
          titleEn: "Analysis of Coal Logistics Transportation Cost Optimization Solutions",
          sourceCn: "交通运输部规划研究院",
          sourceEn: "Planning Research Institute of Ministry of Transport",
          publishDate: "2025-03-22",
          readCount: 987,
          linkUrl: "/insights/9",
          isPremium: false
        },
        {
          id: 10,
          titleCn: "煤炭企业数字化转型案例与经验分享",
          titleEn: "Coal Enterprise Digital Transformation Cases and Experience Sharing",
          sourceCn: "中国煤炭工业出版社",
          sourceEn: "China Coal Industry Publishing House",
          publishDate: "2025-03-21",
          readCount: 924,
          linkUrl: "/insights/10",
          isPremium: false
        }
      ];
      
      return res.status(200).json({
        success: true,
        message: "Successfully retrieved industry insights",
        data: insights
      });
    } catch (error) {
      console.error("Error fetching industry insights:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch industry insights" 
      });
    }
  });

  // AI咨询服务 - 在实际应用中应该连接到deepseek API
  app.post("/api/ai-consultation", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ 
          success: false, 
          message: "Message is required" 
        });
      }
      
      // 实际项目中，这里应该调用deepseek API获取回复
      // 例如:
      // const response = await fetch('https://api.deepseek.com/v1/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'deepseek-r1',
      //     messages: [{role: 'user', content: message}]
      //   })
      // });
      // const data = await response.json();
      // const aiResponse = data.choices[0].message.content;
      
      // 模拟AI回复
      const aiResponse = `感谢您的咨询。您的问题关于"${message.substring(0, 30)}..."，从煤炭行业专业角度来看，我建议您考虑以下几点:

1. 市场趋势分析: 当前煤炭市场整体呈现稳中有升态势，但受季节性因素影响存在波动。
2. 供需平衡预测: 根据近期数据，国内动力煤供应充足，但优质焦煤仍有结构性短缺。
3. 政策影响评估: 考虑到最新环保政策要求，建议关注合规性生产和清洁利用技术。
4. 运营建议: 加强数字化转型，优化供应链管理，提高资源利用效率。

如果您需要更具体的分析和建议，欢迎提供更多详细信息，我可以为您提供更针对性的专业意见。`;
      
      return res.json({ 
        success: true, 
        message: "AI response generated successfully",
        data: aiResponse
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to generate AI response" 
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

  // Coal Quality Testing API Endpoints
  
  // Testing Agencies endpoints
  app.get("/api/testing-agencies", async (req, res) => {
    try {
      const agencies = await storage.getAllTestingAgencies();
      return res.status(200).json({
        success: true,
        data: agencies
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing agencies"
      });
    }
  });
  
  app.get("/api/testing-agencies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid agency ID" 
        });
      }
      
      const agency = await storage.getTestingAgencyById(id);
      
      if (!agency) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing agency not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: agency
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing agency"
      });
    }
  });
  
  app.post("/api/testing-agencies", async (req, res) => {
    try {
      const result = insertTestingAgencySchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const agency = await storage.createTestingAgency(result.data);
      return res.status(201).json({
        success: true,
        message: "Testing agency created successfully",
        data: agency
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create testing agency"
      });
    }
  });
  
  app.patch("/api/testing-agencies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid agency ID" 
        });
      }
      
      const result = insertTestingAgencySchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const updatedAgency = await storage.updateTestingAgency(id, result.data);
      
      if (!updatedAgency) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing agency not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Testing agency updated successfully",
        data: updatedAgency
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update testing agency"
      });
    }
  });
  
  // Testing Items endpoints
  app.get("/api/testing-items", async (req, res) => {
    try {
      const items = await storage.getAllTestingItems();
      return res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing items"
      });
    }
  });
  
  app.get("/api/testing-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid item ID" 
        });
      }
      
      const item = await storage.getTestingItemById(id);
      
      if (!item) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing item not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing item"
      });
    }
  });
  
  app.post("/api/testing-items", async (req, res) => {
    try {
      const result = insertTestingItemSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const item = await storage.createTestingItem(result.data);
      return res.status(201).json({
        success: true,
        message: "Testing item created successfully",
        data: item
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create testing item"
      });
    }
  });
  
  app.patch("/api/testing-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid item ID" 
        });
      }
      
      const result = insertTestingItemSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const updatedItem = await storage.updateTestingItem(id, result.data);
      
      if (!updatedItem) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing item not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Testing item updated successfully",
        data: updatedItem
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update testing item"
      });
    }
  });
  
  // Testing Records endpoints
  app.get("/api/testing-records", async (req, res) => {
    try {
      const records = await storage.getAllTestingRecords();
      return res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing records"
      });
    }
  });
  
  app.get("/api/testing-records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid record ID" 
        });
      }
      
      const record = await storage.getTestingRecordById(id);
      
      if (!record) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing record not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing record"
      });
    }
  });
  
  app.get("/api/testing-records/sample/:sampleId", async (req, res) => {
    try {
      const { sampleId } = req.params;
      const records = await storage.getTestingRecordsBySampleId(sampleId);
      
      return res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing records by sample ID"
      });
    }
  });
  
  app.get("/api/testing-records/agency/:agencyId", async (req, res) => {
    try {
      const agencyId = parseInt(req.params.agencyId);
      
      if (isNaN(agencyId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid agency ID" 
        });
      }
      
      const records = await storage.getTestingRecordsByAgencyId(agencyId);
      
      return res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing records by agency ID"
      });
    }
  });
  
  app.post("/api/testing-records", async (req, res) => {
    try {
      const result = insertTestingRecordSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const record = await storage.createTestingRecord(result.data);
      
      return res.status(201).json({
        success: true,
        message: "Testing record created successfully",
        data: record
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create testing record"
      });
    }
  });
  
  app.patch("/api/testing-records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid record ID" 
        });
      }
      
      const result = insertTestingRecordSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const updatedRecord = await storage.updateTestingRecord(id, result.data);
      
      if (!updatedRecord) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing record not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Testing record updated successfully",
        data: updatedRecord
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update testing record"
      });
    }
  });
  
  // Calculate weighted average for a testing record
  app.get("/api/testing-records/:id/weighted-average", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid record ID" 
        });
      }
      
      const weightedAverage = await storage.calculateWeightedAverage(id);
      
      if (!weightedAverage) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing record not found or has no results" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: weightedAverage
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to calculate weighted average"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
