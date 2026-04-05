import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/layout";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
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
import { Blog, insertBlogSchema, updateBlogSchema } from "@shared/schema";
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

// Define form schema
const formSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  slug: z.string().min(2, "Slug is too short").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  content: z.string().min(10, "Content is too short"),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  // Fetch blog data if in edit mode
  const { data: blogData, isLoading } = useQuery<{ blog: Blog }>({
    queryKey: [`/api/admin/blogs/${id}`],
    enabled: isEdit,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      category: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "draft",
    },
  });

  // Load defaults when data arrives
  useEffect(() => {
    if (blogData?.blog) {
      const b = blogData.blog;
      form.reset({
        title: b.title,
        slug: b.slug,
        content: b.content,
        excerpt: b.excerpt || "",
        coverImage: b.coverImage || "",
        category: b.category || "",
        metaTitle: b.metaTitle || "",
        metaDescription: b.metaDescription || "",
        metaKeywords: b.metaKeywords || "",
        status: b.status as "draft" | "published",
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

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const url = isEdit ? `/api/admin/blogs/${id}` : "/api/admin/blogs";
      const method = isEdit ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save blog");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      toast({
        title: isEdit ? "Blog updated" : "Blog created",
        description: `The blog post has been successfully ${isEdit ? "updated" : "created"}.`,
      });
      setLocation("/admin/blogs");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  // Quill configuration
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

  if (isLoading) {
    return (
      <AdminLayout title={isEdit ? "Edit Blog" : "New Blog"}>
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={isEdit ? "Edit Blog" : "New Blog"}
      backButton={{ label: "Back to Blogs", href: "/admin/blogs" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter blog title" 
                            onChange={handleTitleChange}
                          />
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
                        <FormLabel>Slug (URL Path)</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <span className="flex items-center px-3 rounded-md bg-gray-50 border text-gray-500 text-sm">
                              /blog/
                            </span>
                            <Input 
                              {...field} 
                              placeholder="url-friendly-slug" 
                              onChange={(e) => {
                                field.onChange(e);
                                setIsSlugManuallyEdited(true);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Unique identifier for the blog URL.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Content</FormLabel>
                        <FormControl>
                          <div className="bg-white min-h-[400px]">
                            <ReactQuill 
                              theme="snow"
                              value={field.value}
                              onChange={field.onChange}
                              modules={quillModules}
                              placeholder="Write something amazing..."
                              className="h-[350px] mb-12"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    SEO & Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="basic">General</TabsTrigger>
                      <TabsTrigger value="seo">SEO Optimization</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt (Short Summary)</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Briefly describe what this blog is about..." 
                                className="h-24 resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g. Marketing" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">Published Status</FormLabel>
                                <FormDescription className="text-xs">
                                  {field.value === "published" ? "Visible to everyone" : "Draft only"}
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value === "published"}
                                  onCheckedChange={(checked) => 
                                    field.onChange(checked ? "published" : "draft")
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="seo" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Browser tab title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Search engine description..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="metaKeywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Keywords</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="separated, by, commas" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Publishing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={mutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isEdit ? "Update Post" : "Publish Post"}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setLocation("/admin/blogs")}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Cover Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="space-y-4">
                            <Input {...field} placeholder="Paste image URL here" />
                            {field.value && (
                              <div className="relative aspect-video rounded-lg overflow-hidden border">
                                <img 
                                  src={field.value} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="destructive"
                                  className="absolute top-2 right-2 h-6 w-6"
                                  onClick={() => field.onChange("")}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
}
