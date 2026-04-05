import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { format } from 'date-fns';
import { useLocation, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';

export default function BlogDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  
  // Convex Query - Fetch a single blog by slug
  const blog = useQuery(api.blogs.getBlogBySlug, slug ? { slug } : "skip");
  const isLoading = blog === undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-100 rounded w-1/4" />
            <div className="aspect-video bg-gray-200 rounded-xl" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 pt-40 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => setLocation('/blog')}>Return to Blog</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{blog.seoTitle || `${blog.title} | Synergy Brand Architect`}</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt || ""} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords} />}
      </Helmet>

      <Header />
      <WhatsappButton />
      
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-8 text-gray-500 hover:text-[#0066CC]"
              onClick={() => setLocation('/blog')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{format(blog.publishedAt || blog.createdAt, 'MMMM dd, yyyy')}</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>5 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {blog.title}
            </h1>

            {blog.coverImage && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border">
                <img src={blog.coverImage} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}

            {blog.excerpt && (
              <div className="text-xl text-gray-600 mb-10 leading-relaxed font-medium border-l-4 border-[#FF6B00] pl-6 py-2 italic bg-gray-50">
                {blog.excerpt}
              </div>
            )}

            <div 
              className="rich-text-content prose prose-lg prose-slate max-w-none prose-headings:text-gray-900 prose-a:text-[#0066CC] prose-img:rounded-xl"
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-16 pt-8 border-t flex flex-wrap items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                <span className="font-bold">Share:</span>
                <Button size="icon" variant="outline" className="h-9 w-9 rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
