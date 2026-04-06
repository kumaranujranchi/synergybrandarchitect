import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Calendar, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { format } from 'date-fns';
import { useLocation } from 'wouter';
import { OptimizedImage } from "@/components/ui/optimized-image";

export default function BlogList() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Blog | Synergy Brand Architect - Insights & Trends";
  }, []);

  // Convex Query - Fetch only published blogs
  const blogs = useQuery(api.blogs.listBlogs, { status: "published" });
  const isLoading = blogs === undefined;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <WhatsappButton />
      
      <section className="relative bg-[#0066CC] text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Insights, strategies, and trends to build a remarkable digital presence.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />)}
            </div>
          ) : !blogs?.length ? (
            <div className="text-center py-20 text-gray-500">
               <TrendingUp className="mx-auto mb-4 opacity-20" size={48} />
               <p>No blog posts found. Stay tuned for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post: any) => (
                <article 
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <OptimizedImage 
                      src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      containerClassName="h-48"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <Calendar size={14} />
                      <span>{format(post.publishedAt || post.createdAt, 'MMM dd, yyyy')}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[#0066CC]">{post.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                    </p>
                    <div className="flex items-center gap-2 text-[#FF6B00] font-bold text-sm">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
