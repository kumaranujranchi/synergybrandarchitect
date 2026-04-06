import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    password: v.string(), // Note: In Convex, usually we use Auth like Clerk
    role: v.string(), // 'admin', 'manager', 'user', 'client'
    permissions: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  submissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    service: v.string(),
    message: v.string(),
    status: v.string(), // 'new', 'in_progress', 'pending', 'delivered', 'lost'
    submittedAt: v.number(),
    updatedAt: v.number(),
  }),

  notes: defineTable({
    submissionId: v.id("submissions"),
    userId: v.optional(v.id("users")),
    content: v.string(),
    createdAt: v.number(),
  }),

  auditLogs: defineTable({
    userId: v.optional(v.id("users")),
    action: v.string(),
    details: v.string(), // Stringified JSON or map
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
  }),
  
  // Blog table for CMS
  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    category: v.optional(v.string()),
    authorId: v.optional(v.id("users")),
    status: v.string(), // 'draft', 'published', 'scheduled'
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoKeywords: v.optional(v.string()), // Comma separated
    createdAt: v.number(),
    updatedAt: v.number(),
    publishedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),

  // Portfolio items
  portfolio: defineTable({
    title: v.string(),
    category: v.string(),
    description: v.string(),
    image: v.string(),
    results: v.array(v.string()),
    link: v.string(),
    featured: v.optional(v.boolean()),
    external: v.optional(v.boolean()),
    underDevelopment: v.optional(v.boolean()),
    order: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});
