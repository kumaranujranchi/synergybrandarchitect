// Netlify Serverless Function: Dynamic Sitemap Generator
// Uses raw fetch to Convex HTTP API - no SDK dependency, no ESM issues

const BASE_URL = "https://synergybrandarchitect.in";

const STATIC_PAGES = [
  { loc: "/",                                priority: "1.0", changefreq: "weekly"  },
  { loc: "/about",                           priority: "0.8", changefreq: "monthly" },
  { loc: "/services",                        priority: "0.9", changefreq: "monthly" },
  { loc: "/portfolio",                       priority: "0.8", changefreq: "weekly"  },
  { loc: "/contact",                         priority: "0.8", changefreq: "monthly" },
  { loc: "/careers",                         priority: "0.7", changefreq: "weekly"  },
  { loc: "/blog",                            priority: "0.8", changefreq: "weekly"  },
  { loc: "/resources",                       priority: "0.8", changefreq: "weekly"  },
  { loc: "/services/brand-building",         priority: "0.8", changefreq: "monthly" },
  { loc: "/services/social-media-marketing", priority: "0.8", changefreq: "monthly" },
  { loc: "/services/web-app-development",    priority: "0.8", changefreq: "monthly" },
  { loc: "/services/automation",             priority: "0.8", changefreq: "monthly" },
  { loc: "/services/performance-marketing",  priority: "0.8", changefreq: "monthly" },
  { loc: "/services/seo",                    priority: "0.8", changefreq: "monthly" },
  { loc: "/case-studies",                    priority: "0.7", changefreq: "monthly" },
  { loc: "/case-studies/wishluv-buildcon",   priority: "0.7", changefreq: "monthly" },
  { loc: "/case-studies/biryani-mahal",      priority: "0.7", changefreq: "monthly" },
  { loc: "/case-studies/the-helping-hand",   priority: "0.7", changefreq: "monthly" },
  { loc: "/privacy-policy",                  priority: "0.3", changefreq: "yearly"  },
  { loc: "/terms-of-service",               priority: "0.3", changefreq: "yearly"  },
  { loc: "/refund-policy",                   priority: "0.3", changefreq: "yearly"  },
  { loc: "/sitemap",                         priority: "0.3", changefreq: "monthly" },
];

// Query Convex HTTP API directly - avoids ESM/CJS issues with the SDK
async function queryConvex(convexUrl, queryPath, args = {}) {
  const response = await fetch(`${convexUrl}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: queryPath, args, format: "json" }),
  });
  if (!response.ok) throw new Error(`Convex query failed: ${response.status}`);
  const data = await response.json();
  return data.value || [];
}

function urlEntry(loc, priority, changefreq, lastmod) {
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

exports.handler = async function (event, context) {
  const today = new Date().toISOString().split("T")[0];
  let blogs = [];
  let jobs = [];

  try {
    const convexUrl = process.env.VITE_CONVEX_URL;
    if (!convexUrl) throw new Error("VITE_CONVEX_URL not set");

    [blogs, jobs] = await Promise.all([
      queryConvex(convexUrl, "blogs:listBlogs", { status: "published" }).catch(() => []),
      queryConvex(convexUrl, "jobs:listJobs", { status: "open" }).catch(() => []),
    ]);
    console.log(`[Sitemap] Fetched ${blogs.length} blogs, ${jobs.length} jobs`);
  } catch (err) {
    console.error("[Sitemap] Error:", err.message);
  }

  const staticXml = STATIC_PAGES.map((p) =>
    urlEntry(p.loc, p.priority, p.changefreq, today)
  ).join("\n");

  const blogXml = blogs.map((blog) => {
    const lastmod = blog.publishedAt || blog.updatedAt
      ? new Date(blog.publishedAt || blog.updatedAt).toISOString().split("T")[0]
      : today;
    return urlEntry(`/blog/${blog.slug}`, "0.6", "monthly", lastmod);
  }).join("\n");

  const jobXml = jobs.map((job) => {
    const lastmod = job.updatedAt
      ? new Date(job.updatedAt).toISOString().split("T")[0]
      : today;
    return urlEntry(`/careers/${job.slug}`, "0.5", "monthly", lastmod);
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-image/1.1
                            http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

${staticXml}

${blogXml}

${jobXml}

</urlset>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
    body: xml,
  };
};
