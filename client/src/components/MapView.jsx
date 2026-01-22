import { useEffect, useRef } from 'react';

const MapView = ({ location, country, title }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const initMap = async () => {
      if (!mapContainer.current) return;

      // Clear any existing map
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      // Dynamically import Leaflet
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // Fix marker icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const searchQuery = location && country 
        ? `${location}, ${country}` 
        : location || country || title;

      if (!searchQuery) return;

      try {
        // Create map
        const map = L.map(mapContainer.current).setView([0, 0], 2);
        mapInstance.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Geocode location
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 13);
          
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(title || location)
            .openPopup();
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [location, country, title]);

  return (
    <div 
      id="map" 
      ref={mapContainer}
      style={{ height: '300px', width: '100%', borderRadius: '1rem' }}
    />
  );
};

export default MapView;

