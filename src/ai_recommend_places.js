import axios from "axios";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../.env") });

function loadEnvVariable(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing. Check your .env file.`);
  }
  return value;
}

async function launchWorkflow(cityName, numPlaces) {
  const EDEN_AI_KEY = loadEnvVariable("EDEN_AI_KEY");
  const EDEN_WORKFLOW_ID = loadEnvVariable("EDEN_WORKFLOW_ID");
  const url = `https://api.edenai.run/v2/workflow/${EDEN_WORKFLOW_ID}/execution/`;

  const payload = {
    prompt: `List only the names of the top ${numPlaces} places to visit in ${cityName}, without descriptions.`,
  };

  console.log(`Launching workflow for city: ${cityName} and number of places: ${numPlaces}`);
  console.log(`Sending request to: ${url}`);
  console.log(`Payload:`, payload);

  const response = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EDEN_AI_KEY}`,
    },
  });

  console.log("Workflow Execution Response:", response.data);
  return response.data.id;
}

async function pollWorkflowResults(workflowExecutionId) {
  const EDEN_AI_KEY = loadEnvVariable("EDEN_AI_KEY");
  const EDEN_WORKFLOW_ID = loadEnvVariable("EDEN_WORKFLOW_ID");
  const url = `https://api.edenai.run/v2/workflow/${EDEN_WORKFLOW_ID}/execution/${workflowExecutionId}/`;

  console.log(`Polling for results from: ${url}`);

  let attempt = 0;
  while (attempt < 10) {
    attempt++;
    console.log(`Polling attempt ${attempt}...`);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${EDEN_AI_KEY}`,
      },
    });

    console.log(`Polling Response (Attempt ${attempt}):`, response.data);

    if (response.data.content.status === "succeeded") {
      return response.data.content.results;
    }

    console.log("Workflow still processing. Retrying in 3 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  throw new Error("Workflow execution timed out.");
}

function extractPlaces(results) {
  const generatedText =
    results.output.results[0]?.generated_text ||
    results.text__chat.results[0]?.generated_text;

  if (!generatedText) {
    throw new Error("No generated text found in results.");
  }

  console.log("Extracting places from generated text:\n", generatedText);

  return generatedText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function getPlaceDescription(placeName) {
  const EDEN_AI_KEY = loadEnvVariable("EDEN_AI_KEY");
  const EDEN_WORKFLOW_ID = loadEnvVariable("EDEN_WORKFLOW_ID");
  const url = `https://api.edenai.run/v2/workflow/${EDEN_WORKFLOW_ID}/execution/`;

  const payload = {
    prompt: `Provide a short description (around 20 words) of ${placeName} for tourists. Highlight its key attractions and activities.`,
  };

  console.log(`Launching workflow for place description: ${placeName}`);
  console.log(`Sending request to: ${url}`);
  console.log("Payload:", payload);

  try {
    // Step 1: Launch the workflow
    const launchResponse = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EDEN_AI_KEY}`,
      },
    });

    console.log("Workflow Launch Response:", launchResponse.data);
    const workflowExecutionId = launchResponse.data.id;

    const results = await pollWorkflowResults(workflowExecutionId);

    const generatedText =
      results.output.results[0]?.generated_text ||
      results.text__chat.results[0]?.generated_text;

    if (!generatedText) {
      throw new Error("No generated text found in results.");
    }

    console.log(`Description for ${placeName}: ${generatedText}`);
    return generatedText.trim();
  } catch (error) {
    console.error("Error requesting description:", error.response?.data || error.message);
    throw error;
  }
}


async function main() {
  try {
    const cityName = "New York";
    const numPlaces = 5;

    const workflowExecutionId = await launchWorkflow(cityName, numPlaces);
    const results = await pollWorkflowResults(workflowExecutionId);
    const places = extractPlaces(results);

    console.log(`Top ${numPlaces} places to visit in ${cityName}:`);
    console.log(places);


    console.log("SECOND TEST for get DESCRIPTION");

    const testPlace = "Irvine";
    console.log(`Testing getPlaceDescription for: ${testPlace}`);
    const description = await getPlaceDescription(testPlace);
    console.log(`Description for ${testPlace}: ${description}`);

  } catch (error) {
    console.error("Error:", error.message);
  }
}


main();
