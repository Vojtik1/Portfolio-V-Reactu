import React from 'react';

export default function TechInfo({ section, isTransitioning }) {
  return (
    <div className="absolute left-8 md:left-20 top-1/2 transform -translate-y-1/2 max-w-sm hidden lg:block">
      <div className={`transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 transform -translate-x-10' : 'opacity-100 transform translate-x-0'}`}>
        <div className="mb-4">
          <h1 className="text-7xl font-bold mb-2 tracking-tighter" style={{ color: section.color }}>
            {section.title}
          </h1>
          <p className="text-xl text-gray-300 font-light">
            {section.subtitle}
          </p>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm">
          {section.description}
        </p>
      </div>
    </div>
  );
}