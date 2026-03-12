import OpenAI from "openai";

export const hareki = new OpenAI({
  baseURL: "https://api.hareki.studio/v1",
  apiKey: process.env.HAREKI_API_KEY || "",
});
