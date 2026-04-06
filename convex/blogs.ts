import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all blogs, optionally filtered by status
 */
export const listBlogs = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let blogQuery = ctx.db.query("blogs");
    
    if (args.status) {
      blogQuery = blogQuery.filter((q) => q.eq(q.field("status"), args.status));
    }
    
    return await blogQuery.order("desc").collect();
  },
});

/**
 * Get a single blog by its slug
 */
export const getBlogBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

/**
 * Create a new blog
 */
export const createBlog = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoKeywords: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const blogId = await ctx.db.insert("blogs", {
      ...args,
      createdAt: now,
      updatedAt: now,
      publishedAt: args.status === "published" ? now : undefined,
    });
    return blogId;
  },
});

/**
 * Update an existing blog
 */
export const updateBlog = mutation({
  args: {
    id: v.id("blogs"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoKeywords: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = Date.now();
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Blog not found");
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
      publishedAt: (updates.status === "published" && !existing.publishedAt) 
        ? now 
        : existing.publishedAt,
    });
    
    return id;
  },
});

/**
 * Delete a blog
 */
export const deleteBlog = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});

/**
 * Generate upload URL for images (Cover images, etc.)
 */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/**
 * Fetch the direct URL for a given storage ID
 */
export const getImageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
