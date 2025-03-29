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
  Thermometer, 
  AlertCircle, 
  Flame, 
  BarChart3, 
  Cpu,
  CloudLightning
} from 'lucide-react';

export default function ThermalImaging() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '热成像与温度感应系统 | 煤炭服务' : 'Thermal Imaging & Temperature Sensing System | Coal Services';
  }, [i18n.language]);

  // Sample thermal camera specifications
  const thermalCameraSpecs = [
    { 
      name: i18n.language === 'cn' ? '热灵敏度' : 'Thermal Sensitivity', 
      value: '<0.05°C' 
    },
    { 
      name: i18n.language === 'cn' ? '测量温度范围' : 'Temperature Measurement Range', 
      value: '-20°C ~ +550°C' 
    },
    { 
      name: i18n.language === 'cn' ? '温度精度' : 'Temperature Accuracy', 
      value: '±2°C or ±2%' 
    },
    { 
      name: i18n.language === 'cn' ? '红外分辨率' : 'IR Resolution', 
      value: '640 × 480 pixels' 
    },
    { 
      name: i18n.language === 'cn' ? '镜头视角' : 'Field of View', 
      value: '45° × 34°' 
    },
    { 
      name: i18n.language === 'cn' ? '防护等级' : 'Protection Rating', 
      value: 'IP67' 
    }
  ];

  // Sample application areas
  const applicationAreas = [
    {
      title: i18n.language === 'cn' ? '自燃探测与预警' : 'Spontaneous Combustion Detection & Early Warning',
      description: i18n.language === 'cn' 
        ? '实时监测煤堆温度异常变化，在早期阶段发现自燃隐患，及时预警并采取措施' 
        : 'Real-time monitoring of abnormal temperature changes in coal piles, detecting spontaneous combustion risks at an early stage, providing timely warnings and taking measures'
    },
    {
      title: i18n.language === 'cn' ? '发热点精确定位' : 'Precise Hotspot Localization',
      description: i18n.language === 'cn' 
        ? '准确定位煤堆内部温度异常区域，指导有针对性的干预和处理' 
        : 'Accurately locate temperature anomaly areas within coal piles, guiding targeted intervention and treatment'
    },
    {
      title: i18n.language === 'cn' ? '环境条件监测' : 'Environmental Condition Monitoring',
      description: i18n.language === 'cn' 
        ? '监测煤场周围环境温度变化，分析对煤堆安全的潜在影响' 
        : 'Monitor environmental temperature changes around coal yards and analyze potential impacts on coal pile safety'
    },
    {
      title: i18n.language === 'cn' ? '煤质特性分析' : 'Coal Quality Characteristic Analysis',
      description: i18n.language === 'cn' 
        ? '通过温度分布特征辅助分析煤炭品质和特性，优化存储和使用策略' 
        : 'Assist in analyzing coal quality and characteristics through temperature distribution patterns, optimizing storage and usage strategies'
    },
    {
      title: i18n.language === 'cn' ? '安全与应急管理' : 'Safety & Emergency Management',
      description: i18n.language === 'cn' 
        ? '作为安全管理系统的关键组成部分，提供可靠的温度监测数据支持决策' 
        : 'Serve as a key component of safety management systems, providing reliable temperature monitoring data to support decision-making'
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
                {i18n.language === 'cn' ? '热成像与温度感应系统' : 'Thermal Imaging & Temperature Sensing System'}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {i18n.language === 'cn' 
                  ? '先进热成像技术实时监测煤堆温度变化，防止自燃事故，全面保障安全生产' 
                  : 'Advanced thermal imaging technology to monitor coal pile temperature changes in real-time, prevent spontaneous combustion accidents, and fully ensure safe production'}
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

      {/* System Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {i18n.language === 'cn' ? '热成像系统概述' : 'Thermal Imaging System Overview'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '我们的热成像与温度感应系统利用先进红外技术检测物体辐射的热能，并创建可视化的温度分布图，无需任何物理接触即可精确测量煤堆温度。' 
                    : 'Our Thermal Imaging and Temperature Sensing System uses advanced infrared technology to detect heat radiated by objects and create visualized temperature distribution maps, precisely measuring coal pile temperatures without any physical contact.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn' 
                    ? '系统配备高灵敏度热成像摄像机和精密温度传感器，连续监测煤炭储存区域的温度变化。当检测到温度异常时，系统立即发出警报，并自动记录详细数据用于后续分析。' 
                    : 'The system is equipped with highly sensitive thermal imaging cameras and precise temperature sensors to continuously monitor temperature changes in coal storage areas. When temperature anomalies are detected, the system immediately issues alerts and automatically records detailed data for subsequent analysis.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Thermometer className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {i18n.language === 'cn' ? '温度连续监测' : 'Continuous Temperature Monitoring'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '24小时不间断监测煤堆表面和内部温度变化' 
                          : '24/7 uninterrupted monitoring of temperature changes on and within coal piles'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {i18n.language === 'cn' ? '异常温度预警' : 'Abnormal Temperature Alert'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '设置多级温度阈值，及时发现潜在风险区域' 
                          : 'Set multi-level temperature thresholds to promptly identify potential risk areas'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Flame className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {i18n.language === 'cn' ? '自燃风险防控' : 'Spontaneous Combustion Risk Prevention'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'cn' 
                          ? '提前识别自燃风险，指导预防性措施，避免火灾事故' 
                          : 'Identify spontaneous combustion risks in advance, guide preventive measures, and avoid fire accidents'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-center">
                  {i18n.language === 'cn' ? '关键优势' : 'Key Advantages'}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4 border-primary shadow-sm">
                    <div className="font-medium">
                      {i18n.language === 'cn' ? '早期风险识别' : 'Early Risk Identification'}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {i18n.language === 'cn' 
                        ? '在常规方法无法察觉的初级阶段发现热异常' 
                        : 'Detect thermal anomalies at early stages when conventional methods can\'t perceive them'}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-primary shadow-sm">
                    <div className="font-medium">
                      {i18n.language === 'cn' ? '无接触测量' : 'Non-contact Measurement'}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {i18n.language === 'cn' 
                        ? '远距离安全测温，无需接触煤堆，保障人员安全' 
                        : 'Safe temperature measurement from a distance without contacting coal piles, ensuring personnel safety'}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-primary shadow-sm">
                    <div className="font-medium">
                      {i18n.language === 'cn' ? '全面覆盖监测' : 'Comprehensive Coverage Monitoring'}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {i18n.language === 'cn' 
                        ? '大面积扫描检测，避免传统点测量遗漏风险区域' 
                        : 'Large-area scan detection, avoiding traditional point measurement missing risk areas'}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-primary shadow-sm">
                    <div className="font-medium">
                      {i18n.language === 'cn' ? '数据可视化' : 'Data Visualization'}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {i18n.language === 'cn' 
                        ? '直观的温度分布热图，便于管理人员快速分析和决策' 
                        : 'Intuitive temperature distribution heat maps for quick analysis and decision-making by management'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {i18n.language === 'cn' ? '应用领域' : 'Application Areas'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applicationAreas.map((area, index) => (
                <Card key={index} className="h-full border-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16" id="technical-specifications">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {i18n.language === 'cn' ? '技术规格' : 'Technical Specifications'}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {i18n.language === 'cn' ? '热成像摄像机规格' : 'Thermal Imaging Camera Specifications'}
                </h3>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Table>
                    <TableBody>
                      {thermalCameraSpecs.map((spec, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{spec.name}</TableCell>
                          <TableCell>{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  {i18n.language === 'cn' ? '温度监测系统特点' : 'Temperature Monitoring System Features'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {i18n.language === 'cn' ? '智能分析算法' : 'Intelligent Analysis Algorithms'}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {i18n.language === 'cn' 
                          ? '采用专为煤堆温度监测优化的AI算法，可自动识别异常温度模式和趋势' 
                          : 'Employs AI algorithms optimized for coal pile temperature monitoring, automatically identifying abnormal temperature patterns and trends'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {i18n.language === 'cn' ? '温度趋势分析' : 'Temperature Trend Analysis'}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {i18n.language === 'cn' 
                          ? '记录并分析长期温度变化趋势，提供预测性洞察和预警功能' 
                          : 'Records and analyzes long-term temperature change trends, providing predictive insights and early warning functions'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CloudLightning className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {i18n.language === 'cn' ? '环境因素补偿' : 'Environmental Factor Compensation'}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {i18n.language === 'cn' 
                          ? '自动考虑环境温度、湿度和气象条件的影响，确保测量精度' 
                          : 'Automatically accounts for the influence of environmental temperature, humidity, and meteorological conditions to ensure measurement accuracy'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {i18n.language === 'cn' ? '系统功能与能力' : 'System Functions & Capabilities'}
                </h3>
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {i18n.language === 'cn' ? '温度阈值设置' : 'Temperature Threshold Settings'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {i18n.language === 'cn' 
                        ? '支持多级温度阈值设置，可根据不同煤种特性和季节条件灵活调整。系统提供预警(45-60°C)、警告(60-80°C)和紧急(>80°C)三级警报机制。' 
                        : 'Supports multi-level temperature threshold settings that can be flexibly adjusted according to different coal type characteristics and seasonal conditions. The system provides a three-level alarm mechanism: pre-warning (45-60°C), warning (60-80°C), and emergency (>80°C).'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      {i18n.language === 'cn' ? '温度分布可视化' : 'Temperature Distribution Visualization'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {i18n.language === 'cn' 
                        ? '生成直观的煤堆表面温度热图，采用标准化色温显示方案。支持2D和3D可视化模式，方便从不同角度观察温度分布情况。' 
                        : 'Generates intuitive coal pile surface temperature heat maps using standardized color temperature display schemes. Supports both 2D and 3D visualization modes for convenient observation of temperature distribution from different angles.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      {i18n.language === 'cn' ? '历史数据分析' : 'Historical Data Analysis'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {i18n.language === 'cn' 
                        ? '存储所有历史温度数据，提供丰富的回溯分析工具。支持时间序列分析、区域对比分析和趋势预测功能，帮助深入了解煤堆温度变化规律。' 
                        : 'Stores all historical temperature data and provides rich retrospective analysis tools. Supports time series analysis, regional comparative analysis, and trend prediction functions to help gain in-depth understanding of coal pile temperature change patterns.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      {i18n.language === 'cn' ? '多系统集成' : 'Multi-system Integration'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {i18n.language === 'cn' 
                        ? '与消防系统、企业ERP和安全管理平台无缝集成，支持数据互通和联动响应。提供标准API接口，便于与第三方系统对接。' 
                        : 'Seamlessly integrates with fire protection systems, enterprise ERP, and safety management platforms, supporting data interchange and linked responses. Provides standard API interfaces for easy connection with third-party systems.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      {i18n.language === 'cn' ? '告警与通知' : 'Alerts & Notifications'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {i18n.language === 'cn' 
                        ? '提供多渠道的告警通知，包括控制中心显示、手机APP推送、短信、邮件和声光警报等。支持告警升级机制和确认回复流程。' 
                        : 'Provides multi-channel alert notifications, including control center display, mobile app push, SMS, email, and audio-visual alarms. Supports alarm escalation mechanisms and confirmation response processes.'}
                    </p>
                  </div>
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
                {i18n.language === 'cn' ? '陕西某大型煤矿' : 'Large Coal Mine in Shaanxi'}
              </h3>
              <p className="text-gray-600 mb-6">
                {i18n.language === 'cn' 
                  ? '该煤矿露天堆场面积达12万平方米，年处理量超过800万吨。在部署我们的热成像与温度感应系统前，每年平均发生2-3次煤堆自燃事件，导致材料损失和严重的安全隐患。' 
                  : 'This coal mine has an open-air stockyard area of 120,000 square meters with an annual throughput exceeding 8 million tons. Before deploying our thermal imaging and temperature sensing system, there were an average of 2-3 coal pile spontaneous combustion incidents per year, resulting in material losses and serious safety hazards.'}
              </p>
              <h4 className="font-semibold mb-2">
                {i18n.language === 'cn' ? '解决方案' : 'Solution'}
              </h4>
              <p className="text-gray-600 mb-4">
                {i18n.language === 'cn' 
                  ? '我们部署了8台高精度热成像摄像机，覆盖整个堆场区域，建立了24小时温度监测系统。系统根据不同区域煤种特性设置了差异化温度阈值，并与矿区安全管理系统集成。' 
                  : 'We deployed 8 high-precision thermal imaging cameras covering the entire stockyard area, establishing a 24-hour temperature monitoring system. The system set differentiated temperature thresholds according to coal type characteristics in different areas and integrated with the mine safety management system.'}
              </p>
              <h4 className="font-semibold mb-2">
                {i18n.language === 'cn' ? '成效' : 'Results'}
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>
                  {i18n.language === 'cn' 
                    ? '系统投入使用两年内，成功预警并处理了16次早期自燃风险，无一发展为实际火灾事件' 
                    : 'Within two years of system implementation, 16 early spontaneous combustion risks were successfully warned and handled, with none developing into actual fire incidents'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '精确识别煤堆内的热异常区域，使处理措施更加精准和高效，减少了不必要的材料处理' 
                    : 'Precisely identified thermal anomaly areas within coal piles, making treatment measures more accurate and efficient, reducing unnecessary material handling'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '通过预警系统和及时干预，预计每年节约损失成本超过200万元' 
                    : 'Through the early warning system and timely intervention, estimated annual loss cost savings exceeded 2 million yuan'}
                </li>
                <li>
                  {i18n.language === 'cn' 
                    ? '显著提升了矿区安全管理水平，获得安全生产监管部门的高度评价' 
                    : 'Significantly improved the level of mine safety management, receiving high praise from safety production regulatory departments'}
                </li>
              </ul>
              <div className="font-medium italic text-gray-700 border-l-4 border-primary pl-4 py-2">
                {i18n.language === 'cn' 
                  ? '"热成像系统极大提升了我们的煤堆安全管理能力，从被动应对转为主动预防。系统直观的温度可视化和智能预警功能，使我们能够在问题扩大前及时干预，保障了生产安全和财产安全。"' 
                  : '"The thermal imaging system has greatly enhanced our coal pile safety management capability, shifting from passive response to proactive prevention. The system\'s intuitive temperature visualization and intelligent early warning functions allow us to intervene in a timely manner before problems escalate, ensuring production and property safety."'}
              </div>
              <div className="text-right mt-2 text-gray-600">
                {i18n.language === 'cn' ? '— 陕西某大型煤矿安全总监' : '— Safety Director, Large Coal Mine in Shaanxi'}
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
              {i18n.language === 'cn' ? '升级您的煤堆安全监测系统' : 'Upgrade Your Coal Pile Safety Monitoring System'}
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '我们的热成像与温度感应系统是保障煤炭安全储存的理想解决方案，通过早期发现热异常，防患于未然。' 
                : 'Our thermal imaging and temperature sensing system is the ideal solution for ensuring safe coal storage by detecting thermal anomalies early and preventing problems before they occur.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '联系我们了解更多' : 'Contact Us to Learn More'}
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