import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { staggerContainer, fadeUp, slideLeft, slideRight } from "@/lib/animations";
import ContactForm from "./contact-form";

export default function Contact() {

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Ready to grow your business? Contact us today for a free consultation and let's discuss how we can help you achieve your goals.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col lg:flex-row gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="lg:w-1/2"
            variants={slideRight}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ContactForm />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={slideLeft}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="font-poppins font-semibold text-2xl mb-6 text-[#333333]">Contact Information</h3>
              
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#333333] mb-1">Visit Our Office</h4>
                  <p className="text-gray-600">
                    East Gola Road, Vivek Vihar Colony<br />
                    Danapur Nizamat, Patna 801503
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#333333] mb-1">Call Us</h4>
                  <p className="text-gray-600">
                    +91 9525 230232
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#333333] mb-1">Email Us</h4>
                  <p className="text-gray-600">
                    hello@synergybrandarchitect.in
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-poppins font-semibold text-2xl mb-6 text-[#333333]">Business Hours</h3>
              
              <div className="flex justify-between mb-3">
                <span className="text-[#333333] font-medium">Monday - Friday:</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM</span>
              </div>
              
              <div className="flex justify-between mb-3">
                <span className="text-[#333333] font-medium">Saturday:</span>
                <span className="text-gray-600">10:00 AM - 4:00 PM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#333333] font-medium">Sunday:</span>
                <span className="text-gray-600">Closed</span>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-[#333333] mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/synergybrandarchitect" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/synergybrandarchitect" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/synergybrandarchitect" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="https://twitter.com/synergybrandarch" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          </motion.div>
      </div>
    </section>
  );
}
