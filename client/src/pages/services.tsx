import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { 
  ArrowRight, 
  CheckCircle, 
  Palette, 
  Share2, 
  Smartphone, 
  Cpu, 
  Target, 
  Search, 
  LineChart, 
  Zap,
  Check
} from "lucide-react";
import { Link } from "wouter";
import { useContactModal } from "@/hooks/use-contact-modal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
  buttonColor: string;
  url: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "brand",
    title: "Brand Building Services",
    icon: <Palette className="w-10 h-10" />,
    description: "Build a lasting legacy with our comprehensive branding solutions, from strategy to professional production. We align your brand voice with your business goals to create instant recognition.",
    features: [
      "Brand Strategy & Positioning",
      "Visual Identity & Logo Design",
      "Corporate Communications",
      "Brand Refresh & Rebranding",
      "Professional Photo/Video Shoots",
      "Intellectual Property (IPR) Support",
      "Brand Style Guides",
      "Brand Experience Design"
    ],
    color: "from-[#FF6B00] to-[#FF8533]",
    buttonColor: "bg-[#FF6B00] hover:bg-[#FF8533]",
    url: "/services/brand-building"
  },
  {
    id: "social",
    title: "Social Media Marketing",
    icon: <Share2 className="w-10 h-10" />,
    description: "Grow your online community and engage your target audience where they spend most of their time. We turn social platforms into growth engines for your business.",
    features: [
      "Platform Management (FB, IG, LI, X)",
      "Daily Posting & Content Creation",
      "Community Management",
      "Influencer Collaborations",
      "Social Media Audits",
      "Storytelling & Engagement Strategy",
      "Reputation Management",
      "Video Reels & Shorts Production"
    ],
    color: "from-[#0066CC] to-[#0077EE]",
    buttonColor: "bg-[#0066CC] hover:bg-[#0077EE]",
    url: "/services/social-media-marketing"
  },
  {
    id: "web-app",
    title: "Website & Mobile App Development",
    icon: <Smartphone className="w-10 h-10" />,
    description: "Experience state-of-the-art digital infrastructure built with modern technologies like React, Vite, and Convex. We build sites that aren't just beautiful—they convert.",
    features: [
      "Custom React & Vite Websites",
      "Mobile App Development (iOS/Android)",
      "E-commerce Platforms (Full-Stack)",
      "UI/UX Design Excellence",
      "Responsive & Mobile-First Design",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "State-of-the-art Infrastructure"
    ],
    color: "from-[#6366f1] to-[#818cf8]",
    buttonColor: "bg-[#6366f1] hover:bg-[#818cf8]",
    url: "/services/web-app-development"
  },
  {
    id: "automation",
    title: "Automation",
    icon: <Zap className="w-10 h-10" />,
    description: "Stop repeating daily tasks. We automate your workflows using advanced tools so you can focus on high-impact business growth while your systems run on autopilot.",
    features: [
      "n8n Workflow Automation",
      "Make.com (Integromat) Integrations",
      "Zapier Custom Automations",
      "CRM & Lead Management Workflows",
      "Manual Task Elimination",
      "Business Intelligence Dashboards",
      "Email & Slack Notifications",
      "API & Database Syncing"
    ],
    color: "from-[#10b981] to-[#34d399]",
    buttonColor: "bg-[#10b981] hover:bg-[#34d399]",
    url: "/services/automation"
  },
  {
    id: "performance",
    title: "Performance Marketing",
    icon: <Target className="w-10 h-10" />,
    description: "ROI-driven advertising campaigns designed to generate measurable results. We optimize for conversions, not just clicks, ensuring every advertising rupee works for you.",
    features: [
      "Google PPC & Search Ads",
      "Meta (Facebook/Instagram) Ads",
      "LinkedIn B2B Lead Gen",
      "TikTok Ads (International Markets)",
      "Native Ads (Taboola, MGID)",
      "Retargeting & Remarketing",
      "Conversion Rate Optimization (CRO)",
      "Detailed ROI & Analytics Reporting"
    ],
    color: "from-[#f43f5e] to-[#fb7185]",
    buttonColor: "bg-[#f43f5e] hover:bg-[#fb7185]",
    url: "/services/performance-marketing"
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    icon: <Search className="w-10 h-10" />,
    description: "Dominate search engine results and drive sustainable organic traffic. We use white-hat strategies to build long-term authority for your brand in search engines.",
    features: [
      "Technical SEO Audits",
      "Local SEO (Patna & Regional Focus)",
      "On-Page Content Optimization",
      "High-Quality Backlink Building",
      "Keyword Research & Ranking",
      "Google My Business Optimization",
      "Voice Search Optimization",
      "E-commerce SEO Specialists"
    ],
    color: "from-[#f59e0b] to-[#fbbf24]",
    buttonColor: "bg-[#f59e0b] hover:bg-[#fbbf24]",
    url: "/services/seo"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ServicesPage() {
  const { openModal } = useContactModal();
  useEffect(() => {
    document.title = "Services | Synergy Brand Architect - Digital Marketing & Branding Solutions";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF6B00]/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0066CC]/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6 tracking-tight">
              Scale Your Impact with Our <span className="text-[#FF6B00]">Core Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 font-inter mb-10 leading-relaxed">
              We combine strategic brand building with cutting-edge digital performance 
              to transform your business into a market leader.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={openModal}
                className="px-8 py-8 bg-[#FF6B00] text-white rounded-full font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform h-auto text-lg"
              >
                Book a Strategy Call
              </Button>
              <Button 
                onClick={openModal}
                className="px-8 py-8 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors h-auto text-lg"
              >
                Get a Custom Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {serviceCategories.map((category) => (
              <motion.div 
                key={category.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Accent line on top */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${category.color}`} />
                
                <div className="mb-6 flex items-center justify-between">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                </div>
                
                <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4 group-hover:text-[#FF6B00] transition-colors">
                  {category.title}
                </h2>
                
                <p className="text-gray-600 font-inter mb-8 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-auto">
                  <div className="space-y-3 mb-8">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm font-medium text-gray-700">
                        <Check className="w-4 h-4 text-[#FF6B00] mr-3 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link href={category.url} className={`w-full py-3 ${category.buttonColor} text-white rounded-xl font-bold flex items-center justify-center transition-all group-hover:shadow-lg`}>
                    Explore Service <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <Footer />
      <WhatsappButton />
    </div>
  );
}