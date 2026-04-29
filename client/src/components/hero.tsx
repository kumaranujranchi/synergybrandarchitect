import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";
import TypingAnimation from "./typing-animation";
import { OptimizedImage } from "./ui/optimized-image";
import { staggerContainer, fadeUp, slideLeft, pulseButton } from "@/lib/animations";
import { useContactModal } from "@/hooks/use-contact-modal";
import { ClientOnly } from "./ClientOnly";

export default function Hero() {
  const { openModal } = useContactModal();
  return (
    <section id="home" className="pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-52 xl:pb-16">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div 
          className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeUp}
            className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl xl:text-5xl leading-tight mb-6"
          >
            <span className="text-[#333333] block">
              Synergy Brand Architect - Build Your Brand
            </span>
            <div className="text-[#FF6B00] h-16 md:h-20 lg:h-24 xl:h-20 flex items-center overflow-hidden">
              <ClientOnly fallback={<span className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl xl:text-5xl">Grow Your Business</span>}>
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
              </ClientOnly>
            </div>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-8 text-gray-600 font-inter">
            Your One-Stop Digital Marketing Partner in Patna for strategic brand building and growth-focused marketing solutions.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              size="lg" 
              onClick={openModal}
              className="bg-[#FF6B00] hover:bg-[#FF8533] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Free Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => smoothScrollTo("#services")}
              className="border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50 rounded-full px-8 py-6 text-lg font-semibold transition-all"
            >
              Our Services
            </Button>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-gray-600 font-inter">
                From over <span className="font-bold">150+ satisfied clients</span> across 15+ industries
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 relative"
          initial="initial"
          animate="animate"
          variants={slideLeft}
        >
          <div className="relative z-10 w-full max-w-[500px] lg:max-w-none mx-auto min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-[#0066CC] to-[#4D94FF] rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-full opacity-20"></div>
            <OptimizedImage 
              src="/images/hero.png" 
              alt="Synergy Brand Architect Team" 
              className="w-full h-auto rounded-xl shadow-lg relative z-10"
              loading="eager"
              disableOverlay={true}
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50 rounded-full -z-10 opacity-50 blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
