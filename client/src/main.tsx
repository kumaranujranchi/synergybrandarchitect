import { hydrateRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "VITE_CONVEX_URL is not defined. Set it in .env and restart."
  );
}

const convex = new ConvexReactClient(convexUrl);

// Get initial data injected by the SSR server
const initialData = (window as any).__INITIAL_DATA__ ?? {};

hydrateRoot(
  document.getElementById("root")!,
  <HelmetProvider>
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <App initialData={initialData} />
      </QueryClientProvider>
    </ConvexProvider>
  </HelmetProvider>,
  {
    // Suppress recoverable hydration mismatches (e.g. animation states, timestamps)
    onRecoverableError: (error) => {
      if (import.meta.env.DEV) {
        console.debug("[Hydration] Recoverable mismatch:", (error as Error).message?.slice(0, 80));
      }
    }
  }
);

// Mark root as hydrated - releases FOUC protection from index.html critical CSS
document.getElementById("root")?.setAttribute("data-hydrated", "true");
