import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useContactModal } from "@/hooks/use-contact-modal";

export default function CtaSection() {
  const { openModal } = useContactModal();
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {/* Main Pill Background */}
          <div className="bg-[#FFF0EE] rounded-[100px] py-8 md:py-10 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="max-w-2xl mb-6 md:mb-0">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold text-[#333333] leading-tight whitespace-nowrap">
                Begin with our pre-built solution, then customize to fit your needs
              </h2>
            </div>
            
            <div className="flex items-center gap-4 lg:gap-12 relative z-20">
              <Button 
                onClick={openModal}
                className="bg-[#1A1A1A] hover:bg-black text-white rounded-full px-8 py-6 h-auto text-lg font-medium shadow-lg flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Book a call
              </Button>
              
              {/* Spacer for the overlapping image on desktop */}
              <div className="hidden lg:block w-32 h-10"></div>
            </div>
          </div>
          
          {/* Overlapping Image of Anuj */}
          <div className="absolute -bottom-2 -right-2 md:right-0 lg:right-0 z-20 w-[140px] md:w-[180px] lg:w-[220px] pointer-events-none">
            <img 
              src="/assets/Anuj_CTA.png" 
              alt="Anuj - Synergy Brand Architect" 
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
