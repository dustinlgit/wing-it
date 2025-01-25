import * as dotenv from 'dotenv';
import { resolve } from 'path';
import axios from 'axios';

dotenv.config({ path: resolve(__dirname, '../.env') });

function loadGoogleApiKey(): string {
    const GAPIKey = process.env.SECRET_KEY;
    if (!GAPIKey)
        throw new Error('API key is missing. Check your .env file.');
    return GAPIKey;
}

export async function fetchCityPictureUrl(cityName: string): Promise<string> {
    const key: string = loadGoogleApiKey();
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(cityName)}&key=${key}`;

    try {
        const searchResponse = await axios.get(searchUrl);
        const searchData = searchResponse.data; 
        if (!searchData.results || searchData.results.length === 0)
            throw new Error(`No results found for the city: ${cityName}`);

        const placeId = searchData.results[0].place_id;

        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${key}`;
        const detailsResponse = await axios.get(detailsUrl);
        const detailsData = detailsResponse.data; 

        if (!detailsData.result.photos || detailsData.result.photos.length === 0)
            throw new Error(`No photos available for the city: ${cityName}`);

        const photoReference = detailsData.result.photos[0].photo_reference;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${key}`;
        
        return photoUrl;

    } catch (error) {
        console.error("Error fetching city picture:", error);
        throw error;
    }
}

(async () => {
    try {
        const photoUrl = await fetchCityPictureUrl("New York");
        console.log(photoUrl);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
})();
