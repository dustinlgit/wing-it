import * as dotenv from 'dotenv';
import { resolve } from 'path';
import fetch from 'node-fetch';

dotenv.config({ path: resolve(__dirname, '../.env') });

function loadGoogleApiKey(): string {
    const GAPIKey = process.env.SECRET_KEY;
    if (!GAPIKey)
        throw new Error('API key is missing. Check your .env file.');
    return GAPIKey;
}


async function fetchCityPictureUrl(apiKey: string, cityName: string): Promise<string> {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(cityName)}&key=${apiKey}`;

    try {
        const searchResponse = await fetch(searchUrl);
        const searchData = (await searchResponse.json()) as any;

        if (!searchData.results || searchData.results.length === 0)
            throw new Error(`No results found for the city: ${cityName}`);

        const placeId = searchData.results[0].place_id;

        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = (await detailsResponse.json()) as any;

        if (!detailsData.result.photos || detailsData.result.photos.length === 0)
            throw new Error(`No photos available for the city: ${cityName}`);

        const photoReference = detailsData.result.photos[0].photo_reference;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${apiKey}`;
        
        return photoUrl;

    } catch (error) {
        console.error("Error fetching city picture:", error);
        throw error;
    }
}
