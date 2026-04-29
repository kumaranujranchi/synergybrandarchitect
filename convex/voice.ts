import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateSpeech = action({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY not set in Convex dashboard");
    }

    // Voice ID for a natural multilingual voice (e.g., "Rachel" or a Hindi compatible one)
    // You can change this ID later from ElevenLabs dashboard
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; 

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: args.text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBuffer = await response.arrayBuffer();
      // Convert to base64 to send to frontend
      const base64Audio = Buffer.from(audioBuffer).toString("base64");
      
      return { audio: base64Audio };
    } catch (error: any) {
      console.error("ElevenLabs Error:", error);
      throw new Error("Failed to generate premium speech");
    }
  },
});
