import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Star, Users, Calendar, Target } from "lucide-react";
import { Link } from "wouter";
import { useContactModal } from "@/hooks/use-contact-modal";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/ui/optimized-image";

export default function PortfolioPage() {
  const { openModal } = useContactModal();
  useEffect(() => {
    document.title = "Portfolio | Our Work & Case Studies - Synergy Brand Architect";
  }, []);

  const data = useQuery(api.portfolio.listPortfolio, {});
  const portfolioItems = data ?? [];
  const isLoading = data === undefined;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-[#0066CC]/10 to-[#FF6B00]/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
              Our <span className="text-[#FF6B00]">Portfolio</span> of Success Stories
            </h1>
            <p className="text-xl text-gray-600 font-inter mb-8">
              Explore our diverse portfolio of live websites across multiple industries, showcasing our expertise
              in full-stack development, modern technologies, and comprehensive backend solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-[#FF6B00]" />
                <span className="text-sm font-medium">
                   {isLoading ? <Skeleton className="h-4 w-16" /> : `${portfolioItems.length} Projects`}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-[#0066CC]" />
                <span className="text-sm font-medium">Multiple Industries</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Target className="w-5 h-5 text-[#FF6B00]" />
                <span className="text-sm font-medium">Full-Stack Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Website Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Our Internal <span className="text-[#FF6B00]">Digital Ecosystem</span>
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Success stories from our latest and most comprehensive web development projects, featuring modern technologies and full-stack solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {isLoading ? (
               // Loading Skeleton
               [1, 2].map((i) => (
                  <div key={i} className="portfolio-card bg-white shadow-lg border border-gray-100 p-4">
                      <Skeleton className="w-full h-64 rounded-lg mb-6" />
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-6" />
                      <Skeleton className="h-12 w-full" />
                  </div>
               ))
            ) : portfolioItems.filter(item => item.featured).length === 0 ? (
               <div className="col-span-full text-center py-10 text-gray-500">
                  No featured website projects yet.
               </div>
            ) : (
                portfolioItems.filter(item => item.featured).map((item) => (
                <div key={item._id} className="portfolio-card bg-white shadow-lg border border-gray-100 group">
                    <div className="portfolio-image-container">
                    <OptimizedImage
                        src={item.image}
                        alt={`${item.title} - Full website preview showing complete page layout and design`}
                        className="portfolio-image"
                        containerClassName="aspect-video"
                    />
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {item.category}
                        </span>
                    </div>
                    </div>

                    <div className="p-6">
                    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 font-inter mb-4 line-clamp-3">
                        {item.description}
                    </p>

                    <div className="space-y-2 mb-6">
                        {item.results && item.results.map((result, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                            <span>{result}</span>
                        </div>
                        ))}
                    </div>

                    {item.external ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-md">
                            Visit Website
                            <ExternalLink size={16} className="ml-2" />
                        </Button>
                        </a>
                    ) : (
                        <Link href={item.link}>
                        <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-md">
                            View Case Study
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                        </Link>
                    )}
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Our <span className="text-[#0066CC]">Complete Portfolio</span>
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Explore our diverse range of projects across different industries and business sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {isLoading ? (
               // Loading Skeleton
               [1, 2, 3, 4].map((i) => (
                  <div key={i} className="portfolio-card bg-white shadow-md border border-gray-100 p-4">
                      <Skeleton className="w-full h-48 rounded-lg mb-6" />
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-6" />
                      <Skeleton className="h-8 w-1/3" />
                  </div>
               ))
            ) : portfolioItems.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-500">
                  Projects are being updated. Check back soon!
               </div>
            ) : (
                portfolioItems.map((item) => (
                <div key={item._id} className="portfolio-card bg-white shadow-md border border-gray-100 group">
                    <div className="portfolio-image-container flex">
                    <OptimizedImage
                        src={item.image}
                        alt={`${item.title} - Full website preview showing complete page layout and design`}
                        className="portfolio-image object-cover w-full h-full"
                        containerClassName="w-full aspect-video"
                    />
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#0066CC] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {item.category}
                        </span>
                    </div>
                    {item.featured && (
                        <div className="absolute top-4 right-4 z-10">
                        <span className="bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                            Featured
                        </span>
                        </div>
                    )}
                    </div>

                    <div className="p-6">
                    <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 font-inter mb-4 text-sm line-clamp-2">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Recent Project</span>
                        </div>
                        {item.underDevelopment ? (
                        <Button variant="outline" size="sm" className="text-gray-500 border-gray-300 bg-gray-50 cursor-not-allowed" disabled>
                            Under Development
                        </Button>
                        ) : item.external ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white">
                            Visit Site
                            <ExternalLink size={14} className="ml-1" />
                            </Button>
                        </a>
                        ) : item.link && item.link !== "#" ? (
                        <Link href={item.link}>
                            <Button variant="outline" size="sm" className="text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white">
                            View Details
                            <ExternalLink size={14} className="ml-1" />
                            </Button>
                        </Link>
                        ) : (
                        <Button variant="outline" size="sm" className="text-gray-500 border-gray-300" disabled>
                            Coming Soon
                        </Button>
                        )}
                    </div>
                    </div>
                </div>
                ))
            )}
          </div>

          {/* View More CTA Button */}
          <div className="text-center mt-12">
            <Button 
              onClick={openModal}
              className="bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold py-8 px-8 rounded-full text-lg transition-all hover:shadow-lg hover:scale-105 h-auto"
            >
              View More Projects & Get Started
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <p className="text-gray-600 font-inter mt-4 text-sm">
              Ready to create your next success story? Let's discuss your project!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-white/90 font-inter mb-8">
              Let's discuss how we can help transform your business with our proven strategies and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={openModal}
                className="bg-white text-[#FF6B00] hover:bg-gray-100 font-semibold py-8 px-8 rounded-full text-lg transition-all hover:shadow-lg h-auto"
              >
                Get Free Consultation
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Link href="/services">
                <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#FF6B00] font-semibold py-3 px-8 rounded-full text-lg transition-all">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsappButton />
    </div>
  );
}
