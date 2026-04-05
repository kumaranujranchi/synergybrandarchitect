import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/layout";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  MoreHorizontal,
  DatabaseZap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState } from "react";

// For seeding
const portfolioItemsToSeed = [
  {
    title: "Thakur Tax Consultant",
    category: "Tax Consultancy",
    description: "Professional tax consultancy website serving Patna, Bihar with comprehensive financial, legal & business solutions. Features services for individuals, startups, and businesses with expert team profiles.",
    image: "https://imagizer.imageshack.com/img923/5595/NnzZNX.png",
    results: ["Taxation Services", "Business Registration", "Legal Services", "Expert Team Profiles"],
    link: "https://thakurtax.com/",
    featured: true,
    external: true
  },
  {
    title: "Arvindu Hospitals",
    category: "Healthcare",
    description: "Modern healthcare website designed in React and Node.js with a sophisticated backend panel for lead and content management, hosted on Hostinger for optimal performance.",
    image: "https://imagizer.imageshack.com/img922/2527/Mk1L6F.png",
    results: ["React & Node.js", "Content Management", "Hostinger Hosting"],
    link: "https://arvinduhospitals.com/",
    featured: true,
    external: true
  },
  {
    title: "Wishluv Buildcon",
    category: "Real Estate",
    description: "Real estate developer website developed using HTML, CSS, JavaScript, and PHP, including an admin panel for lead tracking and job-application management.",
    image: "https://imagizer.imageshack.com/img922/8049/BTbxRO.png",
    results: ["HTML/CSS/JS", "PHP Backend", "Job Application System"],
    link: "https://wishluvbuildcon.com/",
    featured: true,
    external: true
  },
  {
    title: "Omavop Constructions",
    category: "Construction",
    description: "Professional construction company website showcasing building services, project portfolio, and construction expertise with modern design and comprehensive service offerings.",
    image: "https://imagizer.imageshack.com/img923/2500/wiPGCK.png",
    results: ["Construction Services", "Project Portfolio", "Professional Design", "Service Showcase"],
    link: "https://www.omavopconstructions.com/",
    featured: true,
    external: true
  },
  {
    title: "Studio Nine Constructions",
    category: "Construction",
    description: "Modern construction studio website featuring architectural services, construction projects, and design solutions with contemporary aesthetics and professional presentation.",
    image: "https://imagizer.imageshack.com/img922/1066/c15u20.png",
    results: ["Architectural Services", "Construction Projects", "Design Solutions", "Modern Interface"],
    link: "https://studionineconstructions.com/",
    featured: false,
    external: true
  },
  {
    title: "Magadh Associate",
    category: "Business Services",
    description: "Professional business associate website providing comprehensive business solutions, consulting services, and corporate support with clean design and user-friendly interface.",
    image: "https://imagizer.imageshack.com/img923/2054/zY7aJK.png",
    results: ["Business Solutions", "Consulting Services", "Corporate Support", "Clean Design"],
    link: "https://magadhassociate.netlify.app/",
    featured: false,
    external: true
  },
  {
    title: "Honest Choice Review",
    category: "Review Platform",
    description: "Comprehensive product review platform featuring honest reviews, detailed comparisons, and user-friendly interface for informed purchasing decisions across various product categories.",
    image: "https://imagizer.imageshack.com/img924/2382/6pj4j8.png",
    results: ["Product Reviews", "Comparison Tools", "User Interface", "Content Management"],
    link: "https://honestchoicereview.com/",
    featured: false,
    external: true
  },
  {
    title: "Atlantis Hospital",
    category: "Healthcare",
    description: "Modern healthcare website showcasing medical services, doctor profiles, and patient care facilities with responsive design and comprehensive healthcare information system.",
    image: "https://imagizer.imageshack.com/img922/7175/NKsceK.png",
    results: ["Medical Services", "Doctor Profiles", "Patient Care", "Responsive Design"],
    link: "https://atlantishospital.netlify.app/",
    featured: false,
    external: true
  },
  {
    title: "E-Commerce Platform",
    category: "E-Commerce",
    description: "Comprehensive e-commerce solution featuring product catalog, shopping cart, payment integration, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    image: "https://imagizer.imageshack.com/img924/2739/5Wukyg.png",
    results: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Admin Dashboard"],
    link: "",
    featured: false,
    external: false,
    underDevelopment: true
  },
  {
    title: "Property Listing Platform",
    category: "Real Estate",
    description: "Advanced property listing website with search filters, property details, virtual tours, and agent management system. Designed for seamless property browsing and real estate transactions.",
    image: "https://imagizer.imageshack.com/img922/9873/8oOHSx.png",
    results: ["Property Search", "Virtual Tours", "Agent Management", "Advanced Filters"],
    link: "",
    featured: false,
    external: false,
    underDevelopment: true
  },
  {
    title: "Sales Portfolio Synergy",
    category: "Business Services",
    description: "Professional sales portfolio website showcasing business achievements, client testimonials, and service offerings. Features modern design with interactive elements and comprehensive business presentation.",
    image: "https://imagizer.imageshack.com/img923/2218/FTdIZi.png",
    results: ["Portfolio Showcase", "Client Testimonials", "Service Presentation", "Responsive Design"],
    link: "https://salesportfoliosynergy.netlify.app/",
    featured: false,
    external: true
  },
  {
    title: "Sales Dashboard",
    category: "Web Application",
    description: "Comprehensive sales dashboard web application with real-time analytics, performance tracking, and data visualization. Built for sales teams to monitor KPIs, track leads, and analyze business metrics.",
    image: "https://imagizer.imageshack.com/img924/7983/U9Kl2q.png",
    results: ["Dashboard Analytics", "Sales Tracking", "Data Visualization", "Real-time Metrics"],
    link: "https://sales.wishluvbuildcon.com/",
    featured: false,
    external: true
  },
  {
    title: "Astro Prakash",
    category: "Astrology & Spirituality",
    description: "Professional Vedic astrology website offering personalized horoscope analysis, remedial solutions, and spiritual guidance. Features 20+ years of experience with 10,000+ satisfied clients and comprehensive astrology services.",
    image: "https://imagizer.imageshack.com/img923/8688/jNx1bz.png",
    results: ["Vedic Astrology", "Personalized Horoscopes", "Remedial Solutions", "Spiritual Guidance", "20+ Years Experience"],
    link: "https://astroprakash.in/",
    featured: false,
    external: true
  },
  {
    title: "Manokamna Properties",
    category: "Real Estate",
    description: "Complete digital transformation for Manokamna Properties, a leading real estate company. Enhanced their online presence with modern web design, property listings, and lead generation system.",
    image: "https://imagizer.imageshack.com/img923/1130/rryKGk.png",
    results: [
      "400% increase in property inquiries",
      "Enhanced property showcase with virtual tours",
      "Streamlined lead management system",
      "Mobile-optimized property search experience"
    ],
    link: "https://manokamnaproperties.in/",
    featured: false,
    external: true
  },
  {
    title: "Abacuswalla",
    category: "Education",
    description: "Professional educational platform dedicated to abacus training and mental arithmetic development. Features comprehensive learning modules, interactive tools, and student progress tracking for enhanced cognitive skills development.",
    image: "https://imagizer.imageshack.com/img922/175/jJ6gch.png",
    results: [
      "Interactive Learning Modules",
      "Mental Arithmetic Training",
      "Student Progress Tracking",
      "Cognitive Skills Development"
    ],
    link: "",
    featured: false,
    external: false
  },
  {
    title: "Spectro Elecator",
    category: "Industrial",
    description: "Modern industrial website showcasing elevator and escalator solutions with advanced technology integration. Features product catalog, service offerings, and comprehensive specifications for commercial and residential installations.",
    image: "https://imagizer.imageshack.com/img922/640/tCSbh7.png",
    results: [
      "Product Catalog",
      "Service Offerings",
      "Technical Specifications",
      "Installation Solutions"
    ],
    link: "",
    featured: false,
    external: false
  },
  {
    title: "Kids World - Patna",
    category: "Education",
    description: "A dedicated platform for children's products and services in Patna, featuring a colorful design and user-friendly navigation.",
    image: "https://imagizer.imageshack.com/img922/4403/TDpf8w.png",
    results: ["E-Commerce Solution", "User-Friendly Interface", "Product Showcase", "Local Business"],
    link: "https://kidsworldpatna.netlify.app/",
    featured: false,
    external: true
  },
  {
    title: "Tech Bihar",
    category: "Digital Marketing",
    description: "A premier technology portal for Bihar, connecting tech enthusiasts with the latest industry trends, news, and opportunities.",
    image: "https://imagizer.imageshack.com/img923/1335/C62Wfi.png",
    results: ["Tech Community", "Information Portal", "Modern UI", "Regional Tech Hub"],
    link: "https://techbihar.netlify.app/index.html",
    featured: false,
    external: true
  }
];

