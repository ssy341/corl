import { 
  users, type User, type InsertUser, 
  waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry,
  coalServices, type CoalService, type InsertCoalService,
  servicePages, type ServicePage, type InsertServicePage,
  consultationRequests, type ConsultationRequest, type InsertConsultationRequest
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
  
  // Coal Services methods
  createCoalService(service: InsertCoalService): Promise<CoalService>;
  getCoalServiceById(id: number): Promise<CoalService | undefined>;
  getCoalServiceBySlug(slug: string): Promise<CoalService | undefined>;
  getAllCoalServices(): Promise<CoalService[]>;
  updateCoalService(id: number, service: Partial<InsertCoalService>): Promise<CoalService | undefined>;
  
  // Service Pages methods
  createServicePage(page: InsertServicePage): Promise<ServicePage>;
  getServicePageById(id: number): Promise<ServicePage | undefined>;
  getServicePageBySlug(slug: string): Promise<ServicePage | undefined>;
  getServicePagesByServiceId(serviceId: number): Promise<ServicePage[]>;
  getAllServicePages(): Promise<ServicePage[]>;
  updateServicePage(id: number, page: Partial<InsertServicePage>): Promise<ServicePage | undefined>;
  
  // Consultation Requests methods
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequestById(id: number): Promise<ConsultationRequest | undefined>;
  getAllConsultationRequests(): Promise<ConsultationRequest[]>;
  updateConsultationRequestStatus(id: number, status: string): Promise<ConsultationRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, WaitlistEntry>;
  private coalServices: Map<number, CoalService>;
  private servicePages: Map<number, ServicePage>;
  private consultationRequests: Map<number, ConsultationRequest>;
  
  currentUserId: number;
  currentWaitlistId: number;
  currentCoalServiceId: number;
  currentServicePageId: number;
  currentConsultationRequestId: number;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.coalServices = new Map();
    this.servicePages = new Map();
    this.consultationRequests = new Map();
    
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
    this.currentCoalServiceId = 1;
    this.currentServicePageId = 1;
    this.currentConsultationRequestId = 1;
    
    // Initialize with coal services
    this.initializeCoalServices();
  }

  private async initializeCoalServices() {
    const services = [
      {
        slug: "storage-monitoring",
        icon: "src/assets/images/coal-storage.svg",
        nameEn: "Coal Storage Monitoring Services",
        nameCn: "煤仓监管服务",
        descriptionEn: "Real-time monitoring of coal stockpiles to prevent losses and ensure security.",
        descriptionCn: "利用先进技术实时监测煤炭库存，防止损失并确保安全。",
        featuresEn: JSON.stringify(["Real-time monitoring", "Security alerts", "Inventory management", "Temperature monitoring", "AI-powered cameras", "Access control"]),
        featuresCn: JSON.stringify(["实时监控", "安全警报", "库存管理", "温度监测", "AI智能摄像", "出入控制"]),
      },
      {
        slug: "weight-estimation",
        icon: "src/assets/images/weight-estimation.svg",
        nameEn: "Coal Weight Estimation Services",
        nameCn: "煤重估量服务",
        descriptionEn: "Precision 3D modeling for accurate coal stockpile weight estimation.",
        descriptionCn: "精确的3D建模，用于准确估算煤炭堆的重量。",
        featuresEn: JSON.stringify(["3D modeling", "Precision measurement", "Volume calculation", "Drone surveys", "AI analysis", "Regular reporting"]),
        featuresCn: JSON.stringify(["3D建模", "精密测量", "体积计算", "无人机测量", "AI分析", "定期报告"]),
      },
      {
        slug: "price-estimation",
        icon: "src/assets/images/price-estimation.svg",
        nameEn: "Coal Price Estimation Services",
        nameCn: "煤价估算服务",
        descriptionEn: "Market-driven coal pricing estimates based on quality and market conditions.",
        descriptionCn: "基于质量和市场条件的煤炭价格智能预测分析。",
        featuresEn: JSON.stringify(["Market analysis", "Price forecasting", "Quality-based pricing", "Historical trends", "Futures market data", "Custom price reports"]),
        featuresCn: JSON.stringify(["市场分析", "价格预测", "基于质量的定价", "历史趋势", "期货市场数据", "定制价格报告"]),
      },
      {
        slug: "product-collateral",
        icon: "src/assets/images/product-collateral.svg",
        nameEn: "Coal Product Collateral Services",
        nameCn: "煤品货押服务",
        descriptionEn: "Comprehensive collateral valuation services for coal products.",
        descriptionCn: "煤炭产品的综合抵押估值服务，安全便捷。",
        featuresEn: JSON.stringify(["Asset valuation", "Collateral management", "Documentation", "Secure storage", "Real-time monitoring", "Insurance options"]),
        featuresCn: JSON.stringify(["资产评估", "抵押品管理", "文档记录", "安全存储", "实时监控", "保险选择"]),
      },
      {
        slug: "transport",
        icon: "src/assets/images/transport.svg",
        nameEn: "Coal Transport Services",
        nameCn: "煤炭运输服务",
        descriptionEn: "Efficient logistics solutions for coal transportation needs.",
        descriptionCn: "高效可靠的煤炭运输物流解决方案。",
        featuresEn: JSON.stringify(["Route optimization", "Fleet management", "Delivery tracking", "Multimodal options", "Emergency delivery", "Customs clearance"]),
        featuresCn: JSON.stringify(["路线优化", "车队管理", "交付跟踪", "多式联运", "紧急运输", "海关清关"]),
      },
      {
        slug: "quality-testing",
        icon: "src/assets/icons/quality-testing-icon.svg",
        nameEn: "Coal Quality Testing Services",
        nameCn: "煤质检测服务",
        descriptionEn: "Advanced laboratory testing for coal quality assurance.",
        descriptionCn: "先进的实验室测试，确保煤炭质量达标。",
        featuresEn: JSON.stringify(["Chemical analysis", "Heat value testing", "Compliance certification", "International standards", "Rapid results", "Detailed reports"]),
        featuresCn: JSON.stringify(["化学分析", "热值测试", "合规认证", "国际标准", "快速结果", "详细报告"]),
      },
      {
        slug: "industry-consultation",
        icon: "src/assets/icons/consultation-icon.svg",
        nameEn: "Coal Industry Consultation Services",
        nameCn: "煤事咨询服务",
        descriptionEn: "Expert advice from industry professionals for coal-related businesses powered by AI.",
        descriptionCn: "结合人工智能技术，提供专业的煤炭行业专家建议。",
        featuresEn: JSON.stringify(["Market insights", "Operational efficiency", "Regulatory compliance", "AI-powered analysis", "Deepseek-R1 model", "24/7 availability"]),
        featuresCn: JSON.stringify(["市场洞察", "运营效率", "法规遵从", "AI驱动分析", "Deepseek-R1模型", "全天候服务"]),
      }
    ];

    for (const service of services) {
      await this.createCoalService(service as InsertCoalService);
    }
  }

  // User methods
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
    const createdAt = new Date();
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      role: insertUser.role || "user",
      createdAt 
    };
    this.users.set(id, user);
    return user;
  }

  // Waitlist methods
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
      serviceInterest: insertEntry.serviceInterest ?? null,
      message: insertEntry.message ?? null,
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

  // Coal Services methods
  async createCoalService(service: InsertCoalService): Promise<CoalService> {
    const id = this.currentCoalServiceId++;
    const now = new Date();
    const coalService: CoalService = {
      ...service,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.coalServices.set(id, coalService);
    return coalService;
  }

  async getCoalServiceById(id: number): Promise<CoalService | undefined> {
    return this.coalServices.get(id);
  }

  async getCoalServiceBySlug(slug: string): Promise<CoalService | undefined> {
    return Array.from(this.coalServices.values()).find(
      (service) => service.slug === slug
    );
  }

  async getAllCoalServices(): Promise<CoalService[]> {
    return Array.from(this.coalServices.values());
  }

  async updateCoalService(id: number, service: Partial<InsertCoalService>): Promise<CoalService | undefined> {
    const existingService = await this.getCoalServiceById(id);
    if (!existingService) return undefined;

    const updatedService: CoalService = {
      ...existingService,
      ...service,
      updatedAt: new Date()
    };

    this.coalServices.set(id, updatedService);
    return updatedService;
  }

  // Service Pages methods
  async createServicePage(page: InsertServicePage): Promise<ServicePage> {
    const id = this.currentServicePageId++;
    const now = new Date();
    const servicePage: ServicePage = {
      id,
      serviceId: page.serviceId,
      slug: page.slug,
      titleEn: page.titleEn,
      titleCn: page.titleCn,
      contentEn: page.contentEn,
      contentCn: page.contentCn,
      imageUrl: page.imageUrl ?? null,
      metaDescription: page.metaDescription ?? null,
      isPublished: page.isPublished ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.servicePages.set(id, servicePage);
    return servicePage;
  }

  async getServicePageById(id: number): Promise<ServicePage | undefined> {
    return this.servicePages.get(id);
  }

  async getServicePageBySlug(slug: string): Promise<ServicePage | undefined> {
    return Array.from(this.servicePages.values()).find(
      (page) => page.slug === slug
    );
  }

  async getServicePagesByServiceId(serviceId: number): Promise<ServicePage[]> {
    return Array.from(this.servicePages.values()).filter(
      (page) => page.serviceId === serviceId
    );
  }

  async getAllServicePages(): Promise<ServicePage[]> {
    return Array.from(this.servicePages.values());
  }

  async updateServicePage(id: number, page: Partial<InsertServicePage>): Promise<ServicePage | undefined> {
    const existingPage = await this.getServicePageById(id);
    if (!existingPage) return undefined;

    // Create a properly typed object
    const updatedPage: ServicePage = {
      ...existingPage,
      serviceId: page.serviceId ?? existingPage.serviceId,
      slug: page.slug ?? existingPage.slug,
      titleEn: page.titleEn ?? existingPage.titleEn,
      titleCn: page.titleCn ?? existingPage.titleCn,
      contentEn: page.contentEn ?? existingPage.contentEn,
      contentCn: page.contentCn ?? existingPage.contentCn,
      imageUrl: page.imageUrl !== undefined ? page.imageUrl : existingPage.imageUrl,
      metaDescription: page.metaDescription !== undefined ? page.metaDescription : existingPage.metaDescription,
      isPublished: page.isPublished !== undefined ? page.isPublished : existingPage.isPublished,
      updatedAt: new Date()
    };

    this.servicePages.set(id, updatedPage);
    return updatedPage;
  }

  // Consultation Requests methods
  async createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = this.currentConsultationRequestId++;
    const consultationRequest: ConsultationRequest = {
      id,
      name: request.name,
      email: request.email,
      company: request.company ?? null,
      phone: request.phone ?? null,
      serviceType: request.serviceType,
      message: request.message,
      status: "pending",
      createdAt: new Date()
    };
    this.consultationRequests.set(id, consultationRequest);
    return consultationRequest;
  }

  async getConsultationRequestById(id: number): Promise<ConsultationRequest | undefined> {
    return this.consultationRequests.get(id);
  }

  async getAllConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }

  async updateConsultationRequestStatus(id: number, status: string): Promise<ConsultationRequest | undefined> {
    const existingRequest = await this.getConsultationRequestById(id);
    if (!existingRequest) return undefined;

    const updatedRequest: ConsultationRequest = {
      ...existingRequest,
      status
    };

    this.consultationRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();
