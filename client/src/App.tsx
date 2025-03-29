import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import ConsultationPage from "@/pages/Consultation";
import ServiceDetail from "@/pages/ServiceDetail";

// We'll implement these pages later
const ServicesPage = () => <div className="container mx-auto px-4 py-12">Services Page</div>;
const ServiceDetailPage = () => <div className="container mx-auto px-4 py-12">Service Detail Page</div>;
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
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/consultation" component={ConsultationPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <>
      <Router />
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
