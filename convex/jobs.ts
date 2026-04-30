import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// --- Job Listings ---

/**
 * List all jobs, optionally filtered by status (e.g., 'open')
 */
export const listJobs = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("jobs")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("jobs").order("desc").collect();
  },
});

/**
 * Get a single job by its slug
 */
export const getJobBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("jobs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

/**
 * Create a new job listing (Admin)
 */
export const createJob = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    department: v.string(),
    type: v.string(), // 'Full-time', 'Part-time', 'Internship', 'Contract'
    location: v.string(),
    salary: v.optional(v.string()),
    description: v.string(),
    requirements: v.array(v.string()),
    benefits: v.optional(v.array(v.string())),
    questions: v.optional(v.array(v.object({
      id: v.string(),
      text: v.string(),
      type: v.string(), // 'text', 'textarea', 'select'
      required: v.boolean(),
      options: v.optional(v.array(v.string())),
    }))),
    status: v.string(), // 'draft', 'open', 'closed'
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("jobs", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Update an existing job (Admin)
 */
export const updateJob = mutation({
  args: {
    id: v.id("jobs"),
    title: v.string(),
    slug: v.string(),
    department: v.string(),
    type: v.string(),
    location: v.string(),
    salary: v.optional(v.string()),
    description: v.string(),
    requirements: v.array(v.string()),
    benefits: v.optional(v.array(v.string())),
    questions: v.optional(v.array(v.object({
      id: v.string(),
      text: v.string(),
      type: v.string(),
      required: v.boolean(),
      options: v.optional(v.array(v.string())),
    }))),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
    return id;
  },
});

/**
 * Delete a job listing (Admin)
 */
export const deleteJob = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});

// --- Applications ---

/**
 * Submit a job application (Public)
 */
export const submitApplication = mutation({
  args: {
    jobId: v.id("jobs"),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    resumeUrl: v.string(), // Storage ID
    portfolioUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    answers: v.optional(v.array(v.object({
      questionId: v.string(),
      answer: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("applications", {
      ...args,
      status: "pending",
      appliedAt: now,
      updatedAt: now,
    });
  },
});

/**
 * List applications, optionally for a specific job (Admin)
 */
export const listApplications = query({
  args: { jobId: v.optional(v.id("jobs")) },
  handler: async (ctx, args) => {
    if (args.jobId) {
      return await ctx.db
        .query("applications")
        .withIndex("by_job", (q) => q.eq("jobId", args.jobId!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("applications").order("desc").collect();
  },
});

/**
 * Update application status (Admin)
 */
export const updateApplicationStatus = mutation({
  args: {
    id: v.id("applications"),
    status: v.string(), // 'pending', 'reviewed', 'shortlisted', 'rejected', 'hired'
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status, updatedAt: Date.now() });
    return args.id;
  },
});

// --- Storage Utilities ---

/**
 * Generate a secure upload URL for resumes
 */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/**
 * Get the download URL for a file (Resume)
 */
export const getFileUrl = query({
  args: { storageId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.storageId) return null;
    return await ctx.storage.getUrl(args.storageId);
  },
});
