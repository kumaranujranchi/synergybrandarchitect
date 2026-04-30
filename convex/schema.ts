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

  // Careers / Job Board
  jobs: defineTable({
    title: v.string(),
    slug: v.string(),
    department: v.string(),
    type: v.string(), // 'Full-time', 'Part-time', 'Internship', 'Contract'
    location: v.string(),
    salary: v.optional(v.string()),
    description: v.string(), // Rich text / Markdown
    requirements: v.array(v.string()),
    benefits: v.optional(v.array(v.string())),
    questions: v.optional(v.array(v.object({
      id: v.string(),
      text: v.string(),
      type: v.string(), // 'text', 'textarea', 'select'
      required: v.boolean(),
      options: v.optional(v.array(v.string())), // For select type
    }))),
    status: v.string(), // 'draft', 'open', 'closed'
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  applications: defineTable({
    jobId: v.id("jobs"),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    resumeUrl: v.string(), // File storage ID or URL
    portfolioUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    answers: v.optional(v.array(v.object({
      questionId: v.string(),
      answer: v.string(),
    }))),
    status: v.string(), // 'pending', 'reviewed', 'shortlisted', 'rejected', 'hired'
    appliedAt: v.number(),
    updatedAt: v.number(),
  }).index("by_job", ["jobId"]),
});
