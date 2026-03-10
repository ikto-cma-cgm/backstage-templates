import React from 'react';

export const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to ${{ values.name | title }}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          ${{ values.description }}
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};
