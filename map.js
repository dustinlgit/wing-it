import { getLocation } from './location_getter;';

export function initMap() {
    const center = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: center
    });
    const marker = new google.maps.Marker({
        position: center,
        map: map,
    });
}

function loadGoogleMapsScript() {
    const apiKey = import.meta.env.VITE_SECRET_KEY;  // Load the API key from the .env file
    if (!apiKey) {
        console.error('Google Maps API key is missing!');
        return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();  
    document.head.appendChild(script);
}

function moveMarkerToPosition() {
    pos = getLocation();

    const newPosition = { lat: pos.lat, lng: pos.lng };
    marker.setPosition(newPosition);
    map.setCenter(newPosition);
}

moveMarkerToPosition();
loadGoogleMapsScript();
