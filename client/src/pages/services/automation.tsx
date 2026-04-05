import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { Zap, CheckCircle, ArrowRight, Cpu, MousePointer2, Database } from "lucide-react";
import { Link } from "wouter";

export default function Automation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "n8n Workflow Automation",
    "Make.com (Integromat) Integrations",
    "Zapier Custom Automations",
    "CRM & Lead Management Workflows",
    "Manual Task Elimination",
    "Business Intelligence Dashboards",
    "Email & Slack Notifications",
    "API & Database Syncing"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-100 text-[#10b981] mb-6">
                  <Zap size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Workflow <span className="text-[#10b981]">Automation</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-10 leading-relaxed">
                  Stop repeating daily tasks. We automate your business workflows using advanced tools so you can focus on high-impact growth while your systems run on autopilot.
                </p>
                <Link href="/#contact" className="px-8 py-4 bg-[#10b981] text-white rounded-full font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
                  Scale Your Efficiency
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-16">Tools We Master</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "n8n", desc: "Low-code automation workflow powerhouse", icon: <Cpu className="w-8 h-8 text-[#10b981]" /> },
                { name: "Make.com", desc: "Complex multi-step visual integrations", icon: <MousePointer2 className="w-8 h-8 text-[#10b981]" /> },
                { name: "Zapier", desc: "Connect 5k+ apps with ease", icon: <Zap className="w-8 h-8 text-[#10b981]" /> },
                { name: "Custom DB Sync", desc: "Reliable API & data management", icon: <Database className="w-8 h-8 text-[#10b981]" /> }
              ].map((tool, idx) => (
                <div key={idx} className="p-10 rounded-2xl border border-gray-100 hover:border-emerald-500 shadow-sm transition-all duration-300">
                  <div className="mb-6 flex justify-center">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="py-24 bg-gray-50 underline-offset-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-poppins font-bold mb-8">Eliminate Manual Tasks <br /> Today</h2>
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 py-3 border-b border-gray-200"
                    >
                      <CheckCircle className="text-[#10b981]" size={20} />
                      <span className="font-semibold text-gray-800 font-inter">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="p-10 bg-white rounded-3xl shadow-xl shadow-emerald-500/5">
                   <h3 className="text-2xl font-bold mb-4">Why Automate?</h3>
                   <ul className="space-y-4 text-gray-600">
                     <li className="flex gap-3"><Zap className="text-emerald-500 shrink-0" size={20}/> Save 100+ hours every month</li>
                     <li className="flex gap-3"><Zap className="text-emerald-500 shrink-0" size={20}/> Zero human-error rate</li>
                     <li className="flex gap-3"><Zap className="text-emerald-500 shrink-0" size={20}/> 24/7 continuous operations</li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-gray-900 text-white rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={120} />
              </div>
              <h2 className="text-3xl font-bold mb-6">Boost Your Team's Productivity</h2>
              <p className="text-gray-400 mb-10 text-lg">
                Let's discuss which internal processes we can automate to save you time and money.
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#10b981] text-white rounded-full font-bold text-lg hover:outline hover:outline-emerald-500 hover:scale-105 transition-all">
                Book an Automation Consultation <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  );
}
