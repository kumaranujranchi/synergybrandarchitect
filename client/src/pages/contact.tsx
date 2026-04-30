import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import ContactForm from "@/components/contact-form";
import { ClientOnly } from "@/components/ClientOnly";
import SEO from "@/components/seo";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Facebook, Instagram, Linkedin, ArrowRight,
  ChevronDown, ChevronUp, Sparkles, HeadphonesIcon,
  Building2, Globe2
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const contactCards = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 9525 230232",
    sub: "Mon–Fri, 9AM–6PM IST",
    href: "tel:+919525230232",
    color: "from-orange-500 to-orange-400",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@synergybrandarchitect.in",
    sub: "We reply within 24 hours",
    href: "mailto:hello@synergybrandarchitect.in",
    color: "from-blue-600 to-blue-400",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 9525 230232",
    sub: "Chat with us directly",
    href: "https://wa.me/919525230232",
    color: "from-green-500 to-green-400",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Patna, Bihar 801503",
    sub: "East Gola Road, Vivek Vihar Colony",
    href: "https://maps.google.com/?q=Danapur+Nizamat+Patna",
    color: "from-purple-600 to-purple-400",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

const faqs = [
  {
    q: "How quickly can you start working on my project?",
    a: "We typically onboard new clients within 3–5 business days after the initial consultation and agreement. For urgent requirements, we can expedite this process.",
  },
  {
    q: "What services do you offer for digital marketing?",
    a: "We offer a complete suite: SEO, Social Media Marketing, Google & Meta Ads (Performance Marketing), Brand Building, Website Design & Development, and Workflow Automation.",
  },
  {
    q: "Do you work with clients outside Patna?",
    a: "Absolutely! While we are based in Patna, we work with clients across India and internationally. We serve clients remotely with the same quality and dedication.",
  },
  {
    q: "What is the minimum budget required to get started?",
    a: "Our packages are tailored to suit businesses of all sizes. We have starter plans from ₹5,000/month. Book a free consultation and we'll recommend the best fit for your budget and goals.",
  },
  {
    q: "Will I get a dedicated account manager?",
    a: "Yes! Every client gets a dedicated account manager who will be your primary point of contact for all communication, updates, and strategy discussions.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${open ? "border-[#FF6B00]/30 bg-orange-50/50" : "border-gray-100 bg-white"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`font-semibold font-poppins text-sm md:text-base ${open ? "text-[#FF6B00]" : "text-gray-900"}`}>
          {q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? "bg-[#FF6B00] text-white" : "bg-gray-100 text-gray-500"}`}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed font-inter border-t border-orange-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-inter text-gray-900">
      <SEO
        title="Contact Us | Get a Free Consultation - Synergy Brand Architect"
        description="Get in touch with Synergy Brand Architect, Patna's leading digital marketing agency. Call, email, or visit us. Free consultation available for all digital marketing services."
        canonicalPath="/contact"
      />
      <Header />
      <WhatsappButton />

      {/* ── HERO ── */}
      <section className="relative bg-[#1a1a1a] overflow-hidden pt-32 pb-24">
        {/* background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00] rounded-full blur-[180px] opacity-10 -mr-64 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[140px] opacity-10 -ml-48 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-[#FF6B00] rounded-full text-xs font-bold uppercase tracking-[0.2em]"
            >
              <Sparkles size={14} /> Get In Touch
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-poppins text-white leading-tight"
            >
              Let's Build Something{" "}
              <span className="text-[#FF6B00]">Great Together</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-xl mx-auto"
            >
              Ready to grow your brand? Our team is just a message away. Book a free consultation today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="https://wa.me/919525230232"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-full transition-all shadow-lg shadow-green-500/20 text-sm"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="container mx-auto px-4 -mt-12 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`block p-6 rounded-2xl border ${card.border} ${card.bg} shadow-sm hover:shadow-md transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                <card.icon size={22} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{card.label}</p>
              <p className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#FF6B00] transition-colors">
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.sub}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── MAIN FORM + INFO ── */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
              </div>
              <ClientOnly
                fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-gray-100 rounded-2xl" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-12 bg-gray-100 rounded-2xl" />
                      <div className="h-12 bg-gray-100 rounded-2xl" />
                    </div>
                    <div className="h-32 bg-gray-100 rounded-2xl" />
                    <div className="h-14 bg-orange-100 rounded-2xl" />
                  </div>
                }
              >
                <ContactForm />
              </ClientOnly>
            </div>
          </motion.div>

          {/* Right Info Panel */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Office Info */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h3 className="font-poppins font-bold text-lg text-gray-900">Our Office</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Building2 size={17} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Synergy Brand Architect</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">East Gola Road, Vivek Vihar Colony<br />Danapur Nizamat, Patna 801503</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Globe2 size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">London Office (Coming Soon)</p>
                    <p className="text-gray-500 text-xs mt-0.5">synergybrandarchitect.co.uk</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-poppins font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-[#FF6B00]" /> Business Hours
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 font-medium">{row.day}</span>
                    <span className={`font-bold text-xs px-2 py-1 rounded-full ${row.time === "Closed" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-poppins font-bold text-lg text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/synergybrandarchitect", label: "Facebook", color: "hover:bg-blue-600" },
                  { icon: Instagram, href: "https://www.instagram.com/synergybrandarchitect", label: "Instagram", color: "hover:bg-pink-500" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/synergybrandarchitect", label: "LinkedIn", color: "hover:bg-blue-700" },
                  { icon: MessageCircle, href: "https://wa.me/919525230232", label: "WhatsApp", color: "hover:bg-green-500" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white ${s.color} transition-all hover:border-transparent hover:shadow-md`}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8533] rounded-3xl p-6 text-white">
              <HeadphonesIcon size={28} className="mb-3 opacity-80" />
              <h3 className="font-poppins font-bold text-lg mb-2">Need immediate help?</h3>
              <p className="text-white/80 text-sm mb-4">Call us directly or chat on WhatsApp for instant support.</p>
              <a
                href="tel:+919525230232"
                className="inline-flex items-center gap-2 bg-white text-[#FF6B00] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors"
              >
                <Phone size={16} /> Call Now <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="mb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-80"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.9!2d85.0317!3d25.5990!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sDanapur%2C+Patna%2C+Bihar+801503!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Synergy Brand Architect Office Location"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="container mx-auto px-4 max-w-3xl mb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
