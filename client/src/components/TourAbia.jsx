import React from 'react';

const attractions = [
  {
    name: 'Arochukwu Long Juju',
    description: 'Historic slave route and cave system',
    image: 'https://via.placeholder.com/400x300?text=Arochukwu'
  },
  {
    name: 'Azumini Blue River',
    description: 'Crystal clear blue waters perfect for relaxation',
    image: 'https://via.placeholder.com/400x300?text=Azumini'
  },
  {
    name: 'National War Museum',
    description: 'Historical artifacts and civil war exhibits',
    image: 'https://via.placeholder.com/400x300?text=War+Museum'
  }
];

const TourAbia = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Tour Abia State</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{attraction.name}</h3>
                <p className="text-gray-600">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourAbia;