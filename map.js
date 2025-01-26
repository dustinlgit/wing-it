import { getLocation } from './src/location_getter.ts';
let marker;
let map;

function initMap() {
    const center = { lat: 33.6584317, lng: -117.8457841 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: center,
    });

    marker = new google.maps.Marker({
        position: center,
        map: map,
    });

    moveMarkerToPosition();
}


async function moveMarkerToPosition() {
    const pos = await getLocation();
    console.log("New position:", pos); 
    const newPosition = { lat: pos.lat, lng: pos.lng };

    if (marker && map) {
        marker.setPosition(newPosition);
        map.setCenter(newPosition);
    } else {
        console.error("Marker or Map is not defined");
    }
}

function loadGoogleMapsScript() {
    const apiKey = import.meta.env.VITE_SECRET_KEY; 
    if (!apiKey) {
        console.error('Google Maps API key is missing!');
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();  // Call initMap once the script is loaded
    document.head.appendChild(script);
}

// Load the Google Maps API and initialize the map
loadGoogleMapsScript();
