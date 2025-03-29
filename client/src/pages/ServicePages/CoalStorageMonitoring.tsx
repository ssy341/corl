import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export default function CoalStorageMonitoring() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '煤仓监管服务 | 煤炭服务' : 'Coal Storage Monitoring | Coal Services';
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? '煤仓监管服务' : 'Coal Storage Monitoring Service'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '利用先进技术实时监测煤炭库存，防止损失并确保安全' 
                : 'Real-time monitoring of coal stockpiles using advanced technology to prevent losses and ensure security'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#features">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '了解更多' : 'Learn More'}
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '申请演示' : 'Request Demo'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Overview Section */}
      <section className="py-16" id="overview">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {i18n.language === 'cn' ? '全方位煤仓监管解决方案' : 'Comprehensive Coal Storage Monitoring Solution'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '我们的煤仓监管系统采用先进的传感器网络、智能摄像头和数据分析技术，为煤炭存储提供全天候不间断监控。' 
                    : 'Our coal storage monitoring system employs an advanced network of sensors, smart cameras, and data analytics to provide around-the-clock surveillance of coal stockpiles.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn' 
                    ? '该系统能够检测异常活动、防止煤炭盗窃、监控温度变化以防止自燃，并实时追踪库存水平，确保您的煤炭资产安全无虞。' 
                    : 'The system can detect unusual activities, prevent coal theft, monitor temperature changes to prevent spontaneous combustion, and track inventory levels in real-time, ensuring your coal assets remain secure.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '24/7 实时监控' : '24/7 Real-time Monitoring'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '全天候不间断监测所有煤炭存储区域' 
                          : 'Continuous monitoring of all coal storage areas'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '智能安全警报' : 'Intelligent Security Alerts'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '自动检测并报告可疑活动和异常情况' 
                          : 'Automatically detect and report suspicious activities and anomalies'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '高级数据分析' : 'Advanced Data Analytics'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '深入分析监控数据，提供可行见解' 
                          : 'In-depth analysis of monitoring data for actionable insights'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1581093804475-577d72e35330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80"
                    alt="Coal Storage Monitoring"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full z-[-1]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50" id="technologies">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '尖端监控技术' : 'Cutting-edge Monitoring Technologies'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们的煤仓监管系统采用多种先进技术确保您的煤炭存储安全' 
                  : 'Our coal storage monitoring system employs a variety of advanced technologies to ensure your coal storage remains secure'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl">📹</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '智能视频监控' : 'Smart Video Surveillance'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '采用人工智能分析的高清摄像系统' 
                      : 'High-definition camera systems with AI-powered analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的智能摄像系统全天候监控煤炭存储区域，自动检测异常活动并实时报警。系统配备先进的计算机视觉算法，能准确识别人员活动、车辆移动和其他安全隐患。' 
                      : 'Our smart surveillance system monitors coal storage areas around the clock, automatically detects anomalous activities, and raises alarms in real-time. Equipped with advanced computer vision algorithms, the system can accurately identify personnel activities, vehicle movements, and other security concerns.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-green-600 text-2xl">🌡️</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '热成像与温度感应' : 'Thermal Imaging & Temperature Sensing'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '监控煤堆温度变化预防自燃' 
                      : 'Monitor coal pile temperature changes to prevent spontaneous combustion'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的热成像系统可检测煤堆内部温度异常，提前发现自燃风险。系统通过分析温度数据趋势，预测潜在的热点区域，有效防止火灾事故发生。' 
                      : 'Our thermal imaging systems detect temperature anomalies within coal piles, identifying spontaneous combustion risks before they become hazardous. By analyzing temperature data trends, the system predicts potential hotspots, effectively preventing fire incidents.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-purple-600 text-2xl">📊</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '库存与变动分析' : 'Inventory & Movement Analytics'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '追踪煤炭库存水平和移动情况' 
                      : 'Track coal inventory levels and movements'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的系统可通过先进的计算机视觉技术实时监测煤炭堆体积变化，跟踪煤炭进出情况，自动生成库存报告，帮助您优化库存管理并防止意外损失。' 
                      : 'Our system monitors coal pile volume changes in real-time through advanced computer vision technology, tracks coal movements in and out, automatically generates inventory reports, and helps you optimize inventory management while preventing unexpected losses.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16" id="implementation">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '实施流程' : 'Implementation Process'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们采用系统化的方法为您的煤炭存储区域实施监控解决方案' 
                  : 'We take a systematic approach to implementing monitoring solutions for your coal storage areas'}
              </p>
            </div>

            <div className="relative">
              {/* Process steps with connecting lines */}
              <div className="hidden md:block absolute left-1/2 top-8 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
              
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '1. 站点评估与需求分析' : '1. Site Assessment & Requirements Analysis'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '我们的专家团队会详细评估您的煤炭存储设施，了解您的具体需求和挑战，并制定最适合您的监控策略。评估内容包括存储区域大小、环境条件、安全威胁和特殊监控需求。' 
                        : 'Our team of experts thoroughly assesses your coal storage facilities, understands your specific needs and challenges, and develops a monitoring strategy tailored to your requirements. The assessment includes storage area size, environmental conditions, security threats, and special monitoring needs.'}
                    </p>
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      1
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3">
                    <img 
                      src="https://images.unsplash.com/photo-1581093804661-b0441856ade7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                      alt="Site Assessment" 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 order-2 md:order-1">
                    <img 
                      src="https://images.unsplash.com/photo-1581093805715-ca345c0e1ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                      alt="System Design" 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      2
                    </div>
                  </div>
                  <div className="md:w-1/2 md:text-left order-3">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '2. 系统设计与规划' : '2. System Design & Planning'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '根据评估结果，我们的工程师团队设计完整的监控解决方案，包括摄像头位置、传感器布局、网络架构和控制中心设置。我们确保系统设计满足您的具体需求，同时考虑未来扩展可能性。' 
                        : 'Based on the assessment, our engineering team designs a comprehensive monitoring solution, including camera positions, sensor layout, network architecture, and control center setup. We ensure the system design meets your specific requirements while considering future expansion possibilities.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '3. 设备安装与配置' : '3. Equipment Installation & Configuration'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '我们的技术人员安装所有监控设备，包括摄像头、传感器、网络设备和控制系统。所有设备均由专业人员进行测试和校准，确保系统按照设计规范运行。' 
                        : 'Our technicians install all monitoring equipment, including cameras, sensors, network devices, and control systems. All equipment is tested and calibrated by professionals to ensure the system operates according to design specifications.'}
                    </p>
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      3
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3">
                    <img 
                      src="https://images.unsplash.com/photo-1581093458791-9cd87427edf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                      alt="Equipment Installation" 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 order-2 md:order-1">
                    <img 
                      src="https://images.unsplash.com/photo-1581093789050-9a432d5b3929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                      alt="Training and Support" 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      4
                    </div>
                  </div>
                  <div className="md:w-1/2 md:text-left order-3">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '4. 培训与持续支持' : '4. Training & Ongoing Support'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '我们为您的团队提供全面培训，确保他们能够有效操作和管理监控系统。我们还提供持续的技术支持、定期维护服务和系统升级，确保您的监控系统始终处于最佳状态。' 
                        : 'We provide comprehensive training for your team to ensure they can effectively operate and manage the monitoring system. We also offer ongoing technical support, regular maintenance services, and system upgrades to ensure your monitoring system always performs at its best.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50" id="case-studies">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '成功案例' : 'Case Studies'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '了解我们如何帮助客户解决煤炭存储监管挑战' 
                  : "See how we have helped clients solve their coal storage monitoring challenges"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581093921758-7b6b3a048770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Large Mining Operation Case Study" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>
                    {i18n.language === 'cn' ? '大型矿业公司煤仓安全升级' : 'Large Mining Operation Security Upgrade'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' ? '解决煤炭盗窃和安全挑战' : 'Addressing coal theft and security challenges'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '一家大型采矿公司面临严重的煤炭盗窃问题，每年损失数百万元。我们实施了全面的监控解决方案，包括AI驱动的视频监控、周界保护和访问控制系统，盗窃事件减少了95%，每年为客户节省超过800万元。' 
                      : 'A large mining company was facing serious coal theft issues, losing millions annually. We implemented a comprehensive monitoring solution with AI-driven video surveillance, perimeter protection, and access control systems, reducing theft incidents by 95% and saving the client over $8 million annually.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {i18n.language === 'cn' ? '阅读详情' : 'Read full case study'} →
                  </Button>
                </CardFooter>
              </Card>

              {/* Case Study 2 */}
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581093499603-ab4b094b30f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Power Plant Case Study" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>
                    {i18n.language === 'cn' ? '发电厂煤炭自燃预防系统' : 'Power Plant Combustion Prevention System'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' ? '利用热成像技术预防煤炭自燃' : 'Using thermal imaging to prevent coal spontaneous combustion'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '一家电力公司的煤炭存储区域曾多次发生自燃事件，造成重大损失。我们部署了先进的热成像系统和温度监测网络，能够提前检测潜在热点。系统实施后，成功预防了12起潜在自燃事件，保障了设施安全。' 
                      : 'A power company experienced several spontaneous combustion incidents in their coal storage areas, resulting in significant losses. We deployed an advanced thermal imaging system and temperature monitoring network that could detect potential hotspots early. After implementation, the system successfully prevented 12 potential combustion incidents, ensuring facility safety.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {i18n.language === 'cn' ? '阅读详情' : 'Read full case study'} →
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16" id="faqs">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '常见问题' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600">
                {i18n.language === 'cn' 
                  ? '关于我们煤仓监管服务的常见问题解答' 
                  : 'Common questions about our coal storage monitoring services'}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'cn' 
                    ? '煤仓监管系统的安装需要多长时间？' 
                    : 'How long does it take to install a coal storage monitoring system?'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '安装时间取决于您设施的规模和复杂性。小型监控系统可能只需1-2周完成，而大型综合系统可能需要1-3个月。我们的团队会在项目开始前提供详细的时间表。' 
                    : 'Installation time depends on the size and complexity of your facility. Small monitoring systems may be completed in 1-2 weeks, while large, comprehensive systems may take 1-3 months. Our team will provide a detailed timeline before the project begins.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'cn' 
                    ? '系统是否能在恶劣天气条件下正常工作？' 
                    : 'Does the system work in harsh weather conditions?'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '是的，我们的系统专为各种环境条件设计，包括极端温度、高湿度、灰尘和雨雪。我们使用工业级设备，能够在恶劣条件下维持可靠运行。' 
                    : 'Yes, our systems are designed for various environmental conditions, including extreme temperatures, high humidity, dust, and precipitation. We use industrial-grade equipment that maintains reliable operation under harsh conditions.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'cn' 
                    ? '监控系统是否需要持续的互联网连接？' 
                    : 'Does the monitoring system require continuous internet connectivity?'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '尽管互联网连接可以提供远程访问和云存储功能，但我们的系统设计有本地存储和处理能力，可以在互联网中断期间继续运行。数据会在连接恢复后自动同步。' 
                    : 'While internet connectivity provides remote access and cloud storage capabilities, our systems are designed with local storage and processing capabilities that can continue to operate during internet outages. Data will automatically synchronize when connectivity is restored.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'cn' 
                    ? '你们提供哪些培训和支持服务？' 
                    : 'What training and support services do you provide?'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '我们提供全面的操作人员培训，包括系统操作、基本维护和故障排除。我们还提供24/7技术支持、定期维护访问、软件更新和可选的扩展维护合同。' 
                    : 'We provide comprehensive operator training, including system operation, basic maintenance, and troubleshooting. We also offer 24/7 technical support, regular maintenance visits, software updates, and optional extended maintenance contracts.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {i18n.language === 'cn' ? '准备升级您的煤仓监管系统？' : 'Ready to Upgrade Your Coal Storage Monitoring?'}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {i18n.language === 'cn' 
              ? '联系我们获取免费咨询和演示，了解我们如何帮助您保护煤炭资产' 
              : 'Contact us for a free consultation and demonstration to learn how we can help secure your coal assets'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                {i18n.language === 'cn' ? '申请演示' : 'Request a Demo'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {i18n.language === 'cn' ? '联系我们' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}