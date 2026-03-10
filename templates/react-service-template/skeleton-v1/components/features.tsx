import React from 'react';
import { Card } from '@/components/ui/card';

export const Features = () => {
  const features = [
    {
      title: "Modern Development",
      description: "Built with the latest React and Next.js technologies for optimal performance.",
      icon: "?"
    },
    {
      title: "TypeScript Support",
      description: "Full TypeScript integration for better code quality and developer experience.",
      icon: "?"
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development.",
      icon: "?"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the powerful features that make our application stand out
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
