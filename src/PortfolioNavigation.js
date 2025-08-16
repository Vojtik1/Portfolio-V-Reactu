import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function PortfolioNavigation({ sections, currentSection }) {
  return (
    <>
      {/* Right side - Section indicators */}
      <div className="absolute right-8 md:right-20 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex items-center justify-end"
            >
              <span className={`text-xs mr-3 transition-all duration-300 ${index === currentSection ? 'opacity-100 text-white' : 'opacity-0 text-gray-500'}`}>{section.title}</span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300`}
                style={{
                  backgroundColor: index === currentSection ? section.color : 'rgb(107 114 128)',
                  transform: index === currentSection ? 'scale(1.5)' : 'scale(1)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {currentSection < sections.length - 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="animate-bounce flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">Scroll pro další kapitolu</p>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      )}
    </>
  );
}