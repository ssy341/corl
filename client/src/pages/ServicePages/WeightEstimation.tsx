import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export default function WeightEstimation() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Set document title
  useEffect(() => {
    document.title = language === 'cn' ? '煤重估量服务 | 煤炭服务' : 'Coal Weight Estimation | Coal Services';
  }, [language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'cn' ? '煤重估量服务' : 'Coal Weight Estimation Service'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {language === 'cn' 
                ? '利用精确3D建模技术进行煤炭堆精准重量估算' 
                : 'Precision 3D modeling for accurate coal stockpile weight estimation'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#technology">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {language === 'cn' ? '了解技术' : 'Explore Technology'}
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {language === 'cn' ? '申请演示' : 'Request Demo'}
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
                  {language === 'cn' ? '精确的煤炭重量估算解决方案' : 'Precise Coal Weight Estimation Solution'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {language === 'cn' 
                    ? '我们的煤重估量服务利用尖端的3D测量技术，提供极高精度的煤炭堆体积和重量估算，帮助企业精确管理库存和优化运营。' 
                    : 'Our coal weight estimation service utilizes cutting-edge 3D measurement technology to provide highly accurate stockpile volume and weight calculations, helping businesses precisely manage inventory and optimize operations.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {language === 'cn' 
                    ? '通过先进的无人机航拍、激光雷达扫描和智能算法，我们的系统可以在短时间内收集大型煤炭堆的详细数据，并生成高精度的三维模型，实现±1.5%以内的重量估算精度。' 
                    : 'Using advanced drone aerial photography, LiDAR scanning, and intelligent algorithms, our system can collect detailed data of large coal stockpiles in a short time and generate high-precision three-dimensional models, achieving weight estimation accuracy within ±1.5%.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {language === 'cn' ? '高精度测量' : 'High-Precision Measurement'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'cn' 
                          ? '精度达到±1.5%，远超传统估算方法' 
                          : 'Accuracy up to ±1.5%, far exceeding traditional estimation methods'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {language === 'cn' ? '快速数据采集' : 'Rapid Data Collection'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'cn' 
                          ? '大型煤场几小时内完成测量，无需停止操作' 
                          : 'Complete measurements of large coal yards within hours, no operational stoppage required'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {language === 'cn' ? '全面分析报告' : 'Comprehensive Analysis Reports'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'cn' 
                          ? '详细的3D模型、体积计算和趋势分析' 
                          : 'Detailed 3D models, volume calculations, and trend analysis'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1581093458791-9cd87427edf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80"
                    alt="Coal Weight Estimation"
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

      {/* Technology Section */}
      <section className="py-16 bg-gray-50" id="technology">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'cn' ? '我们的估重技术' : 'Our Weight Estimation Technology'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'cn' 
                  ? '我们结合多种先进技术，提供业内最精确的煤炭重量估算' 
                  : 'We combine multiple advanced technologies to provide the most accurate coal weight estimation in the industry'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl">🛩️</span>
                  </div>
                  <CardTitle>
                    {language === 'cn' ? '无人机航拍测量' : 'Drone Aerial Survey'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'cn' 
                      ? '高精度航拍测绘技术' 
                      : 'High-precision aerial mapping technology'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {language === 'cn' 
                      ? '我们使用专业测绘无人机进行高分辨率航拍，采集数百甚至数千个测量点，生成煤堆的精确点云数据。无人机配备厘米级精度的RTK定位系统，能够在短时间内完成大面积煤场的测量工作。' 
                      : 'We use professional mapping drones for high-resolution aerial photography, collecting hundreds or even thousands of measurement points to generate precise point cloud data of coal piles. Drones are equipped with centimeter-level precision RTK positioning systems, capable of completing measurements of large coal yards in a short time.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {language === 'cn' ? '了解更多' : 'Learn more'} →
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-green-600 text-2xl">📊</span>
                  </div>
                  <CardTitle>
                    {language === 'cn' ? '3D建模与体积计算' : '3D Modeling & Volume Calculation'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'cn' 
                      ? '精确三维重建和体积分析' 
                      : 'Precise three-dimensional reconstruction and volume analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {language === 'cn' 
                      ? '我们的软件将采集的点云数据处理成高精度的三维模型，并通过先进的体积计算算法，精确计算出煤堆的实际体积。系统考虑了地形起伏、堆积形状和基础面等因素，确保计算结果的准确性。' 
                      : 'Our software processes the collected point cloud data into high-precision three-dimensional models and accurately calculates the actual volume of coal piles through advanced volume calculation algorithms. The system considers factors such as terrain undulations, pile shapes, and base surfaces to ensure calculation accuracy.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {language === 'cn' ? '了解更多' : 'Learn more'} →
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-purple-600 text-2xl">⚖️</span>
                  </div>
                  <CardTitle>
                    {language === 'cn' ? '密度分析与重量转换' : 'Density Analysis & Weight Conversion'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'cn' 
                      ? '智能密度估算和重量计算' 
                      : 'Intelligent density estimation and weight calculation'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {language === 'cn' 
                      ? '我们的系统通过采集煤炭样品和历史数据，建立了精确的煤炭密度模型。结合实时测量的煤堆体积和智能密度估算算法，系统可以准确计算出煤堆的总重量，误差控制在±1.5%以内。' 
                      : 'Our system has established an accurate coal density model by collecting coal samples and historical data. Combined with real-time measured coal pile volumes and intelligent density estimation algorithms, the system can accurately calculate the total weight of coal piles with an error margin within ±1.5%.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-primary">
                    {language === 'cn' ? '了解更多' : 'Learn more'} →
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16" id="benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'cn' ? '使用我们服务的优势' : 'Benefits of Using Our Service'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'cn' 
                  ? '精确的煤重估算为您的业务带来显著优势' 
                  : 'Accurate coal weight estimation brings significant advantages to your business'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <span className="text-blue-600 text-xl">💰</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === 'cn' ? '提高财务准确性' : 'Improve Financial Accuracy'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '传统的煤炭估重方法误差可达10-15%，这会导致库存价值评估不准确、交易定价错误和财务报表失真。我们的系统将误差控制在1.5%以内，大幅提高财务准确性，帮助您做出更明智的业务决策。' 
                    : 'Traditional coal weight estimation methods can have errors of 10-15%, leading to inaccurate inventory value assessment, incorrect transaction pricing, and distorted financial statements. Our system controls errors within 1.5%, greatly improving financial accuracy and helping you make more informed business decisions.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '精确的库存价值评估' : 'Precise inventory value assessment'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '准确的交易计量' : 'Accurate transaction measurements'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '可靠的财务报表数据' : 'Reliable financial statement data'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <span className="text-green-600 text-xl">⏱️</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === 'cn' ? '提升运营效率' : 'Enhance Operational Efficiency'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '我们的测量系统不需要停止煤场操作，能够在几小时内完成大型煤场的测量。相比传统人工测量方法，我们的方案可以节省90%的时间和人力成本，同时提供更准确的结果。' 
                    : 'Our measurement system doesn\'t require stopping coal yard operations and can complete measurements of large coal yards within hours. Compared to traditional manual measurement methods, our solution can save 90% of time and labor costs while providing more accurate results.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '无需停止煤场运营' : 'No need to stop coal yard operations'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '显著减少测量时间' : 'Significantly reduce measurement time'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '降低人力资源成本' : 'Lower human resource costs'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                  <span className="text-yellow-600 text-xl">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === 'cn' ? '优化库存管理' : 'Optimize Inventory Management'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '定期、准确的煤堆测量使您能够实时了解库存水平，优化采购和销售决策，减少库存持有成本。我们的系统还能够追踪煤堆变化趋势，帮助识别潜在的库存损失或盗窃问题。' 
                    : 'Regular, accurate coal pile measurements allow you to understand inventory levels in real-time, optimize purchasing and sales decisions, and reduce inventory holding costs. Our system can also track coal pile change trends, helping to identify potential inventory losses or theft issues.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '实时库存水平监控' : 'Real-time inventory level monitoring'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '数据驱动的采购决策' : 'Data-driven purchasing decisions'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '识别潜在的库存损失' : 'Identify potential inventory losses'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
                  <span className="text-red-600 text-xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {language === 'cn' ? '增强合规性与透明度' : 'Enhance Compliance & Transparency'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '我们的测量方法符合国际标准，提供可靠、可审计的数据，帮助您满足监管要求和合同义务。详细的3D模型和测量报告为内部审计、外部验证和争议解决提供了强有力的证据。' 
                    : 'Our measurement methods comply with international standards, providing reliable, auditable data to help you meet regulatory requirements and contractual obligations. Detailed 3D models and measurement reports provide strong evidence for internal audits, external verification, and dispute resolution.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '符合国际标准的测量' : 'Measurements compliant with international standards'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '可审计的数据报告' : 'Auditable data reports'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {language === 'cn' ? '强有力的争议解决证据' : 'Strong evidence for dispute resolution'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'cn' ? '服务流程' : 'How It Works'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'cn' 
                  ? '我们的煤重估算服务流程简单高效' 
                  : 'Our coal weight estimation service process is simple and efficient'}
              </p>
            </div>

            <div className="relative">
              {/* Process steps with connecting lines */}
              <div className="hidden md:block absolute left-[45px] top-10 bottom-10 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center z-10 relative">
                      <span className="text-primary text-2xl font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      {language === 'cn' ? '初步评估与规划' : 'Initial Assessment & Planning'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === 'cn' 
                        ? '我们的团队会评估您的煤场布局和测量需求，制定最佳测量计划，包括测量频率、无人机飞行路径和基准点设置。' 
                        : 'Our team assesses your coal yard layout and measurement needs to develop an optimal measurement plan, including measurement frequency, drone flight paths, and benchmark setups.'}
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500">
                        {language === 'cn' 
                          ? '⏱️ 时间：通常需要1-2天完成初步评估' 
                          : '⏱️ Time: Initial assessment usually takes 1-2 days'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center z-10 relative">
                      <span className="text-primary text-2xl font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      {language === 'cn' ? '数据采集' : 'Data Collection'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === 'cn' 
                        ? '我们的专业技术人员使用高精度测绘无人机进行现场数据采集，为煤堆生成详细的点云数据。整个过程高效快速，不会干扰您的日常运营。' 
                        : 'Our professional technicians use high-precision mapping drones for on-site data collection, generating detailed point cloud data for coal piles. The entire process is efficient and quick, without disrupting your daily operations.'}
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500">
                        {language === 'cn' 
                          ? '⏱️ 时间：大型煤场通常需要2-4小时完成数据采集' 
                          : '⏱️ Time: Data collection for large coal yards usually takes 2-4 hours'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center z-10 relative">
                      <span className="text-primary text-2xl font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      {language === 'cn' ? '数据处理与分析' : 'Data Processing & Analysis'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === 'cn' 
                        ? '采集的原始数据经过我们专业软件处理，生成高精度的三维模型，计算煤堆体积，并结合密度分析转换为重量。我们的算法会自动识别和修正地形变化，确保计算准确性。' 
                        : 'The collected raw data is processed by our professional software to generate high-precision three-dimensional models, calculate coal pile volumes, and convert to weight through density analysis. Our algorithms automatically identify and correct terrain changes to ensure calculation accuracy.'}
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500">
                        {language === 'cn' 
                          ? '⏱️ 时间：通常在24小时内完成数据处理' 
                          : '⏱️ Time: Data processing is usually completed within 24 hours'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center z-10 relative">
                      <span className="text-primary text-2xl font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      {language === 'cn' ? '报告生成与交付' : 'Report Generation & Delivery'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === 'cn' 
                        ? '我们生成全面的测量报告，包括煤堆体积、重量估算、3D可视化模型和详细分析。报告可通过安全的客户门户网站访问，也可以根据需要以PDF或其他格式导出。' 
                        : 'We generate comprehensive measurement reports, including coal pile volume, weight estimation, 3D visualization models, and detailed analysis. Reports can be accessed through a secure client portal and exported in PDF or other formats as needed.'}
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-500">
                        {language === 'cn' 
                          ? '⏱️ 时间：数据处理完成后立即提供报告' 
                          : '⏱️ Time: Reports are provided immediately after data processing is completed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'cn' ? '客户评价' : 'Client Testimonials'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'cn' 
                  ? '听听我们客户对煤重估量服务的评价' 
                  : 'Hear what our clients say about our coal weight estimation service'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">
                      {language === 'cn' ? '张经理' : 'Manager Zhang'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'cn' ? '大型煤矿企业' : 'Large Coal Mining Enterprise'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  {language === 'cn' 
                    ? '"我们公司使用传统方法估算煤堆重量已有多年，平均误差在8-10%。自从使用了这项服务，我们的估算误差降到了1.5%以内，大大提高了我们的库存管理精度和财务报表准确性。"' 
                    : '"Our company had been using traditional methods to estimate coal pile weights for many years, with an average error of 8-10%. Since using this service, our estimation error has been reduced to within 1.5%, greatly improving the precision of our inventory management and the accuracy of our financial statements."'}
                </p>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">
                      {language === 'cn' ? '李总监' : 'Director Li'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'cn' ? '电力集团' : 'Power Group'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  {language === 'cn' 
                    ? '"我们电厂的煤炭库存管理一直是个挑战，特别是在进行月度库存盘点时。这项服务不仅提高了我们的测量准确性，还将测量时间从以前的2-3天缩短到几个小时，大大提高了效率。"' 
                    : '"Coal inventory management at our power plant has always been a challenge, especially during monthly inventory counts. This service not only improved our measurement accuracy but also reduced the measurement time from 2-3 days to just a few hours, greatly improving efficiency."'}
                </p>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'cn' ? '常见问题' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'cn' 
                  ? '关于我们煤重估量服务的常见问题' 
                  : 'Common questions about our coal weight estimation service'}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'cn' 
                    ? '这项服务的测量精度有多高？' 
                    : 'How accurate is this service?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '我们的煤重估量服务在标准条件下可达到±1.5%的精度，远高于传统方法的8-15%误差范围。实际精度会根据煤堆形状、天气条件和煤炭类型略有不同，我们会在每次测量报告中提供具体的精度评估。' 
                    : 'Our coal weight estimation service can achieve an accuracy of ±1.5% under standard conditions, far exceeding the 8-15% error range of traditional methods. Actual accuracy may vary slightly depending on pile shape, weather conditions, and coal type. We provide specific accuracy assessments in each measurement report.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'cn' 
                    ? '服务频率如何确定？' 
                    : 'How is the service frequency determined?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '服务频率可根据您的具体需求定制。一些客户选择每周进行一次测量以进行精细化管理，而其他客户可能只需要每月或每季度进行测量。我们会根据您的业务需求、预算和煤炭周转率提供建议。' 
                    : 'Service frequency can be customized according to your specific needs. Some clients choose weekly measurements for refined management, while others may only need monthly or quarterly measurements. We provide recommendations based on your business needs, budget, and coal turnover rate.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'cn' 
                    ? '恶劣天气是否会影响测量？' 
                    : 'Does bad weather affect measurements?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '强风、暴雨或浓雾等极端天气条件可能会影响无人机飞行安全和数据质量，因此我们通常会避免在这些条件下进行测量。然而，轻微的阴雨天气通常不会影响我们的服务。如果遇到天气问题，我们会与您协商重新安排测量时间。' 
                    : 'Extreme weather conditions such as strong winds, heavy rain, or dense fog may affect drone flight safety and data quality, so we typically avoid measurements under these conditions. However, mild rainy weather usually doesn\'t affect our service. If weather issues arise, we\'ll work with you to reschedule the measurement.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'cn' 
                    ? '如何确定煤炭密度进行重量换算？' 
                    : 'How is coal density determined for weight conversion?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'cn' 
                    ? '我们采用多种方法确定煤炭密度：1）采集现场煤炭样品进行实验室测试；2）分析历史称重数据与体积测量结果；3）根据煤炭类型应用行业标准密度参数。我们通常会结合多种方法，并考虑天气、堆放时间等因素进行综合分析，确保密度估算的准确性。' 
                    : 'We use multiple methods to determine coal density: 1) Collecting on-site coal samples for laboratory testing; 2) Analyzing historical weighing data against volume measurements; 3) Applying industry standard density parameters based on coal type. We typically combine multiple methods and consider factors such as weather and storage time for comprehensive analysis to ensure the accuracy of density estimation.'}
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
            {language === 'cn' ? '准备提升您的煤炭测量精度？' : 'Ready to Improve Your Coal Measurement Accuracy?'}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'cn' 
              ? '联系我们安排演示，了解我们如何为您提供精确的煤重估量服务' 
              : 'Contact us to arrange a demonstration and learn how we can provide you with precise coal weight estimation services'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                {language === 'cn' ? '申请演示' : 'Request a Demo'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {language === 'cn' ? '联系我们' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}