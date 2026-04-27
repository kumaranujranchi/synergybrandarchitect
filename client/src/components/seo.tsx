import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({ 
  title = "Synergy Brand Architect | Digital Marketing & Brand Building Agency",
  description = "Transform your brand with Synergy Brand Architect. We provide expert digital marketing, web development, SEO, and brand building services in Patna.",
  canonicalPath,
  ogImage = "https://imagizer.imageshack.com/img924/5789/CC6b4R.png",
  ogType = "website"
}: SEOProps) {
  const siteUrl = "https://synergybrandarchitect.in";
  // Ensure canonical path doesn't have double slashes if it starts with one
  const cleanPath = canonicalPath?.startsWith("/") ? canonicalPath : `/${canonicalPath || ""}`;
  const fullCanonicalUrl = canonicalPath === "" || canonicalPath === "/" 
    ? siteUrl 
    : `${siteUrl}${cleanPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
