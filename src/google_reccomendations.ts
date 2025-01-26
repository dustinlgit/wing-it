import axios from "axios";
import "dotenv";

import { fetchCityPictureUrl } from "./get_city_pics";
import { getPlaceDescription } from "./ai_recommendations";

const apiKey = import.meta.env.VITE_SECRET_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Check your .env file.");
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTop50PopularPlaces(
  lat: number,
  lng: number,
  cityName: string,
): Promise<{ name: string; description: string; image: string }[]> {
  const url = `/api/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&key=${apiKey}&types=establishment`;
  
  try {
    const places: any[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const requestUrl = nextPageToken
        ? `${url}&pagetoken=${nextPageToken}`
        : url;

      const response = await axios.get(requestUrl);

      if (!response.data || !response.data.results) {
        throw new Error("Failed to fetch places data.");
      }

      places.push(...response.data.results);

      nextPageToken = response.data.next_page_token;

      // Wait for the next page if there is one
      if (nextPageToken) {
        await sleep(1000);
      }

    } while (nextPageToken && places.length < 20);

    // Filter and sort the places
    const top50Places = places
      .filter((place: any) => !place.name.toLowerCase().includes(cityName.toLowerCase()))
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 20);

    const popularPlaces: { name: string; description: string; image: string }[] = [];

    for (let i = 0; i < top50Places.length; i++) {
      const place = top50Places[i];
      const description = await getPlaceDescription(place.name);
      const image = await fetchCityPictureUrl(place.name); 
      popularPlaces.push({ name: place.name, description: description, image: image, });
    }

    return popularPlaces;

  } catch (error) {
    return [];
  }
}


// Example usage
getTop50PopularPlaces(40.7128, -74.0060, "New York").then((places) => {
  console.log(places);
  console.log("gkfsa");
});

export{getTop50PopularPlaces}