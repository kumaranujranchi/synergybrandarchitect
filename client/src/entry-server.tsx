import ReactDOMServer from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { ConvexHttpClient } from "convex/browser";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import { api } from "../../convex/_generated/api";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "";
const convexHttpClient = new ConvexHttpClient(convexUrl);
const convexReactClient = new ConvexReactClient(convexUrl);

export async function render(url: string) {
  const helmetContext = {};
  
  // Basic pre-fetching logic for known routes
  // This can be expanded to be more dynamic
  let initialData: Record<string, any> = {};
  
  try {
    if (url === "/blog") {
      const blogs = await convexHttpClient.query(api.blogs.listBlogs, { status: "published" });
      initialData["blogs.listBlogs"] = blogs;
    } else if (url.startsWith("/blog/")) {
      const slug = url.replace("/blog/", "");
      const blog = await convexHttpClient.query(api.blogs.getBlogBySlug, { slug });
      initialData["blogs.getBlogBySlug"] = blog;
    } else if (url === "/portfolio") {
      const portfolio = await convexHttpClient.query(api.portfolio.listPortfolio, {});
      initialData["portfolio.listPortfolio"] = portfolio;
    }
  } catch (error) {
    console.error("Error pre-fetching data:", error);
  }

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <ConvexProvider client={convexReactClient}>
        <QueryClientProvider client={queryClient}>
          <Router ssrPath={url}>
            <App initialData={initialData} />
          </Router>
        </QueryClientProvider>
      </ConvexProvider>
    </HelmetProvider>
  );

  const { helmet } = helmetContext as any;

  return {
    html,
    head: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>
    `
  };
}

