// frontend/src/components/AbiaMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const AbiaMap = () => {
  // Coordinates for Abia State, Nigeria (centered around Umuahia)
  const position = [5.5266, 7.4920];
  
  // Simplified GeoJSON for Abia State boundary
  const abiaGeoJson = {
    type: 'Feature',
    properties: { name: 'Abia State' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [7.0, 4.9],
        [7.9, 4.9],
        [7.9, 6.1],
        [7.0, 6.1],
        [7.0, 4.9]
      ]]
    }
  };
  
  // Key locations in Abia State
  const locations = [
    { name: 'Umuahia (Capital)', coordinates: [5.5266, 7.4920], description: 'State Capital' },
    { name: 'Aba', coordinates: [5.1066, 7.3667], description: 'Commercial Hub' },
    { name: 'Ohafia', coordinates: [5.6146, 7.8285], description: 'Cultural Center' },
    { name: 'Arochukwu', coordinates: [5.3833, 7.9167], description: 'Historic Site' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Abia State Map</h2>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg shadow-lg overflow-hidden" style={{ height: '400px', position: 'relative' }}>
            <MapContainer
              center={position}
              zoom={9}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON
                data={abiaGeoJson}
                style={{
                  fillColor: 'green',
                  fillOpacity: 0.5,
                  color: 'darkgreen',
                  weight: 2
                }}
              />
              {locations.map((location, index) => (
                <Marker key={index} position={location.coordinates}>
                  <Popup>
                    <div className="text-center">
                      <strong>{location.name}</strong>
                      <br />
                      <span className="text-sm">{location.description}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Abia State is located in southeastern Nigeria with 17 Local Government Areas.
            Major cities include Umuahia (capital), Aba, and Ohafia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AbiaMap;