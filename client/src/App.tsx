import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import ConsultationPage from "@/pages/Consultation";
import ServiceDetail from "@/pages/ServiceDetail";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import TechnologyDetails from "@/pages/ServicePages/TechnologyDetails";
import VideoMonitoring from "@/pages/SubPages/VideoMonitoring";
import ThermalImaging from "@/pages/SubPages/ThermalImaging";
import InventoryAnalysis from "@/pages/SubPages/InventoryAnalysis";
import ImplementationProcess from "@/pages/ServicePages/ImplementationProcess";
import Transport from "@/pages/ServicePages/Transport";
import { LanguageProvider } from "@/hooks/use-language";

// We'll implement these pages later
const ServicesPage = () => <div className="container mx-auto px-4 py-12">Services Page</div>;
const AboutPage = () => <div className="container mx-auto px-4 py-12">About Page</div>;
const ContactPage = () => <div className="container mx-auto px-4 py-12">Contact Page</div>;

function Router() {
  // Smooth scroll implementation for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      // Only process anchor links
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#') && target.pathname === window.location.pathname) {
        e.preventDefault();
        
        const targetId = target.hash;
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL without reloading the page
          history.pushState(null, '', targetId);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/transport" component={Transport} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/technology/:tech-type" component={TechnologyDetails} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/:id" component={CaseStudyDetail} />
      <Route path="/consultation" component={ConsultationPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/sub-pages/video-monitoring" component={VideoMonitoring} />
      <Route path="/sub-pages/thermal-imaging" component={ThermalImaging} />
      <Route path="/sub-pages/inventory-analysis" component={InventoryAnalysis} />
      <Route path="/implementation-process" component={ImplementationProcess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <LanguageProvider>
        <Layout>
          <Router />
        </Layout>
      </LanguageProvider>
      <style dangerouslySetInnerHTML={{
        __html: `
        .bg-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%);
        }
        .card-decoration {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          z-index: -1;
        }
        .feature-card:hover {
          transform: translateY(-5px);
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .float {
          animation: float 6s ease-in-out infinite;
        }
        `
      }} />
    </>
  );
}

export default App;
