import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { 
  Share2, 
  CheckCircle, 
  ArrowRight, 
  Target, 
  Zap, 
  Users, 
  TrendingUp, 
  Video, 
  Search, 
  MessageSquare,
  Sparkles,
  BarChart3,
  Layers,
  ShieldCheck,
  MousePointer2
} from "lucide-react";
import { Link } from "wouter";

export default function SocialMedia() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const resonanceSteps = [
    { 
      step: "01", 
      title: "Deep Audit & Audience Mining", 
      desc: "We don't just look at numbers; we analyze sentiment, competitor gaps, and your audience's hidden triggers." 
    },
    { 
      step: "02", 
      title: "The Content Ecosystem Design", 
      desc: "Crafting a multi-platform strategy where every reel, post, and story works together to build a cohesive narrative." 
    },
    { 
      step: "03", 
      title: "Velocity-Based Execution", 
      desc: "High-frequency, high-quality production designed to satisfy both the algorithm and your future customers." 
    },
    { 
      step: "04", 
      title: "Community Growth & Nurture", 
      desc: "Turning passive scrollers into active advocates through hyper-responsive engagement and community building." 
    },
    { 
      step: "05", 
      title: "ROI Attribution & Scaling", 
      desc: "We track the journey from first impression to final sale, scaling what works and pivoting what doesn't." 
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600">
      <Header />
      
      <main className="pt-24 overflow-x-hidden">
        {/* 1. HERO SECTION - Hook-Driven */}
        <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#0066CC,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-[#0066CC] text-sm font-bold tracking-wide uppercase mb-6">
                  2026 Strategy Ready
                </span>
                <h1 className="text-5xl md:text-7xl font-poppins font-bold text-gray-900 mb-8 tracking-tight">
                  Stop Chasing Likes. <br /> Start Building an <span className="text-[#0066CC]">Empire.</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-12 leading-relaxed max-w-2xl mx-auto">
                  While others fight for attention, we build resonance. We turn your social footprint into a high-converting ecosystem that drives real revenue, not just vanity metrics.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/#contact" className="w-full sm:w-auto px-10 py-5 bg-[#0066CC] text-white rounded-full font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    Claim Your Social Growth Audit <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. PAS SECTION - Problem / Agitation / Solution */}
        <section className="section-padding bg-white">
          <div className="container mx-auto container-padding">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <motion.div {...fadeInUp}>
                  <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6 transition-colors group-hover:text-blue-600">
                    The "Invisible Brand" Trap
                  </h2>
                  <p className="text-lg text-gray-600 font-inter mb-6">
                    You're posting daily, but the organic reach is dead. Your engagement is static, and your social channels feel like a chore rather than a revenue engine.
                  </p>
                  <p className="text-lg text-gray-600 font-inter mb-8 font-bold">
                    In 2026, if you aren't building a content ecosystem, you're just adding to the noise.
                  </p>
                  <div className="space-y-4 mb-10">
                    {[
                      { icon: <Zap size={20} />, text: "Algorithm-proof content strategies" },
                      { icon: <Target size={20} />, text: "Conversion-focused short-form video" },
                      { icon: <Users size={20} />, text: "Community-led growth methodologies" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-800 font-semibold font-inter">
                        <div className="text-blue-600 font-bold">{item.icon}</div>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="lg:w-1/2">
                <motion.div 
                  {...fadeInUp}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group"
                >
                  <img src="/images/services/social-media-hero.png" alt="Social Media Strategy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. METHODOLOGY - The 360 Resonance Framework */}
        <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          
          <div className="container mx-auto container-padding relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">The 360° Resonance Framework</h2>
              <p className="text-blue-400 font-inter tracking-widest uppercase text-sm font-bold border-b border-blue-900/50 pb-4 inline-block">Our Blueprint for Viral Growth & Revenue</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="mobile-scroll-container lg:grid-cols-3">
                {resonanceSteps.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="mobile-scroll-item flex flex-col gap-6 items-start p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group h-full"
                  >
                    <div className="text-5xl font-bold text-blue-900/50 group-hover:text-blue-500 transition-colors shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 font-inter leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRENDS SECTION - 2026 Digital Strategy */}
        <section className="section-padding bg-white">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">2026 Ready Strategies</h2>
              <p className="text-gray-600">We don't follow trends; we anticipate them.</p>
            </div>

            <div className="mobile-scroll-container lg:grid-cols-3">
              {[
                { 
                  icon: <Video />, 
                  title: "Video-First Ecosystems", 
                  desc: "Dominate TikTok, Reels, and Shorts with a unified video strategy that builds trust faster than any static post can." 
                },
                { 
                  icon: <Search />, 
                  title: "Social Search Optimization", 
                  desc: "Ranking your content where users are actually searching. TikTok and Instagram are the new Google for Gen Z and Millennials." 
                },
                { 
                  icon: <Sparkles />, 
                  title: "AI-Augmented Content", 
                  desc: "Using AI to analyze high-performing hooks and generate content variations that guarantee better reach." 
                },
                { 
                  icon: <Users />, 
                  title: "Community-Led Growth", 
                  desc: "Moving beyond 'followers' to building exclusive communities that act as your brand's biggest marketing channel." 
                },
                { 
                  icon: <Target />, 
                  title: "Social Commerce Mastery", 
                  desc: "Seamlessly bridging the gap between discovery and purchase with frictionless social checkout strategies." 
                },
                { 
                  icon: <TrendingUp />, 
                  title: "Omnichannel Narrative", 
                  desc: "Ensuring your brand voice is consistent and compounding across LinkedIn, Instagram, WhatsApp, and more." 
                }
              ].map((trend, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="mobile-scroll-item p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0066CC] flex items-center justify-center mb-6 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                    {trend.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{trend.title}</h4>
                  <p className="text-gray-600 text-sm font-inter leading-relaxed">{trend.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-slate-50">
          <div className="container mx-auto container-padding text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">Our Social Arsenal</h2>
            <p className="text-gray-600">Comprehensive solutions for every stage of your social growth.</p>
          </div>

          <div className="container mx-auto container-padding">
            <div className="mobile-scroll-container lg:grid-cols-2">
              {[
                { title: "Meta Management", items: ["Instagram Growth", "FB Community", "Threads Strategy"] },
                { title: "Video Production", items: ["Viral Reels/TikToks", "UGC Campaigns", "Short-form Scripts"] },
                { title: "B2B Social (LinkedIn)", items: ["Thought Leadership", "Employee Advocacy", "Lead Gen Content"] },
                { title: "Community Ops", items: ["Active Moderation", "Engagement Loops", "Crisis Management"] }
              ].map((box, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  className="mobile-scroll-item p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full"
                >
                  <h4 className="text-lg font-bold text-blue-600 mb-6 uppercase tracking-widest text-xs">{box.title}</h4>
                  <ul className="space-y-4">
                    {box.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium font-inter">
                        <CheckCircle size={16} className="text-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TRUST & RESULTS */}
        <section className="section-padding bg-white overflow-hidden relative">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 bg-blue-950 text-white relative z-10 overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BarChart3 size={200} />
              </div>
              <h2 className="text-3xl font-bold mb-8">Performance Driven, Always.</h2>
              <div className="mobile-scroll-container mb-10 lg:grid-cols-3">
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-blue-400 mb-2">250%</div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Avg Growth in 6 Mo</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-blue-400 mb-2">15M+</div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Views Generated</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-blue-400 mb-2">10X</div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Engagement Boost</p>
                </div>
              </div>
              <p className="text-lg text-gray-300 italic mb-0">
                "Numbers don't lie. We build systems that consistently outperform the algorithm."
              </p>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="section-padding bg-white relative overflow-hidden pt-0">
          <div className="container mx-auto container-padding text-center relative z-10">
            <div className="max-w-4xl mx-auto p-8 lg:p-24 bg-blue-50 rounded-3xl border border-blue-100">
              <h2 className="text-3xl md:text-6xl font-poppins font-bold text-gray-900 mb-8 leading-tight">Ready to Build <br /> Social Resonance?</h2>
              <p className="text-lg md:text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
                Stop guessing and start scaling with a data-driven, 2026-ready social ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/#contact" className="w-full sm:w-auto px-12 py-6 bg-[#0066CC] text-white rounded-full font-bold text-lg hover:scale-105 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30">
                  Book Your Strategy Call
                </Link>
                <a 
                  href="https://wa.me/917004453530" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-white rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  );
}
