import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics, trackPageView } from "./lib/analytics";

// Initialize analytics
initAnalytics();

// Track initial page view
if (typeof window !== 'undefined') {
  // Small delay to ensure GA4 script is loaded
  setTimeout(() => {
    const initialPath = window.location.pathname + window.location.hash;
    trackPageView(initialPath, document.title);
  }, 500);
}

createRoot(document.getElementById("root")!).render(<App />);
