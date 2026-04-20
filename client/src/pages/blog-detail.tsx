import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Calendar, Clock, ArrowLeft, Share2, Tag, ChevronRight, Home, ArrowRight } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { format } from 'date-fns';
import { useLocation, useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';

export default function BlogDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  
  // Convex Query - Fetch a single blog by slug
  const blog = useQuery(api.blogs.getBlogBySlug, slug ? { slug } : "skip");
  // Fetch all published blogs for context (Related, Next/Prev)
  const allBlogs = useQuery(api.blogs.listBlogs, { status: "published" });
  
  const isLoading = blog === undefined || allBlogs === undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 pt-44 pb-20">
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
          <Button onClick={() => setLocation('/blog')}>Return to Blog Feed</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // --- SEO Interlinking Logic ---
  
  // 1. Related Blogs (Same category first, excluding current)
  const sameCategoryBlogs = allBlogs?.filter(b => b.category === blog.category && b.slug !== slug) || [];
  const otherBlogs = allBlogs?.filter(b => b.category !== blog.category && b.slug !== slug) || [];
  const relatedBlogs = [...sameCategoryBlogs, ...otherBlogs].slice(0, 3);

  // 2. Next/Prev Navigation
  const currentIndex = allBlogs?.findIndex(b => b.slug === slug) ?? -1;
  const nextPost = currentIndex > 0 ? allBlogs?.[currentIndex - 1] : null;
  const prevPost = currentIndex < (allBlogs?.length ?? 0) - 1 ? allBlogs?.[currentIndex + 1] : null;

  // 3. Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.coverImage],
    "datePublished": new Date(blog.publishedAt || blog.createdAt).toISOString(),
    "author": [{
        "@type": "Organization",
        "name": "Synergy Brand Architect",
        "url": window.location.origin
      }],
    "description": blog.seoDescription || blog.excerpt || "",
    "publisher": {
      "@type": "Organization",
      "name": "Synergy Brand Architect",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{blog.seoTitle || `${blog.title} | Synergy Brand Architect`}</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt || ""} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords} />}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header />
      <WhatsappButton />
      
      <article className="pt-44 pb-20">
        <div className="container mx-auto px-4 max-w-[1280px]">
          
          {/* SEO BREADCRUMBS */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-8 uppercase tracking-widest bg-gray-50/50 p-3 rounded-lg border border-gray-100/50 w-fit">
            <Link href="/" className="hover:text-[#0066CC] flex items-center gap-1 transition-colors"><Home size={12}/> Home</Link>
            <ChevronRight size={10} className="text-gray-300" />
            <Link href="/blog" className="hover:text-[#0066CC] transition-colors">Blog</Link>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-[#FF6B00]">{blog.category || "Insight"}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                 <Link href={`/blog?category=${blog.category}`} className="bg-[#0066CC] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider hover:bg-blue-600 transition-colors">
                    {blog.category || "Insight"}
                 </Link>
                 <span className="text-gray-300">|</span>
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

              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900 tracking-tight">
                {blog.title}
              </h1>

              {blog.coverImage && (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <img src={blog.coverImage} className="w-full h-auto object-cover max-h-[550px]" alt={blog.title} />
                </div>
              )}

              {blog.excerpt && (
                <div className="text-xl text-gray-600 mb-10 leading-relaxed font-normal border-l-4 border-[#FF6B00] pl-8 py-3 italic bg-gray-50/80 rounded-r-xl">
                  {blog.excerpt}
                </div>
              )}

              <div 
                className="rich-text-content prose prose-lg prose-slate max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-[#0066CC] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-2xl prose-img:shadow-md prose-blockquote:border-[#0066CC] prose-blockquote:bg-blue-50/30 prose-blockquote:py-1
                  prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* POST NAVIGATION (PREV / NEXT) */}
              <div className="mt-20 pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-8">
                 {prevPost ? (
                   <div 
                    className="group cursor-pointer p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#FF6B00]/30 hover:bg-white transition-all shadow-sm flex flex-col items-start"
                    onClick={() => setLocation(`/blog/${prevPost.slug}`)}
                   >
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-3 flex items-center gap-2">
                        <ArrowLeft size={10}/> Previous Post
                     </span>
                     <h4 className="text-base font-bold text-gray-800 line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
                       {prevPost.title}
                     </h4>
                   </div>
                 ) : <div />}

                 {nextPost ? (
                   <div 
                    className="group cursor-pointer p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#0066CC]/30 hover:bg-white transition-all shadow-sm flex flex-col items-end text-right"
                    onClick={() => setLocation(`/blog/${nextPost.slug}`)}
                   >
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-3 flex items-center gap-2">
                        Next Post <ArrowRight size={10}/>
                     </span>
                     <h4 className="text-base font-bold text-gray-800 line-clamp-2 group-hover:text-[#0066CC] transition-colors">
                       {nextPost.title}
                     </h4>
                   </div>
                 ) : <div />}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-6 p-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center gap-2"><Share2 size={14}/> Share Insight:</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-full border-gray-200 hover:border-[#0066CC] hover:text-[#0066CC] bg-white group shadow-sm">
                      <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <Tag size={14} className="text-gray-400" />
                   <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100">{blog.category || "Insight"}</span>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Blogs */}
            <aside className="lg:col-span-4 mt-16 lg:mt-0">
              <div className="sticky top-32">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold font-poppins mb-6 pb-2 border-b-2 border-[#FF6B00] inline-block tracking-tight">
                    You Might Also Like
                  </h3>
                  
                  <div className="space-y-8">
                    {relatedBlogs && relatedBlogs.length > 0 ? (
                      relatedBlogs.map((post) => (
                        <div 
                          key={post._id} 
                          className="group cursor-pointer flex gap-4"
                          onClick={() => setLocation(`/blog/${post.slug}`)}
                        >
                          <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-50 shadow-sm">
                            <img 
                              src={post.coverImage || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400"} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                              alt={post.title}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider font-bold text-[#FF6B00] mb-1">
                              {post.category || "Insight"}
                            </div>
                            <h4 className="font-bold text-gray-900 leading-tight group-hover:text-[#0066CC] transition-colors line-clamp-2 text-sm">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic text-sm">Discover more in our main feed.</p>
                    )}
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full mt-10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#0066CC] hover:bg-blue-50 transition-all border-t border-gray-50 pt-6 h-auto"
                    onClick={() => setLocation('/blog')}
                  >
                    Explore all insights
                  </Button>
                </div>

                {/* Custom Promo Card: Website Development */}
                <div className="mt-8 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-between min-h-[480px] relative overflow-hidden group border border-white/10">
                   <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-[#FF6B00]/20 blur-3xl group-hover:bg-[#FF6B00]/30 transition-all duration-700" />
                   
                   <div className="relative z-10 w-full h-full flex flex-col">
                     <div className="bg-[#FF6B00] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 w-fit mx-auto shadow-lg shadow-orange-950/20">
                       Limited Time Offer
                     </div>
                     <h4 className="text-xl font-bold text-white mb-4 leading-tight font-poppins px-1 italic">Professional Website Development</h4>
                     
                     <div className="flex flex-col items-center mb-6 bg-white/5 py-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-inner">
                       <span className="text-gray-400 text-[10px] font-semibold line-through mb-1 tracking-wider uppercase opacity-60">WAS ₹14,999</span>
                       <div className="flex items-start justify-center gap-0.5">
                         <span className="text-xl font-bold text-[#FF6B00] mt-1.5 font-poppins">₹</span>
                         <span className="text-4xl font-extrabold text-white tracking-tighter font-poppins">7,999</span>
                         <span className="text-[10px] font-bold text-[#FF6B00] mt-6 px-1">/- Only</span>
                       </div>
                     </div>
                     
                     <ul className="space-y-3 mb-6 text-left w-full">
                       {['Fully Customized Design', 'SEO Ready & High Speed', 'Responsive & Mobile Friendly'].map((text, i) => (
                         <li key={i} className="flex items-center gap-2.5 text-gray-200 text-xs font-medium group/item hover:text-white transition-colors">
                           <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 group-hover/item:bg-green-500 group-hover/item:border-green-500 transition-all">
                             <svg className="h-2.5 w-2.5 text-green-400 group-hover/item:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                           </div>
                           {text}
                         </li>
                       ))}
                     </ul>
                     
                     <button 
                       className="w-full bg-white hover:bg-orange-50 transition-all text-indigo-950 font-bold py-3.5 rounded-xl relative z-10 flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-950/40 mt-auto text-sm"
                       onClick={() => window.open('https://wa.me/919525230232?text=Hi, I am interested in getting a website developed starting at 7999/-', '_blank')}
                     >
                       Get Started <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </div>
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
