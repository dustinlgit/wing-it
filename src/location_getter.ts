import * as dotenv from 'dotenv';
import axios from 'axios'; 
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

function loadGoogleApiKey(): string {
  const apiKey = process.env.SECRET_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Check your .env file.");
  }
  return apiKey;
}

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
      throw error;
    }
}

async function getCityFromCoordinates(lat: number, lng: number, apiKey: string): Promise<string> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    
    if (results.length > 0) {
      const addressComponents = results[0].address_components;
      for (let component of addressComponents) {
        if (component.types.includes("locality")) {
          return component.long_name;
        }
      }
    }
    throw new Error("City not found.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching city from coordinates:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

async function main() {
  try {
    const apiKey = loadGoogleApiKey();
    const location = await getLocation(apiKey);
    const city = await getCityFromCoordinates(location.lat, location.lng, apiKey);
    console.log(`Your current location is: Latitude ${location.lat}, Longitude ${location.lng}`);
    console.log(`City: ${city}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

async function test() {
  const apiKey = loadGoogleApiKey();
  const location = await getLocation(apiKey);
  const city = await getCityFromCoordinates(location.lat, location.lng, apiKey);

  console.log(`Test - Coordinates: Latitude ${location.lat}, Longitude ${location.lng}`);
  console.log(`Test - City: ${city}`);
}

if (require.main === module) {
  main();
}

export { loadGoogleApiKey, getLocation, getCityFromCoordinates, test };
