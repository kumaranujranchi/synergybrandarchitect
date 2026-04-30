import { useState, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from 'convex/react';
import { useSSRQuery } from "@/hooks/use-ssr-query";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Briefcase, MapPin, Clock, ArrowLeft, Upload, CheckCircle2, AlertCircle, Send, FileText, Globe, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
});

export default function JobDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const job = useSSRQuery(api.jobs.getJobBySlug, { slug: slug || "" });
  const generateUploadUrl = useMutation(api.jobs.generateUploadUrl);
  const submitApplicationMutation = useMutation(api.jobs.submitApplication);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  });

  if (job === undefined) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (job === null) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Job Not Found</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setResumeError("File size must be less than 5MB");
        setResumeFile(null);
      } else if (file.type !== 'application/pdf' && file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeError("Only PDF and DOC/DOCX files are allowed");
        setResumeFile(null);
      } else {
        setResumeError("");
        setResumeFile(file);
      }
    }
  };

  const onSubmit = async (data: any) => {
    if (!resumeFile) {
      setResumeError("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Get upload URL
      const postUrl = await generateUploadUrl();

      // 2. Upload file to storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": resumeFile.type },
        body: resumeFile,
      });
      const { storageId } = await result.json();

      // 3. Submit application data
      const finalAnswers = (window as any).answers || {};
      
      await submitApplicationMutation({
        jobId: job._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        resumeUrl: storageId,
        portfolioUrl: data.portfolioUrl,
        linkedinUrl: data.linkedinUrl,
        answers: Object.entries(finalAnswers).map(([questionId, answer]) => ({
          questionId,
          answer: String(answer)
        }))
      });

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We have received your application and will get back to you soon.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter">
      <SEO 
        title={`${job.title} | Careers - Synergy Brand Architect`}
        description={`Apply for the ${job.title} position at Synergy Brand Architect in ${job.location}. Join our growing team in Patna.`}
        canonicalPath={`/careers/${job.slug}`}
      />
      <Header />
      <WhatsappButton />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <button 
            onClick={() => setLocation("/careers")}
            className="flex items-center text-gray-500 hover:text-[#FF6B00] transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* --- JOB CONTENT (LEFT) --- */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-orange-50 text-[#FF6B00] text-xs font-bold rounded-full uppercase tracking-wider">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-[#0066CC] text-xs font-bold rounded-full uppercase tracking-wider">
                    {job.department}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-900 leading-tight">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-[#FF6B00]" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-[#FF6B00]" />
                    Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently"}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-4">About the Role</h2>
                  <div className="whitespace-pre-wrap leading-relaxed">{job.description}</div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-4">What You'll Do (Requirements)</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {(job.requirements || []).map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </section>

                {job.benefits && job.benefits.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-4">Benefits & Perks</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.benefits.map((ben: string, i: number) => (
                        <li key={i}>{ben}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>

            {/* --- APPLICATION FORM (RIGHT) --- */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-green-900 font-poppins">Application Sent!</h3>
                        <p className="text-green-700">
                          Thank you for applying for the {job.title} position. Our HR team will review your profile and contact you soon.
                        </p>
                      </div>
                      <Button 
                        onClick={() => setLocation("/careers")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6"
                      >
                        Explore More Roles
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-8"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900 font-poppins">Apply Now</h3>
                        <p className="text-gray-500 text-sm">Join the Synergy team in Patna</p>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Full Name *</label>
                          <input 
                            {...register("name")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all"
                            placeholder="Enter your full name"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Email Address *</label>
                          <input 
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all"
                            placeholder="yourname@gmail.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                          <input 
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all"
                            placeholder="+91 00000 00000"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                              <Globe size={14} /> Portfolio
                            </label>
                            <input 
                              {...register("portfolioUrl")}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 outline-none text-xs"
                              placeholder="https://..."
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                              <Linkedin size={14} /> LinkedIn
                            </label>
                            <input 
                              {...register("linkedinUrl")}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 outline-none text-xs"
                              placeholder="https://..."
                            />
                          </div>
                        </div>

                        {/* --- DYNAMIC QUESTIONS --- */}
                        {job.questions && job.questions.length > 0 && (
                          <div className="space-y-5 pt-4 border-t border-dashed border-gray-100">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additional Questions</h4>
                            {job.questions.map((q: any) => (
                              <div key={q.id} className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700">
                                  {q.text} {q.required && "*"}
                                </label>
                                {q.type === "textarea" ? (
                                  <textarea 
                                    required={q.required}
                                    onChange={(e) => {
                                      if (typeof window === 'undefined') return;
                                      const ans = (window as any).answers || {};
                                      ans[q.id] = e.target.value;
                                      (window as any).answers = ans;
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all h-24"
                                    placeholder="Your answer..."
                                  />
                                ) : q.type === "select" ? (
                                  <select 
                                    required={q.required}
                                    onChange={(e) => {
                                      if (typeof window === 'undefined') return;
                                      const ans = (window as any).answers || {};
                                      ans[q.id] = e.target.value;
                                      (window as any).answers = ans;
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all bg-white"
                                  >
                                    <option value="">Select an option</option>
                                    {q.options?.map((opt: string) => (
                                      <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                  </select>
                                ) : q.type === "number" ? (
                                  <input 
                                    type="number"
                                    required={q.required}
                                    onChange={(e) => {
                                      if (typeof window === 'undefined') return;
                                      const ans = (window as any).answers || {};
                                      ans[q.id] = e.target.value;
                                      (window as any).answers = ans;
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all"
                                    placeholder="Enter number..."
                                  />
                                ) : (
                                  <input 
                                    type="text"
                                    required={q.required}
                                    onChange={(e) => {
                                      if (typeof window === 'undefined') return;
                                      const ans = (window as any).answers || {};
                                      ans[q.id] = e.target.value;
                                      (window as any).answers = ans;
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] outline-none transition-all"
                                    placeholder="Your answer..."
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Resume/CV *</label>
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-orange-50/50 ${resumeFile ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              className="hidden" 
                              accept=".pdf,.doc,.docx"
                            />
                            {resumeFile ? (
                              <div className="space-y-2">
                                <FileText className="mx-auto text-green-500" size={32} />
                                <p className="text-xs font-medium text-green-800 line-clamp-1">{resumeFile.name}</p>
                                <button type="button" className="text-[10px] text-green-600 underline">Change file</button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="mx-auto text-gray-400" size={32} />
                                <p className="text-xs text-gray-500">Upload PDF or DOC (Max 5MB)</p>
                              </div>
                            )}
                          </div>
                          {resumeError && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle size={12} /> {resumeError}</p>}
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white rounded-xl py-6 shadow-lg shadow-orange-500/20 font-bold transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? "Uploading..." : (
                            <>Submit Application <Send size={18} className="ml-2" /></>
                          )}
                        </Button>
                        <p className="text-[10px] text-center text-gray-400 mt-4">
                          By applying, you agree to our privacy policy and terms of service.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
