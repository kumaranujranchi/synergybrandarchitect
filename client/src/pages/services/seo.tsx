import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { 
  Search, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Zap, 
  Target, 
  ShieldCheck, 
  Users, 
  MousePointer2, 
  MessageSquare,
  Sparkles,
  Link2,
  FileText,
  Terminal,
  TrendingUp,
  Award
} from "lucide-react";
import { Link } from "wouter";
import { useContactModal } from "@/hooks/use-contact-modal";
import { Button } from "@/components/ui/button";

export default function SEO() {
  const { openModal } = useContactModal();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const authoritySteps = [
    { 
      step: "01", 
      title: "Technical Foundation & Core Vitals", 
      desc: "We start by fixing the structural leaks in your site—speed, schema, and crawlability—to ensure Google loves your architecture." 
    },
    { 
      step: "02", 
      title: "Semantic Content Clusters", 
      desc: "Beyond keywords. We build 'Authority Hubs' that cover entire topics, signaling to search engines that you are the primary source of truth." 
    },
    { 
      step: "03", 
      title: "Digital PR & Quality Backlinks", 
      desc: "Earned media and high-authority placements that build trust and pass massive ranking signals to your key commercial pages." 
    },
    { 
      step: "04", 
      title: "SGE & Local Authority Tuning", 
      desc: "Optimizing for the new Search Generative Experience and dominating local maps to capture users at the exact moment of intent." 
    },
    { 
      step: "05", 
      title: "Continuous Conversion Analytics", 
      desc: "Traffic is useless without revenue. We map search terms to sales, doubling down on the intent that actually drives your bottom line." 
    },
    { 
      step: "06", 
      title: "ROI Synthesis & Strategy Scaling", 
      desc: "SEO is a long-term compounder. We map every keyword to real revenue, consistently auditing performance and scaling your authority into new profitable territories." 
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-700">
      <Header />
      
      <main className="pt-36 overflow-x-hidden">
        {/* 1. HERO SECTION - Hook-Driven */}
        <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#4f46e5,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-6">
                  Authority-First SEO
                </span>
                <h1 className="text-5xl md:text-7xl font-poppins font-bold text-gray-900 mb-8 tracking-tight">
                  Win the Search War. <br /><span className="text-indigo-600">Dominate the AI Era.</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-12 leading-relaxed max-w-2xl mx-auto">
                  If you aren't on Page 1, you don't exist. We don't just 'rank' pages; we build digital authority that survives algorithm updates and outperforms your competition.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    onClick={openModal}
                    className="w-full sm:w-auto px-10 py-8 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2 h-auto text-lg"
                  >
                    Request Your SEO Roadmap <ArrowRight size={20} />
                  </Button>
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
                  <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6 transition-colors group-hover:text-indigo-600">
                    The Search <br /><span className="text-indigo-600 font-bold">"Death Valley."</span>
                  </h2>
                  <p className="text-lg text-gray-600 font-inter mb-6">
                    Page 2 of Google is where brands go to die. Relying on paid ads alone is a treadmill you can't get off. Without organic authority, your customer acquisition cost will only go up.
                  </p>
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-2xl">
                    <p className="text-lg text-indigo-900 font-inter font-bold">
                      In 2026, SEO is no longer about 'keywords.' It's about becoming the undisputed authority in your niche.
                    </p>
                  </div>
                  <div className="space-y-4 mb-10">
                    {[
                      { icon: <Globe size={20} />, text: "Algorithm-resilient ranking systems" },
                      { icon: <Target size={20} />, text: "Zero-click content survival strategies" },
                      { icon: <Award size={20} />, text: "E-E-A-T focused topical authority" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-800 font-semibold font-inter">
                        <div className="text-indigo-600 font-bold">{item.icon}</div>
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
                  <img src="/images/services/seo-hero.png" alt="SEO Authority Lighthouse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. METHODOLOGY - The Search Authority Blueprint */}
        <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          
          <div className="container mx-auto container-padding relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">The Search Authority Blueprint</h2>
              <p className="text-indigo-400 font-inter tracking-widest uppercase text-sm font-bold border-b border-indigo-900/50 pb-4 inline-block">How We Claim Your Territory</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="mobile-scroll-container lg:grid-cols-3">
                {authoritySteps.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="mobile-scroll-item flex flex-col gap-6 items-start p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-slate-900 transition-colors group h-full"
                  >
                    <div className="text-5xl font-bold text-indigo-900/50 group-hover:text-indigo-500 transition-colors shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 font-inter leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRENDS SECTION - 2026 Ready */}
        <section className="section-padding bg-white">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">2026 Search Trends</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">SEO is evolving. The brands that win in 2026 are those that adapt to AI search and zero-click environments.</p>
            </div>

            <div className="mobile-scroll-container lg:grid-cols-3">
              {[
                { 
                  icon: <Sparkles />, 
                  title: "SGE Optimization", 
                  desc: "Ranking within Google's Search Generative Experience AI answers to capture the 'Pre-Click' audience." 
                },
                { 
                  icon: <Users />, 
                  title: "Zero-Click Authority", 
                  desc: "Providing enough value in snippets and featured results to build brand recall even without a website visit." 
                },
                { 
                  icon: <Award />, 
                  title: "E-E-A-T Weighting", 
                  desc: "Demonstrating Experience, Expertise, Authoritativeness, and Trustworthiness through deep content signals." 
                },
                { 
                  icon: <Terminal />, 
                  title: "Semantic Search Logic", 
                  desc: "Moving beyond keyword density towards 'entity-based' SEO that helps AI understand your brand's relationships." 
                },
                { 
                  icon: <Globe />, 
                  title: "Cross-Market Local SEO", 
                  desc: "Dominating hyper-local search results across multiple physical or digital locations simultaneously." 
                },
                { 
                  icon: <TrendingUp />, 
                  title: "Video SEO Synergy", 
                  desc: "Ranking your YouTube and TikTok assets within the main search pool to capture visual-first searchers." 
                }
              ].map((trend, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="mobile-scroll-item p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
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
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4 transition-colors">Our SEO Arsenal</h2>
            <p className="text-gray-600">Deep-dive technical and creative SEO services.</p>
          </div>

          <div className="container mx-auto container-padding">
            <div className="mobile-scroll-container lg:grid-cols-2">
              {[
                { title: "Technical SEO", items: ["Speed & Core Vitals", "Schema Markup", "Mobile-First Logic"], icon: <Terminal /> },
                { title: "Content Strategy", items: ["Topical Clusters", "AI Content Tuning", "Blog Ecosystems"], icon: <FileText /> },
                { title: "Authority Building", items: ["White-Hat Outreach", "Brand Mentions", "Digital PR"], icon: <Link2 /> },
                { title: "Local Mastery", items: ["GMB Optimization", "Citation Scaling", "Geo-Targeting"], icon: <Target /> }
              ].map((box, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  className="mobile-scroll-item p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group h-full"
                >
                  <div className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform">{box.icon}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">{box.title}</h4>
                  <ul className="space-y-4">
                    {box.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium font-inter">
                        <CheckCircle size={16} className="text-indigo-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PROOF & METRICS */}
        <section className="section-padding bg-white overflow-hidden relative">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 bg-indigo-950 text-white relative z-10 overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp size={200} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tighter">Visible, Verifiable Results.</h2>
              <div className="mobile-scroll-container mb-10 lg:grid-cols-3">
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">300%</div>
                  <p className="text-sm text-indigo-100 opacity-60 uppercase tracking-widest">Avg Traffic Increase</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">1500+</div>
                  <p className="text-sm text-indigo-100 opacity-60 uppercase tracking-widest">Page 1 Keywords</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">80+</div>
                  <p className="text-sm text-indigo-100 opacity-60 uppercase tracking-widest">Avg. Domain Authority</p>
                </div>
              </div>
              <p className="text-lg text-indigo-100 opacity-80 italic">
                "Ranking is only half the battle. Owning the search intent is the victory."
              </p>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="section-padding bg-white relative overflow-hidden pt-0">
          <div className="container mx-auto container-padding text-center relative z-10">
            <div className="max-w-4xl mx-auto p-8 lg:p-24 bg-indigo-50 rounded-3xl border border-indigo-100">
              <h2 className="text-3xl md:text-6xl font-poppins font-bold text-gray-900 mb-8 leading-tight">Ready to Own <br /> the Search Engine?</h2>
              <p className="text-lg md:text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
                Get a comprehensive deep-dive SEO audit and a roadmap to bypass your competitors on page one.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  onClick={openModal}
                  className="w-full sm:w-auto px-12 py-8 bg-indigo-600 text-white rounded-full font-bold text-lg hover:scale-105 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 h-auto"
                >
                  Book Your SEO Strategy Call
                </Button>
                <a 
                  href="https://wa.me/919525230232" 
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
