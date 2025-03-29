import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";

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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
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
    </QueryClientProvider>
  );
}

export default App;
