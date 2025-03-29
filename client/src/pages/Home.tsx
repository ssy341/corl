import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

// Import hero background
import heroBackground from '@/assets/images/hero-background.svg';

// Define the CoalService type here (simplified)
interface CoalService {
  id: number;
  slug: string;
  icon: string;
  nameEn: string;
  nameCn: string;
  descriptionEn: string;
  descriptionCn: string;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  
  // Fetch services from the API
  const { data: services = [], isLoading } = useQuery<CoalService[]>({
    queryKey: ['/api/coal-services'],
    retry: false
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="text-white py-20 bg-no-repeat bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                {t('hero.title')}
              </h1>
              <p className="text-xl mb-8 text-slate-300">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-gradient text-white font-medium">
                    {t('hero.cta')}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    {t('hero.secondary')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <img 
                    src="/src/assets/images/coal-storage.svg" 
                    alt="Coal Storage Monitoring" 
                    className="w-full h-auto rounded-lg shadow-lg bg-slate-800/80 p-4 transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <img 
                    src="/src/assets/images/weight-estimation.svg" 
                    alt="Weight Estimation" 
                    className="w-full h-auto rounded-lg shadow-lg bg-slate-800/80 p-4 transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <img 
                    src="/src/assets/images/quality-testing.svg" 
                    alt="Quality Testing" 
                    className="w-full h-auto rounded-lg shadow-lg bg-slate-800/80 p-4 transition-all duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeleton
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg feature-card border border-gray-100">
                  <div className="w-12 h-12 mb-4 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))
            ) : services?.length ? (
              // Render actual services
              services.map((service: CoalService) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] feature-card border border-gray-100">
                  <div className="w-20 h-20 mb-4 bg-primary/5 rounded-lg p-1 overflow-hidden">
                    <img 
                      src={`/${service.icon}`} 
                      alt={i18n.language === 'cn' ? service.nameCn : service.nameEn}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {i18n.language === 'cn' ? service.nameCn : service.nameEn}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {i18n.language === 'cn' ? service.descriptionCn : service.descriptionEn}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                      {t('services.viewDetails')} →
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              // Fallback for empty services
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-500">Loading services...</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Consultation Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-gradient-to-r from-blue-700/10 to-purple-700/10 p-1 rounded-lg mb-4 w-fit">
                <p className="text-primary text-sm px-3 py-1 font-medium">Deepseek-R1 AI Model</p>
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t('consultation.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('consultation.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-600 rounded-full">✓</span>
                  <span>{i18n.language === 'cn' ? '先进的AI技术分析' : 'Advanced AI-Powered Analysis'}</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-600 rounded-full">✓</span>
                  <span>{i18n.language === 'cn' ? '专业行业知识库' : 'Expert Industry Knowledge'}</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-600 rounded-full">✓</span>
                  <span>{i18n.language === 'cn' ? '实时数据集成' : 'Real-time Data Integration'}</span>
                </li>
              </ul>
              <Link href="/consultation">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                  {t('consultation.cta')}
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/src/assets/images/consultation.svg" 
                alt="AI Coal Industry Consultation"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
