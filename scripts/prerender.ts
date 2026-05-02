
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ConvexHttpClient } from 'convex/browser';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const templatePath = path.resolve(distPath, 'client/index.html');
const serverPath = path.resolve(distPath, 'server/entry-server.js');

// Import the render function from the built server bundle
// Using dynamic import because it's a generated file
const { render } = await import(serverPath);

const convexUrl = process.env.VITE_CONVEX_URL || "";
const convexHttpClient = new ConvexHttpClient(convexUrl);

// Define all routes to prerender
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/services/brand-building',
  '/services/social-media-marketing',
  '/services/web-app-development',
  '/services/automation',
  '/services/performance-marketing',
  '/services/seo',
  '/portfolio',
  '/blog',
  '/contact',
  '/careers',
  '/resources',
  '/case-studies',
  '/case-studies/wishluv-buildcon',
  '/case-studies/biryani-mahal',
  '/case-studies/the-helping-hand',
  '/privacy-policy',
  '/refund-policy',
  '/terms-of-service',
  '/sitemap'
];

async function getDynamicRoutes() {
  const routes = [];
  try {
    // Fetch blog slugs
    // We use a raw query name since we don't want to import the api object which has TS issues here
    const blogs = await convexHttpClient.query("blogs:listBlogs", { status: "published" });
    blogs.forEach(blog => {
      routes.push(`/blog/${blog.slug}`);
    });

    // Fetch job slugs
    const jobs = await convexHttpClient.query("jobs:listJobs", { status: "open" });
    jobs.forEach(job => {
      routes.push(`/careers/${job.slug}`);
    });
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
  }
  return routes;
}

async function run() {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const dynamicRoutes = await getDynamicRoutes();
  const routes = [...staticRoutes, ...dynamicRoutes];

  console.log(`Prerendering ${routes.length} routes...`);

  for (const url of routes) {
    try {
      console.log(`Rendering: ${url}`);
      const { html, head } = await render(url);
      if (url.includes('digital-marketing-kya-hai')) {
        fs.writeFileSync('scripts/debug_head.txt', head);
      }
      const fullHtml = template
        .replace(/<meta name="app-head-meta" content="placeholder" \/?>/, head)
        .replace('SSR_APP_HTML', html);

      // Determine output file path
      const fileName = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`;
      const filePath = path.join(distPath, 'client', fileName);

      // Create directory if it doesn't exist
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, fullHtml);
      
      if (url.startsWith('/blog/')) {
        const check = fs.readFileSync(filePath, 'utf-8');
        const hasData = check.includes('blogs.getBlogBySlug') && !check.includes('window.__INITIAL_DATA__ = {}');
        console.log(`VERIFICATION for ${url}: ${hasData ? '✅ PASSED' : '❌ FAILED'}`);
      }
    } catch (e) {
      console.error(`Failed to prerender ${url}:`, e);
    }
  }

  console.log('Prerendering complete!');
  process.exit(0);
}

run();
