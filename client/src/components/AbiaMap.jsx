import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const AbiaMap = () => {
  // Coordinates for Abia State (center)
  const position = [5.4527, 7.5248];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Abia State Map
        </h2>

        <div className="max-w-4xl mx-auto">
          <MapContainer 
            center={position} 
            zoom={9} 
            scrollWheelZoom={true}
            className="w-full h-[500px] rounded-lg shadow-lg"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marker for Aba */}
            <Marker position={[5.1066, 7.3667]}>
              <Popup>Aba - Commercial City</Popup>
            </Marker>

            {/* Marker for Umuahia */}
            <Marker position={[5.5249, 7.4946]}>
              <Popup>Umuahia - Capital</Popup>
            </Marker>

            {/* Marker for Ohafia */}
            <Marker position={[5.6145, 7.8115]}>
              <Popup>Ohafia</Popup>
            </Marker>

          </MapContainer>

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