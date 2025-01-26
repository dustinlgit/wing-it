import { getTop50PopularPlaces } from './google_reccomendations.ts';
import { getLocation, getCityFromCoordinates } from './location_getter.ts';
// import { getCurrentPosition } from "../map.js"

// Generates a dictionary with {name: value(string), rating: value(number), description: value(string)}
// that represents the top places based on your city location
async function generateBasedOnLocation(): Promise<{ name: string; description: string; image: string }[]> {
    const location = await getLocation();
    const city = await getCityFromCoordinates(location.lat, location.lng);    
    const recommendations = await getTop50PopularPlaces(location.lat, location.lng, city);
    return recommendations;
}

async function main() {
  const recommendations = await generateBasedOnLocation();
  // console.log("Top recommendations based on your location:");
  console.log(recommendations);
}

main();

export { generateBasedOnLocation };