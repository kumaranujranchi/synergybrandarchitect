import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { Palette, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function BrandBuilding() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Brand Strategy & Positioning",
    "Visual Identity & Logo Design",
    "Corporate Communications",
    "Brand Refresh & Rebranding",
    "Professional Photo/Video Shoots",
    "Intellectual Property (IPR) Support",
    "Brand Style Guides",
    "Brand Experience Design"
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-100 text-[#FF6B00] mb-6">
                  <Palette size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Brand Building <span className="text-[#FF6B00]">Services</span>
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-10 leading-relaxed">
                  Build a lasting legacy with our comprehensive branding solutions. We align your brand voice with your business goals to create instant recognition and trust.
                </p>
                <Link href="/#contact" className="px-8 py-4 bg-[#FF6B00] text-white rounded-full font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform">
                  Start Your Brand Journey
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
                  Comprehensive Branding <br /> Solutions
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
                      <CheckCircle className="text-[#FF6B00] shrink-0" size={24} />
                      <span className="text-lg font-inter">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                   <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                    alt="Brand Building" 
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
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center mb-16">Our Creative Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "We dive deep into your business, market, and audience to find your unique edge." },
                { step: "02", title: "Design", desc: "Our creative team crafts a visual identity that resonates with your core values." },
                { step: "03", title: "Delivery", desc: "We provide all assets and guidelines to ensure consistent brand across platforms." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-4xl font-bold text-[#FF6B00] mb-4">{item.step}</div>
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
              <h2 className="text-3xl font-bold mb-6">Ready to architecture your brand?</h2>
              <p className="text-gray-600 mb-10 text-lg">
                Let's discuss how we can help your brand stand out in the crowded market.
              </p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF6B00] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Consult With Us <ArrowRight size={20} />
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
