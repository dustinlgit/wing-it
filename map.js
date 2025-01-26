let map;
let marker;

function initMap() {
    const mapOptions = {
        center: { lat:33.6584317, lng: -117.8457841 }, // uci at thge room thing
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
        const position = marker.getPosition();
        const lat = position.lat();
        const lng = position.lng();
        console.log(`New Position: Lat: ${lat}, Lng: ${lng}`);
        alert(`New Position: Lat: ${lat}, Lng: ${lng}`);
    });
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
    script.onload = () => initMap();  
    document.head.appendChild(script);
}

loadGoogleMapsScript();
