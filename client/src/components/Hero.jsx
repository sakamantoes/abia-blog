import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Abia State Digital Hub
        </h1>
        <p className="text-xl mb-8">
          Your official source for news, updates, tourism, and public engagement
        </p>
        <button className="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
          Explore Abia
        </button>
      </div>
    </div>
  );
};

export default Hero;