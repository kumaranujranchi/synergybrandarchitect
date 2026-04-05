import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { Share2, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function SocialMedia() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Platform Management (FB, IG, LI, X)",
    "Daily Posting & Content Creation",
    "Community Management",
    "Influencer Collaborations",
    "Social Media Audits",
    "Storytelling & Engagement Strategy",
    "Reputation Management",
    "Video Reels & Shorts Production"
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-100 text-[#0066CC] mb-6">
                  <Share2 size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Social Media <span className="text-[#0066CC]">Marketing</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-10 leading-relaxed">
                  Grow your online community and engage your target audience where they spend most of their time. We turn social platforms into growth engines for your business.
                </p>
                <Link href="/#contact" className="px-8 py-4 bg-[#0066CC] text-white rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                  Scale Your Community
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8">
                  Data-Driven Social <br /> Management
                </h2>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 text-gray-700"
                    >
                      <CheckCircle className="text-[#0066CC] shrink-0" size={24} />
                      <span className="text-lg font-inter">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                   <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop" 
                    alt="Social Media Marketing" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center mb-16">The Growth Loop</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Strategy", desc: "We define which platforms and content styles will work best for your brand goals." },
                { step: "02", title: "Creation", desc: "Our team produces stunning visuals and copy that demand attention in the feed." },
                { step: "03", title: "Scale", desc: "We engage with your audience and iterate based on real performance data." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-4xl font-bold text-[#0066CC] mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400 font-inter leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl p-12 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6">Ready to dominate social feeds?</h2>
              <p className="text-gray-600 mb-10 text-lg">
                Let's discuss how we can turn your social platforms into powerful marketing channels.
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#0066CC] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Get a Social Audit <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <WhatsappButton />
    </div>
  );
}
