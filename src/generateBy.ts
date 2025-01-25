import { getTop50PopularPlaces } from './google_reccomendations';
import { getLocation, getCityFromCoordinates } from './location_getter';

// const places = [
//   { name: "Eiffel Tower", description: "An iconic Paris landmark offering stunning views.", image: "https://quiltripping.com/wp-content/uploads/2017/07/DSC_0781-scaled.jpg" },
//   { name: "Statue of Liberty", description: "A symbol of freedom in New York Harbor.", image: "https://cdn.britannica.com/31/94231-050-C6B60B89/Statue-of-Liberty-Island-Upper-New-York.jpg" },
//   { name: "Great Wall of China", description: "A magnificent ancient structure stretching across China.", image: "https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg" },
//   { name: "Big Ben", description: "A famous clock tower in London.", image: "https://storage.googleapis.com/mari-a5cc7.appspot.com/photos/regular/ef0d6b06-e455-4b0a-ad5f-c88769c6bc9c.jpg" },
//   { name: "Colosseum", description: "A Roman amphitheater in Rome.", image: "https://www.thetrainline.com/cms/media/11558/italy-rome-colosseum.jpg?mode=crop&width=1080&height=1080&quality=70" },
//   { name: "Taj Mahal", description: "A mausoleum in Agra, India.", image: "https://th-thumbnailer.cdn-si-edu.com/eBP1w0wGm1n7tZ4XtovPdnvxDOg=/800x800/filters:focal(1471x1061:1472x1062)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg" },
//   { name: "Petra", description: "An ancient city in Jordan.", image: "https://cdn.britannica.com/88/189788-050-9B5DB3A4/Al-Dayr-Petra-Jordan.jpg" }
// ];


// Generates a dictionary with {name: value(string), rating: value(number), description: value(string)}
// that represents the top places based on your city location
async function generateBasedOnLocation(): Promise<{ [key: string]: { name: string; rating: number; description: string } }> {
  // try {
    const location = await getLocation();
    const city = await getCityFromCoordinates(location.lat, location.lng);
    // console.log(`Your location: Latitude ${location.lat}, Longitude ${location.lng}`);
    // console.log(`City detected: ${city}`);
    
    const recommendations = await getTop50PopularPlaces(location.lat, location.lng, city);
    return recommendations;
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.error("Error generating recommendations:", error.message);
  //   } else {
  //     console.error("Unexpected error:", error);
  //   }
  //   return {};
  // }
}

async function main() {
  const recommendations = await generateBasedOnLocation();
  // console.log("Top recommendations based on your location:");
  console.log(recommendations);
}

main();

export { generateBasedOnLocation };