import { useEffect, useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Calendar, ArrowRight, TrendingUp, Clock, FileText, ChevronRight, Share2, MessageSquare, LineChart, BarChart } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { format } from 'date-fns';
import { useLocation } from 'wouter';
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link } from "wouter";

// Helper for generic excerpt
const getExcerpt = (post: any, length = 120) => {
  if (post.excerpt) return post.excerpt;
  return post.content.replace(/<[^>]*>/g, '').substring(0, length) + '...';
};

export default function BlogList() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Insights & News | Synergy Brand Architect";
  }, []);

  // Convex Query - Fetch only published blogs
  const blogs = useQuery(api.blogs.listBlogs, { status: "published" });
  const isLoading = blogs === undefined;

  // Derive categories and groups
  const allPosts = blogs || [];
  
  // 1. Featured Posts (Top 3 latest)
  const featuredPosts = allPosts.slice(0, 3);
  const mainFeature = featuredPosts[0];
  const subFeatures = featuredPosts.slice(1, 3);
  
  // 2. Business Posts (or any category logic, falling back to next posts if empty)
  let businessPosts = allPosts.filter(b => b.category?.toLowerCase() === 'business').slice(0, 3);
  if (businessPosts.length === 0) businessPosts = allPosts.slice(3, 6);

  // 3. Category Posts (Travel, Fashion, etc. mapped dynamically or just fallback streams)
  let travelPost = allPosts.filter(b => b.category?.toLowerCase() === 'travel')[0];
  let techPost = allPosts.filter(b => b.category?.toLowerCase() === 'technology' || b.category?.toLowerCase() === 'tech')[0];
  let designPost = allPosts.filter(b => b.category?.toLowerCase() === 'design')[0];
  
  // Fallbacks if categories don't exist
  if (!travelPost && allPosts.length > 6) travelPost = allPosts[6];
  if (!techPost && allPosts.length > 7) techPost = allPosts[7];
  if (!designPost && allPosts.length > 8) designPost = allPosts[8];

  const recentPostsList = [travelPost, techPost, designPost].filter(Boolean);
  
  // Large section post
  let giantPost = allPosts.find(b => b.category?.toLowerCase() === 'marketing');
  if (!giantPost && allPosts.length > 9) giantPost = allPosts[9];
  if (!giantPost) giantPost = allPosts[0]; // fallback

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-inter text-gray-900">
      <Header />
      <WhatsappButton />
      
      {isLoading ? (
        <div className="pt-32 pb-20 px-4 container mx-auto text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-[400px] bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl" />)}
            </div>
          </div>
        </div>
      ) : !allPosts.length ? (
        <div className="text-center py-40 text-gray-500 pt-52">
           <TrendingUp className="mx-auto mb-4 opacity-20" size={48} />
           <p className="text-xl">No blog posts found. Stay tuned for updates!</p>
        </div>
      ) : (
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 max-w-[1280px]">
            
            {/* --- HERO MAGAZINE SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
              
              {/* Main Feature */}
              {mainFeature && (
                <div 
                  className="lg:col-span-8 group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-all"
                  onClick={() => setLocation(`/blog/${mainFeature.slug}`)}
                >
                  <div className="relative h-[300px] lg:h-[400px] overflow-hidden bg-gray-100">
                    <img 
                      src={mainFeature.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"} 
                      alt={mainFeature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-[#FF6B00] text-white font-semibold text-xs px-3 py-1 rounded shadow-md uppercase tracking-wider z-10">
                      {mainFeature.category || "Featured"}
                    </span>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                    <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 leading-tight group-hover:text-[#0066CC] transition-colors text-gray-900">
                      {mainFeature.title}
                    </h2>
                    <p className="text-gray-600 md:text-lg mb-6 line-clamp-2 leading-relaxed">
                      {getExcerpt(mainFeature, 150)}
                    </p>
                    <div className="flex items-center justify-between text-sm font-medium text-gray-500 mt-auto">
                      <span className="flex items-center gap-1.5"><Calendar size={15}/> {format(mainFeature.publishedAt || mainFeature.createdAt, 'MMM dd, yyyy')}</span>
                      <span className="text-[#0066CC] hover:text-[#004080] font-bold flex items-center gap-1 transition-colors">
                        Read Story <ArrowRight size={14}/>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Side Sub-Features */}
              <div className="lg:col-span-4 grid grid-rows-2 gap-6">
                {subFeatures.map((post, idx) => (
                  <div 
                    key={post._id} 
                    className="flex flex-col group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all"
                    onClick={() => setLocation(`/blog/${post.slug}`)}
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <img 
                        src={post.coverImage || (idx === 0 ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" : "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800")} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3 text-xs text-gray-500 font-medium">
                         <span className="text-[#0066CC] font-bold uppercase tracking-wider">
                           {post.category || "News"}
                         </span>
                         <span className="flex items-center gap-1"><Clock size={12}/> {format(post.publishedAt || post.createdAt, 'MMM dd')}</span>
                      </div>
                      <h3 className="text-lg font-bold font-poppins mb-3 line-clamp-2 leading-snug group-hover:text-[#FF6B00] transition-colors text-gray-900">
                        {post.title}
                      </h3>
                      <span className="text-sm font-bold text-[#333333] flex items-center gap-1 mt-auto group-hover:text-[#FF6B00] transition-colors">Read More <ArrowRight size={14}/></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- NEWS TICKER --- */}
            <div className="bg-white text-gray-800 flex flex-col md:flex-row items-center rounded-xl mb-14 overflow-hidden shadow-sm border border-gray-100 relative">
               <div className="bg-[#0066CC] text-white font-bold px-6 py-4 whitespace-nowrap z-10 h-full flex items-center uppercase tracking-wide">
                 Latest News
               </div>
               <div className="flex-1 overflow-hidden relative h-[52px]">
                 <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap px-4 text-sm font-medium">
                   {allPosts.slice(0,5).map((p, i) => (
                     <span key={i} className="mx-6 flex items-center group cursor-pointer" onClick={() => setLocation(`/blog/${p.slug}`)}>
                       <span className="text-[#FF6B00] mr-3">♦</span>
                       <span className="group-hover:text-[#0066CC] transition-colors text-gray-700">
                         {p.title}
                       </span>
                     </span>
                   ))}
                 </div>
               </div>
            </div>

            {/* --- MAIN CONTENT & SIDEBAR --- */}
            <div className="flex flex-col lg:flex-row gap-8">
               
               {/* Left Column - Main Flow */}
               <div className="lg:w-8/12 xl:w-9/12">
                 
                 {/* Business Post Block */}
                 {businessPosts.length > 0 && (
                   <div className="mb-14 border-t-2 border-dashed border-gray-300 pt-6">
                     <div className="flex items-center justify-between mb-6">
                       <h3 className="text-xl font-bold font-poppins uppercase tracking-wide border-b-2 border-blue-600 inline-block pb-1">Business Post</h3>
                       <span className="text-xs text-gray-500 font-bold uppercase tracking-wider cursor-pointer hover:text-blue-600">View All <ChevronRight size={14} className="inline"/></span>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {businessPosts.map((post) => (
                         <div key={post._id} className="bg-white group cursor-pointer" onClick={() => setLocation(`/blog/${post.slug}`)}>
                            <div className="relative h-44 overflow-hidden mb-4">
                              <img src={post.coverImage || "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=600"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={post.title} />
                              <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">{post.category || "Business"}</span>
                            </div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">{post.title}</h4>
                            <div className="flex items-center text-xs text-gray-500 gap-2 mb-3">
                              <Calendar size={12}/> {format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{getExcerpt(post, 80)}</p>
                            <span className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors inline-block">Read Post</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* Mixed Recent Posts List */}
                 {recentPostsList.length > 0 && (
                   <div className="mb-14 border-t-2 border-dashed border-gray-300 pt-6">
                     <h3 className="text-xl font-bold font-poppins uppercase tracking-wide border-b-2 border-orange-500 inline-block pb-1 mb-6">Recent Posts</h3>
                     <div className="space-y-6">
                       {recentPostsList.map((post) => (
                         <div key={post._id} className="flex flex-col sm:flex-row bg-white overflow-hidden shadow-sm group hover:shadow-md transition-shadow cursor-pointer border" onClick={() => setLocation(`/blog/${post.slug}`)}>
                           <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                             <img src={post.coverImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title}/>
                           </div>
                           <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                             <div className="flex items-center gap-3 mb-2">
                               <span className="text-xs text-blue-600 font-bold uppercase">{post.category || "Article"}</span>
                               <span className="text-gray-300">|</span>
                               <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}</span>
                             </div>
                             <h4 className="text-xl font-bold font-poppins text-gray-900 group-hover:text-orange-600 transition-colors mb-3 leading-tight">
                               {post.title}
                             </h4>
                             <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                               {getExcerpt(post, 140)}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* Giant Feature Interstitial */}
                 {giantPost && (
                    <div className="mb-14 border-t-2 border-dashed border-gray-200 pt-8">
                      <div 
                        className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden group cursor-pointer transition-shadow hover:shadow-md"
                        onClick={() => setLocation(`/blog/${giantPost?.slug}`)}
                      >
                        <div className="md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                          <img src={giantPost.coverImage || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Feature"/>
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
                           <span className="bg-[#0066CC] text-white text-[10px] sm:text-xs font-bold uppercase rounded px-3 py-1 mb-4 w-max shadow-sm tracking-wider">{giantPost.category || "Exclusive Spotlight"}</span>
                           <h2 className="text-2xl md:text-4xl font-poppins font-bold leading-snug mb-4 text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                             {giantPost.title}
                           </h2>
                           <p className="text-gray-600 mb-6 leading-relaxed">
                             {getExcerpt(giantPost, 150)}
                           </p>
                           <span className="flex items-center text-[#333333] font-bold group-hover:text-[#0066CC] transition-colors">Read Full Article <ArrowRight size={16} className="ml-1"/></span>
                        </div>
                      </div>
                    </div>
                 )}

                 {/* Minimal text-heavy posts */}
                 <div className="mb-14">
                    <h2 className="text-2xl font-bold font-poppins leading-tight mb-4">
                      Exploring the Digital Landscape: Insights from the Edge
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
                      Stay updated with our analytical takes on brand architecture, performance marketing shifts, and the integration of automation into everyday business models to scale efficiently.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {allPosts.slice(4, 6).map(post => (
                        <div key={post._id} className="border-t border-gray-200 pt-4 group cursor-pointer" onClick={() => setLocation(`/blog/${post.slug}`)}>
                           <div className="text-xs text-orange-500 font-bold mb-2 uppercase">{post.category || "Analysis"}</div>
                           <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600">{post.title}</h4>
                           <p className="text-sm text-gray-500 line-clamp-3 mb-3">{getExcerpt(post, 120)}</p>
                           <div className="flex items-center text-xs text-gray-400 font-medium">
                             <Calendar size={12} className="mr-1"/> {format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>

               </div>

               {/* Right Sidebar - Widgets */}
               <div className="lg:w-4/12 xl:w-3/12 space-y-8">
                 
                 {/* Widget 1: Mock Market/Stats Component */}
                 <div className="bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 text-[#0066CC] group-hover:opacity-20 transition-opacity"><LineChart size={80} /></div>
                   <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-70 border-b border-gray-100 pb-3 flex items-center gap-2">
                     <BarChart size={16} className="text-[#0066CC]"/> Market Overview
                   </h3>
                   <div className="mb-6">
                     <div className="flex items-end gap-2 mb-1">
                       <span className="text-3xl font-bold font-poppins text-gray-900">$4,291.50</span>
                       <span className="text-green-500 text-sm font-bold mb-1 flex items-center bg-green-50 px-2 py-0.5 rounded-full"><TrendingUp size={12} className="mr-1"/> +2.4%</span>
                     </div>
                     <span className="text-xs text-gray-500 font-medium">Nasdaq Composite</span>
                   </div>
                   {/* Dummy Chart Shape Styled light */}
                   <div className="h-24 w-full flex items-end justify-between gap-2 mt-4 pb-2 relative z-10">
                     <div className="w-full bg-[#0066CC]/10 h-[30%] rounded-t transition-all hover:bg-[#0066CC]/30 cursor-pointer"></div>
                     <div className="w-full bg-[#0066CC]/15 h-[50%] rounded-t transition-all hover:bg-[#0066CC]/40 cursor-pointer"></div>
                     <div className="w-full bg-[#0066CC]/20 h-[40%] rounded-t transition-all hover:bg-[#0066CC]/50 cursor-pointer"></div>
                     <div className="w-full bg-[#FF6B00]/40 h-[70%] rounded-t transition-all hover:bg-[#FF6B00]/60 cursor-pointer"></div>
                     <div className="w-full bg-[#FF6B00] h-[90%] rounded-t shadow-[0_0_15px_rgba(255,107,0,0.3)] cursor-pointer"></div>
                   </div>
                 </div>

                 {/* Widget 2: Editor's Picks */}
                 <div className="bg-white rounded-xl shadow-sm border p-6">
                   <h3 className="text-lg font-bold font-poppins border-b-2 border-gray-900 inline-block pb-1 mb-6">Editor's Pick</h3>
                   <div className="space-y-5">
                     {allPosts.slice(1, 4).map((post, idx) => (
                       <div key={post._id} className="flex gap-4 group cursor-pointer" onClick={() => setLocation(`/blog/${post.slug}`)}>
                         <img src={post.coverImage || `https://images.unsplash.com/photo-1542435503-956c469947f6?w=200&q=80&random=${idx}`} className="w-20 h-20 object-cover rounded shadow-sm" alt="Thumbnail" />
                         <div>
                           <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-tight mb-2">{post.title}</h4>
                           <span className="text-xs text-gray-400 flex items-center"><Clock size={12} className="mr-1"/>{format(post.publishedAt || post.createdAt, 'MMM dd')}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* Widget 3: Newsletter Signup */}
                 <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl -top-10 -left-10 h-32 w-32"/>
                   <div className="absolute inset-0 bg-orange-600/20 rounded-full blur-3xl -bottom-10 -right-10 h-32 w-32"/>
                   
                   <h3 className="text-2xl font-bold font-poppins mb-2 relative z-10">Newsletter</h3>
                   <p className="text-sm text-gray-400 mb-6 relative z-10">Get the latest insights dropped in your inbox.</p>
                   
                   <div className="relative z-10 space-y-3">
                     <input type="email" placeholder="Your Email Address" className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                     <button className="w-full bg-[#0066CC] hover:bg-blue-600 transition-colors text-white font-bold py-3 px-4 rounded text-sm group flex items-center justify-center gap-2">
                       Subscribe <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                 </div>

                 {/* Widget 4: Advertisement/Banner */}
                 <div className="bg-amber-400 rounded-xl shadow-sm p-8 text-center flex flex-col items-center justify-center h-80 relative overflow-hidden group cursor-pointer border-2 border-dashed border-amber-500">
                   <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                   <h3 className="text-4xl font-bold text-gray-900 mb-2">ADS</h3>
                   <p className="text-gray-800 font-medium">300 x 600</p>
                 </div>

                 {/* Social Tags */}
                 <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Popular Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Business", "Marketing", "Technology", "Design", "SEO", "Automation", "Startups"].map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-xs font-bold rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                 </div>

               </div>
            </div>
            
          </div>
        </main>
      )}

      {/* Embedded Marquee Style animation for the ticker */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      <Footer />
    </div>
  );
}
