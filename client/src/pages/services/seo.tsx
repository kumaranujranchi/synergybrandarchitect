import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { Search, CheckCircle, ArrowRight, MousePointer2, Globe, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export default function SEO() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Technical SEO Audits",
    "Local SEO (Patna & Regional Focus)",
    "On-Page Content Optimization",
    "High-Quality Backlink Building",
    "Keyword Research & Ranking",
    "Google My Business Optimization",
    "Voice Search Optimization",
    "E-commerce SEO Specialists"
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100 text-[#f59e0b] mb-6">
                  <Search size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  SEO <span className="text-[#f59e0b]">Optimization</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-10 leading-relaxed">
                  Dominate search engine results and drive sustainable organic traffic. We use white-hat strategies to build long-term authority for your brand in search engines.
                </p>
                <Link href="/#contact" className="px-8 py-4 bg-[#f59e0b] text-white rounded-full font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
                  Climb the SERPs
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Technical SEO", icon: <Globe className="text-[#f59e0b]"/>, desc: "We ensure your site architecture is optimized for Google spider crawlability." },
                { title: "Local Visibility", icon: <MousePointer2 className="text-[#f59e0b]"/>, desc: "Dominate local search in Patna and regional markets with specialized local SEO." },
                { title: "Content Power", icon: <BarChart3 className="text-[#f59e0b]"/>, desc: "Strategic keyword-driven content that solves user queries and builds authority." }
              ].map((benefit, idx) => (
                <div key={idx} className="p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                  <div className="mb-6">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Content */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-8">
                  Data-Driven <br /> Search Excellence
                </h2>
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-4 py-4 bg-white px-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                      <CheckCircle className="text-[#f59e0b] shrink-0" size={24} />
                      <span className="text-lg font-semibold font-inter">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#f59e0b]/20 rounded-2xl blur group-hover:blur-md transition-all"></div>
                <div className="relative bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                   <h3 className="text-2xl font-bold mb-6">Transparency First</h3>
                   <p className="text-gray-600 mb-8 leading-relaxed italic">
                     "SEO is a marathon, but we provide the map."
                   </p>
                   <ul className="space-y-4">
                      <li className="flex gap-3 items-center"><Search size={20} className="text-[#f59e0b]"/> Clear Monthly Rank Reports</li>
                      <li className="flex gap-3 items-center"><Search size={20} className="text-[#f59e0b]"/> Conversion Analytics Integration</li>
                      <li className="flex gap-3 items-center"><Search size={20} className="text-[#f59e0b]"/> Competitor Gap Analysis</li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto dark:bg-gray-900 bg-amber-50 rounded-3xl p-12 overflow-hidden border border-amber-100">
              <h2 className="text-3xl font-bold mb-6">Ready to dominate Google First Page?</h2>
              <p className="text-gray-600 mb-10 text-lg">
                Let's conduct a free SEO audit and find your biggest opportunities for organic growth.
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#f59e0b] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Get Your Free SEO Audit <ArrowRight size={20} />
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
