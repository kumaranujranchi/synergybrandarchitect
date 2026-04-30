import Header from "@/components/header";
import Hero from "@/components/hero";
import ClientLogoCarousel from "@/components/client-logo-carousel";
import About from "@/components/about";
import DigitalPresence from "@/components/digital-presence"; 
import CtaSection from "@/components/cta-section";
import SEO from "@/components/seo";

import Services from "@/components/services";
import HomeServiceSections from "@/components/home-service-sections";
import AdAccountAccess from "@/components/ad-account-access"; // Added new section
import CaseStudies from "@/components/case-studies";
import Testimonials from "@/components/testimonials";

import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Best Digital Marketing Agency in Patna | Synergy Brand Architect"
        description="Looking for the Best Digital Marketing Agency in Patna? Synergy Brand Architect offers top-notch SEO, Best Web Development in Patna, and Social Media Marketing services to scale your business."
        canonicalPath="/"
      />
      <Header />
      <Hero />
      <ClientLogoCarousel />
      <About />
      <DigitalPresence />
      <CtaSection />

      <Services />
      <HomeServiceSections />
      <AdAccountAccess />
      <CaseStudies />
      <Testimonials />

      <Contact />
      <Footer />
      <WhatsappButton />
    </div>
  );
}
