import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendSubmission = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    service: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      status: "new",
      submittedAt: Date.now(),
      updatedAt: Date.now(),
    });
    return submissionId;
  },
});

export const getSubmissions = query({
  handler: async (ctx) => {
    return await ctx.db.query("submissions").order("desc").collect();
  },
});

export const updateSubmissionStatus = mutation({
  args: {
    id: v.id("submissions"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
    return true;
  },
});

export const deleteSubmission = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});

export const addSubmissionNote = mutation({
  args: {
    id: v.id("submissions"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.id);
    if (!submission) throw new Error("Submission not found");
    
    await ctx.db.insert("notes", {
      submissionId: args.id,
      content: args.content,
      createdAt: Date.now(),
    });
    return true;
  },
});
