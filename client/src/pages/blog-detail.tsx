import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Blog } from '@shared/schema';
import { format } from 'date-fns';
import { useLocation, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';

export default function BlogDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  
  const { data, isLoading, error } = useQuery<{ blog: Blog }>({
    queryKey: [`/api/blogs/${slug}`],
    enabled: !!slug,
  });

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
            <div className="space-y-4">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data?.blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 pt-40 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for might have been moved or deleted.</p>
          <Button onClick={() => setLocation('/blog')}>Return to Blog</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const { blog } = data;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{blog.metaTitle || `${blog.title} | Synergy Brand Architect`}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt || ""} />
        {blog.metaKeywords && <meta name="keywords" content={blog.metaKeywords} />}
      </Helmet>

      <Header />
      <WhatsappButton />
      
      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-8 -ml-2 text-gray-500 hover:text-[#0066CC]"
              onClick={() => setLocation('/blog')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {blog.category && (
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {blog.category}
                </span>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{blog.publishedAt ? format(new Date(blog.publishedAt), 'MMMM dd, yyyy') : format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Featured Image */}
            {blog.coverImage && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="text-xl text-gray-600 mb-10 leading-relaxed font-medium border-l-4 border-orange-500 pl-6 py-2">
                {blog.excerpt}
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg prose-slate max-w-none prose-headings:text-gray-900 prose-a:text-[#0066CC] prose-img:rounded-xl"
              style={{
                // Ensure Quill alignment classes work
                textAlign: 'left' // default
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Share & Tags */}
            <div className="mt-16 pt-8 border-t flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-900">Share:</span>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-9 w-9 rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {blog.category && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{blog.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Section (Optional placeholder) */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Want more insights?</h2>
            <p className="text-gray-600 mb-8">Check out our other articles on brand building and digital growth.</p>
            <Button variant="outline" onClick={() => setLocation('/blog')}>See All Articles</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
