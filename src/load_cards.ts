import { getTop50PopularPlaces } from './google_reccomendations';
import { getLocation, getCityFromCoordinates } from './location_getter';

// Generates a dictionary with {name: value(string), rating: value(number), description: value(string)}
// that represents the top places based on your city location
async function generateBasedOnLocation(): Promise<{ [key: string]: { name: string; rating: number; description: string } }> {
  try {
    const location = await getLocation();
    const city = await getCityFromCoordinates(location.lat, location.lng);
    // console.log(`Your location: Latitude ${location.lat}, Longitude ${location.lng}`);
    // console.log(`City detected: ${city}`);
    
    const recommendations = await getTop50PopularPlaces(location.lat, location.lng, city);
    return recommendations;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating recommendations:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return {};
  }
}

// async function main() {
//   const recommendations = await generateBasedOnLocation();
//   // console.log("Top recommendations based on your location:");
//   console.log(recommendations);
// }

// main();
