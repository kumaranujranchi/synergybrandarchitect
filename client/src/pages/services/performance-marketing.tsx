import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { Target, CheckCircle, ArrowRight, LineChart, PieChart, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function PerformanceMarketing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Google PPC & Search Ads",
    "Meta (Facebook/Instagram) Ads",
    "LinkedIn B2B Lead Gen",
    "TikTok Ads (International Markets)",
    "Native Ads (Taboola, MGID)",
    "Retargeting & Remarketing",
    "Conversion Rate Optimization (CRO)",
    "Detailed ROI & Analytics Reporting"
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-rose-100 text-[#f43f5e] mb-6">
                  <Target size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Performance <span className="text-[#f43f5e]">Marketing</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-10 leading-relaxed">
                  ROI-driven advertising campaigns designed to generate measurable results. We optimize for conversions, not just clicks, ensuring every advertising rupee works for you.
                </p>
                <Link href="/#contact" className="px-8 py-4 bg-[#f43f5e] text-white rounded-full font-bold shadow-lg shadow-rose-500/20 hover:scale-105 transition-transform">
                  Scale Your ROI
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Channels Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-16">High-Performance Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "PPC & Search", icon: <LineChart className="text-[#f43f5e]"/>, desc: "Dominate search engine results and capture high-intent leads." },
                { name: "Social Advertising", icon: <PieChart className="text-[#f43f5e]"/>, desc: "Advanced targeting on Meta, LinkedIn, and TikTok for laser focus." },
                { name: "Native Ads", icon: <TrendingUp className="text-[#f43f5e]"/>, desc: "Scale beyond standard socials with Taboola and MGID placements." }
              ].map((channel, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="mb-6 flex justify-center text-center">{channel.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{channel.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{channel.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Split Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-8">
                  Measurable Growth <br /> Strategies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-3"
                    >
                      <CheckCircle className="text-[#f43f5e] shrink-0" size={18} />
                      <span className="text-sm font-semibold text-gray-700 font-inter">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#f43f5e] to-rose-600 p-12 rounded-3xl text-white shadow-2xl relative z-10">
                   <h3 className="text-2xl font-bold mb-6">Our Data Guarantee</h3>
                   <p className="text-rose-50 mb-8 leading-relaxed">
                     We don't hide behind vanity metrics. You'll get real-time dashboards showing exactly how many leads we've generated and your precise cost-per-acquisition.
                   </p>
                   <ul className="space-y-4">
                      <li className="flex gap-3"><Target size={20}/> 24/7 Access to Ad Dashboards</li>
                      <li className="flex gap-3"><Target size={20}/> Weekly Optimization Syncs</li>
                      <li className="flex gap-3"><Target size={20}/> Strategy & Creative Testing</li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto rounded-3xl p-12 border-2 border-dashed border-rose-200">
              <h2 className="text-3xl font-bold mb-6">Ready to scale your ad spend profitably?</h2>
              <p className="text-gray-600 mb-10 text-lg">
                Let's discuss your marketing goals and build a strategy that delivers a positive ROAS.
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#f43f5e] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Consult With an Expert <ArrowRight size={20} />
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
