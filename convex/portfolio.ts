import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all portfolio items
 */
export const listPortfolio = query({
  args: { 
    category: v.optional(v.string()),
    featuredOnly: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("portfolio");
    
    // Sort logic requires an index or we can sort in memory. 
    // Usually fetching all and sorting by order is fine for < 100 items.
    let items = await q.collect();
    
    if (args.category && args.category !== "All") {
      items = items.filter(item => item.category === args.category);
    }
    
    if (args.featuredOnly) {
      items = items.filter(item => item.featured);
    }
    
    // Sort by order ascending, then by creation date descending
    return items.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return b.createdAt - a.createdAt;
    });
  },
});

/**
 * Get a single portfolio item by ID
 */
export const getPortfolioItem = query({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Create a new portfolio item
 */
export const createPortfolio = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("portfolio", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

/**
 * Update an existing portfolio item
 */
export const updatePortfolio = mutation({
  args: {
    id: v.id("portfolio"),
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
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = Date.now();
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Portfolio item not found");
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
    });
    
    return id;
  },
});

/**
 * Delete a portfolio item
 */
export const deletePortfolio = mutation({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});

/**
 * Seed existing hardcoded portfolio items
 */
export const seedPortfolio = mutation({
  args: {
    items: v.array(v.object({
      title: v.string(),
      category: v.string(),
      description: v.string(),
      image: v.string(),
      results: v.array(v.string()),
      link: v.string(),
      featured: v.optional(v.boolean()),
      external: v.optional(v.boolean()),
      underDevelopment: v.optional(v.boolean()),
    }))
  },
  handler: async (ctx, args) => {
    // Only seed if empty to prevent duplicates
    const existing = await ctx.db.query("portfolio").take(1);
    if (existing.length > 0) {
      return { success: false, message: "Database already contains portfolio items" };
    }
    
    const now = Date.now();
    for (let i = 0; i < args.items.length; i++) {
        const item = args.items[i];
        await ctx.db.insert("portfolio", {
            ...item,
            order: i, // maintain original hardcoded order
            createdAt: now,
            updatedAt: now
        });
    }
    return { success: true, count: args.items.length };
  }
});
