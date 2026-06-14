// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ 
  id: "ai-career-coach", 
  name: "AI_CAREER_COACH" ,
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});