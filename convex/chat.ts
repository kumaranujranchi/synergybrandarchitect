import { action } from "./_generated/server";
import { v } from "convex/values";

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

    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
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
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`DeepSeek API error: ${response.status} ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return {
        reply: data.choices[0].message.content
      };
    } catch (error: any) {
      console.error("DeepSeek API Error:", error);
      throw new Error(error.message || "Failed to get response from AI");
    }
  },
});
