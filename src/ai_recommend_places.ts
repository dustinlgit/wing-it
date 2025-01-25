import fetch from 'node-fetch';
import { config } from 'dotenv';

config({ path: '../.env' });

function loadEdenApi(): string {
    const apiKey = process.env.EDEN_AI_KEY;
    if (!apiKey)
      throw new Error("Eden AI API key not found in environment variables.");
    return apiKey;
}

async function askRecommendedDestination(apiKey: string, cityName: string): Promise<string> {
    const url = "https://api.edenai.run/v2/multimodal/chat";
    const headers = {Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json",};
  
    const body = {
      providers: ["openai"],
      messages: [
        {
          role: "user",
          content: `List 10 places are best for travel in ${cityName}?`,
        },
      ],
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      
      const result = (await response.json()) as {
        results: {
          [provider: string]: { output: string };
        };
      };
  
      const provider = "openai";
      const output = result.results[provider]?.output || "No response received";
  
      return output;
    } catch (error) {
      console.error("Error making the API call:", error);
      return "Error occurred while making the API call.";
    }
  }


  let key: string = loadEdenApi();
  console.log("Loaded API Key:", key)

  console.log(askRecommendedDestination(key, "New York"))
  
  