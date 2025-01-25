import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.SECRET_KEY;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTop50PopularPlaces(lat: number, lng: number, cityName: string): Promise<any> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&key=${apiKey}&types=establishment`;

  try {
    const places: any[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const requestUrl = nextPageToken
        ? `${url}&pagetoken=${nextPageToken}`
        : url;
      
      const response = await axios.get(requestUrl);
      places.push(...response.data.results);

      nextPageToken = response.data.next_page_token;

      if (nextPageToken) {
        await sleep(2000); 
      }

    } while (nextPageToken && places.length < 50);

    const top50Places = places
      .filter((place: any) => !place.name.toLowerCase().includes(cityName.toLowerCase()))
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 50);

    const popularPlaces: { [key: string]: { name: string; rating: number; description: string } } = {};

    for (let i = 0; i < top50Places.length; i++) {
      const place = top50Places[i];

      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`;
      const detailsResponse = await axios.get(detailsUrl);
      
      const placeDetails = detailsResponse.data.result;
      const description = placeDetails?.overview || "No description available";

      popularPlaces[`Place ${i + 1}`] = {
        name: place.name,
        rating: place.rating,
        description: description,
      };
    }

    return popularPlaces;
  } catch (error) {
    console.error("Error getting places:", error.message);
    return {};
  }
}

getTop50PopularPlaces(40.7128, -74.0060, "New York").then((places) => {
  console.log(places);
});
