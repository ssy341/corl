import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import "./lib/i18n"; // Import i18n configuration
import { queryClient } from "./lib/queryClient";
import { Toaster } from "sonner";
import { LanguageProvider } from "./hooks/use-language";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <App />
      <Toaster position="top-right" />
    </LanguageProvider>
  </QueryClientProvider>
);
