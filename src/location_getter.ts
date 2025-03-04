import "dotenv";
import axios from 'axios'; 

function loadGoogleApiKey(): string {
  const apiKey = import.meta.env.VITE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Check your .env file.");
  }
  return apiKey;
}

async function getLocation(): Promise<{ lat: number; lng: number }> {
    const apiKey = loadGoogleApiKey();
    const url = `/geo/geolocation/v1/geolocate?key=${apiKey}`;
  
    try { 
      const response = await axios.post(url, {});
      if (!response.data || !response.data.location) {
        throw new Error("Failed to retrieve location from the API.");
      }
      const { lat, lng } = response.data.location;
      // console.log("Location found:", { lat, lng });
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

async function getCityFromCoordinates(lat: number, lng: number): Promise<string> {
  const apiKey = loadGoogleApiKey();
  const url = `/api/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  
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
    const location = await getLocation();
    const city = await getCityFromCoordinates(location.lat, location.lng);
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

// async function test() {
//   const location = await getLocation();
//   const city = await getCityFromCoordinates(location.lat, location.lng);

//   console.log(`Test - Coordinates: Latitude ${location.lat}, Longitude ${location.lng}`);
//   console.log(`Test - City: ${city}`);
// }

// if (require.main === module) {
//   main();
// }

export { loadGoogleApiKey, getLocation, getCityFromCoordinates };
