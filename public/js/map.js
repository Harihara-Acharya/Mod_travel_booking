document.addEventListener("DOMContentLoaded", () => {
    const { location, country, title } = listingData;

    // Combine location and country for geocoding
    const query = encodeURIComponent(location + ", " + country);

    // Use Nominatim API for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                // Initialize the map
                const map = L.map('map').setView([lat, lon], 13);

                // Add OpenStreetMap tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                // Add marker with popup
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(title)
                    .openPopup();
            } else {
                console.error("Location not found for map.");
                // Optionally, display a message or fallback map view
            }
        })
        .catch(err => {
            console.error("Error fetching geocode data:", err);
        });
});
