import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { 
  Target, 
  PenTool, 
  MessageSquare, 
  RefreshCw, 
  Layout, 
  FileText, 
  Sparkles, 
  Camera, 
  ShieldCheck, 
  Mic,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function BrandBuilding() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Brand Strategy / Positioning",
      description: "This is the foundation of your entire brand identity. We help you determine how your brand should be perceived in the minds of your target customers. This includes identifying your brand's core purpose, values, unique strengths, and the emotional connection it should build with customers. Through competitive analysis and audience research, we help position your brand in a unique, memorable space in the market."
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Brand Identity Development",
      description: "Your visual identity is often your brand's first impression. We help build a cohesive brand identity including logo design, typography, color palette, brand tone, and style guidelines. Our goal is to ensure that every visual and written element consistently communicates your brand personality and values across all platforms."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Corporate Communications",
      description: "Effective communication is vital to maintaining internal harmony and public trust. We create structured messaging for both internal (employees, stakeholders) and external (customers, media, public) audiences. This includes speeches, newsletters, company profiles, investor reports, and media communication."
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Brand Refresh / Rebranding",
      description: "Whether you're pivoting in a new direction or revamping a tired image, we assist with brand overhauls. Our rebranding services include strategic review, identity redesign, messaging realignment, and rollout planning to help you transition seamlessly while retaining brand equity."
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Brand Communication & Design",
      description: "We create compelling visual and written materials that tell your brand's story and promote your services. This includes brochures, banners, packaging, ads, pitch decks, and more. We ensure that all brand touchpoints carry a consistent message that resonates with your audience."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Content Development Services",
      description: "From articles and ad copies to email content and web pages — we create content that aligns with your brand voice and drives action. Whether you're looking for storytelling, informational content, or conversion-driven copy, our writers deliver quality content optimized for audience engagement and SEO."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Brand Experience Design",
      description: "Well-designed interactive and immersive experiences that leave a lasting impression. This could be digital (web-experience, app UX/UI) or physical (events, store layouts). Our aim is to make every interaction with your brand a memorable one."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photoshoots & Video Shoots",
      description: "Professional-grade visuals are critical for brand authenticity. We handle end-to-end execution of corporate shoots, product photography, event coverage, brand documentaries, reels, and promo videos. Each project is styled and directed to reflect your brand aesthetics."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Brand Conformance (IPR)",
      description: "Your brand's uniqueness needs legal protection. We assist with Intellectual Property Rights (IPR) such as trademark filing, copyright registration, and legal consultations to ensure your brand assets are safe from infringement and misuse."
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Brand Voice & Messaging Framework",
      description: "Your brand's tone and messaging need to be consistent across all channels. We develop comprehensive guidelines for how your brand speaks, the language it uses, and the key messages it communicates. This framework ensures that everyone from marketing to customer service represents your brand consistently."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Header Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6 tracking-tight">
                Our Comprehensive <span className="text-[#FF6B00]">Services</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-inter leading-relaxed max-w-3xl mx-auto italic">
                Synergy Brand Architect offers a wide range of strategic marketing and branding solutions to help businesses build their identity, reach their target audience, and achieve their goals.
              </p>
            </motion.div>
          </div>
        </section>


        {/* Services Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-200 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="p-4 rounded-2xl bg-orange-50 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-12 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-5 group-hover:text-[#FF6B00] transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 font-inter leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>
                    <Link href="/#contact" className="inline-flex items-center gap-3 text-[#FF6B00] font-black text-lg group-hover:gap-5 transition-all uppercase tracking-wider">
                      Get Started <ArrowRight size={22} strokeWidth={3} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] text-center text-white relative overflow-hidden group shadow-3xl shadow-gray-900/40"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8 relative z-10">Need a Custom Branding Solution?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
              Our experts are ready to architecture a unique strategy for your specific business needs. Let's create something extraordinary together.
            </p>
            <Link href="/#contact" className="inline-block relative z-10 px-14 py-6 bg-[#FF6B00] text-white rounded-full font-black text-2xl shadow-2xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all">
              Launch Your Project
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  );
}
