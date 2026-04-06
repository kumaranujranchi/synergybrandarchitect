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
  Minus,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  slug: z.string().min(2, "Slug is too short").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  content: z.string().min(10, "Content is too short"),
  excerpt: z.string().default(""),
  coverImage: z.string().optional(),
  status: z.string().default("draft"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [editorHeight, setEditorHeight] = useState<"sm" | "md" | "lg" | "xl">("md");

  const heightMap = {
    sm: "300px",
    md: "500px",
    lg: "800px",
    xl: "1200px",
  };

  // Convex Queries & Mutations
  // Note: We use a custom fetcher for the individual blog if needed, but here we'll just filter from the list or add a getById query later if needed
  // For now, let's use the listBlogs and find the ID (since the list is likely small for an admin)
  const allBlogs = useQuery(api.blogs.listBlogs, {}) || [];
  const blogData = isEdit ? allBlogs.find(b => b._id === id) : null;

  const createMutation = useMutation(api.blogs.createBlog);
  const updateMutation = useMutation(api.blogs.updateBlog);
  const generateUploadUrl = useMutation(api.blogs.generateUploadUrl);
  const getImageUrlMutation = useMutation(api.blogs.getImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    },
  });

  // Load defaults when data arrives
  useEffect(() => {
    if (blogData) {
      form.reset({
        title: blogData.title,
        slug: blogData.slug,
        content: blogData.content,
        excerpt: blogData.excerpt || "",
        coverImage: blogData.coverImage || "",
        status: blogData.status,
        seoTitle: blogData.seoTitle || "",
        seoDescription: blogData.seoDescription || "",
        seoKeywords: blogData.seoKeywords || "",
      });
      setIsSlugManuallyEdited(true);
    }
  }, [blogData, form]);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    
    if (!isSlugManuallyEdited) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  };

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

      // Step 1: Get short-lived upload URL from Convex
      const postUrl = await generateUploadUrl();
      
      // Step 2: Push the file directly to Convex storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": optimizedFile.type },
        body: optimizedFile,
      });
      
      if (!result.ok) throw new Error("Failed to upload image");
      
      const { storageId } = await result.json();
      
      // Step 3: Get the public URL for the storageId and store it inside the form
      const imageUrl = await getImageUrlMutation({ storageId });
      if (imageUrl) {
        form.setValue("coverImage", imageUrl, { shouldValidate: true });
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
      if (isEdit) {
        await updateMutation({
          id: id as Id<"blogs">,
          ...values,
        });
        toast({ title: "Blog updated" });
      } else {
        await createMutation(values);
        toast({ title: "Blog created" });
      }
      setLocation("/admin/blogs");
    } catch (error: any) {
      toast({
        title: "Error saving blog",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['blockquote', 'code-block']
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setLocation("/admin/blogs")}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <h1 className="text-3xl font-bold">{isEdit ? "Edit Post" : "New Post"}</h1>
              </div>
              <Button type="submit" className="bg-[#FF6B00] text-white hover:bg-[#FF8533]">
                <Save className="h-4 w-4 mr-2" /> {isEdit ? "Update" : "Publish"}
              </Button>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full">
              {/* Category 1: Basic Information */}
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50/50 pb-4 border-b mb-6">
                  <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
                    <Settings className="h-5 w-5 text-gray-500" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-gray-700">Blog Title</FormLabel>
                        <FormControl>
                          <Input {...field} className="text-lg py-6" placeholder="Enter a descriptive title" onChange={handleTitleChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">URL Slug</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <span className="flex items-center px-4 rounded-md bg-gray-100 border text-gray-500 text-sm">synergybrandarchitect.in/blog/</span>
                            <Input {...field} className="bg-gray-50 focus:bg-white" onChange={(e) => { field.onChange(e); setIsSlugManuallyEdited(true); }} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t mt-6">
                    {/* Status Toggle */}
                    <div className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">Visibility Status</FormLabel>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between p-4 border rounded-xl bg-gray-50/30 hover:bg-gray-50 transition-colors">
                            <div>
                              <div className={`font-semibold ${field.value === "published" ? "text-green-600" : "text-gray-500"}`}>
                                {field.value === "published" ? "Published" : "Draft"}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {field.value === "published" ? "Live to the public" : "Hidden from website"}
                              </div>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value === "published"} 
                                onCheckedChange={v => field.onChange(v ? "published" : "draft")} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Cover Image Upload */}
                    <div className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" /> Cover Image
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="space-y-3">
                                {!field.value ? (
                                  <div className="flex flex-col gap-3">
                                    <Label htmlFor="image-upload" className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isUploading ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-gray-50/50 border-gray-200 hover:bg-orange-50 hover:border-orange-200'}`}>
                                      <ImageIcon className={`h-8 w-8 mb-2 ${isUploading ? 'text-gray-400' : 'text-orange-400'}`} />
                                      <span className="text-sm font-medium text-gray-600">
                                        {isUploading ? "Uploading image..." : "Click to upload from computer"}
                                      </span>
                                    </Label>
                                    <Input 
                                      id="image-upload" 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={handleImageUpload}
                                      disabled={isUploading}
                                    />
                                    
                                    <div className="flex items-center">
                                      <hr className="flex-1" />
                                      <span className="text-[10px] uppercase font-bold text-gray-400 mx-3 tracking-wider">or direct url</span>
                                      <hr className="flex-1" />
                                    </div>
                                    <Input {...field} className="text-sm" placeholder="https://example.com/image.jpg" disabled={isUploading} />
                                  </div>
                                ) : (
                                  <div className="relative aspect-[21/9] rounded-xl border overflow-hidden group">
                                    <img src={field.value} className="w-full h-full object-cover" alt="Cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <Button type="button" variant="destructive" onClick={() => field.onChange("")}>
                                        <X className="h-4 w-4 mr-2" /> Remove Image
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category 2: Blog Content */}
              <Card className="shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50/50 pb-4 border-b mb-6 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
                    <Type className="h-5 w-5 text-gray-500" /> Article Body
                  </CardTitle>
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border">
                    {(["sm", "md", "lg", "xl"] as const).map((size) => (
                      <Button
                        key={size}
                        type="button"
                        variant={editorHeight === size ? "default" : "ghost"}
                        size="sm"
                        className={`px-3 h-8 text-xs font-bold uppercase ${editorHeight === size ? 'bg-[#FF6B00] hover:bg-[#FF8533]' : 'text-gray-500'}`}
                        onClick={() => setEditorHeight(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div style={{ height: heightMap[editorHeight] }} className="transition-all duration-300 ease-in-out mb-12 sm:mb-16">
                            <ReactQuill 
                              theme="snow" 
                              value={field.value} 
                              onChange={field.onChange} 
                              modules={quillModules} 
                              className="h-full"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Category 3: SEO & Summary Metadata */}
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50/50 pb-4 border-b mb-6">
                  <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
                    <Globe className="h-5 w-5 text-gray-500" /> SEO & Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 p-1 bg-gray-100/80">
                      <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Excerpt / Preview</TabsTrigger>
                      <TabsTrigger value="seo" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Search Engine Metadata</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="summary" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">Short Excerpt (Optional)</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="A short 1-2 sentence summary of this blog post. Used in blog listing cards." className="h-32 text-base resize-none" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="seo" className="space-y-6">
                      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">These fields help your blog post rank higher on Google Search results and determine how the link appears when shared on social media like WhatsApp or LinkedIn.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="seoTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-gray-700">Meta Title</FormLabel>
                              <FormControl><Input {...field} placeholder="Overrides main title for search engines" /></FormControl>
                              <p className="text-xs text-gray-500 mt-2">Leave blank to default to your blog title.</p>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="seoKeywords"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-gray-700">Focus Keywords</FormLabel>
                              <FormControl><Input {...field} placeholder="e.g. digital marketing, best agency, seo" /></FormControl>
                              <p className="text-xs text-gray-500 mt-2">Comma-separated terms.</p>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="seoDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">Meta Description</FormLabel>
                            <FormControl><Textarea {...field} className="h-24 resize-none" placeholder="A compelling description that encourages clicks from Google search pages." /></FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
