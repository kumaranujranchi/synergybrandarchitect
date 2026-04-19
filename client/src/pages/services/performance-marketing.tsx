import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Target, 
  BarChart3, 
  PieChart, 
  Zap, 
  ShieldCheck, 
  Users, 
  MousePointer2, 
  MessageSquare,
  Sparkles,
  Search,
  Globe,
  Coins
} from "lucide-react";
import { Link } from "wouter";
import { useContactModal } from "@/hooks/use-contact-modal";
import { Button } from "@/components/ui/button";

export default function PerformanceMarketing() {
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

  const roiEngineSteps = [
    { 
      step: "01", 
      title: "Data Integrity & Tracking Setup", 
      desc: "Before a single dollar is spent, we ensure your GA4, Pixel, and CAPI are firing perfectly for 100% attribution accuracy." 
    },
    { 
      step: "02", 
      title: "The Creative Testing Sandbox", 
      desc: "Deploying high-velocity creative tests to identify winning hooks, angles, and visuals that resonate with your target CAC." 
    },
    { 
      step: "03", 
      title: "Multi-Channel Bid Optimization", 
      desc: "Leveraging AI-driven bidding across Meta, Google, and LinkedIn to capture the highest intent users at the lowest cost." 
    },
    { 
      step: "04", 
      title: "Funnel Retargeting & LTV Boost", 
      desc: "Complex sequences designed to bring back window shoppers and turn one-time buyers into loyal brand advocates." 
    },
    { 
      step: "05", 
      title: "Aggressive Scaling & Portfolio Mix", 
      desc: "Scaling winning campaigns vertically and horizontally while maintaining a healthy ROAS across your entire ad account." 
    },
    { 
      step: "06", 
      title: "Continuous Audit & Iteration", 
      desc: "Performance marketing is never 'finished'. We consistently audit results, pivot strategies based on data, and identify new pockets of growth." 
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-amber-100 selection:text-amber-700">
      <Header />
      
      <main className="pt-24 overflow-x-hidden">
        {/* 1. HERO SECTION - Hook-Driven */}
        <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#fbbf24,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-amber-50 text-amber-600 text-sm font-bold tracking-wide uppercase mb-6">
                  ROI-First Methodology
                </span>
                <h1 className="text-5xl md:text-7xl font-poppins font-bold text-gray-900 mb-8 tracking-tight">
                  Turn Ad Spend into a <br /><span className="text-amber-500">Revenue Multiplier.</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-12 leading-relaxed max-w-2xl mx-auto">
                  Stop burning cash on 'brand awareness.' We build precision-engineered performance engines that focus on one thing: measurable, scalable profit.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    onClick={openModal}
                    className="w-full sm:w-auto px-10 py-8 bg-amber-500 text-white rounded-full font-bold shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2 h-auto text-lg"
                  >
                    Audit Your Ad Accounts <ArrowRight size={20} />
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
                  <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
                    Is Your Ad Spend <br /><span className="text-amber-500 transition-colors group-hover:text-amber-600">Bleeding Out?</span>
                  </h2>
                  <p className="text-lg text-gray-600 font-inter mb-6">
                    Rising CAC, platform attribution holes, and generic 'copy-paste' strategies are killing your margins. If you don't have a data-backed creative testing loop, you're just gambling.
                  </p>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-2xl">
                    <p className="text-lg text-amber-900 font-inter font-bold">
                      In 2026, performance marketing is won by those who master creative-led growth and first-party data.
                    </p>
                  </div>
                  <div className="space-y-4 mb-10">
                    {[
                      { icon: <Coins size={20} />, text: "Scientific testing of hooks & angles" },
                      { icon: <Target size={20} />, text: "Hyper-granular audience segmentation" },
                      { icon: <Zap size={20} />, text: "Real-time Profit/Loss attribution" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-800 font-semibold font-inter">
                        <div className="text-amber-500 font-bold">{item.icon}</div>
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
                  <img src="/images/services/performance-marketing-hero.png" alt="ROI Engine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. METHODOLOGY - The Scalable ROI Engine */}
        <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          
          <div className="container mx-auto container-padding relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">The Scalable ROI Engine</h2>
              <p className="text-amber-400 font-inter tracking-widest uppercase text-sm font-bold border-b border-amber-900/50 pb-4 inline-block">Our 6-Stage Performance Protocol</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="mobile-scroll-container lg:grid-cols-3">
                {roiEngineSteps.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="mobile-scroll-item flex flex-col gap-6 items-start p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-amber-950/20 transition-colors group h-full"
                  >
                    <div className="text-5xl font-bold text-amber-600/40 group-hover:text-amber-500 transition-colors shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
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
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">2026 Ready Strategies</h2>
              <p className="text-gray-600">While others rely on hacks, we rely on architectures.</p>
            </div>

            <div className="mobile-scroll-container lg:grid-cols-3">
              {[
                { 
                  icon: <Sparkles />, 
                  title: "Creative-Led Growth", 
                  desc: "The 'Ads' are the targeting. We build high-volume, high-relevance creative assets that find your winners automatically." 
                },
                { 
                  icon: <Target />, 
                  title: "Predictive Audience AI", 
                  desc: "Going beyond lookalikes. We use predictive modeling to target users before they even start searching." 
                },
                { 
                  icon: <BarChart3 />, 
                  title: "Omnichannel Attribution", 
                  desc: "Solving the black hole of multi-touch journeys. See exactly how social ads assist search conversions." 
                },
                { 
                  icon: <ShieldCheck />, 
                  title: "Anti-Fraud Protection", 
                  desc: "Integrated ad-fraud detection ensuring zero cents of your budget are wasted on bot traffic and click-farms." 
                },
                { 
                  icon: <Globe />, 
                  title: "Cross-Border Scaling", 
                  desc: "Localized creative and bidding strategies to scale your brand across international markets with ease." 
                },
                { 
                  icon: <MousePointer2 />, 
                  title: "Conversion Rate Sync", 
                  desc: "Ad accounts and landing pages in a continuous feedback loop. If the page doesn't convert, the ad won't spend." 
                }
              ].map((trend, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="mobile-scroll-item p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-amber-200 transition-colors group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    {trend.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{trend.title}</h4>
                  <p className="text-gray-600 text-sm font-inter leading-relaxed">{trend.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CHANNEL MASTERY */}
        <section className="section-padding bg-amber-50">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">Our Channel Expertise</h2>
              <p className="text-gray-600">Platform-specific strategies for maximum impact.</p>
            </div>
            
            <div className="mobile-scroll-container lg:grid-cols-3">
               {[
                 { platform: "Meta (IG/FB)", focus: "Creative Velocity & CAPI Mastery" },
                 { platform: "Google (Search/PMAX)", focus: "Intent Accuracy & Negative Filtering" },
                 { platform: "LinkedIn Ads", focus: "B2B Decision Maker Targeting" },
                 { platform: "TikTok / YouTube", focus: "High-Energy Video Storytelling" },
                 { platform: "Programmatic", focus: "Infinite Reach & Brand Safety" },
                 { platform: "Amazon / Etsy", focus: "Marketplace-Specific ROAS Scaling" }
               ].map((item, idx) => (
                 <div key={idx} className="mobile-scroll-item p-8 bg-white rounded-3xl border border-amber-100 shadow-sm flex items-center justify-between hover:scale-105 transition-transform duration-300 h-full">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{item.platform}</h4>
                      <p className="text-sm text-gray-500">{item.focus}</p>
                    </div>
                    <CheckCircle className="text-amber-500 shrink-0 ml-4" />
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* 6. PROOF SECTION */}
        <section className="section-padding bg-white">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 bg-amber-950 text-white relative z-10 overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Coins size={200} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tighter">Numbers Define Our Success.</h2>
              <div className="mobile-scroll-container mb-10 lg:grid-cols-3">
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-amber-400 mb-2">₹10Cr+</div>
                  <p className="text-sm text-amber-100 opacity-60 uppercase tracking-widest">Ad Spend Managed</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-amber-400 mb-2">4.5X</div>
                  <p className="text-sm text-amber-100 opacity-60 uppercase tracking-widest">Average Account ROAS</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-amber-400 mb-2">-35%</div>
                  <p className="text-sm text-amber-100 opacity-60 uppercase tracking-widest">Avg Reduction in CAC</p>
                </div>
              </div>
              <p className="text-lg text-amber-100 opacity-80 italic">
                "Scaling is easy. Scaling profitably is where we specialize."
              </p>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="section-padding bg-white relative overflow-hidden pt-0">
          <div className="container mx-auto container-padding text-center relative z-10">
            <div className="max-w-4xl mx-auto p-8 lg:p-24 bg-amber-50 rounded-3xl border border-amber-100">
              <h2 className="text-3xl md:text-6xl font-poppins font-bold text-gray-900 mb-8 leading-tight">Ready to Scale <br /> Profitably?</h2>
              <p className="text-lg md:text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
                Stop guessing. Start growing. Get a comprehensive audit of your existing accounts and a roadmap to 5X growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  onClick={openModal}
                  className="w-full sm:w-auto px-12 py-8 bg-amber-500 text-white rounded-full font-bold text-lg hover:scale-105 hover:bg-amber-600 transition-all shadow-2xl shadow-amber-500/30 h-auto"
                >
                  Book Your Audit Now
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
