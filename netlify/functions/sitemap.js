// Netlify Serverless Function: Dynamic Sitemap Generator
// This runs as a serverless function on Netlify and fetches live data from Convex

const { ConvexHttpClient } = require("convex/browser");

const BASE_URL = "https://synergybrandarchitect.in";

// Static pages that are always in the sitemap
const STATIC_PAGES = [
  { loc: "/",                              priority: "1.0", changefreq: "weekly"  },
  { loc: "/about",                         priority: "0.8", changefreq: "monthly" },
  { loc: "/services",                      priority: "0.9", changefreq: "monthly" },
  { loc: "/portfolio",                     priority: "0.8", changefreq: "weekly"  },
  { loc: "/contact",                       priority: "0.8", changefreq: "monthly" },
  { loc: "/careers",                       priority: "0.7", changefreq: "weekly"  },
  { loc: "/blog",                          priority: "0.8", changefreq: "weekly"  },
  { loc: "/resources",                     priority: "0.8", changefreq: "weekly"  },
  { loc: "/services/brand-building",       priority: "0.8", changefreq: "monthly" },
  { loc: "/services/social-media-marketing", priority: "0.8", changefreq: "monthly" },
  { loc: "/services/web-app-development",  priority: "0.8", changefreq: "monthly" },
  { loc: "/services/automation",           priority: "0.8", changefreq: "monthly" },
  { loc: "/services/performance-marketing", priority: "0.8", changefreq: "monthly" },
  { loc: "/services/seo",                  priority: "0.8", changefreq: "monthly" },
  { loc: "/case-studies",                  priority: "0.7", changefreq: "monthly" },
  { loc: "/case-studies/wishluv-buildcon", priority: "0.7", changefreq: "monthly" },
  { loc: "/case-studies/biryani-mahal",    priority: "0.7", changefreq: "monthly" },
  { loc: "/case-studies/the-helping-hand", priority: "0.7", changefreq: "monthly" },
  { loc: "/privacy-policy",               priority: "0.3", changefreq: "yearly"  },
  { loc: "/terms-of-service",             priority: "0.3", changefreq: "yearly"  },
  { loc: "/refund-policy",                priority: "0.3", changefreq: "yearly"  },
  { loc: "/sitemap",                      priority: "0.3", changefreq: "monthly" },
];

function urlEntry(loc, priority, changefreq, lastmod, extra = "") {
  return `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${extra}
  </url>`;
}

exports.handler = async function (event, context) {
  const today = new Date().toISOString().split("T")[0];

  let blogs = [];
  let jobs = [];

  try {
    const convexUrl = process.env.VITE_CONVEX_URL;
    if (!convexUrl) throw new Error("VITE_CONVEX_URL not set");

    const convex = new ConvexHttpClient(convexUrl);

    [blogs, jobs] = await Promise.all([
      convex.query("blogs:listBlogs", { status: "published" }).catch(() => []),
      convex.query("jobs:listJobs", { status: "open" }).catch(() => []),
    ]);
  } catch (err) {
    console.error("[Sitemap Function] Convex fetch error:", err.message);
    // Continue with static pages only - don't fail the whole sitemap
  }

  const staticXml = STATIC_PAGES.map((page) =>
    urlEntry(page.loc, page.priority, page.changefreq, today)
  ).join("");

  const blogXml = blogs
    .map((blog) => {
      const lastmod = blog.publishedAt || blog.updatedAt
        ? new Date(blog.publishedAt || blog.updatedAt).toISOString().split("T")[0]
        : today;
      return urlEntry(`/blog/${blog.slug}`, "0.6", "monthly", lastmod);
    })
    .join("");

  const jobXml = jobs
    .map((job) => {
      const lastmod = job.updatedAt
        ? new Date(job.updatedAt).toISOString().split("T")[0]
        : today;
      return urlEntry(`/careers/${job.slug}`, "0.5", "monthly", lastmod);
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-image/1.1
                            http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

  <!-- Main + Service + Case Studies + Legal Pages -->
${staticXml}

  <!-- Dynamic Blog Posts (${blogs.length} total) -->
${blogXml}

  <!-- Dynamic Job Listings (${jobs.length} total) -->
${jobXml}

</urlset>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
    body: xml,
  };
};
