import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  PieChart, 
  Database, 
  TrendingUp, 
  Layers,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function InventoryAnalysis() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '库存与变动分析系统 | 煤炭服务' : 'Inventory & Movement Analysis System | Coal Services';
  }, [i18n.language]);

  // Sample analysis features
  const analysisFeatures = [
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: i18n.language === 'cn' ? '实时库存监控' : 'Real-time Inventory Monitoring',
      description: i18n.language === 'cn' 
        ? '全天候追踪煤炭库存水平，提供准确的数量、位置和分类信息' 
        : 'Track coal inventory levels around the clock, providing accurate quantity, location, and classification information'
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: i18n.language === 'cn' ? '变动趋势分析' : 'Movement Trend Analysis',
      description: i18n.language === 'cn' 
        ? '分析库存变动模式和趋势，预测未来需求和供应情况' 
        : 'Analyze inventory movement patterns and trends, predicting future demand and supply conditions'
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: i18n.language === 'cn' ? '数据可视化报告' : 'Data Visualization Reports',
      description: i18n.language === 'cn' 
        ? '生成直观的图表和报告，展示库存状况、流动和关键指标' 
        : 'Generate intuitive charts and reports showing inventory status, flow, and key metrics'
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: i18n.language === 'cn' ? '多维度库存分析' : 'Multi-dimensional Inventory Analysis',
      description: i18n.language === 'cn' 
        ? '按煤种、质量、来源和存储位置等多维度分析库存构成' 
        : 'Analyze inventory composition by coal type, quality, source, storage location, and other dimensions'
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: i18n.language === 'cn' ? '库龄分析与预警' : 'Inventory Age Analysis & Alerts',
      description: i18n.language === 'cn' 
        ? '追踪煤炭库存时间，防止长期存储导致的质量下降和自燃风险' 
        : 'Track coal inventory time to prevent quality deterioration and spontaneous combustion risks from long-term storage'
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: i18n.language === 'cn' ? '异常变动预警' : 'Abnormal Movement Alerts',
      description: i18n.language === 'cn' 
        ? '自动识别和报告异常的库存变动，帮助防止盗窃和记录错误' 
        : 'Automatically identify and report abnormal inventory movements, helping prevent theft and record errors'
    }
  ];

  // Sample report types
  const reportTypes = {
    daily: {
      title: i18n.language === 'cn' ? '日报告' : 'Daily Reports',
      items: [
        i18n.language === 'cn' ? '每日库存水平摘要' : 'Daily inventory level summary',
        i18n.language === 'cn' ? '24小时内入库和出库活动' : 'Inbound and outbound activities within 24 hours',
        i18n.language === 'cn' ? '库存差异和异常分析' : 'Inventory discrepancies and anomaly analysis',
        i18n.language === 'cn' ? '关键库存指标每日变化' : 'Daily changes in key inventory metrics'
      ]
    },
    weekly: {
      title: i18n.language === 'cn' ? '周报告' : 'Weekly Reports',
      items: [
        i18n.language === 'cn' ? '周库存水平趋势' : 'Weekly inventory level trends',
        i18n.language === 'cn' ? '煤种和质量分布分析' : 'Coal type and quality distribution analysis',
        i18n.language === 'cn' ? '周转率和存储效率指标' : 'Turnover rate and storage efficiency metrics',
        i18n.language === 'cn' ? '每周库存高峰和低谷分析' : 'Weekly inventory peak and valley analysis'
      ]
    },
    monthly: {
      title: i18n.language === 'cn' ? '月报告' : 'Monthly Reports',
      items: [
        i18n.language === 'cn' ? '月度库存绩效指标' : 'Monthly inventory performance indicators',
        i18n.language === 'cn' ? '库存成本分析和优化建议' : 'Inventory cost analysis and optimization suggestions',
        i18n.language === 'cn' ? '库龄分析和质量风险评估' : 'Inventory age analysis and quality risk assessment',
        i18n.language === 'cn' ? '月度库存预测和计划建议' : 'Monthly inventory forecast and planning recommendations'
      ]
    },
    custom: {
      title: i18n.language === 'cn' ? '自定义报告' : 'Custom Reports',
      items: [
        i18n.language === 'cn' ? '特定时间段的库存分析' : 'Inventory analysis for specific time periods',
        i18n.language === 'cn' ? '自定义关键绩效指标报告' : 'Custom key performance indicator reports',
        i18n.language === 'cn' ? '特殊事件或异常情况深度分析' : 'In-depth analysis of special events or anomalies',
        i18n.language === 'cn' ? '管理层决策支持报告' : 'Management decision support reports'
      ]
    }
  };

  // Sample KPIs
  const keyPerformanceIndicators = [
    {
      name: i18n.language === 'cn' ? '库存准确率' : 'Inventory Accuracy Rate',
      description: i18n.language === 'cn' 
        ? '实际库存与系统记录的匹配程度，通常通过定期盘点确认' 
        : 'The degree of match between actual inventory and system records, typically confirmed through regular inventory counts',
      target: '≥ 99.5%'
    },
    {
      name: i18n.language === 'cn' ? '库存周转率' : 'Inventory Turnover Rate',
      description: i18n.language === 'cn' 
        ? '衡量煤炭库存更新速度，计算为年度消耗量除以平均库存' 
        : 'Measures the speed of coal inventory renewal, calculated as annual consumption divided by average inventory',
      target: i18n.language === 'cn' ? '行业标准: 6-12次/年' : 'Industry standard: 6-12 times/year'
    },
    {
      name: i18n.language === 'cn' ? '平均库存天数' : 'Average Inventory Days',
      description: i18n.language === 'cn' 
        ? '煤炭在库中停留的平均天数，反映库存持有时间' 
        : 'The average number of days coal stays in inventory, reflecting inventory holding time',
      target: '30-60 days'
    },
    {
      name: i18n.language === 'cn' ? '库存成本率' : 'Inventory Cost Rate',
      description: i18n.language === 'cn' 
        ? '库存持有成本占总库存价值的比例，包括资金占用、保险、损耗等' 
        : 'The proportion of inventory holding costs to total inventory value, including capital occupation, insurance, losses, etc.',
      target: '< 8%'
    },
    {
      name: i18n.language === 'cn' ? '库存异常率' : 'Inventory Anomaly Rate',
      description: i18n.language === 'cn' 
        ? '出现库存记录异常或物理状态异常的比例' 
        : 'The proportion of inventory records or physical status anomalies',
      target: '< 0.5%'
    },
    {
      name: i18n.language === 'cn' ? '需求预测准确率' : 'Demand Forecast Accuracy',
      description: i18n.language === 'cn' 
        ? '系统预测的需求与实际需求的匹配程度' 
        : 'The degree of match between system-predicted demand and actual demand',
      target: '≥ 90%'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/services/storage-monitoring">
                <Button variant="link" className="text-white p-0 mb-4">
                  <span className="mr-2">←</span>
                  {i18n.language === 'cn' ? '返回煤仓监管服务' : 'Back to Coal Storage Monitoring'}
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {i18n.language === 'cn' ? '库存与变动分析系统' : 'Inventory & Movement Analysis System'}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {i18n.language === 'cn' 
                  ? '利用先进的数据分析和人工智能技术，为煤炭库存管理提供精准洞察和智能决策支持' 
                  : 'Utilizing advanced data analytics and artificial intelligence to provide precise insights and intelligent decision support for coal inventory management'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/consultation">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  {i18n.language === 'cn' ? '预约系统演示' : 'Schedule a Demo'}
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '探索系统功能' : 'Explore System Features'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* System Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {i18n.language === 'cn' ? '系统概述' : 'System Overview'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '我们的库存与变动分析系统是一套全面的煤炭库存管理解决方案，集成了先进的数据采集、分析和可视化技术，帮助企业实现煤炭库存的智能化管理。' 
                    : 'Our Inventory and Movement Analysis System is a comprehensive coal inventory management solution that integrates advanced data collection, analysis, and visualization technologies to help enterprises achieve intelligent management of coal inventories.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn' 
                    ? '系统通过连续监测和分析煤炭库存水平、流动情况和质量状态，提供实时库存可视化和智能报告，帮助管理者做出更准确的采购、销售和库存优化决策。' 
                    : 'The system continuously monitors and analyzes coal inventory levels, movement, and quality status to provide real-time inventory visualization and intelligent reports, helping managers make more accurate purchasing, sales, and inventory optimization decisions.'}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary text-2xl font-bold mb-1">99.5%+</div>
                    <div className="text-gray-600 text-sm">
                      {i18n.language === 'cn' ? '库存记录准确率' : 'Inventory Record Accuracy'}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary text-2xl font-bold mb-1">15-20%</div>
                    <div className="text-gray-600 text-sm">
                      {i18n.language === 'cn' ? '平均库存成本降低' : 'Average Inventory Cost Reduction'}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary text-2xl font-bold mb-1">30%+</div>
                    <div className="text-gray-600 text-sm">
                      {i18n.language === 'cn' ? '库存管理效率提升' : 'Inventory Management Efficiency Improvement'}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-primary text-2xl font-bold mb-1">90%+</div>
                    <div className="text-gray-600 text-sm">
                      {i18n.language === 'cn' ? '需求预测准确率' : 'Demand Forecast Accuracy'}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '我们的系统已在多家大型煤炭企业成功部署，帮助客户优化库存结构，降低运营成本，提高资产利用效率。' 
                    : 'Our system has been successfully deployed in many large coal enterprises, helping customers optimize inventory structure, reduce operating costs, and improve asset utilization efficiency.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-center">
                  {i18n.language === 'cn' ? '核心系统优势' : 'Core System Advantages'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        {i18n.language === 'cn' ? '精准库存洞察' : 'Precise Inventory Insights'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '基于多源数据融合的库存分析，提供比传统系统更精准的库存状态和变动洞察' 
                          : 'Inventory analysis based on multi-source data fusion, providing more precise insights into inventory status and movement than traditional systems'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <PieChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        {i18n.language === 'cn' ? '智能决策支持' : 'Intelligent Decision Support'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '结合AI算法和行业知识，提供智能库存优化建议和预测分析，支持科学决策' 
                          : 'Combining AI algorithms and industry knowledge to provide intelligent inventory optimization suggestions and predictive analysis, supporting scientific decision-making'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        {i18n.language === 'cn' ? '数据整合能力' : 'Data Integration Capability'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '无缝整合多种数据源，包括ERP系统、测量设备、视频监控和手持设备等，形成统一的库存视图' 
                          : 'Seamlessly integrate multiple data sources, including ERP systems, measuring equipment, video monitoring, and handheld devices, to form a unified inventory view'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        {i18n.language === 'cn' ? '灵活扩展性' : 'Flexible Scalability'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '模块化设计支持根据企业需求灵活配置和扩展，适用于不同规模和类型的煤炭企业' 
                          : 'Modular design supports flexible configuration and expansion according to enterprise needs, suitable for coal enterprises of different scales and types'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {i18n.language === 'cn' ? '系统核心功能' : 'Core System Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {analysisFeatures.map((feature, index) => (
                <Card key={index} className="h-full border-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {i18n.language === 'cn' ? '报告与数据可视化' : 'Reports & Data Visualization'}
            </h2>
            <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              {i18n.language === 'cn' 
                ? '我们的系统提供全面的报告和可视化功能，以直观方式呈现库存数据和分析结果，帮助管理者快速获取关键信息和洞察。' 
                : 'Our system provides comprehensive reporting and visualization functions, presenting inventory data and analysis results in an intuitive way to help managers quickly access key information and insights.'}
            </p>
            
            <Tabs defaultValue="daily" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="daily">
                    {i18n.language === 'cn' ? '日报告' : 'Daily Reports'}
                  </TabsTrigger>
                  <TabsTrigger value="weekly">
                    {i18n.language === 'cn' ? '周报告' : 'Weekly Reports'}
                  </TabsTrigger>
                  <TabsTrigger value="monthly">
                    {i18n.language === 'cn' ? '月报告' : 'Monthly Reports'}
                  </TabsTrigger>
                  <TabsTrigger value="custom">
                    {i18n.language === 'cn' ? '自定义报告' : 'Custom Reports'}
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {Object.entries(reportTypes).map(([key, value]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-xl font-bold mb-6 text-center">
                      {value.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {value.items.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-primary">•</div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <p className="text-gray-600 italic mb-4">
                        {i18n.language === 'cn' 
                          ? '所有报告均支持多种格式导出，包括PDF、Excel和交互式Web仪表板。' 
                          : 'All reports support export in multiple formats, including PDF, Excel, and interactive web dashboards.'}
                      </p>
                      <div className="flex justify-center gap-4">
                        <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
                          PDF
                        </div>
                        <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
                          Excel
                        </div>
                        <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
                          {i18n.language === 'cn' ? '交互式仪表板' : 'Interactive Dashboard'}
                        </div>
                        <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
                          API
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Key Performance Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {i18n.language === 'cn' ? '关键绩效指标 (KPIs)' : 'Key Performance Indicators (KPIs)'}
            </h2>
            <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              {i18n.language === 'cn' 
                ? '我们的系统监控和分析以下关键绩效指标，帮助企业全面评估和优化库存管理绩效。' 
                : 'Our system monitors and analyzes the following key performance indicators to help enterprises comprehensively evaluate and optimize inventory management performance.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyPerformanceIndicators.map((kpi, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary">
                    {kpi.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {kpi.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {i18n.language === 'cn' ? '目标值:' : 'Target:'}
                    </div>
                    <div className="font-medium text-gray-900">
                      {kpi.target}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {i18n.language === 'cn' ? '系统集成' : 'System Integration'}
            </h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-600 mb-8">
                {i18n.language === 'cn' 
                  ? '我们的库存与变动分析系统设计为可与多种企业系统和数据源无缝集成，构建统一的煤炭库存管理平台。无论您使用哪种ERP系统或设备，我们都能提供适合的集成解决方案。' 
                  : 'Our Inventory and Movement Analysis System is designed to integrate seamlessly with various enterprise systems and data sources, building a unified coal inventory management platform. Regardless of which ERP system or equipment you use, we can provide suitable integration solutions.'}
              </p>
              
              <h3 className="text-xl font-semibold mb-4">
                {i18n.language === 'cn' ? '支持的集成系统' : 'Supported Integration Systems'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="font-medium mb-2">
                    {i18n.language === 'cn' ? 'ERP系统' : 'ERP Systems'}
                  </div>
                  <p className="text-gray-600 text-sm">
                    SAP, Oracle, Microsoft Dynamics, Infor, 金蝶, 用友
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="font-medium mb-2">
                    {i18n.language === 'cn' ? '测量与监控设备' : 'Measurement & Monitoring Equipment'}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {i18n.language === 'cn' 
                      ? '激光扫描仪、无人机系统、计量设备、传感器网络' 
                      : 'Laser scanners, drone systems, weighing equipment, sensor networks'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="font-medium mb-2">
                    {i18n.language === 'cn' ? '移动数据收集' : 'Mobile Data Collection'}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {i18n.language === 'cn' 
                      ? '手持终端、移动应用、RFID系统、条码扫描器' 
                      : 'Handheld terminals, mobile apps, RFID systems, barcode scanners'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <div className="font-medium mb-2">
                    {i18n.language === 'cn' ? '商业智能工具' : 'Business Intelligence Tools'}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Power BI, Tableau, QlikView, SAS BI
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">
                {i18n.language === 'cn' ? '集成方法与接口' : 'Integration Methods & Interfaces'}
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <p>
                    {i18n.language === 'cn' 
                      ? '标准API接口 (REST, SOAP, GraphQL)' 
                      : 'Standard API interfaces (REST, SOAP, GraphQL)'}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <p>
                    {i18n.language === 'cn' 
                      ? '数据库级集成与ETL工具' 
                      : 'Database-level integration and ETL tools'}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <p>
                    {i18n.language === 'cn' 
                      ? '文件导入/导出功能 (CSV, XML, JSON)' 
                      : 'File import/export functions (CSV, XML, JSON)'}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <p>
                    {i18n.language === 'cn' 
                      ? '自定义集成适配器与中间件' 
                      : 'Custom integration adapters and middleware'}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <p>
                    {i18n.language === 'cn' 
                      ? '实时数据集成与消息队列' 
                      : 'Real-time data integration and message queues'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {i18n.language === 'cn' ? '成功案例' : 'Success Case'}
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">
                {i18n.language === 'cn' ? '中国某大型煤炭集团' : 'Large Coal Group in China'}
              </h3>
              <p className="text-gray-600 mb-6">
                {i18n.language === 'cn' 
                  ? '该集团拥有年产量超过1亿吨的煤炭产能和多个大型煤炭中转库存基地。在实施我们的库存与变动分析系统前，他们面临库存记录不准确、周转效率低下和库存优化困难等问题。' 
                  : 'This group has a coal production capacity of over 100 million tons per year and multiple large coal transit inventory bases. Before implementing our inventory and movement analysis system, they faced problems such as inaccurate inventory records, low turnover efficiency, and difficulties in inventory optimization.'}
              </p>
              <h4 className="font-semibold mb-2">
                {i18n.language === 'cn' ? '解决方案' : 'Solution'}
              </h4>
              <p className="text-gray-600 mb-4">
                {i18n.language === 'cn' 
                  ? '我们部署了全面的库存与变动分析系统，集成了无人机测量、监控系统和企业ERP，建立了统一的煤炭库存视图。系统包括实时库存监控、多维度分析和智能预测功能，支持各级管理人员的决策需求。' 
                  : 'We deployed a comprehensive inventory and movement analysis system, integrating drone measurements, monitoring systems, and enterprise ERP to establish a unified coal inventory view. The system includes real-time inventory monitoring, multi-dimensional analysis, and intelligent prediction functions to support decision-making needs at all management levels.'}
              </p>
              <h4 className="font-semibold mb-2">
                {i18n.language === 'cn' ? '成效' : 'Results'}
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>
                  {i18n.language === 'cn' 
                    ? '库存记录准确率从96.5%提升至99.8%，基本消除了库存差异问题' 
                    : 'Inventory record accuracy improved from 96.5% to 99.8%, essentially eliminating inventory discrepancy issues'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '煤炭库存周转率提高了23%，平均库存天数减少了18天' 
                    : 'Coal inventory turnover rate increased by 23%, with average inventory days reduced by 18 days'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '通过库存优化，降低了约1,800万元的年度库存持有成本' 
                    : 'Through inventory optimization, annual inventory holding costs were reduced by approximately 18 million yuan'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '管理人员处理库存问题的时间减少了60%，决策效率显著提升' 
                    : 'Time spent by managers handling inventory issues reduced by 60%, significantly improving decision-making efficiency'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '基于精准的需求预测，避免了季节性短缺和过量库存问题' 
                    : 'Based on accurate demand forecasting, seasonal shortages and excess inventory issues were avoided'}
                </li>
              </ul>
              <div className="font-medium italic text-gray-700 border-l-4 border-primary pl-4 py-2">
                {i18n.language === 'cn' 
                  ? '"这套系统彻底改变了我们管理煤炭库存的方式。通过精确的数据分析和可视化工具，我们能够实时了解库存状况，预测未来需求，并优化库存水平。系统不仅提高了我们的运营效率，还显著降低了成本，成为我们经营决策的重要支持工具。"' 
                  : '"This system has completely changed the way we manage coal inventories. Through precise data analysis and visualization tools, we can understand inventory status in real-time, predict future demand, and optimize inventory levels. The system has not only improved our operational efficiency but also significantly reduced costs, becoming an important support tool for our business decisions."'}
              </div>
              <div className="text-right mt-2 text-gray-600">
                {i18n.language === 'cn' ? '— 中国某大型煤炭集团供应链总监' : '— Supply Chain Director, Large Coal Group in China'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {i18n.language === 'cn' ? '优化您的煤炭库存管理' : 'Optimize Your Coal Inventory Management'}
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '通过我们的库存与变动分析系统，掌握煤炭库存的每一个细节，提高决策准确性，降低运营成本。' 
                : 'Master every detail of your coal inventory, improve decision accuracy, and reduce operating costs with our Inventory and Movement Analysis System.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '预约免费咨询' : 'Schedule a Free Consultation'}
                </Button>
              </Link>
              <Link href="/services/storage-monitoring">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '探索更多监控解决方案' : 'Explore More Monitoring Solutions'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}