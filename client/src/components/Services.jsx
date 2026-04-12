import React from 'react';
import { FaNewspaper, FaComments, FaGlobe, FaHandsHelping } from 'react-icons/fa';

const services = [
  {
    icon: <FaNewspaper className="text-4xl text-green-600" />,
    title: 'Latest News',
    description: 'Real-time updates on government activities and policies'
  },
  {
    icon: <FaComments className="text-4xl text-green-600" />,
    title: 'Public Engagement',
    description: 'Share your thoughts through comments and feedback'
  },
  {
    icon: <FaGlobe className="text-4xl text-green-600" />,
    title: 'Tourism Information',
    description: 'Discover tourist attractions and cultural heritage'
  },
  {
    icon: <FaHandsHelping className="text-4xl text-green-600" />,
    title: 'Community Support',
    description: 'Access government programs and initiatives'
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;