import axios from "axios";

// Hardcoded API Key and Workflow ID for testing
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWRiZmNlZDEtOGViNS00OTEyLWJiOTMtMjVkZTAzOWExMGFiIiwidHlwZSI6ImFwaV90b2tlbiJ9.fDXymP04p2-zXahYOaI-kLRNoGV1U9c2Cw8yg2jJd9o";
const WORKFLOW_ID = "4e180849-c019-4bf5-b890-04c7e2a0c368";

async function launchExecution(city, numPlaces) {
    const url = `https://api.edenai.run/v2/workflow/${WORKFLOW_ID}/execution/`;
    const prompt = `List only the names of the top ${numPlaces} places to visit in ${city}, without descriptions.`;
    const payload = { prompt };

    console.log("Sending request to:", url);
    console.log("Payload:", payload);

    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        console.log("Workflow Execution Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error launching workflow:", error.response?.data || error.message);
        throw error;
    }
}

async function pollForResults(executionId, maxAttempts = 10, delay = 3000) {
    const url = `https://api.edenai.run/v2/workflow/${WORKFLOW_ID}/execution/${executionId}/`;

    console.log("Polling for results from:", url);

    let attempts = 0;

    while (attempts < maxAttempts) {
        attempts++;
        console.log(`Polling attempt ${attempts}...`);

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            });

            console.log(`Polling Response (Attempt ${attempts}):`, response.data);

            if (response.data.content.status === "succeeded") {
                return response.data;
            } else if (response.data.content.status === "failed") {
                throw new Error("Workflow execution failed.");
            }

            await new Promise((resolve) => setTimeout(resolve, delay));
        } catch (error) {
            console.error("Error polling workflow results:", error.message);
        }
    }

    throw new Error("Workflow execution timed out.");
}

function extractPlaces(results) {
    console.log("Extracting places from results:", JSON.stringify(results, null, 2));

    // Accessing the generated_text field directly
    const textOutput =
        results.text__chat?.results?.[0]?.generated_text ||
        results.VERYLASTFIELD?.results?.[0]?.generated_text ||
        results.output?.results?.[0]?.generated_text ||
        "";

    const places = textOutput
        .split("\n") // Split by new lines
        .map((line) => line.replace(/^\d+\.\s*/, "").trim()) // Remove numbering and trim spaces
        .filter(Boolean); // Remove empty lines

    return places;
}

async function main() {
    const city = "New York";
    const numPlaces = 5;

    try {
        console.log("Launching workflow for city:", city, "and number of places:", numPlaces);

        const executionResponse = await launchExecution(city, numPlaces);
        const executionId = executionResponse.id;

        console.log("Workflow Execution ID:", executionId);

        const finalResponse = await pollForResults(executionId);
        console.log("Workflow Execution Succeeded. Results:", finalResponse);

        const places = extractPlaces(finalResponse.content.results);
        console.log(`Top ${numPlaces} places to visit in ${city}:`, places);
    } catch (error) {
        console.error("Error in main:", error.message);
    }
}

main();
