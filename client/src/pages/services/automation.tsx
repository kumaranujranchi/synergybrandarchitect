import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Cpu, 
  MousePointer2, 
  Database, 
  Bot, 
  LineChart, 
  Settings, 
  ShieldCheck, 
  Users, 
  MessageSquare,
  Workflow,
  Sparkles,
  RefreshCw,
  Clock
} from "lucide-react";
import { Link } from "wouter";

export default function Automation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const smartOpsSteps = [
    { 
      step: "01", 
      title: "Process Mapping & Friction Discovery", 
      desc: "We analyze your entire operation to find hidden bottlenecks, manual repetitive tasks, and potential profit leaks." 
    },
    { 
      step: "02", 
      title: "Automated Workflow Architecture", 
      desc: "Designing logic-heavy workflows using n8n, Make, or Zapier that connect your stack into a seamless engine." 
    },
    { 
      step: "03", 
      title: "AI Agent Integration", 
      desc: "Deploying intelligent autonomous agents that don't just 'trigger' but actually 'think' and execute complex business logic." 
    },
    { 
      step: "04", 
      title: "Rigorous Testing & Fail-safes", 
      desc: "Every automation is stress-tested with multi-layer error handling to ensure your business runs 24/7 without a hitch." 
    },
    { 
      step: "05", 
      title: "Performance Monitoring & ROI Sync", 
      desc: "We track the hours saved and efficiency gained, constantly optimizing for maximum operational throughput." 
    },
    { 
      step: "06", 
      title: "Continuous Scaling & Evolution", 
      desc: "As your business grows, we evolve your automation engine, adding new capabilities and ensuring your tech stack stays ahead of the curve." 
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-600">
      <Header />
      
      <main className="pt-24 overflow-x-hidden">
        {/* 1. HERO SECTION - Hook-Driven */}
        <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#10b981,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wide uppercase mb-6">
                  Future-Proof Operations
                </span>
                <h1 className="text-5xl md:text-7xl font-poppins font-bold text-gray-900 mb-8 tracking-tight">
                  A Business that <span className="text-emerald-600">Thinks</span> <br /> for Itself.
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-12 leading-relaxed max-w-2xl mx-auto">
                  Stop wasting human talent on manual tasks. We build intelligent, AI-driven architectures that automate your growth and free your team for high-impact strategy.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/#contact" className="w-full sm:w-auto px-10 py-5 bg-emerald-600 text-white rounded-full font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    Build Your Automation Roadmap <ArrowRight size={20} />
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
                  <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6 transition-colors">
                    The Silent Profit Killer: <br /> <span className="text-emerald-600">Human Friction.</span>
                  </h2>
                  <p className="text-lg text-gray-600 font-inter mb-6">
                    Every minute your team spends on manual data entry, customer follow-ups, or lead sorting is a minute stolen from your company's growth. 
                  </p>
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-2xl">
                    <p className="text-lg text-emerald-900 font-inter font-bold">
                      In 2026, automation isn't just about 'saving time.' It's about building a scalable competitive advantage that works 24/7.
                    </p>
                  </div>
                  <div className="space-y-4 mb-10">
                    {[
                      { icon: <Zap size={20} />, text: "Eliminate 80% of repetitive workflows" },
                      { icon: <ShieldCheck size={20} />, text: "Zero human-error lead processing" },
                      { icon: <Bot size={20} />, text: "Predictive AI-assisted decision making" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-800 font-semibold font-inter">
                        <div className="text-emerald-600 font-bold">{item.icon}</div>
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
                  <img src="/images/services/automation-hero.png" alt="Automation Engine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. METHODOLOGY - Smart Ops Architecture */}
        <section className="section-padding bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          
          <div className="container mx-auto container-padding relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">The Smart Ops Architecture</h2>
              <p className="text-emerald-400 font-inter tracking-widest uppercase text-sm font-bold border-b border-emerald-900/50 pb-4 inline-block">From Chaos to Autopilot</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="mobile-scroll-container lg:grid-cols-3">
                {smartOpsSteps.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="mobile-scroll-item flex flex-col gap-6 items-start p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-emerald-950/30 transition-colors group h-full"
                  >
                    <div className="text-5xl font-bold text-emerald-500/40 group-hover:text-emerald-400 transition-colors shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 font-inter leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRENDS SECTION - 2026 Enterprise Ready */}
        <section className="section-padding bg-white">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">2026 Ready Automations</h2>
              <p className="text-gray-600 italic font-inter">“If your systems aren't learning, they're decaying.”</p>
            </div>

            <div className="mobile-scroll-container lg:grid-cols-3">
              {[
                { 
                  icon: <Bot />, 
                  title: "Autonomous AI Agents", 
                  desc: "Beyond simple 'if-this-then-that'. These agents understand context, solve problems, and handle complex customer interactions." 
                },
                { 
                  icon: <RefreshCw />, 
                  title: "Self-Healing Workflows", 
                  desc: "Automations that detect their own errors and auto-correct, ensuring 99.9% operational uptime for mission-critical tasks." 
                },
                { 
                  icon: <Sparkles />, 
                  title: "Hyper-Personalization Scale", 
                  desc: "Dynamically personalized emails, offers, and dashboards for every single lead based on real-time behavior." 
                },
                { 
                  icon: <Database />, 
                  title: "Predictive Analytics Sync", 
                  desc: "Automations that analyze pipeline data to predict churn and automatically launch retention workflows." 
                },
                { 
                  icon: <Workflow />, 
                  title: "n8n Self-Hosting", 
                  desc: "Maximum security and infinite scalability with dedicated automation servers tailored to your enterprise data." 
                },
                { 
                  icon: <Clock />, 
                  title: "Zero-Latency Reporting", 
                  desc: "Instant live dashboards that sync your marketing spend with actual bank-account revenue in real-time." 
                }
              ].map((trend, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="mobile-scroll-item p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-colors group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    {trend.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{trend.title}</h4>
                  <p className="text-gray-600 text-sm font-inter leading-relaxed">{trend.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TOOLS WE MASTER - Tech Stack */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto container-padding text-center">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-16">Tools of the Trade</h2>
            <div className="mobile-scroll-container lg:grid-cols-2">
              {[
                { name: "n8n", desc: "Complex logic & data sovereignty", icon: <Workflow className="w-10 h-10 text-emerald-600" /> },
                { name: "Make.com", desc: "Visual multi-platform integrations", icon: <MousePointer2 className="w-10 h-10 text-emerald-600" /> },
                { name: "Zapier Central", desc: "Connect 6,000+ business apps", icon: <Zap className="w-10 h-10 text-emerald-600" /> },
                { name: "Custom API & SQL", desc: "Deep architectural data syncing", icon: <Database className="w-10 h-10 text-emerald-600" /> }
              ].map((tool, idx) => (
                <div key={idx} className="mobile-scroll-item p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="mb-6 flex justify-center">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 font-inter">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. AUTHORITY & PROOF */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 bg-emerald-950 text-white relative z-10 overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Settings size={200} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 transition-colors hover:text-emerald-400 uppercase tracking-tighter">The Efficiency Multiplier</h2>
              <div className="mobile-scroll-container mb-10 lg:grid-cols-3">
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">1200+</div>
                  <p className="text-sm text-emerald-100 opacity-60 uppercase tracking-widest">Monthly Hours Saved</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">0.0%</div>
                  <p className="text-sm text-emerald-100 opacity-60 uppercase tracking-widest">Lead Leakage Rate</p>
                </div>
                <div className="mobile-scroll-item">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">350%</div>
                  <p className="text-sm text-emerald-100 opacity-60 uppercase tracking-widest">Operational ROI</p>
                </div>
              </div>
              <p className="text-lg text-emerald-100 opacity-80 italic">
                "We don't just add tools; we remove friction."
              </p>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="section-padding bg-white relative overflow-hidden pt-0">
          <div className="container mx-auto container-padding text-center relative z-10">
            <div className="max-w-4xl mx-auto p-8 lg:p-24 bg-emerald-50 rounded-3xl border border-emerald-100">
              <h2 className="text-3xl md:text-6xl font-poppins font-bold text-gray-900 mb-8 leading-tight">Ready for <br /> Autopilot Growth?</h2>
              <p className="text-lg md:text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
                Schedule a consultation and let's map out exactly how much time and money you're leaving on the table.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/#contact" className="w-full sm:w-auto px-12 py-6 bg-emerald-600 text-white rounded-full font-bold text-lg hover:scale-105 hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/30">
                  Book Automation Call
                </Link>
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
