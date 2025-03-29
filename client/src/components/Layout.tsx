import { ReactNode } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

export function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'cn' ? 'en' : 'cn';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <header className="w-full py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-2xl font-bold text-primary cursor-pointer">
              Coal Services
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
              {t('nav.home')}
            </div>
          </Link>
          <Link href="/services">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
              {t('nav.services')}
            </div>
          </Link>
          <Link href="/about">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
              {t('nav.about')}
            </div>
          </Link>
          <Link href="/contact">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
              {t('nav.contact')}
            </div>
          </Link>
        </nav>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={toggleLanguage}
            className="text-gray-700 hover:text-primary"
          >
            {t('language.switch')}
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.company')}</h3>
            <p className="text-gray-600 max-w-xs">
              Providing integrated coal industry solutions with advanced technology and expert consultation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/coal-storage-monitoring">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    Coal Storage Monitoring
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services/weight-estimation">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    Weight Estimation
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services/price-estimation">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    Price Estimation
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/consultation">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    Consultation Services
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {t('nav.about')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {t('nav.contact')}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                  {t('footer.privacy')}
                </div>
              </li>
              <li>
                <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                  {t('footer.terms')}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {currentYear} {t('footer.company')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}