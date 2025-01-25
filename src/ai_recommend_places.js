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


// async function launchWorkflow(cityName, numPlaces) {
//   const EDEN_AI_KEY = loadEnvVariable("EDEN_AI_KEY");
//   const EDEN_WORKFLOW_ID = loadEnvVariable("EDEN_WORKFLOW_ID");
//   const url = `https://api.edenai.run/v2/workflow/${EDEN_WORKFLOW_ID}/execution/`;

//   const payload = {
//     prompt: `List only the names of the top ${numPlaces} places to visit in ${cityName}, without descriptions.`,
//   };

//   console.log(`Launching workflow for city: ${cityName} and number of places: ${numPlaces}`);
//   console.log(`Sending request to: ${url}`);
//   console.log(`Payload:`, payload);

//   const response = await axios.post(url, payload, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${EDEN_AI_KEY}`,
//     },
//   });

//   console.log("Workflow Execution Response:", response.data);
//   return response.data.id;
// }

function extractPlaces(results) {
  const generatedText =
    results.output.results[0]?.generated_text ||
    results.text__chat.results[0]?.generated_text;

  if (!generatedText) {
    throw new Error("No generated text found in results.");
  }

  console.log("Extracting places from generated text:\n", generatedText);

  // Split the text into lines and attempt to parse each line
  const placesMap = {};
  const lines = generatedText.split("\n").map((line) => line.trim()).filter(Boolean);

  for (const line of lines) {
    // Look for the first " - " or any possible delimiter (adjust if needed)
    const delimiterIndex = line.indexOf(" - ");
    if (delimiterIndex > -1) {
      const placeName = line.substring(0, delimiterIndex).trim();
      const description = line.substring(delimiterIndex + 3).trim();
      if (placeName && description) {
        placesMap[placeName] = description;
      }
    } else {
      // If no delimiter is found, log the line for manual inspection
      console.warn(`Line could not be parsed: ${line}`);
    }
  }

  return placesMap;
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
  } catch (error) {
    console.error("Error:", error.message);
  }
}


main();
