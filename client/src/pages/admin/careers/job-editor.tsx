import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import AdminLayout from "@/components/admin/layout";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Settings,
  Briefcase,
  ListChecks,
  HelpCircle,
  GripVertical,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Id } from "../../../../../convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  slug: z.string().min(2, "Slug is too short"),
  department: z.string().min(2, "Department is required"),
  type: z.string().min(2, "Job type is required"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  status: z.string().default("draft"),
});

export default function AdminJobEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  const allJobs = useQuery(api.jobs.listJobs, {}) || [];
  const jobData = isEdit ? allJobs.find(j => j._id === id) : null;

  const createMutation = useMutation(api.jobs.createJob);
  const updateMutation = useMutation(api.jobs.updateJob);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      department: "",
      type: "Full-time",
      location: "Patna, Bihar",
      salary: "",
      description: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (jobData) {
      form.reset({
        title: jobData.title,
        slug: jobData.slug,
        department: jobData.department,
        type: jobData.type,
        location: jobData.location,
        salary: jobData.salary || "",
        description: jobData.description,
        status: jobData.status,
      });
      setRequirements(jobData.requirements || []);
      setBenefits(jobData.benefits || []);
      setQuestions(jobData.questions || []);
    }
  }, [jobData, form]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    if (!isEdit) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  };

  const addItem = (list: string[], setter: any, item: string) => {
    if (item.trim()) {
      setter([...list, item.trim()]);
    }
  };

  const removeItem = (list: string[], setter: any, index: number) => {
    setter(list.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: Math.random().toString(36).substr(2, 9), text: "", type: "text", required: true }]);
  };

  const updateQuestion = (index: number, updates: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (requirements.length === 0) {
      toast({ title: "Requirements needed", description: "Please add at least one requirement", variant: "destructive" });
      return;
    }

    try {
      const finalData = {
        ...values,
        requirements,
        benefits,
        questions,
      };

      if (isEdit) {
        await updateMutation({ id: id as Id<"jobs">, ...finalData });
        toast({ title: "Job updated successfully" });
      } else {
        await createMutation(finalData);
        toast({ title: "Job posted successfully" });
      }
      setLocation("/admin/careers");
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setLocation("/admin/careers")} type="button">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <h1 className="text-3xl font-bold">{isEdit ? "Edit Job" : "Post New Job"}</h1>
              </div>
              <Button type="submit" className="bg-[#FF6B00] text-white hover:bg-[#FF8533]">
                <Save className="h-4 w-4 mr-2" /> {isEdit ? "Update Job" : "Post Job"}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
              {/* --- LEFT COLUMN: DETAILS --- */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader className="bg-gray-50/50 border-b mb-6">
                    <CardTitle className="text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-orange-500" /> Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Job Title</FormLabel>
                          <FormControl><Input {...field} placeholder="e.g. Senior MERN Stack Developer" onChange={handleTitleChange} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Department</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select Dept" /></SelectTrigger></FormControl>
                              <SelectContent>
                                {["Development", "Marketing", "Sales", "Design", "Management", "Operations"].map(d => (
                                  <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Job Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger></FormControl>
                              <SelectContent>
                                {["Full-time", "Part-time", "Internship", "Contract", "Freelance"].map(t => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Job Description</FormLabel>
                          <FormControl><Textarea {...field} placeholder="Describe the role, team, and expectations..." className="h-40" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gray-50/50 border-b mb-6">
                    <CardTitle className="text-lg flex items-center gap-2"><ListChecks className="h-5 w-5 text-orange-500" /> Requirements & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                      <Label className="font-bold">Requirements (List)</Label>
                      <div className="flex gap-2">
                        <Input id="req-input" placeholder="Add a requirement..." onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addItem(requirements, setRequirements, (e.target as any).value); (e.target as any).value = ''; } }} />
                        <Button type="button" onClick={() => { const input = document.getElementById('req-input') as HTMLInputElement; addItem(requirements, setRequirements, input.value); input.value = ''; }}><Plus className="h-4 w-4" /></Button>
                      </div>
                      <div className="space-y-2">
                        {requirements.map((req, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border group">
                            <span className="text-sm">{req}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(requirements, setRequirements, i)} className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100"><X size={14} /></Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="font-bold">Benefits (Optional List)</Label>
                      <div className="flex gap-2">
                        <Input id="ben-input" placeholder="Add a benefit..." onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addItem(benefits, setBenefits, (e.target as any).value); (e.target as any).value = ''; } }} />
                        <Button type="button" onClick={() => { const input = document.getElementById('ben-input') as HTMLInputElement; addItem(benefits, setBenefits, input.value); input.value = ''; }}><Plus className="h-4 w-4" /></Button>
                      </div>
                      <div className="space-y-2">
                        {benefits.map((ben, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border group">
                            <span className="text-sm">{ben}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(benefits, setBenefits, i)} className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100"><X size={14} /></Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gray-50/50 border-b mb-6">
                    <CardTitle className="text-lg flex items-center gap-2"><HelpCircle className="h-5 w-5 text-orange-500" /> Application Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-gray-500">Add custom questions candidates must answer when applying (e.g., "What is your notice period?").</p>
                    <div className="space-y-4">
                      {questions.map((q, i) => (
                        <div key={q.id} className="p-4 border rounded-xl bg-gray-50/50 space-y-4 relative">
                          <button onClick={() => removeQuestion(i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase">Question Text</Label>
                              <Input value={q.text} onChange={(e) => updateQuestion(i, { text: e.target.value })} placeholder="Enter question..." />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-bold uppercase">Input Type</Label>
                              <Select value={q.type} onValueChange={(v) => updateQuestion(i, { type: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Short Text</SelectItem>
                                  <SelectItem value="textarea">Long Text</SelectItem>
                                  <SelectItem value="select">Dropdown</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          {q.type === "select" && (
                            <div className="space-y-2 pt-2">
                              <Label className="text-xs font-bold uppercase">Dropdown Options (Comma separated)</Label>
                              <Input 
                                value={q.options?.join(", ") || ""} 
                                onChange={(e) => updateQuestion(i, { options: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} 
                                placeholder="Option 1, Option 2, Option 3"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Switch checked={q.required} onCheckedChange={(v) => updateQuestion(i, { required: v })} />
                            <Label className="text-xs">Required Question</Label>
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addQuestion} className="w-full border-dashed"><Plus className="h-4 w-4 mr-2" /> Add Question</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* --- RIGHT COLUMN: SETTINGS --- */}
              <div className="space-y-8">
                <Card>
                  <CardHeader className="bg-gray-50/50 border-b mb-6">
                    <CardTitle className="text-lg flex items-center gap-2"><Settings className="h-5 w-5 text-orange-500" /> Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Posting Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft (Hidden)</SelectItem>
                              <SelectItem value="open">Open (Public)</SelectItem>
                              <SelectItem value="closed">Closed (Archive)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Location</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Salary Range (Optional)</FormLabel>
                          <FormControl><Input {...field} placeholder="e.g. ₹6L - ₹12L PA" /></FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">URL Slug</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
