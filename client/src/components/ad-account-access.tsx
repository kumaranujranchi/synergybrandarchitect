import { ArrowRight, Ban, CheckCircle, LucideDollarSign, ShieldCheck, LayoutGrid, MousePointer, Shield, Zap, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/hooks/use-contact-modal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AdAccountAccess() {
  const { openModal } = useContactModal();

  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden text-white font-inter">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
              <Shield className="w-4 h-4 text-orange-500" />
              <span className="text-orange-400 font-bold text-sm tracking-wider uppercase">Ban-Proof Advertising</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-poppins font-black mb-6 leading-tight">
              Tired of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 italic">Ad Account Bans?</span><br />
              <span className="text-white">We've Got You Covered.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Run your campaigns through our <span className="text-blue-400 font-semibold underline decoration-blue-400/30 underline-offset-4">Verified Premium Agency Accounts</span>. 
              No more limits. No more stress. Just pure scaling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            {/* Left: Benefits Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Zap className="text-orange-500" />,
                  title: "Run Ads Day 1",
                  desc: "Zero warming period. Launch your heavy-spend campaigns immediately.",
                  color: "orange"
                },
                {
                  icon: <TrendingUp className="text-blue-500" />,
                  title: "Uncapped Limits",
                  desc: "Enjoy high daily budgets from the start. Perfect for fast-scaling brands.",
                  color: "blue"
                },
                {
                  icon: <ShieldCheck className="text-green-500" />,
                  title: "Compliance Managed",
                  desc: "Our team handles ad-policy audits to keep your accounts healthy.",
                  color: "green"
                },
                {
                  icon: <Globe className="text-purple-500" />,
                  title: "Global Reach",
                  desc: "Unified access to Meta & Google Agency accounts worldwide.",
                  color: "purple"
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.05] transition-all group"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3",
                    benefit.color === "orange" ? "bg-orange-500/20" : 
                    benefit.color === "blue" ? "bg-blue-500/20" : 
                    benefit.color === "green" ? "bg-green-500/20" : "bg-purple-500/20"
                  )}>
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Modern Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-2xl overflow-hidden"
            >
              <div className="bg-[#11111a] p-10 rounded-[2.8rem]">
                <h3 className="text-2xl font-bold mb-8 text-center">The <span className="text-blue-400">Synergy</span> Edge</h3>
                <div className="space-y-4">
                  {[
                    { label: "Account Stability", synergi: "Permanent", status: "Risky", icon: <Shield size={18} /> },
                    { label: "Daily Spend", synergi: "Unlimited", status: "Capped", icon: <LucideDollarSign size={18} /> },
                    { label: "Support Speed", synergi: "Instant", status: "Delayed", icon: <Zap size={18} /> },
                    { label: "Ban Risk", synergi: "Minimal", status: "Critical", icon: <Ban size={18} /> },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400">
                        {row.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{row.label}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-green-400 font-bold">Synergy: {row.synergi}</span>
                          <span className="text-red-500/50 text-sm italic">Standard: {row.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <p className="text-blue-400 font-medium text-sm mb-4 tracking-widest uppercase">Supported Platforms</p>
                  <div className="flex justify-center gap-8">
                    <div className="flex flex-col items-center gap-2 group">
                      <div className="bg-[#1877F2]/10 p-4 rounded-2xl group-hover:bg-[#1877F2]/20 transition-colors">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-gray-500">META</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group">
                      <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-white/10 transition-colors">
                        <svg className="w-8 h-8" viewBox="0 0 24 24">
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.36-7.84 5.36-4.96 0-9-4.08-9-9s4.04-9 9-9c2.8 0 4.68 1.16 5.76 2.2l2.6-2.6C18.84 1.96 15.84.48 12.48.48 6 .48.48 6.04.48 12.48s5.52 12 12 12c6.8 0 11.28-4.76 11.28-11.44 0-.76-.08-1.32-.2-1.92h-11.08z" fill="#fff"/>
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-gray-500">GOOGLE</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* New Age Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-24"
          >
            <h3 className="text-3xl font-bold text-center mb-16 underline decoration-orange-500/30 decoration-8 underline-offset-8">Account Deployment Flow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector Lines (Desktop) */}
              <div className="hidden md:block absolute top-[40%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
              
              {[
                { step: "01", title: "Strategy Audit", desc: "Brief us on your business niche and ad history." },
                { step: "02", title: "Instant Linkage", desc: "We map your pixels and assets to our premium accounts." },
                { step: "03", title: "Zero-Ban Scale", desc: "Start spending with confidence and 24/7 account health monitoring." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="relative z-10 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all text-center group"
                >
                  <div className="text-6xl font-black text-white/5 absolute -top-4 left-1/2 -translate-x-1/2 group-hover:text-orange-500/10 transition-colors">{item.step}</div>
                  <h5 className="text-xl font-bold mb-4 relative z-10">{item.title}</h5>
                  <p className="text-gray-500 relative z-10 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA Action */}
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-blue-600 to-blue-800 text-center relative overflow-hidden group shadow-[0_0_50px_-12px_rgba(37,99,235,0.5)]">
              {/* Internal Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Stop Getting Banned.<br />Start Getting Results.</h3>
                <p className="text-xl text-blue-100 mb-10 opacity-90">
                  Join 100+ global advertisers who scale without limits. Approval takes less than 12 hours.
                </p>
                <Button 
                  onClick={openModal}
                  className="bg-[#FF6B00] hover:bg-orange-600 py-8 px-12 text-white font-black rounded-3xl text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all group border-b-4 border-orange-800"
                >
                  GET INSTANT ACCESS
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <div className="flex flex-wrap items-center justify-center mt-10 gap-x-8 gap-y-4 text-sm font-bold text-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>SECURE DIRECT ACCESS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>24/7 EXPERT SUPPORT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>100% COMPLIANT</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>