let map;
let marker;
let currentPosition = null;

function initMap() {
    const mapOptions = {
        center: { lat: 33.6584317, lng: -117.8457841 }, // Initial center (UCI)
        zoom: 12,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: "Drag me!",
        draggable: true,
    });

    marker.addListener("dragend", function() {
        const position = marker.getPosition(); // Get the new position from the marker
        currentPosition = {
            lat: position.lat(),
            lng: position.lng(),
        };
        console.log(`New Position: Lat: ${currentPosition.lat}, Lng: ${currentPosition.lng}`);

        // Call getCurrentPosition() after the drag ends to log the new position
        const currentPos = getCurrentPosition(); // Fetch the current position
        if (currentPos) {
            console.log("Marker's current position:", currentPos);
        } else {
            console.log("Position is not available yet.");
        }
    });
}

function getCurrentPosition() {
    if (currentPosition) {
        return currentPosition;
    } else {
        console.log("Marker position is not set yet.");
        return null;
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
    script.onload = initMap;
    document.head.appendChild(script);
}

loadGoogleMapsScript();