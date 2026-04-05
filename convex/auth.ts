import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(args.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
});

export const getCurrentUser = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    return await ctx.db.get(args.userId);
  }
});

// Seed initial admin user if not exists
export const seedAdmin = mutation({
  handler: async (ctx) => {
    const email = "anuj@synergybrandarchitect.in";
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    
    if (existing) return existing._id;
    
    // Hash the default password for new seed
    const hashedPassword = await bcrypt.hash("Anuj@1234", 10);
    
    return await ctx.db.insert("users", {
      name: "Anuj",
      email: email,
      password: hashedPassword,
      role: "admin",
      permissions: ["view", "create", "edit", "delete", "manage_users"],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
