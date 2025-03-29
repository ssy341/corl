import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

// Define the CoalService type here (simplified)
interface CoalService {
  id: number;
  slug: string;
  titleEn: string;
  titleCn: string;
  descriptionEn: string;
  descriptionCn: string;
}

export default function Home() {
  const { t } = useTranslation();
  
  // Fetch services from the API
  const { data: services = [], isLoading } = useQuery<CoalService[]>({
    queryKey: ['/api/coal-services'],
    retry: false
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
                  <Button size="lg" variant="outline" className="border-white text-white">
                    {t('hero.secondary')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-xl p-6 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1581093803931-46e0f3865670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Coal Industry Technology" 
                    className="w-full h-auto rounded"
                  />
                </div>
                <div className="card-decoration top-[-20px] right-[-20px]"></div>
                <div className="card-decoration bottom-[-20px] left-[-20px]"></div>
              </div>
            </div>
          </div>
        </div>
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
                <div key={service.id} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg feature-card border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary text-xl">
                      {/* Icon placeholder */}
                      ⚙️
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.titleCn}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.descriptionCn}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="link" className="p-0 text-primary">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                {t('consultation.title')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('consultation.description')}
              </p>
              <Link href="/consultation">
                <Button className="bg-gradient text-white">
                  {t('consultation.cta')}
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-100">
                {/* AI consultation teaser */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <span className="text-primary text-xl">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 p-3 rounded-lg mb-2">
                      <p className="text-gray-800">
                        How can I optimize my coal storage monitoring system?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary text-xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-gray-800">
                        Based on industry standards, I recommend implementing automated drone surveys combined with our thermal imaging technology to create accurate 3D stockpile models. This approach reduces measurement errors by up to 40%...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
