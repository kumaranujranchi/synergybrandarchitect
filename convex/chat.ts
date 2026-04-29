import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const chat = action({
  args: {
    message: v.string(),
    history: v.array(v.object({
      role: v.string(),
      content: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY not set in Convex dashboard");
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.deepseek.com",
    });

    try {
      const response = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { 
            role: "system", 
            content: `You are the Synergy AI Assistant for Synergy Brand Architect. You are professional, creative, and results-oriented. 
            You specialize in Digital Marketing, Brand Building, Performance Marketing, and Workflow Automation.
            Your goal is to help visitors understand how Synergy Brand Architect can scale their business.
            Keep responses concise and conversational. Speak in a mix of English and Hindi (Hinglish) where appropriate to be relatable.
            If the user is interested in services, encourage them to "Book a strategy call" on the website.` 
          },
          ...args.history,
          { role: "user", content: args.message }
        ],
      });

      return {
        reply: response.choices[0].message.content
      };
    } catch (error: any) {
      console.error("DeepSeek API Error:", error);
      throw new Error("Failed to get response from AI: " + error.message);
    }
  },
});
