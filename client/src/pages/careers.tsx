import { useEffect, useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Briefcase, MapPin, Clock, ArrowRight, Search, Filter, Sparkles, Building2, Users2, Trophy, Globe2 } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";

const JobCard = ({ job }: any) => {
  const [, setLocation] = useLocation();
  
  return (
    <motion.div 
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all group cursor-pointer"
      onClick={() => setLocation(`/careers/${job.slug}`)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-orange-50 text-[#FF6B00] text-[10px] font-bold rounded-full uppercase tracking-wider">
              {job.type}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-[#0066CC] text-[10px] font-bold rounded-full uppercase tracking-wider">
              {job.department}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B00] transition-colors font-poppins">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-gray-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-gray-400" />
              Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {job.salary && (
            <span className="text-lg font-bold text-gray-900 font-inter">{job.salary}</span>
          )}
          <Button variant="ghost" className="group-hover:bg-[#FF6B00] group-hover:text-white rounded-full transition-all">
            Apply Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Careers() {
  const jobs = useQuery(api.jobs.listJobs, { status: "open" });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set((jobs || []).map(j => j.department))];

  const filteredJobs = (jobs || []).filter(job => {
    const matchesSearch = (job.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (job.department || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || job.department === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-inter text-gray-900">
      <SEO 
        title="Careers | Join Our Team - Synergy Brand Architect"
        description="Join Synergy Brand Architect in Patna. Explore career opportunities in digital marketing, web development, and creative design. Build your future with us."
        canonicalPath="/careers"
      />
      <Header />
      <WhatsappButton />

      <main className="pt-32 pb-20">
        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF6B00] rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              <Sparkles size={14} /> Join the Synergy Team
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-poppins text-gray-900 leading-tight"
            >
              Building the Future of <span className="text-[#FF6B00]">Digital Brands</span> Together
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              We're looking for passionate individuals who want to redefine how brands grow in the digital age. Join our fast-paced team in Patna and work on exciting global projects.
            </motion.p>
          </div>
        </section>

        {/* --- STATS / WHY JOIN US --- */}
        <section className="container mx-auto px-4 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, label: "Work Style", val: "Hybrid/Office", color: "blue" },
              { icon: Users2, label: "Team Growth", val: "Fast Growing", color: "orange" },
              { icon: Trophy, label: "Experience", val: "Global Projects", color: "green" },
              { icon: Globe2, label: "Location", val: "Patna, Bihar", color: "purple" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3"
              >
                <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-lg font-bold text-gray-900 font-poppins">{stat.val}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- JOB LISTINGS SECTION --- */}
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-gray-900">Open Positions</h2>
              <p className="text-gray-500 mt-1">Explore opportunities that fit your skills</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 w-full sm:w-64 bg-white transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 appearance-none bg-white cursor-pointer transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {jobs === undefined ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
              ))
            ) : filteredJobs?.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <Briefcase className="mx-auto mb-4 text-gray-300" size={48} />
                <h3 className="text-xl font-bold text-gray-600">No matching positions found</h3>
                <p className="text-gray-400">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredJobs?.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </section>

        {/* --- CULTURE / BENEFITS --- */}
        <section className="container mx-auto px-4 mt-32 max-w-6xl">
          <div className="bg-[#333333] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00] rounded-full blur-[120px] opacity-20 -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-10 -ml-32 -mb-32" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">
                  Life at <span className="text-[#FF6B00]">Synergy</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We believe in working hard and growing together. Beyond competitive salaries, we offer a culture that fosters creativity, continuous learning, and professional excellence.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Skill-based Growth Paths",
                    "Modern Tech Stack",
                    "Creative Freedom",
                    "Mentorship Programs",
                    "Performance Incentives",
                    "Healthy Work-Life Balance"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                      <span className="text-sm font-medium text-gray-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                  alt="Team Culture" 
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Member" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">Join 15+ Experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
