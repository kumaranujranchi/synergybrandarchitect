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
console.log("Using Convex URL for Prerender:", convexUrl);
const convexHttpClient = new ConvexHttpClient(convexUrl);
const convexReactClient = new ConvexReactClient(convexUrl);

export async function render(url: string) {
  const helmetContext = {};
  
  // Basic pre-fetching logic for known routes
  // This can be expanded to be more dynamic
  let initialData: Record<string, any> = {};
  
  try {
    console.log(`Prerendering URL: ${url}`);
    if (url === "/blog") {
      const blogs = await convexHttpClient.query(api.blogs.listBlogs, { status: "published" });
      initialData["blogs.listBlogs"] = blogs;
      console.log(`Fetched ${blogs?.length} blogs for /blog`);
    } else if (url.startsWith("/blog/")) {
      const slug = url.replace("/blog/", "");
      console.log(`Fetching blog for slug: ${slug}`);
      const blog = await convexHttpClient.query(api.blogs.getBlogBySlug, { slug });
      if (blog) {
        initialData["blogs.getBlogBySlug"] = blog;
        console.log(`Successfully fetched blog: ${blog.title}`);
      } else {
        console.warn(`Blog not found for slug: ${slug}`);
      }
    } else if (url === "/portfolio") {
      const portfolio = await convexHttpClient.query(api.portfolio.listPortfolio, {});
      initialData["portfolio.listPortfolio"] = portfolio;
    }
  } catch (error) {
    console.error("Error pre-fetching data for", url, ":", error);
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

  console.log(`Render complete for ${url}. InitialData keys: ${Object.keys(initialData)}`);
  const dataString = JSON.stringify(initialData).replace(/</g, '\\u003c');
  const initialDataScript = `<script>window.__INITIAL_DATA__ = ${dataString}</script>`;
  
  const { helmet } = helmetContext as any;
  
  // Manual meta tags as a robust fallback/alternative
  let manualMeta = '';
  if (url.startsWith('/blog/')) {
    const blog = initialData["blogs.getBlogBySlug"];
    if (blog) {
      const title = blog.seoTitle || `${blog.title} | Synergy Brand Architect`;
      const description = blog.seoDescription || blog.excerpt || "";
      const image = blog.coverImage || "https://imagizer.imageshack.com/img924/5789/CC6b4R.png";
      
      manualMeta = `
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://synergybrandarchitect.in${url}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />
      `;
    }
  } else if (url === '/') {
    manualMeta = `
      <title>Best Digital Marketing Agency in Patna | Synergy Brand Architect</title>
      <meta name="description" content="Looking for the Best Digital Marketing Agency in Patna? Synergy Brand Architect offers top-notch SEO, Best Web Development in Patna, and Social Media Marketing services to scale your business." />
      <meta property="og:title" content="Best Digital Marketing Agency in Patna | Synergy Brand Architect" />
      <meta property="og:description" content="Looking for the Best Digital Marketing Agency in Patna? Synergy Brand Architect offers top-notch SEO, Best Web Development in Patna, and Social Media Marketing services to scale your business." />
      <meta property="og:image" content="https://imagizer.imageshack.com/img924/5789/CC6b4R.png" />
      <meta property="og:url" content="https://synergybrandarchitect.in" />
    `;
  }

  const head = `
      ${manualMeta || `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `}
      ${initialDataScript}
    `;

  return {
    html,
    head
  };
}

