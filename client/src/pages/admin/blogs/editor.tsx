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
  X
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

  // Convex Queries & Mutations
  // Note: We use a custom fetcher for the individual blog if needed, but here we'll just filter from the list or add a getById query later if needed
  // For now, let's use the listBlogs and find the ID (since the list is likely small for an admin)
  const allBlogs = useQuery(api.blogs.listBlogs) || [];
  const blogData = isEdit ? allBlogs.find(b => b._id === id) : null;

  const createMutation = useMutation(api.blogs.createBlog);
  const updateMutation = useMutation(api.blogs.updateBlog);

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Type className="h-4 w-4" /> Content</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input {...field} placeholder="Enter blog title" onChange={handleTitleChange} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <span className="flex items-center px-3 rounded-md bg-gray-50 border text-gray-500 text-sm">/blog/</span>
                              <Input {...field} onChange={(e) => { field.onChange(e); setIsSlugManuallyEdited(true); }} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <ReactQuill theme="snow" value={field.value} onChange={field.onChange} modules={quillModules} className="h-[400px] mb-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Globe className="h-4 w-4" /> SEO & Summary</CardTitle></CardHeader>
                  <CardContent>
                    <Tabs defaultValue="summary">
                      <TabsList className="mb-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="summary" className="space-y-4">
                        <FormField
                          control={form.control}
                          name="excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Excerpt</FormLabel>
                              <FormControl><Textarea {...field} className="h-24" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      <TabsContent value="seo" className="space-y-4">
                        <FormField
                          control={form.control}
                          name="seoTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Title</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="seoDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl><Textarea {...field} /></FormControl>
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Settings className="h-4 w-4" /> Status</CardTitle></CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Published</div>
                            <div className="text-xs text-gray-500">{field.value === "published" ? "Live on site" : "Draft"}</div>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Cover Image</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-4">
                              <Input {...field} placeholder="Image URL" />
                              {field.value && (
                                <div className="relative aspect-video rounded border overflow-hidden">
                                  <img src={field.value} className="w-full h-full object-cover" />
                                  <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6" onClick={() => field.onChange("")}><X className="h-3 w-3" /></Button>
                                </div>
                              )}
                            </div>
                          </FormControl>
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
