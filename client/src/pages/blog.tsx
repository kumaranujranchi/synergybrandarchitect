import { useEffect, useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Calendar, ArrowRight, TrendingUp, Clock, FileText, ChevronRight, Share2, MessageSquare, LineChart, BarChart, LayoutGrid } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { format } from 'date-fns';
import { useLocation } from 'wouter';
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

// Helper for generic excerpt
const getExcerpt = (post: any, length = 120) => {
  if (post.excerpt) return post.excerpt;
  return post.content.replace(/<[^>]*>/g, '').substring(0, length) + '...';
};

// --- Sub-component: Category Section ---
const CategorySection = ({ title, posts, color, icon: Icon, setLocation }: any) => {
  if (!posts || posts.length === 0) return null;

  const colorMap: any = {
    blue: { border: 'border-[#0066CC]', bg: 'bg-[#0066CC]', text: 'text-[#0066CC]', light: 'bg-blue-50' },
    orange: { border: 'border-[#FF6B00]', bg: 'bg-[#FF6B00]', text: 'text-[#FF6B00]', light: 'bg-orange-50' },
    green: { border: 'border-green-600', bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50' },
    purple: { border: 'border-purple-600', bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50' },
    gray: { border: 'border-gray-900', bg: 'bg-gray-900', text: 'text-gray-900', light: 'bg-gray-50' }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <motion.div variants={fadeUp} className="mb-14">
      <div className={`flex items-center justify-between mb-8 border-b-2 ${theme.border} pb-4`}>
        <div className="flex items-center gap-3">
          <div className={`${theme.bg} p-2 rounded-lg text-white`}>
            <Icon size={20} />
          </div>
          <h3 className="text-2xl font-bold font-poppins text-gray-900 tracking-tight uppercase">
            {title}
          </h3>
        </div>
        <button className={`text-xs font-bold uppercase tracking-widest ${theme.text} hover:opacity-80 transition-opacity flex items-center gap-1`}>
          View Category <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <motion.div 
            key={post._id} 
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col group cursor-pointer" 
            onClick={() => setLocation(`/blog/${post.slug}`)}
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img src={post.coverImage || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&sig=${post._id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
              <span className={`absolute top-3 left-3 ${theme.bg} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 shadow-sm`}>{post.category || title}</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
               <div className="flex items-center text-xs text-gray-400 gap-2 mb-3">
                 <Calendar size={12}/> {format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}
               </div>
               <h4 className="font-bold text-xl text-gray-900 group-hover:text-[#0066CC] transition-colors line-clamp-2 leading-tight mb-3">
                 {post.title}
               </h4>
               <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                 {getExcerpt(post, 120)}
               </p>
               <span className={`${theme.text} text-sm font-bold flex items-center gap-1 mt-auto`}>
                 Read Story <ArrowRight size={14}/>
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
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
  
  // 1. Hero Section Posts (Top 3)
  const mainFeature = allPosts[0];
  const subFeatures = allPosts.slice(1, 3);
  
  // 2. Sectioned Groups - No longer slicing so blogs can appear in both Hero and Categories
  const remaining = allPosts;
  
  // Filter for specific categories (Logic for Magazine sections)
  // Enhanced to match new predefined categories
  const businessPosts = remaining.filter(p => !p.category || p.category.toLowerCase().includes('business') || p.category.toLowerCase().includes('strategy')).slice(0, 3);
  const seoPosts = remaining.filter(p => p.category?.toLowerCase().includes('seo') || p.category?.toLowerCase().includes('organic')).slice(0, 3);
  const marketingPosts = remaining.filter(p => 
    p.category?.toLowerCase().includes('marketing') || 
    p.category?.toLowerCase().includes('social') ||
    p.category?.toLowerCase().includes('content') ||
    p.category?.toLowerCase().includes('brand')
  ).slice(0, 3);

  // Everything else for the "General archive" at the bottom
  const featuredIds = new Set([
      ...businessPosts.map(p => p._id), 
      ...seoPosts.map(p => p._id), 
      ...marketingPosts.map(p => p._id)
  ]);
  const generalArchive = remaining.filter(p => !featuredIds.has(p._id));

  // 3. Sidebar Widget: Trending / Picks
  const editorsPicks = allPosts.slice(3, 7).length > 0 ? allPosts.slice(3, 7) : allPosts.slice(1, 4);

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
        <motion.main 
          className="pt-28 pb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 max-w-[1280px]">
            
            {/* --- HERO MAGAZINE SECTION --- */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
              
              {/* Main Feature */}
              {mainFeature && (
                <motion.div 
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="lg:col-span-8 group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-all"
                  onClick={() => setLocation(`/blog/${mainFeature.slug}`)}
                >
                  <div className="relative aspect-video lg:max-h-[450px] overflow-hidden bg-gray-100">
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
                </motion.div>
              )}

              {/* Side Sub-Features */}
              <div className="lg:col-span-4 grid grid-rows-2 gap-6">
                {subFeatures.map((post, idx) => (
                  <motion.div 
                    key={post._id} 
                    variants={fadeUp}
                    whileHover={{ x: 5 }}
                    className="flex flex-col group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all"
                    onClick={() => setLocation(`/blog/${post.slug}`)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
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
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* --- NEWS TICKER --- */}
            <motion.div variants={fadeUp} className="bg-white text-gray-800 flex flex-col md:flex-row items-center rounded-xl mb-14 overflow-hidden shadow-sm border border-gray-100 relative">
               <div className="bg-[#0066CC] text-white font-bold px-6 py-4 whitespace-nowrap z-10 h-full flex items-center uppercase tracking-wide">
                 Latest Blog
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
            </motion.div>

            {/* --- MAIN CONTENT & SIDEBAR --- */}
            <div className="flex flex-col lg:flex-row gap-8">
               
               {/* Left Column - Main Flow */}
               <div className="lg:w-8/12 xl:w-9/12">
                 
                  {/* Category Sections */}
                  <CategorySection 
                    title="Business & Strategy" 
                    posts={businessPosts} 
                    color="blue" 
                    icon={TrendingUp} 
                    setLocation={setLocation} 
                  />

                  <CategorySection 
                    title="SEO & Organic Growth" 
                    posts={seoPosts} 
                    color="orange" 
                    icon={BarChart} 
                    setLocation={setLocation} 
                  />

                  <CategorySection 
                    title="Digital Marketing" 
                    posts={marketingPosts} 
                    color="green" 
                    icon={Share2} 
                    setLocation={setLocation} 
                  />

                  {/* General Archive Section */}
                  {generalArchive.length > 0 && (
                    <motion.div variants={fadeUp} className="mb-14">
                      <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-4">
                        <h3 className="text-2xl font-bold font-poppins text-gray-900 flex items-center gap-2">
                          More Insights <LayoutGrid className="text-[#333333] h-5 w-5" />
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{generalArchive.length} posts found</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {generalArchive.map((post: any) => (
                          <motion.div 
                            key={post._id} 
                            variants={fadeUp}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col group cursor-pointer" 
                            onClick={() => setLocation(`/blog/${post.slug}`)}
                          >
                            <div className="relative aspect-video overflow-hidden bg-gray-100">
                              <img src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                              <span className="absolute top-3 left-3 bg-[#333333] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">{post.category || "Insight"}</span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                               <div className="flex items-center text-xs text-gray-400 gap-2 mb-3">
                                 <Calendar size={12}/> {format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}
                               </div>
                               <h4 className="font-bold text-xl text-gray-900 group-hover:text-[#0066CC] transition-colors line-clamp-2 leading-tight mb-3">
                                 {post.title}
                               </h4>
                               <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                                 {getExcerpt(post, 120)}
                               </p>
                               <span className="text-[#0066CC] text-sm font-bold flex items-center gap-1 mt-auto">
                                 Read Story <ArrowRight size={14}/>
                               </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {!allPosts.length && !isLoading && (
                    <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-200 text-center mb-14">
                      <TrendingUp className="mx-auto mb-4 opacity-20 text-gray-400" size={48} />
                      <h4 className="text-lg font-bold text-gray-600 mb-2">More stories coming soon</h4>
                      <p className="text-sm text-gray-500">We are currently crafting more insights for you. Stay tuned!</p>
                    </div>
                  )}

               </div>

               {/* Right Sidebar - Widgets */}
               <motion.div variants={fadeUp} className="lg:w-4/12 xl:w-3/12 space-y-8">
                 
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
                     {editorsPicks.map((post: any, idx: number) => (
                       <div key={post._id} className="flex gap-4 group cursor-pointer" onClick={() => setLocation(`/blog/${post.slug}`)}>
                         <img src={post.coverImage || `https://images.unsplash.com/photo-1542435503-956c469947f6?w=200&q=80&random=${idx}`} className="w-20 h-20 object-cover rounded shadow-sm" alt="Thumbnail" />
                         <div>
                           <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#0066CC] line-clamp-2 leading-tight mb-2">{post.title}</h4>
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

                 {/* Custom Promo Card: Website Development */}
                 <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 rounded-3xl shadow-2xl p-8 text-center flex flex-col items-center justify-between min-h-[500px] relative overflow-hidden group border border-white/10">
                   <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-[#FF6B00]/20 blur-3xl group-hover:bg-[#FF6B00]/30 transition-all duration-700" />
                   <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
                   
                   <div className="relative z-10 w-full h-full flex flex-col">
                     <div className="bg-[#FF6B00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 w-fit mx-auto shadow-lg shadow-orange-950/20">
                       Limited Time Offer
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-4 leading-tight font-poppins px-2 italic">Launch Your Professional Website</h3>
                     
                     <div className="flex flex-col items-center mb-8 bg-white/5 py-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">
                       <span className="text-gray-400 text-xs font-semibold line-through mb-1 tracking-wider uppercase">WAS ₹14,999</span>
                       <div className="flex items-start justify-center gap-1">
                         <span className="text-2xl font-bold text-[#FF6B00] mt-2">₹</span>
                         <span className="text-5xl font-extrabold text-white tracking-tighter">7,999</span>
                         <span className="text-sm font-bold text-[#FF6B00] mt-8 px-1">/- Only</span>
                       </div>
                     </div>
                     
                     <ul className="space-y-4 mb-8 text-left w-full px-2">
                       {['Fully Customized Design', 'SEO Optimized & High Speed', 'Responsive & Mobile Friendly'].map((text, i) => (
                         <li key={i} className="flex items-center gap-3 text-gray-200 text-sm font-medium group/item hover:text-white transition-colors">
                           <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 group-hover/item:bg-green-500 group-hover/item:border-green-500 transition-all">
                             <svg className="h-3 w-3 text-green-400 group-hover/item:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                           </div>
                           {text}
                         </li>
                       ))}
                     </ul>
                     
                     <button 
                       className="w-full bg-white hover:bg-orange-50 transition-all text-indigo-950 font-bold py-4 rounded-xl relative z-10 flex items-center justify-center gap-2 group/btn shadow-xl shadow-blue-950/40 mt-auto"
                       onClick={() => window.open('https://wa.me/919525230232?text=Hi, I am interested in getting a website developed starting at 7999/-', '_blank')}
                     >
                       Build My Website <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </div>
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

               </motion.div>
            </div>
          </div>
        </motion.main>
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
