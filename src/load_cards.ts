import { getTop50PopularPlaces } from './recommender.ts';
import { getLocation, getCityFromCoordinates } from './location_getter.ts'


async function generatePlacesByLocation(): Promise<{ [key: string]: { name: string; rating: number; description: string } }> {
    try {
        // Step 1: Get the user's current location
        const location = await getLocation();
        const city = await getCityFromCoordinates(location.lat, location.lng); // Use the imported function here

        // Step 2: Use the location to get top 50 places nearby
        const popularPlaces = await getTop50PopularPlaces(location.lat, location.lng, city);
        
        return popularPlaces;
    } catch (error) {
        console.error("Error generating places:", error);
        return {};
    }
}

// Example usage
generatePlacesByLocation().then((places) => {
    console.log("Generated places:", places);
}).catch((error) => {
    console.error("Error:", error);
});