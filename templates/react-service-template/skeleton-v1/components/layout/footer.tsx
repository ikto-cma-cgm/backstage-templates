import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">${{ values.name | title }}</h3>
          <p className="text-gray-400 mb-6">${{ values.description }}</p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
