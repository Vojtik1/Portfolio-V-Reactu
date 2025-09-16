import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function PortfolioHeader() {
  return (
    <div className="absolute top-8 right-8 z-50 flex items-center space-x-6">
      <a href="https://github.com/Vojtik1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        <Github size={28} />
      </a>
      <a href="https://www.linkedin.com/in/vojtěch-šíma" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        <Linkedin size={28} />
      </a>
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500">
        <img 
          src="https://i.pravatar.cc/150?u=vojtechsima" 
          alt="Profilová fotka"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}