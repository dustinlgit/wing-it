import { fetchCityPictureUrl } from './get_city_pics';


interface Landmark {
    name: string;
    description: string;
    image: string;
  }  

async function generatePlacesByLocation()