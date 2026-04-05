import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  CheckCircle, 
  ArrowRight, 
  Code, 
  Layout, 
  Globe, 
  Zap, 
  Target, 
  Shield, 
  Monitor, 
  Search, 
  Link as LinkIcon, 
  Cpu, 
  Users, 
  Rocket, 
  MessageSquare,
  Server,
  Cloud,
  Lock,
  ShoppingBag,
  Database
} from "lucide-react";
import { Link } from "wouter";

export default function WebApp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-600">
      <Header />
      
      <main className="pt-24 overflow-x-hidden">
        {/* 1. HERO SECTION */}
        <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#6366f1,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-6">
                  Next-Gen Development
                </span>
                <h1 className="text-5xl md:text-7xl font-poppins font-bold text-gray-900 mb-8 tracking-tight">
                  Build Digital <span className="text-indigo-600">Experiences</span> <br /> That Convert
                </h1>
                <p className="text-xl text-gray-600 font-inter mb-12 leading-relaxed max-w-2xl mx-auto">
                  We don’t just build websites and apps — we create scalable digital products that drive growth, automate processes, and engage your customers.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/#contact" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    Get Free Consultation <ArrowRight size={20} />
                  </Link>
                  <Link href="/portfolio" className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">
                    Start Your Project
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. SERVICES BREAKDOWN (2-column layout) */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">Development Services</h2>
              <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Website Development */}
              <motion.div 
                {...fadeInUp}
                className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                  <Globe size={32} />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-4">Website Development</h3>
                <p className="text-gray-600 mb-8 font-inter">
                  “Fast, SEO-friendly, and conversion-focused websites tailored to your business goals.”
                </p>
                <ul className="space-y-4">
                  {['Business Websites', 'E-commerce Stores', 'Landing Pages', 'Custom Web Applications'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="text-blue-500" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Mobile App Development */}
              <motion.div 
                {...fadeInUp}
                className="p-10 rounded-3xl bg-indigo-50 border border-indigo-100 hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-4">Mobile App Development</h3>
                <p className="text-gray-600 mb-8 font-inter">
                  “User-friendly, scalable mobile apps designed for performance and growth.”
                </p>
                <ul className="space-y-4">
                  {['Android Apps', 'iOS Apps', 'Cross-platform Apps (Flutter / React Native)', 'SaaS & Startup Apps'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="text-indigo-500" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. KEY FEATURES (icon-based grid) */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">Why Build With Us?</h2>
              <p className="text-gray-600">Premium quality comes from attention to technical excellence.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Zap />, title: "Fast Loading & Optimized Performance", desc: "No more slow load times. We optimize everything for speed and core web vitals." },
                { icon: <Target />, title: "Conversion-Focused Design", desc: "Every element is placed strategically to guide users towards your business goals." },
                { icon: <Shield />, title: "Secure & Scalable Architecture", desc: "Built with security-first mindset and architecture that grows with your team." },
                { icon: <Monitor />, title: "Fully Responsive (All Devices)", desc: "Flawless experience across desktops, tablets, and smartphones." },
                { icon: <Search />, title: "SEO-Ready Structure", desc: "Baked-in SEO best practices to ensure your site is found by search engines." },
                { icon: <LinkIcon />, title: "Easy Integrations", desc: "Seamless connections with Payments (Stripe/PayPal), APIs, and CRMs (HubSpot/Zoho)." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-indigo-200 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-inter">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. DEVELOPMENT PROCESS (step-by-step timeline) */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">Our Development Journey</h2>
              <p className="text-gray-600">A clear, transparent roadmap from concept to deployment.</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-12">
                {[
                  { step: "01", title: "Discovery & Strategy", desc: "Understanding business goals, audience research, and technical auditing to frame the right solution." },
                  { step: "02", title: "UI/UX Design", desc: "Crafting clean, modern, and user-focused designs that align with your brand identity and conversion goals." },
                  { step: "03", title: "Development", desc: "Engineering the vision using modern, scalable technologies for both frontend and backend." },
                  { step: "04", title: "Testing & Optimization", desc: "Rigorous performance, security, and bug testing across all browsers and devices." },
                  { step: "05", title: "Launch & Support", desc: "Smooth deployment and ongoing technical support to ensure long-term stability." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    {...fadeInUp}
                    className="flex flex-col md:flex-row gap-8 items-start md:items-center p-8 bg-slate-50/50 rounded-3xl border border-slate-100 group relative"
                  >
                    <div className="hidden md:block absolute left-[-2rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-600 z-10"></div>
                    <div className="text-5xl font-bold text-indigo-100 group-hover:text-indigo-200 transition-colors uppercase shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 font-inter">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. TECHNOLOGY STACK (organized grid) */}
        <section className="py-24 bg-gray-950 text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">Future-Ready Tech Stack</h2>
              <p className="text-gray-400">“We use modern, scalable technologies to build fast, secure, and future-ready solutions.”</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {[
                { category: "Frontend", stack: "React.js, Next.js, Vue.js, Tailwind CSS, Bootstrap" },
                { category: "Backend", stack: "Node.js, NestJS, Laravel, Python, Django, REST/GraphQL" },
                { category: "Mobile", stack: "Flutter, React Native, Kotlin, Swift" },
                { category: "E-commerce", stack: "Shopify, WooCommerce, Magento, Custom Solutions" },
                { category: "CMS", stack: "WordPress, Webflow, Strapi, Sanity" },
                { category: "Cloud & DevOps", stack: "AWS, Google Cloud, Vercel, Docker, CI/CD" },
                { category: "Integrations", stack: "Razorpay, Stripe, PayPal, HubSpot, Zoho, Firebase" },
                { category: "Security & Performance", stack: "SSL, Encryption, Core Web Vitals, Technical SEO" }
              ].map((tech, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-indigo-400 font-bold mb-3 uppercase tracking-wider text-xs">{tech.category}</h4>
                  <p className="text-gray-300 font-inter leading-relaxed">{tech.stack}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INDUSTRIES / USE CASES */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">Expertise Across Industries</h2>
                <p className="text-xl text-gray-600 font-inter mb-8">
                  “Custom solutions for every industry — no one-size-fits-all approach.”
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Startups', 'Local Businesses', 'E-commerce Brands', 'Agencies', 'SaaS Products'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-indigo-50 rounded-xl text-indigo-700 font-bold">
                      <Users size={18} /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="h-64 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group"
                >
                  <img 
                    src="/images/services/industry-web.png" 
                    alt="Web Development for Industries" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-64 rounded-3xl mt-8 overflow-hidden shadow-2xl border border-indigo-200 group"
                >
                  <img 
                    src="/images/services/industry-mobile.png" 
                    alt="Mobile App Development for Industries" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. RESULTS / VALUE PROPOSITION */}
        <section className="py-24 bg-indigo-600 text-white rounded-3xl mx-4 mb-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Rocket size={300} />
          </div>
          <div className="container mx-auto px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12">Built for Performance & ROI</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Higher Conversions", desc: "Turn visitors into customers." },
                { title: "Better Engagement", desc: "Keep users coming back." },
                { title: "Business Automation", desc: "Save time with smart apps." },
                { title: "Increased Sales", desc: "Direct impact on your revenue." }
              ].map((res, idx) => (
                <div key={idx} className="p-8 bg-white/10 rounded-3xl backdrop-blur-sm">
                  <div className="text-3xl font-bold mb-2">{res.title}</div>
                  <p className="text-indigo-100 opacity-80">{res.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Portfolio Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">Case Studies</h2>
              <p className="text-gray-600">See how we have transformed businesses.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                { 
                  name: "Zenith E-shop", 
                  problem: "Low load speeds leading to 40% cart abandonment.", 
                  solution: "Moved to Next.js with localized edge caching.", 
                  result: "Load time reduced by 3s, Sales up by 25%." 
                },
                { 
                  name: "HealthConnect App", 
                  problem: "Users struggled with complex onboarding.", 
                  solution: "Complete UI/UX redesign and simplified user flow.", 
                  result: "User retention increased by 60% in first 3 months." 
                },
                { 
                  name: "Nexus SaaS", 
                  problem: "Manual lead processing was slowing growth.", 
                  solution: "Built a custom dashboard with CRM automation.", 
                  result: "70% reduction in response time, 2x lead volume." 
                }
              ].map((project, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="bg-indigo-100 h-48 flex items-center justify-center font-bold text-indigo-600 text-xl tracking-wider uppercase">
                    {project.name}
                  </div>
                  <div className="p-8">
                    <div className="mb-6">
                      <h5 className="font-bold text-xs uppercase text-indigo-600 mb-1 tracking-widest">Problem</h5>
                      <p className="text-sm text-gray-700 font-inter">{project.problem}</p>
                    </div>
                    <div className="mb-6">
                      <h5 className="font-bold text-xs uppercase text-indigo-600 mb-1 tracking-widest">Solution</h5>
                      <p className="text-sm text-gray-700 font-inter">{project.solution}</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-xs uppercase text-green-600 mb-1 tracking-widest">Result</h5>
                      <p className="text-sm font-bold text-gray-900 font-inter">{project.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. PRICING TEASER */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">Flexible pricing based on your requirements</h2>
            <p className="text-lg text-gray-600 mb-10 font-inter">No hidden costs. We provide a transparent scope of work with flexible options.</p>
            <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Get a Quote <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* 10. FINAL CTA SECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto p-12 lg:p-24 bg-indigo-50/50 rounded-3xl border border-indigo-100">
              <h2 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-8">Ready to Build <br /> Something Powerful?</h2>
              <p className="text-xl text-gray-600 font-inter mb-12 max-w-2xl mx-auto">
                Let’s discuss your project and start your digital growth journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/#contact" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-lg hover:scale-105 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                  Book Free Call
                </Link>
                <a 
                  href="https://wa.me/917004453530" 
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

