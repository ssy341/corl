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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CheckCircle, 
  AlertTriangle, 
  Video, 
  Film, 
  BarChart3, 
  Camera
} from 'lucide-react';

export default function VideoMonitoring() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '智能视频监控系统 | 煤炭服务' : 'Intelligent Video Monitoring System | Coal Services';
  }, [i18n.language]);

  // Sample camera specifications
  const cameraSpecifications = [
    { 
      name: i18n.language === 'cn' ? '分辨率' : 'Resolution', 
      value: '4K Ultra HD (3840×2160)' 
    },
    { 
      name: i18n.language === 'cn' ? '视角' : 'Field of View', 
      value: '120° × 90°' 
    },
    { 
      name: i18n.language === 'cn' ? '夜视能力' : 'Night Vision', 
      value: i18n.language === 'cn' ? '高性能红外辅助' : 'High-performance IR assistance' 
    },
    { 
      name: i18n.language === 'cn' ? '防尘防水等级' : 'Dustproof & Waterproof Rating', 
      value: 'IP66' 
    },
    { 
      name: i18n.language === 'cn' ? '工作温度' : 'Operating Temperature', 
      value: '-40°C ~ +65°C' 
    },
    { 
      name: i18n.language === 'cn' ? '摄像头旋转' : 'Camera Rotation', 
      value: i18n.language === 'cn' ? '水平360°，垂直180°' : 'Horizontal 360°, Vertical 180°' 
    }
  ];

  // Sample detection events
  const detectionEvents = [
    {
      type: i18n.language === 'cn' ? '人员入侵检测' : 'Unauthorized Personnel Detection',
      description: i18n.language === 'cn' 
        ? '检测非授权人员进入煤炭储存区域，并发出警报' 
        : 'Detects unauthorized personnel entering coal storage areas and triggers alerts'
    },
    {
      type: i18n.language === 'cn' ? '车辆跟踪' : 'Vehicle Tracking',
      description: i18n.language === 'cn' 
        ? '跟踪和监控所有进入煤场的车辆，记录装卸活动' 
        : 'Tracks and monitors all vehicles entering the coal yard, recording loading and unloading activities'
    },
    {
      type: i18n.language === 'cn' ? '烟雾检测' : 'Smoke Detection',
      description: i18n.language === 'cn' 
        ? '检测煤堆中的烟雾迹象，防止自燃事故' 
        : 'Detects signs of smoke in coal piles, preventing spontaneous combustion incidents'
    },
    {
      type: i18n.language === 'cn' ? '堆体形状变化' : 'Pile Shape Changes',
      description: i18n.language === 'cn' 
        ? '监测煤堆形状变化，检测滑坡风险和土方移动' 
        : 'Monitors changes in coal pile shapes, detecting landslide risks and earth movement'
    },
    {
      type: i18n.language === 'cn' ? '操作规范性监控' : 'Operations Compliance Monitoring',
      description: i18n.language === 'cn' 
        ? '确保装卸和库存管理活动符合安全和操作规范' 
        : 'Ensures loading, unloading, and inventory management activities comply with safety and operational standards'
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
                {i18n.language === 'cn' ? '智能视频监控系统' : 'Intelligent Video Monitoring System'}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {i18n.language === 'cn' 
                  ? '全天候监控煤炭储存区域的先进系统，集成人工智能分析，确保安全并优化运营' 
                  : '24/7 monitoring of coal storage areas with advanced AI analytics to ensure safety and optimize operations'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/consultation">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  {i18n.language === 'cn' ? '预约系统演示' : 'Schedule a Demo'}
                </Button>
              </Link>
              <Link href="#technical-specifications">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '查看技术规格' : 'View Technical Specifications'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {i18n.language === 'cn' ? '智能视频监控系统功能' : 'Intelligent Video Monitoring System Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '全天候实时监控' : '24/7 Real-time Monitoring'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '部署高清摄像头网络，覆盖煤场全区域，实现全天候无间断监控。支持远程查看、回放和操作。' 
                      : 'Deploy a network of HD cameras covering the entire coal yard for continuous monitoring. Support remote viewing, playback, and operation.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Film className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? 'AI智能分析' : 'AI-Powered Analytics'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '集成计算机视觉和深度学习算法，自动检测异常事件、人员活动和安全风险，并进行智能分类。' 
                      : 'Integrate computer vision and deep learning algorithms to automatically detect anomalies, personnel activities, and security risks with intelligent classification.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '智能告警系统' : 'Intelligent Alert System'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '基于预设规则和机器学习识别异常情况，及时发送多渠道告警通知，支持短信、邮件、App推送等方式。' 
                      : 'Identify anomalies based on preset rules and machine learning, sending timely multi-channel alert notifications via SMS, email, app notifications, etc.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '视频数据分析' : 'Video Data Analytics'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '提取视频数据关键信息，生成操作报告和趋势分析，帮助优化煤场管理和提升工作效率。' 
                      : 'Extract key information from video data to generate operational reports and trend analyses, helping optimize coal yard management and improve work efficiency.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '合规与安全记录' : 'Compliance & Safety Recording'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '自动记录和归档所有操作活动，确保合规性并提供完整的审计跟踪，满足监管要求和内部安全标准。' 
                      : 'Automatically record and archive all operational activities to ensure compliance and provide complete audit trails, meeting regulatory requirements and internal safety standards.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '高级相机控制' : 'Advanced Camera Controls'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '支持PTZ（平移-倾斜-缩放）控制和自动巡航路径设置，实现精确区域监控和自动化巡查。' 
                      : 'Support for PTZ (Pan-Tilt-Zoom) controls and automatic patrol path settings, enabling precise area monitoring and automated inspections.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-16 bg-gray-50" id="technical-specifications">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {i18n.language === 'cn' ? '技术规格' : 'Technical Specifications'}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {i18n.language === 'cn' ? '高清摄像头规格' : 'HD Camera Specifications'}
                </h3>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Table>
                    <TableBody>
                      {cameraSpecifications.map((spec, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{spec.name}</TableCell>
                          <TableCell>{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {i18n.language === 'cn' ? '智能视频分析能力' : 'Intelligent Video Analytics Capabilities'}
                </h3>
                <div className="space-y-4">
                  {detectionEvents.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-primary">
                      <div className="font-medium text-gray-900 mb-1">{event.type}</div>
                      <div className="text-gray-600 text-sm">{event.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                {i18n.language === 'cn' ? '系统集成能力' : 'System Integration Capabilities'}
              </h3>
              <p className="text-gray-600 mb-4">
                {i18n.language === 'cn' 
                  ? '我们的智能视频监控系统设计为可与您现有的管理系统无缝集成，包括：' 
                  : 'Our intelligent video monitoring system is designed to integrate seamlessly with your existing management systems, including:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  {i18n.language === 'cn' ? '企业资源规划 (ERP) 系统' : 'Enterprise Resource Planning (ERP) systems'}
                </li>
                <li>
                  {i18n.language === 'cn' ? '仓库管理系统 (WMS)' : 'Warehouse Management Systems (WMS)'}
                </li>
                <li>
                  {i18n.language === 'cn' ? '现有的安防和监控系统' : 'Existing security and surveillance systems'}
                </li>
                <li>
                  {i18n.language === 'cn' ? '生产管理平台' : 'Production management platforms'}
                </li>
                <li>
                  {i18n.language === 'cn' ? '数据分析和报告工具' : 'Data analytics and reporting tools'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {i18n.language === 'cn' ? '实施流程' : 'Implementation Process'}
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 lg:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="flex-1 lg:pr-12 lg:text-right mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-primary">
                      {i18n.language === 'cn' ? '1. 现场评估与规划' : '1. Site Assessment & Planning'}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {i18n.language === 'cn' 
                        ? '我们的专家团队进行现场考察，评估煤场布局和监控需求，确定摄像头位置和覆盖范围。' 
                        : 'Our expert team conducts on-site inspections, assesses coal yard layout and monitoring needs, and determines camera positions and coverage areas.'}
                    </p>
                  </div>
                  <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold lg:mx-4">
                    1
                  </div>
                  <div className="flex-1 lg:pl-12 hidden lg:block"></div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="flex-1 lg:pr-12 hidden lg:block"></div>
                  <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold lg:mx-4">
                    2
                  </div>
                  <div className="flex-1 lg:pl-12 mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-primary">
                      {i18n.language === 'cn' ? '2. 系统定制与部署' : '2. System Customization & Deployment'}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {i18n.language === 'cn' 
                        ? '根据客户需求定制解决方案，安装摄像头和硬件设备，配置视频管理软件和云平台。' 
                        : 'Customize solutions based on client needs, install cameras and hardware devices, and configure video management software and cloud platforms.'}
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="flex-1 lg:pr-12 lg:text-right mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-primary">
                      {i18n.language === 'cn' ? '3. AI模型训练与优化' : '3. AI Model Training & Optimization'}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {i18n.language === 'cn' 
                        ? '收集和标注特定场景数据，训练AI模型识别关键事件和异常情况，优化算法提高准确性。' 
                        : 'Collect and label specific scene data, train AI models to recognize key events and anomalies, and optimize algorithms to improve accuracy.'}
                    </p>
                  </div>
                  <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold lg:mx-4">
                    3
                  </div>
                  <div className="flex-1 lg:pl-12 hidden lg:block"></div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="flex-1 lg:pr-12 hidden lg:block"></div>
                  <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold lg:mx-4">
                    4
                  </div>
                  <div className="flex-1 lg:pl-12 mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-primary">
                      {i18n.language === 'cn' ? '4. 系统集成与测试' : '4. System Integration & Testing'}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {i18n.language === 'cn' 
                        ? '将监控系统与企业现有系统整合，进行全面测试和性能验证，确保稳定性和可靠性。' 
                        : 'Integrate the monitoring system with existing enterprise systems, conduct comprehensive testing and performance verification to ensure stability and reliability.'}
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
                  <div className="flex-1 lg:pr-12 lg:text-right">
                    <h3 className="text-xl font-bold text-primary">
                      {i18n.language === 'cn' ? '5. 培训与持续支持' : '5. Training & Ongoing Support'}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {i18n.language === 'cn' 
                        ? '为客户团队提供系统操作培训，建立24/7技术支持机制，提供定期维护和系统升级服务。' 
                        : 'Provide system operation training for the client\'s team, establish 24/7 technical support mechanisms, and offer regular maintenance and system upgrade services.'}
                    </p>
                  </div>
                  <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold lg:mx-4">
                    5
                  </div>
                  <div className="flex-1 lg:pl-12 hidden lg:block"></div>
                </div>
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
              {i18n.language === 'cn' ? '升级您的煤炭仓储安全与管理' : 'Upgrade Your Coal Storage Safety & Management'}
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '我们的智能视频监控系统为您提供全方位保障，让煤场管理更智能、更高效、更安全。' 
                : 'Our intelligent video monitoring system provides comprehensive protection, making coal yard management smarter, more efficient, and safer.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '立即咨询' : 'Get in Touch Now'}
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '查看成功案例' : 'View Success Stories'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}