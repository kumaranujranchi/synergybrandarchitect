import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, MessageCircle, FileText } from "lucide-react";
import { smoothScrollTo } from "@/lib/scrollHelper";
import VisitorCounter from "./visitor-counter";

const quickLinks = [
  { href: "/", label: "Home", isPage: true },
  { href: "/services", label: "Services", isPage: true },
  { href: "/blog", label: "Blog", isPage: true },
  { href: "/contact", label: "Contact", isPage: true }
];

const serviceLinks = [
  { href: "/services/brand-building", label: "Brand Building", isPage: true },
  { href: "/services/seo", label: "SEO Optimization", isPage: true },
  { href: "/services/social-media-marketing", label: "Social Media Marketing", isPage: true },
  { href: "/services/performance-marketing", label: "Performance Marketing", isPage: true },
  { href: "/services/automation", label: "Workflow Automation", isPage: true }
];

const resourceLinks = [
  { href: "/case-study", label: "Case Studies", isPage: true },
  { href: "/case-studies/wishluv-buildcon", label: "Wishluv Buildcon", isPage: true },
  { href: "/case-studies/biryani-mahal", label: "Biryani Mahal", isPage: true },
  { href: "/case-studies/the-helping-hand", label: "The Helping Hand", isPage: true }
];

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-12 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-[#FF6B00] font-poppins font-bold text-2xl">Synergy <span className="text-white font-medium">Brand Architect</span></h3>
            </div>
            <p className="text-gray-400 mb-6 font-inter">
              Your one-stop digital marketing partner in Patna for strategic brand building and growth-focused marketing solutions.
            </p>
            <address className="text-gray-400 mb-6 font-inter not-italic">
              East Gola Road, Vivek Vihar Colony<br />
              Danapur Nizamat, Patna 801503<br />
              Phone: +91 9525 230232
            </address>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/synergybrandarchitect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/synergybrandarchitect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/synergybrandarchitect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://wa.me/919525230232"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 font-inter">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Our Services</h4>
            <ul className="space-y-3 font-inter">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Resources</h4>
            <ul className="space-y-3 font-inter">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4 font-inter">
              Subscribe to our newsletter to receive the latest marketing insights and tips.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-full w-full focus:outline-none text-[#333333]"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-r-full px-4"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm font-inter">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          
          {/* Business Partners Section */}
          <div className="lg:col-span-4">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
              <div>
                <h4 className="font-poppins font-semibold text-xl mb-6 whitespace-nowrap">Trusted Partners</h4>
                <div className="flex flex-col gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-md flex items-center justify-center w-40">
                    <img 
                      src="https://imagizer.imageshack.com/img924/9071/tzLDvZ.png" 
                      alt="Meta Business Partner" 
                      className="h-10" 
                      loading="lazy"
                    />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md flex items-center justify-center w-40">
                    <img 
                      src="https://imagizer.imageshack.com/img922/3699/VXhcrd.png" 
                      alt="Google Business Partner" 
                      className="h-10" 
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="md:mt-12">
                <h4 className="text-[#FF6B00] font-poppins font-semibold mb-4 text-xs uppercase tracking-[0.2em]">Global Expansion</h4>
                <h5 className="text-white font-poppins font-bold text-2xl mb-3">We are coming soon to London as well</h5>
                <p className="text-gray-400 font-inter text-sm max-w-md mb-4">
                  Synergy Brand Architect London — and make it accessible via the website <a 
                    href="https://synergybrandarchitect.co.uk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#FF6B00] transition-colors border-b border-gray-600 hover:border-[#FF6B00] pb-0.5 ml-1"
                  >
                    synergybrandarchitect.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
          
        {/* SEO Keywords Section */}
        <div className="border-t border-gray-700/50 py-12 mt-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h4 className="text-gray-400 font-poppins font-semibold mb-8 text-xs uppercase tracking-[0.2em]">Our Presence in Patna</h4>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3">
              {[
                "Digital Marketing Company in Patna",
                "Website Development Company in Patna",
                "Best Digital Marketing Agency in Patna",
                "Web Design Company in Patna",
                "SEO Services in Patna",
                "Social Media Marketing Patna",
                "Website Designer in Patna",
                "E-commerce Website Development Patna",
                "Google Ads Expert in Patna",
                "Digital Marketing Services in Patna",
                "MERN Stack Development",
                "Lead Generation Service In Patna"
              ].map((keyword, i, arr) => (
                <div key={i} className="flex items-center">
                  <span className="text-gray-500 hover:text-[#FF6B00] text-[11px] font-medium tracking-wide transition-colors cursor-default uppercase">
                    {keyword}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="ml-4 w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Site Info and Visitor Stats */}
        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center text-gray-400 text-sm">
            <FileText size={16} className="mr-2" />
            <Link href="/sitemap" className="hover:text-[#FF6B00] transition-colors">
              Sitemap
            </Link>
          </div>
          <VisitorCounter />
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <p className="text-gray-400 text-sm font-inter">
              &copy; {new Date().getFullYear()} Synergy Brand Architect. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-inter mt-4 md:mt-0">
            <Link href="/sitemap" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Sitemap</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Refund Policy</Link>
            <Link href="/admin/login" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
