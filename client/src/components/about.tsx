import { motion } from "framer-motion";
import { Check, Star, ShieldCheck, TrendingUp, Lightbulb, MapPin, Calendar, Users, CheckCircle, Briefcase } from "lucide-react";
import { fadeUp, slideRight, staggerContainer, hoverScale, slideLeft } from "@/lib/animations";
import { OptimizedImage } from "./ui/optimized-image";

export default function About() {
  const features = [
    "Strategic brand positioning & development",
    "Creative design solutions for all touchpoints",
    "Comprehensive digital marketing campaigns",
    "Data-driven growth strategies",
    "Local market expertise in Patna",
    "Personalized client-focused approach",
  ];

  const stats = [
    { label: "Years of Excellence", value: "4+", icon: Calendar },
    { label: "Satisfied Clients", value: "150+", icon: Users },
    { label: "Projects Delivered", value: "500+", icon: CheckCircle },
    { label: "Industries Served", value: "15+", icon: Briefcase },
  ];

  const values = [
    {
      title: "Integrity",
      icon: ShieldCheck,
      description:
        "Honest advice, transparent processes, and keeping our promises. If something isn't right for you, we'll tell you – even if it means less business for us.",
    },
    {
      title: "Growth-Focus",
      icon: TrendingUp,
      description:
        "We're obsessed with measuring and improving results. Every strategy we develop aims at one thing: growing your brand and business.",
    },
    {
      title: "Innovation",
      icon: Lightbulb,
      description:
        "Digital marketing evolves rapidly, and so do we. We're constantly learning and implementing the latest effective techniques to keep you ahead.",
    },
    {
      title: "Local Insight",
      icon: MapPin,
      description:
        "We understand Bihar's unique business ecosystem and cultural nuances, allowing us to create marketing that resonates with your local audience.",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <motion.span 
            variants={fadeUp}
            className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm block mb-4"
          >
            Our Story & Values
          </motion.span>
          <motion.h2 
            variants={fadeUp}
            className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-[#333333] mb-6 leading-tight"
          >
            Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-[#4D94FF]">Brand Building</span> <br className="hidden md:block" /> Agency in Patna
          </motion.h2>
          <motion.div 
            variants={fadeUp}
            className="w-24 h-1.5 bg-[#FF6B00] mx-auto rounded-full"
          />
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={fadeUp}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-500">
                <stat.icon className="text-[#FF6B00] group-hover:text-white transition-colors duration-500" size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#333333] mb-1">{stat.value}</div>
              <div className="text-gray-500 font-inter text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24">
          <motion.div
            className="lg:w-1/2 relative group"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <OptimizedImage
                src="//images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=cover&q=80&w=800"
                alt="Synergy agency workspace showing collaborative environment"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
            
            {/* Overlapping small image/accent */}
            <motion.div 
              className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 z-20 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl hidden md:block"
              variants={fadeUp}
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=cover&q=80&w=800"
                alt="Golghar, Patna Landmark - synergy local roots"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full bg-white"
              />
            </motion.div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0066CC]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="font-poppins font-black text-3xl md:text-4xl mb-8 text-[#333333]">
              Who We <span className="text-[#FF6B00]">Are</span>
            </h3>
            <div className="space-y-6 text-gray-600 font-inter text-lg leading-relaxed">
              <p>
                Synergy Brand Architect is a results-driven B2B brand building
                agency based in Patna. Founded in 2020, our mission is simple: to
                empower small and medium businesses in Bihar with big-brand
                strategies.
              </p>
              <p>
                We noticed that many local businesses have amazing
                products and services but struggle to shine in the market. That's where Synergy comes in – we bridge the gap between where you are now and where you aspire to be.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mt-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Check className="text-[#FF6B00]" size={14} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-32">
          <motion.h3 
            className="font-poppins font-black text-3xl md:text-4xl mb-16 text-[#333333] text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Driving Progress through Our <span className="text-[#FF6B00]">Values</span>
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                variants={fadeUp}
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-[#FF6B00] transition-all duration-500 transform group-hover:rotate-6">
                  <value.icon className="text-[#FF6B00] group-hover:text-white transition-colors duration-500" size={32} />
                </div>
                <h4 className="font-poppins font-bold text-2xl mb-4 text-[#333333]">
                  {value.title}
                </h4>
                <p className="text-gray-600 font-inter text-lg leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-32 relative overflow-hidden group"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[3rem] transform -skew-y-1 transition-transform group-hover:skew-y-0 duration-700" />
          
          <div className="relative p-10 md:p-20 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="text-white">
              <div className="flex justify-center gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} size={24} className="fill-white/20 text-transparent group-hover:fill-yellow-400 transition-colors duration-300" style={{ transitionDelay: `${i * 100}ms` }} />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-4xl font-poppins italic font-medium mb-10 leading-tight">
                "Synergy helped us increase our online leads by <span className="text-orange-200 font-black">300%</span> in just 6
                months! Their team truly delivers on their promises. We went
                from virtually invisible online to becoming a go-to name in our
                industry."
              </blockquote>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                </div>
                <p className="text-2xl font-bold">Lavkush Sharma</p>
                <p className="text-orange-100/80 font-inter text-lg">
                  Director at Wishluv Buildcon Pvt. Ltd. (Real Estate)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
