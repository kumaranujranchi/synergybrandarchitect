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
  // Fetch all published blogs for the sidebar
  const allBlogs = useQuery(api.blogs.listBlogs, { status: "published" });
  
  const isLoading = blog === undefined || allBlogs === undefined;

  // Filter out the current blog and get top 3 related ones
  const relatedBlogs = allBlogs?.filter(b => b.slug !== slug).slice(0, 3);

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
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
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
                  <img src={blog.coverImage} className="w-full h-auto object-cover max-h-[500px]" alt={blog.title} />
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
                  <span className="font-bold text-gray-900">Share:</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-full border-gray-200 hover:border-[#0066CC] hover:text-[#0066CC]">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Blogs */}
            <aside className="lg:col-span-4 mt-16 lg:mt-0">
              <div className="sticky top-32">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold font-poppins mb-6 pb-2 border-b-2 border-[#FF6B00] inline-block">
                    Related Blogs
                  </h3>
                  
                  <div className="space-y-8">
                    {relatedBlogs && relatedBlogs.length > 0 ? (
                      relatedBlogs.map((post) => (
                        <div 
                          key={post._id} 
                          className="group cursor-pointer flex flex-col gap-3"
                          onClick={() => setLocation(`/blog/${post.slug}`)}
                        >
                          <div className="aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm relative">
                            <img 
                              src={post.coverImage || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400"} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              alt={post.title}
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#FF6B00] mb-1">
                              {post.category || "Insight"}
                            </div>
                            <h4 className="font-bold text-gray-900 leading-tight group-hover:text-[#0066CC] transition-colors line-clamp-2 text-base">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2">
                              <Calendar size={12} className="text-gray-400" /> 
                              {format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic text-sm">Discover more blogs on our main page.</p>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-8 rounded-xl border-gray-200 text-gray-600 hover:text-[#0066CC] hover:border-[#0066CC]"
                    onClick={() => setLocation('/blog')}
                  >
                    View All Blogs
                  </Button>
                </div>

                {/* Newsletter / CTA Placeholder in Sidebar */}
                <div className="mt-8 bg-gradient-to-br from-[#0066CC] to-[#004080] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all" />
                  <h4 className="text-xl font-bold mb-4 relative z-10">Transform Your Brand Today</h4>
                  <p className="text-blue-50 text-sm mb-6 relative z-10 leading-relaxed">
                    Get expert digital marketing insights delivered to your inbox.
                  </p>
                  <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white border-none rounded-xl relative z-10 font-bold">
                    Start Now
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
