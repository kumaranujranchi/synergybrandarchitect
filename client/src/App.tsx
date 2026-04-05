import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
// Popup removed: user requested disabling the site-wide promotional popup.
// Service Recommendation (AI Assistant) removed as requested
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import RefundPolicy from "@/pages/refund-policy";
import TermsOfService from "@/pages/terms-of-service";

import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Resources from "@/pages/resources";
import Sitemap from "@/pages/sitemap";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import ContactPage from "@/pages/contact";
import CaseStudyPage from "@/pages/case-study";
import AboutPage from "@/pages/about";
import SearchPage from "@/pages/search";

import BrandBuilding from "@/pages/services/brand-building";
import SocialMedia from "@/pages/services/social-media";
import WebApp from "@/pages/services/web-app";
import Automation from "@/pages/services/automation";
import PerformanceMarketing from "@/pages/services/performance-marketing";
import SEO from "@/pages/services/seo";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminSubmissions from "@/pages/admin/submissions";
import AdminUsers from "@/pages/admin/users";
import AdminBlogs from "@/pages/admin/blogs/index";
import AdminBlogEditor from "@/pages/admin/blogs/editor";
import AdminPortfolio from "@/pages/admin/portfolio/index";
import AdminPortfolioEditor from "@/pages/admin/portfolio/editor";

import WishluvBuildconCaseStudy from "@/pages/case-studies/wishluv-buildcon";
import BiryaniMahalCaseStudy from "@/pages/case-studies/biryani-mahal";
import TheHelpingHandCaseStudy from "@/pages/case-studies/the-helping-hand";

import AuthPage from "@/pages/auth-page";
import ResetPasswordPage from "@/pages/reset-password";
import { useEffect, lazy, Suspense } from "react";
import { scrollToTop } from "@/lib/scrollHelper";
import { AuthProvider } from "@/hooks/use-auth";
import { updateSchemaMarkup } from "@/utils/schemaMarkup";

import { SmoothScroll } from "@/components/SmoothScroll";


function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />

      <Route path="/services" component={Services} />
      <Route path="/services/brand-building" component={BrandBuilding} />
      <Route path="/services/social-media-marketing" component={SocialMedia} />
      <Route path="/services/web-app-development" component={WebApp} />
      <Route path="/services/automation" component={Automation} />
      <Route path="/services/performance-marketing" component={PerformanceMarketing} />
      <Route path="/services/seo" component={SEO} />
      <Route path="/portfolio" component={Portfolio} />
      {/* User routes removed */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      
      {/* Resources Route */}
      <Route path="/resources" component={Resources} />
      <Route path="/resources/templates" component={Resources} />
      
      {/* Blog Routes */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      
      {/* Contact Route */}
      <Route path="/contact" component={ContactPage} />
      
      {/* About Route */}
      <Route path="/about" component={AboutPage} />
      
      {/* Search Route */}
      <Route path="/search" component={SearchPage} />
      
      {/* Case Study Routes */}
      <Route path="/case-study" component={CaseStudyPage} />
      <Route path="/case-studies" component={CaseStudyPage} />
      
      {/* Sitemap Route */}
      <Route path="/sitemap" component={Sitemap} />
      
      {/* Case Study Routes */}
      <Route path="/case-studies/wishluv-buildcon" component={WishluvBuildconCaseStudy} />
      <Route path="/case-studies/biryani-mahal" component={BiryaniMahalCaseStudy} />
      <Route path="/case-studies/the-helping-hand" component={TheHelpingHandCaseStudy} />
      
      {/* Redirect old singular routes to plural for Google crawl compatibility */}
      <Route path="/case-study/wishluv-buildcon" component={WishluvBuildconCaseStudy} />
      <Route path="/case-study/biryani-mahal" component={BiryaniMahalCaseStudy} />
      <Route path="/case-study/the-helping-hand" component={TheHelpingHandCaseStudy} />
      

      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/submissions" component={AdminSubmissions} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/blogs" component={AdminBlogs} />
      <Route path="/admin/blogs/new" component={AdminBlogEditor} />
      <Route path="/admin/blogs/edit/:id" component={AdminBlogEditor} />
      <Route path="/admin/portfolio" component={AdminPortfolio} />
      <Route path="/admin/portfolio/new" component={AdminPortfolioEditor} />
      <Route path="/admin/portfolio/edit/:id" component={AdminPortfolioEditor} />


      
      {/* Fallback Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');
  
  // Update canonical URL, schema markup, and scroll to top whenever location changes
  useEffect(() => {
    // Don't include hash in canonical URL
    const path = location.split('#')[0];
    
    // Handle trailing slashes consistently in the UI for canonicalization
    const normalizedPath = path.endsWith('/') && path.length > 1 
      ? path.slice(0, -1)  // Remove trailing slash for canonical URLs
      : path;
    
    // Update canonical URL for SEO
    const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
    if (canonicalLink) {
      // Don't add canonical for admin routes
      if (!isAdminRoute && normalizedPath !== '/') {
        canonicalLink.href = `https://synergybrandarchitect.in${normalizedPath}`;
      } else {
        canonicalLink.href = 'https://synergybrandarchitect.in';
      }
    }
    
    // Update schema.org markup for the current page
    if (!isAdminRoute) {
      // Get page-specific data for schema markup if needed
      let pageData;
      
      // For case studies, set appropriate data
      if (normalizedPath.startsWith('/case-studies/')) {
        const caseStudyName = normalizedPath.replace('/case-studies/', '');
        pageData = { caseStudyName };
      }
      
      updateSchemaMarkup(normalizedPath, pageData);
      
      // Also update the page title based on the current route for better SEO
      updatePageTitle(normalizedPath);
    }
    
    // Only use smooth scroll when not coming from an external site
    scrollToTop(false);
  }, [location, isAdminRoute]);
  
  // Function to update page title based on current route
  const updatePageTitle = (path: string) => {
    let title = 'Synergy Brand Architect - Digital Marketing & Brand Building Agency';
    
    // Set specific titles based on routes
    if (path === '/services') {
      title = 'Our Services | Synergy Brand Architect - Digital Marketing & Branding Solutions';
    } else if (path === '/services/brand-building') {
      title = 'Brand Building Services | Synergy Brand Architect';
    } else if (path === '/services/social-media-marketing') {
      title = 'Social Media Marketing | Synergy Brand Architect';
    } else if (path === '/services/web-app-development') {
      title = 'Web & Mobile App Development | Synergy Brand Architect';
    } else if (path === '/services/automation') {
      title = 'Workflow Automation | Synergy Brand Architect';
    } else if (path === '/services/performance-marketing') {
      title = 'Performance Marketing | Synergy Brand Architect';
    } else if (path === '/services/seo') {
      title = 'SEO Optimization | Synergy Brand Architect';
    } else if (path === '/portfolio') {
      title = 'Portfolio | Our Work & Case Studies - Synergy Brand Architect';
    } else if (path.startsWith('/resources')) {
      title = 'Digital Marketing Resources & Tools | Synergy Brand Architect';
    } else if (path.startsWith('/case-studies/')) {
      const caseStudy = path.replace('/case-studies/', '');
      const readableTitle = caseStudy
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      title = `${readableTitle} Case Study | Synergy Brand Architect`;
    }
    
    document.title = title;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SmoothScroll>
          <Router />
          {/* Popup removed */}
          <Toaster />
        </SmoothScroll>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
