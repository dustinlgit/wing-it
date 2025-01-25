import fetch from "node-fetch"; // Install via `npm install node-fetch`
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env
config({ path: resolve(__dirname, "../.env") });

// Load Eden AI API Key from .env
function loadEdenApiKey() {
  const apiKey = process.env.EDEN_AI_KEY;
  if (!apiKey) {
    throw new Error("Eden AI API key not found in environment variables.");
  }
  return apiKey;
}

// Execute Workflow
async function executeWorkflow(apiKey, workflowId, prompt) {
  const url = `https://api.edenai.run/v2/workflow/${workflowId}/execution/`;

  const payload = {
    prompt, // Pass the user-provided prompt
  };

  try {
    console.log("Sending request to:", url);
    console.log("Request payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from API:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response from API:", result);
    return result;
  } catch (error) {
    console.error(
      "Error making the API call:",
      error instanceof Error ? error.message : error
    );
    return "Error occurred while making the API call.";
  }
}

// Main function
async function main() {
  try {
    const apiKey = loadEdenApiKey(); // Load API Key
    const workflowId = "4e180849-c019-4bf5-b890-04c7e2a0c368"; // Replace with your workflow ID
    const prompt = "List 10 places that are best for travel in New York.";

    const data = await executeWorkflow(apiKey, workflowId, prompt);

    console.log("Workflow Execution Result:");
    console.log(data);
  } catch (error) {
    console.error("Error in main function:", error.message);
  }
}

main();
