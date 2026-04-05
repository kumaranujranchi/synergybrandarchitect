import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ClientLogo {
  id: number;
  name: string;
  image: string;
}

export default function ClientLogoCarousel() {
  const clientLogos: ClientLogo[] = [
    { id: 1, name: "Client 1", image: "/images/clients/1.png" },
    { id: 2, name: "Client 2", image: "/images/clients/2.png" },
    { id: 3, name: "Client 3", image: "/images/clients/3.png" },
    { id: 4, name: "Client 4", image: "/images/clients/4.png" },
    { id: 5, name: "Client 5", image: "/images/clients/5.png" },
    { id: 6, name: "Client 6", image: "/images/clients/6.png" },
    { id: 7, name: "Client 7", image: "/images/clients/7.png" },
    { id: 8, name: "Client 8", image: "/images/clients/8.png" },
    { id: 9, name: "Client 9", image: "/images/clients/9.png" },
    { id: 10, name: "Client 10", image: "/images/clients/10.png" },
    { id: 11, name: "Client 11", image: "/images/clients/11.png" },
    { id: 12, name: "Client 12", image: "/images/clients/12.png" },
    { id: 13, name: "Client 13", image: "/images/clients/13.png" },
    { id: 14, name: "Client 14", image: "/images/clients/14.png" },
    { id: 15, name: "Client 15", image: "/images/clients/15.png" },
    { id: 16, name: "Client 16", image: "/images/clients/16.png" },
    { id: 17, name: "Client 17", image: "/images/clients/17.png" },
    { id: 18, name: "Client 18", image: "/images/clients/18.png" },
    { id: 19, name: "Client 19", image: "/images/clients/19.png" },
    { id: 20, name: "Client 20", image: "/images/clients/20.png" }
  ];

  // Triplicate the logos for a longer, smoother infinite scrolling effect
  const allLogos = [...clientLogos, ...clientLogos, ...clientLogos];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <section id="clients" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Our Clients & Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Trusted by leading businesses in Patna and across Bihar. Here are some of the brands and partners that have experienced growth with our strategies.
          </p>
        </motion.div>
        
        <div className="relative overflow-hidden py-8 px-2">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent"></div>
          
          <motion.div
            ref={containerRef}
            className="flex items-center gap-16 py-8 w-max"
            initial={{ x: 0 }}
            animate={{ x: "-33.33%" }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: isMobile ? 30 : 45, 
              ease: "linear"
            }}
          >
            {allLogos.map((logo, index) => (
              <div 
                key={`${logo.id}-${index}`} 
                className="flex-shrink-0 mx-4 relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
                  className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center h-40 w-[280px] transition-all border border-gray-100"
                >
                  <img 
                    src={logo.image} 
                    alt={`${logo.name} Logo`}
                    onError={(e) => {
                      console.error(`Failed to load image: ${logo.image}`);
                      // Try fallback to the non-HTTPS version if HTTPS fails
                      if (logo.image.startsWith('https:')) {
                        e.currentTarget.src = logo.image.replace('https:', '');
                      } else {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                    className="max-h-32 w-auto max-w-[240px] object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[#FF6B00] font-medium">
            Want to join our growing network of successful clients and partners?
          </p>
          <p className="text-gray-600 max-w-xl mx-auto mt-2 font-inter">
            Get in touch to discuss how we can help your business stand out in the digital landscape with our brand architecture expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}