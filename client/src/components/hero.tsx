import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";
import TypingAnimation from "./typing-animation";
import { OptimizedImage } from "./ui/optimized-image";
import { staggerContainer, fadeUp, slideLeft, pulseButton } from "@/lib/animations";

export default function Hero() {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div 
          className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* SEO-optimized H1 tag that search engines can clearly identify */}
          <motion.h1 
            variants={fadeUp}
            className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            <span className="text-[#333333] block">
              Synergy Brand Architect - Build Your Brand
            </span>
            <span className="sr-only">Leading Digital Marketing Agency in Patna</span>
            <div className="text-[#FF6B00] h-16 md:h-20 lg:h-24 flex items-center">
              <TypingAnimation
                phrases={[
                  "Grow Your Business",
                  "Scale Your Business",
                  "Create Bigger Growth",
                  "Expand Your Reach",
                  "Drive Success",
                  "Accelerate Your Growth"
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                delayAfterPhrase={1500}
              />
            </div>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-8 text-gray-600 font-inter">
            Your One-Stop Digital Marketing Partner in Patna for strategic brand building and growth-focused marketing solutions.
          </motion.p>
          <motion.p variants={fadeUp} className="text-md mb-8 text-gray-600 font-inter">
            Welcome to Synergy Brand Architect, the best digital marketing service in Patna for businesses aiming to make a mark online. We're your dedicated partner in branding and digital growth, helping you stand out in the Bihar market with a powerful online presence.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#contact');
            }}>
              <motion.div
                variants={pulseButton}
                animate="pulse"
                whileHover="hover"
              >
                <Button 
                  className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md h-auto"
                >
                  Get Free Consultation
                </Button>
              </motion.div>
            </a>
            <a href="#services" onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#services');
            }}>
              <Button
                variant="outline"
                className="border-2 border-[#FF6B00] text-[#FF6B00] font-medium py-3 px-8 rounded-full hover:bg-[#FF6B00] hover:text-white transition-all hover:-translate-y-1 h-auto"
              >
                Our Services
              </Button>
            </a>
          </motion.div>
          
          <motion.div variants={fadeUp} className="mt-10 flex items-center">
            <div className="flex -space-x-2">
              <motion.img 
                src="//randomuser.me/api/portraits/men/32.jpg" 
                alt="Happy Client" 
                className="w-10 h-10 rounded-full border-2 border-white"
                whileHover={{ scale: 1.1 }}
              />
              <motion.img 
                src="//randomuser.me/api/portraits/women/44.jpg" 
                alt="Happy Client" 
                className="w-10 h-10 rounded-full border-2 border-white"
                whileHover={{ scale: 1.1 }}
              />
              <motion.img 
                src="//randomuser.me/api/portraits/men/62.jpg" 
                alt="Happy Client" 
                className="w-10 h-10 rounded-full border-2 border-white"
                whileHover={{ scale: 1.1 }}
              />
            </div>
            <div className="ml-4">
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-current" size={16} />
                ))}
              </div>
              <p className="text-sm text-gray-600">From over <span className="font-semibold">150+ satisfied clients</span> across 15+ industries</p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2"
          variants={slideLeft}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-[#0066CC] to-[#4D94FF] rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-full opacity-20"></div>
            <OptimizedImage 
              src="/images/hero.png" 
              alt="A professional marketing office, symbolizing Synergy's expertise" 
              className="w-full h-auto rounded-xl shadow-lg relative z-10"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
