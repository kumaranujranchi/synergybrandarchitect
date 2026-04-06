import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import AdminLayout from "@/components/admin/layout";
import { 
  ArrowLeft, 
  Save, 
  Type, 
  Image as ImageIcon, 
  Globe, 
  Settings,
  X,
  Plus,
  Trash2,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Id } from "../../../../../convex/_generated/dataModel";
import { optimizeImage } from "@/lib/imageOptimization";

// Define form schema
const formSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description is too short"),
  image: z.string().min(2, "Image is required"),
  link: z.string(),
  results: z.array(z.object({ value: z.string().min(1, "Result cannot be empty") })),
  featured: z.boolean().default(false),
  external: z.boolean().default(false),
  underDevelopment: z.boolean().default(false),
});

export default function AdminPortfolioEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const portfolioItems = useQuery(api.portfolio.listPortfolio, {}) || [];
  const portfolioData = isEdit ? portfolioItems.find(p => p._id === id) : null;

  const createMutation = useMutation(api.portfolio.createPortfolio);
  const updateMutation = useMutation(api.portfolio.updatePortfolio);
  
  // Reusing the blog upload functions since they just interact with generic convex storage
  const generateUploadUrl = useMutation(api.blogs.generateUploadUrl);
  const getImageUrlMutation = useMutation(api.blogs.getImageUrl);
  
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      image: "",
      link: "",
      results: [{ value: "" }],
      featured: false,
      external: false,
      underDevelopment: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "results",
    control: form.control,
  });

  // Load defaults when data arrives
  useEffect(() => {
    if (portfolioData) {
      form.reset({
        title: portfolioData.title,
        category: portfolioData.category,
        description: portfolioData.description,
        image: portfolioData.image,
        link: portfolioData.link || "",
        results: portfolioData.results.map((r: string) => ({ value: r })),
        featured: portfolioData.featured || false,
        external: portfolioData.external || false,
        underDevelopment: portfolioData.underDevelopment || false,
      });
    }
  }, [portfolioData, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Automatically optimize image before upload
      const optimizedFile = await optimizeImage(file, {
        maxWidth: 1920,
        quality: 0.8,
        format: 'image/webp'
      });

      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": optimizedFile.type },
        body: optimizedFile,
      });
      
      if (!result.ok) throw new Error("Failed to upload image");
      
      const { storageId } = await result.json();
      const imageUrl = await getImageUrlMutation({ storageId });
      
      if (imageUrl) {
        form.setValue("image", imageUrl, { shouldValidate: true });
        toast({ title: "Image uploaded successfully!" });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading the image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Flatten the results array of objects back to array of strings
      const flatResults = values.results.map(r => r.value).filter(val => val.trim() !== "");

      if (isEdit) {
        await updateMutation({
          id: id as Id<"portfolio">,
          title: values.title,
          category: values.category,
          description: values.description,
          image: values.image,
          link: values.link,
          featured: values.featured,
          external: values.external,
          underDevelopment: values.underDevelopment,
          results: flatResults,
        });
        toast({ title: "Portfolio updated successfully" });
      } else {
        await createMutation({
          title: values.title,
          category: values.category,
          description: values.description,
          image: values.image,
          link: values.link,
          featured: values.featured,
          external: values.external,
          underDevelopment: values.underDevelopment,
          results: flatResults,
        });
        toast({ title: "Portfolio item published successfully" });
      }
      setLocation("/admin/portfolio");
    } catch (e: any) {
      toast({ 
        title: "Failed to save portfolio item", 
        description: e.message, 
        variant: "destructive" 
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setLocation("/admin/portfolio")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              {isEdit ? "Edit Portfolio Item" : "New Portfolio Item"}
            </h1>
          </div>
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            className="bg-[#FF6B00] text-white hover:bg-[#FF8533] px-6 shadow-md transition-all hover:shadow-lg"
          >
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? "Update Project" : "Publish Project"}
          </Button>
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-8 pb-12 w-full mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
            
            {/* 1. Basic Information Card */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#FF6B00]" /> 
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Thakur Tax Consultant" className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Category</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Healthcare, Real Estate, E-Commerce" className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Link */}
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Project URL (Leave empty if none)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Cover Image Upload directly in Basic Info */}
                <div className="pt-4 border-t border-gray-100">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 mb-4 block">Project Display Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {field.value && (
                              <div className="relative w-full aspect-video md:aspect-[21/9] max-h-64 rounded-xl overflow-hidden border shadow-sm group">
                                <img 
                                  src={field.value} 
                                  alt="Cover" 
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button 
                                    type="button" 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => form.setValue("image", "", { shouldValidate: true })}
                                  >
                                    <X className="w-4 h-4 mr-2" /> Remove Image
                                  </Button>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4">
                              <div className="relative flex-1">
                                <Input 
                                  type="file" 
                                  accept="image/*"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={handleImageUpload}
                                  disabled={isUploading}
                                />
                                <div className="w-full flex items-center justify-center h-12 border-2 border-dashed rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                  {isUploading ? (
                                    <span className="flex items-center gap-2"><span className="animate-spin relative inline-flex h-4 w-4 rounded-full border-2 border-t-[#FF6B00]"></span> Uploading...</span>
                                  ) : (
                                    <span className="flex items-center gap-2 font-medium"><ImageIcon className="w-4 h-4" /> Click to Upload New Image</span>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm font-medium text-gray-400">OR</span>
                              <Input placeholder="Direct Image URL" className="flex-1 h-12" {...field} />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Toggles */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-8">
                  <FormField
                     control={form.control}
                     name="featured"
                     render={({ field }) => (
                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm min-w-[200px]">
                         <div className="space-y-0.5 mr-4">
                           <FormLabel>Featured Project</FormLabel>
                           <FormDescription>Show on homepage</FormDescription>
                         </div>
                         <FormControl>
                           <Switch checked={field.value} onCheckedChange={field.onChange} />
                         </FormControl>
                       </FormItem>
                     )}
                   />
                  <FormField
                     control={form.control}
                     name="external"
                     render={({ field }) => (
                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm min-w-[200px]">
                         <div className="space-y-0.5 mr-4">
                           <FormLabel>External Link</FormLabel>
                           <FormDescription>Opens in new tab</FormDescription>
                         </div>
                         <FormControl>
                           <Switch checked={field.value} onCheckedChange={field.onChange} />
                         </FormControl>
                       </FormItem>
                     )}
                   />
                  <FormField
                     control={form.control}
                     name="underDevelopment"
                     render={({ field }) => (
                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm min-w-[200px]">
                         <div className="space-y-0.5 mr-4">
                           <FormLabel>In Development</FormLabel>
                           <FormDescription>Disables the link</FormDescription>
                         </div>
                         <FormControl>
                           <Switch checked={field.value} onCheckedChange={field.onChange} />
                         </FormControl>
                       </FormItem>
                     )}
                   />
                </div>
              </CardContent>
            </Card>

            {/* 2. Descriptive Content */}
            <Card className="border shadow-sm flex-1">
              <CardHeader className="bg-gray-50/50 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Type className="h-5 w-5 text-[#0066CC]" /> 
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="h-full rounded-b-xl overflow-hidden border-0">
                      <FormControl>
                        <Textarea 
                          className="min-h-[150px] resize-y rounded-none border-0 focus-visible:ring-0 p-6 text-base" 
                          placeholder="Write a brief, compelling description of what this project accomplished..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="px-6 pb-4" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 3. Key Results Array */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" /> 
                    Key Technologies / Results
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => append({ value: "" })}
                    className="h-8 gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Result
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                 {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`results.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {index + 1}
                                </div>
                                <Input {...field} className="flex-1" placeholder="e.g. Built with React & Node.js" />
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
              </CardContent>
            </Card>
            
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
