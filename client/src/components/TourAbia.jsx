// frontend/src/components/TourAbia.jsx
import React from 'react';

const attractions = [
  {
    name: 'Arochukwu Long Juju',
    description: 'Historic slave route and cave system - A sacred shrine and cave network dating back centuries',
    image: 'https://images.unsplash.com/photo-1586444248902-2f0ed1dc9cf7?w=400&h=300&fit=crop',
    color: 'bg-green-100'
  },
  {
    name: 'Azumini Blue River',
    description: 'Crystal clear blue waters perfect for relaxation, boating, and picnics',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    color: 'bg-blue-100'
  },
  {
    name: 'National War Museum',
    description: 'Historical artifacts and civil war exhibits preserving Nigerian military history',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
    color: 'bg-amber-100'
  }
];

const TourAbia = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Tour Abia State</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x300/4ade80/ffffff?text=${encodeURIComponent(attraction.name)}`;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{attraction.name}</h3>
                <p className="text-gray-600">{attraction.description}</p>
                <button className="mt-3 text-green-600 hover:text-green-700 font-medium flex items-center">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourAbia;