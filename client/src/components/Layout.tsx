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
              {i18n.language === 'cn' ? '煤炭服务' : 'Coal Services'}
            </div>
          </Link>
        </div>
        
        <nav className="hidden lg:flex space-x-4">
          <Link href="/">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '主页' : 'Home'}
            </div>
          </Link>
          <Link href="/services/storage-monitoring">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤仓监管服务' : 'Storage Monitoring'}
            </div>
          </Link>
          <Link href="/services/weight-estimation">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤重估量服务' : 'Weight Estimation'}
            </div>
          </Link>
          <Link href="/services/price-estimation">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤价估算服务' : 'Price Estimation'}
            </div>
          </Link>
          <Link href="/services/product-collateral">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤品货押服务' : 'Product Collateral'}
            </div>
          </Link>
          <Link href="/services/transport">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤炭运输服务' : 'Transport'}
            </div>
          </Link>
          <Link href="/services/quality-testing">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤质检测服务' : 'Quality Testing'}
            </div>
          </Link>
          <Link href="/consultation">
            <div className="text-gray-700 hover:text-primary transition-colors cursor-pointer px-2">
              {i18n.language === 'cn' ? '煤事咨询服务' : 'Consultation'}
            </div>
          </Link>
        </nav>
        
        {/* Mobile menu button - we'll implement the mobile menu later */}
        <div className="lg:hidden">
          <Button variant="ghost" size="sm" className="px-2">
            <span className="sr-only">Open menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={toggleLanguage}
            className="text-gray-700 hover:text-primary"
          >
            {i18n.language === 'cn' ? 'EN' : '中文'}
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              {i18n.language === 'cn' ? '煤炭服务' : 'Coal Services'}
            </h3>
            <p className="text-gray-600 max-w-xs">
              {i18n.language === 'cn' 
                ? '提供先进技术和专业咨询的综合煤炭行业解决方案。' 
                : 'Providing integrated coal industry solutions with advanced technology and expert consultation.'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">
              {i18n.language === 'cn' ? '我们的服务' : 'Our Services'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/storage-monitoring">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤仓监管服务' : 'Storage Monitoring'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services/weight-estimation">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤重估量服务' : 'Weight Estimation'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services/price-estimation">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤价估算服务' : 'Price Estimation'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services/product-collateral">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤品货押服务' : 'Product Collateral'}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">
              {i18n.language === 'cn' ? '更多服务' : 'More Services'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/transport">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤炭运输服务' : 'Transport'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services/quality-testing">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤质检测服务' : 'Quality Testing'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/consultation">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '煤事咨询服务' : 'Consultation'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '全部服务' : 'All Services'}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">
              {i18n.language === 'cn' ? '公司信息' : 'Company'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '关于我们' : 'About Us'}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                    {i18n.language === 'cn' ? '联系我们' : 'Contact Us'}
                  </div>
                </Link>
              </li>
              <li>
                <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                  {i18n.language === 'cn' ? '隐私政策' : 'Privacy Policy'}
                </div>
              </li>
              <li>
                <div className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
                  {i18n.language === 'cn' ? '服务条款' : 'Terms of Service'}
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {currentYear} {i18n.language === 'cn' ? '煤炭服务有限公司' : 'Coal Services Co., Ltd.'}. 
            {i18n.language === 'cn' ? ' 版权所有' : ' All rights reserved.'}
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