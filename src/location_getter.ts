import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;

// Get the location of the person => gives lat/long
async function getGeolocation(): Promise<any> {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;
  try {
    const response = await axios.post(url, {
      homeMobileCountryCode: 310,
      homeMobileNetworkCode: 410,
      radioType: "gsm",
      carrier: "Vodafone",
      considerIp: true,
    });

    return response.data.location; // Return the geolocation (lat, lng)
  } catch (error) {
    console.error("Error in geolocation:", error.message);
    return null; // Return null if there is an error
  }
}

// Get the city from coordinates
async function getCityFromCoordinates(lat: number, lng: number): Promise<string | undefined> {
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
    return "City not found";
  } catch (error: any) {
    console.error("Error in reverse geocoding:", error.message);
    return undefined;
  }
}

//helps you test this out
async function getLocationAndCity() {
  const location = await getGeolocation();
  
  if (location) {
    const { lat, lng } = location;
    console.log(`Geolocation retrieved: Latitude - ${lat}, Longitude - ${lng}`);

    const city = await getCityFromCoordinates(lat, lng);
    console.log("City:", city);
  } else {
    console.log("Unable to retrieve location.");
  }
}

getLocationAndCity();
