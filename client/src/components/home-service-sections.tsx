import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Share2, 
  Target, 
  Zap, 
  Search, 
  CheckCircle,
  TrendingUp
} from "lucide-react";

interface ServiceSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
  accentColor: string;
  imagePath: string;
  url: string;
  reversed?: boolean;
}

const ServiceSection = ({ 
  title, 
  icon, 
  description, 
  features, 
  color, 
  accentColor, 
  imagePath, 
  url, 
  reversed = false 
}: ServiceSectionProps) => {
  return (
    <section className={`py-24 relative overflow-hidden ${reversed ? "bg-slate-50" : "bg-white"}`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`}>
          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: reversed ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`w-16 h-16 rounded-2xl ${color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                {icon}
              </div>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h2>
              <p className="text-lg text-gray-600 font-inter mb-8 leading-relaxed">
                {description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${accentColor} shrink-0`} />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link href={url} className={`inline-flex items-center gap-2 px-8 py-4 ${color} text-white rounded-full font-bold shadow-xl transition-all hover:scale-105`}>
                Explore Strategy <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          {/* Visual Side */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`absolute -inset-4 bg-gradient-to-tr ${reversed ? "from-emerald-500/10 to-indigo-500/10" : "from-orange-500/10 to-blue-500/10"} rounded-3xl blur-2xl -z-10`} />
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 p-2">
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                  <img 
                    src={imagePath} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Decorative Floating Element */}
              <div className={`absolute -bottom-6 -right-6 md:right-12 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center`}>
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Estimated Growth</p>
                    <p className="text-xl font-bold text-gray-900">+45% ROI</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomeServiceSections() {
  const sections = [
    {
      id: "social",
      title: "Social Media Marketing",
      icon: <Share2 size={32} />,
      description: "Amplify your brand voice where your audience is most active. We create thumb-stopping content and managed communities that turn followers into advocates.",
      features: [
        "Interactive Reels & Shorts",
        "Performance Audits",
        "Community Growth",
        "Influencer Strategy"
      ],
      color: "bg-[#0066CC]",
      accentColor: "text-[#0066CC]",
      imagePath: "/images/services/social-media-hero.png",
      url: "/services/social-media-marketing",
      reversed: false
    },
    {
      id: "performance",
      title: "Performance Marketing",
      icon: <Target size={32} />,
      description: "Stop guessing and start growing. Our ROI-first methodology ensures every advertising rupee is tracked, optimized, and converted into measurable profit.",
      features: [
        "Google & Meta Ads",
        "ROI-Driven Campaigns",
        "B2B Lead Generation",
        "Conversion Optimization"
      ],
      color: "bg-amber-500",
      accentColor: "text-amber-500",
      imagePath: "/images/services/performance-hero.png",
      url: "/services/performance-marketing",
      reversed: true
    },
    {
      id: "automation",
      title: "Intelligent Automation",
      icon: <Zap size={32} />,
      description: "Scale your business without scaling your workload. We build custom workflows using n8n and Make.com to automate repetitive tasks and let your team focus on high-impact work.",
      features: [
        "n8n Workflow Mastery",
        "CRM Syncing",
        "Lead Management",
        "AI Chatbot Integration"
      ],
      color: "bg-emerald-500",
      accentColor: "text-emerald-500",
      imagePath: "/images/services/automation-hero.png",
      url: "/services/automation",
      reversed: false
    },
    {
      id: "seo",
      title: "Search Engine Optimization",
      icon: <Search size={32} />,
      description: "Own the search results and drive sustainable organic traffic. Our scientific approach to SEO builds long-term authority that outlasts any algorithm update.",
      features: [
        "Technical SEO Audits",
        "Authority Backlinks",
        "Semantic Keyword Research",
        "Local Domination"
      ],
      color: "bg-amber-400",
      accentColor: "text-amber-500",
      imagePath: "/images/services/seo-hero.png",
      url: "/services/seo",
      reversed: true
    }
  ];

  return (
    <>
      {sections.map((section) => (
        <ServiceSection key={section.id} {...section} />
      ))}
    </>
  );
}
