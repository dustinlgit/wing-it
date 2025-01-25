import * as dotenv from 'dotenv';
import axios from 'axios'; // Using axios for HTTP requests
import { resolve } from 'path';

// Load the .env file for API key
dotenv.config({ path: resolve(__dirname, '../.env') });

// Load Google API Key
function loadGoogleApiKey(): string {
  const apiKey = process.env.SECRET_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Check your .env file.");
  }
  return apiKey;
}

// Function to get the person's location
async function getLocation(apiKey: string): Promise<{ lat: number; lng: number }> {
    const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;
  
    try {
      const response = await axios.post(url, {});
      if (!response.data || !response.data.location) {
        throw new Error("Failed to retrieve location from the API.");
      }
      const { lat, lng } = response.data.location;
      console.log("Location found:", { lat, lng });
      return { lat, lng };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching location:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error; // Propagate the error to the caller
    }
  }
  
  async function main() {
    try {
      const apiKey = loadGoogleApiKey();
      const location = await getLocation(apiKey);
      console.log(`Your current location is: Latitude ${location.lat}, Longitude ${location.lng}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  

// Execute main function if running as a standalone script
if (require.main === module) {
  main();
}

export { loadGoogleApiKey, getLocation }; // Export functions for external use