export default function AdminPortfolioList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);

  // Convex Queries
  const portfolioItems = useQuery(api.portfolio.listPortfolio, {}) || [];
  
  // Convex Mutations
  const deleteMutation = useMutation(api.portfolio.deletePortfolio);
  const seedMutation = useMutation(api.portfolio.seedPortfolio);

  const filteredItems = portfolioItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await seedMutation({ items: portfolioItemsToSeed });
      if (result.success) {
        toast({ title: "Portfolio Seeded", description: `Successfully imported ${result.count} items.` });
      } else {
        toast({ title: "Notice", description: result.message });
      }
    } catch (error: any) {
      toast({ title: "Seed Failed", description: error.message, variant: "destructive" });
    }
    setIsSeeding(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <div className="flex items-center gap-4">
             <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search portfolio..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {portfolioItems.length === 0 && (
                <Button 
                    onClick={handleSeed} 
                    disabled={isSeeding}
                    variant="outline"
                    className="border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50"
                >
                    <DatabaseZap className="h-4 w-4 mr-2" />
                    {isSeeding ? "Migrating..." : "Migrate Old Data"}
                </Button>
            )}
            <Button onClick={() => setLocation("/admin/portfolio/new")} className="bg-[#FF6B00] text-white hover:bg-[#FF8533]">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title & Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!portfolioItems.length ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                    No portfolio items found. Click 'Migrate Old Data' to restore past projects, or create a new one!
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                          {item.featured && <Badge className="bg-[#FF6B00] hover:bg-[#FF8533]">Featured</Badge>}
                          {item.underDevelopment && <Badge variant="secondary">In Dev</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {format(item.createdAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setLocation(`/admin/portfolio/edit/${item._id}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {item.link && (
                            <DropdownMenuItem onClick={() => window.open(item.link, "_blank")}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={async () => {
                              if (confirm("Delete this project from portfolio?")) {
                                try {
                                  await deleteMutation({ id: item._id });
                                  toast({ title: "Project deleted" });
                                } catch (e: any) {
                                  toast({ title: "Delete failed", description: e.message, variant: "destructive" });
                                }
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
