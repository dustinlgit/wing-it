import axios from "axios";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

const apiKey = process.env.SECRET_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Check your .env file.");
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTop50PopularPlaces(
  lat: number,
  lng: number,
  cityName: string
): Promise<{ [key: string]: { name: string; rating: number; description: string } }> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&key=${apiKey}&types=establishment`;

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

      if (nextPageToken) {
<<<<<<< HEAD
        await sleep(2000);
=======
        await sleep(2000); // Google API requires a delay before using next_page_token
>>>>>>> eb7c286f8e25b6fa5095b9b85ae8e00cae0888db
      }

    } while (nextPageToken && places.length < 50);

    const top50Places = places
      .filter((place: any) => !place.name.toLowerCase().includes(cityName.toLowerCase()))
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 50);

    const popularPlaces: { [key: string]: { name: string; rating: number; description: string } } = {};

    for (let i = 0; i < top50Places.length; i++) {
      const place = top50Places[i];

      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`;
      const detailsResponse = await axios.get(detailsUrl);

      if (!detailsResponse.data || !detailsResponse.data.result) {
        throw new Error(`Failed to fetch details for place ID: ${place.place_id}`);
      }

      const placeDetails = detailsResponse.data.result;
      const description = placeDetails?.overview || "No description available";

      popularPlaces[`Place ${i + 1}`] = {
        name: place.name,
        rating: place.rating || 0,
        description: description,
      };
    }

    return popularPlaces;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting places:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return {};
  }
}

// Example usage
getTop50PopularPlaces(40.7128, -74.0060, "New York").then((places) => {
  console.log(places);
});

