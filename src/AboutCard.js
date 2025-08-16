import React, { useState, useEffect, useRef } from 'react';

export default function AboutCard({ currentSection }) {
  const cardRef = useRef(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (currentSection < 2) return;
      
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 15;
      const rotateY = (centerX - e.clientX) / 15;
      
      setCardPosition({
        x: (e.clientX - centerX) / 30,
        y: (e.clientY - centerY) / 30,
        rotateX: Math.max(-20, Math.min(20, rotateX)),
        rotateY: Math.max(-20, Math.min(20, rotateY))
      });
    };

    if (currentSection >= 2) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } else {
      setCardPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
    }
  }, [currentSection]);

  const getCardStyles = () => {
    const base = "w-80 md:w-96 transition-all duration-700 ease-in-out relative";
    switch(currentSection) {
      case 0:
        return `${base} bg-white text-black p-6 border-2 border-gray-800 shadow-xl`;
      case 1:
        return `${base} p-8 shadow-2xl shadow-purple-500/40 text-center bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md border-2 border-transparent bg-clip-border rounded-xl`;
      case 2:
      case 3:
        return `${base} p-8 shadow-2xl shadow-purple-500/50 text-center bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-lg border-2 border-purple-400/30 rounded-xl cursor-pointer`;
      default:
        return base;
    }
  };

  const getCardTransform = () => {
    if (currentSection < 2) return '';
    const scale = currentSection === 3 ? 1.05 : 1;
    return `perspective(1000px) rotateX(${cardPosition.rotateX}deg) rotateY(${cardPosition.rotateY}deg) translateZ(${currentSection === 3 ? '30px' : '0px'}) scale(${scale}) translate3d(${cardPosition.x}px, ${cardPosition.y}px, 0)`;
  };

  const renderContent = () => {
    if (currentSection === 0) {
      return (
        <div className="space-y-4">
          <div className="border-b-2 border-gray-800 pb-3 mb-4">
            <h1 className="text-2xl font-bold">Vojtěch Šíma</h1>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>
          
          <div className="space-y-3">
            <div>
              <h2 className="font-bold text-lg border-l-4 border-gray-800 pl-2">O mně</h2>
              <p className="text-sm mt-1">Fresh absolvent IT školy s vášní pro moderní web development</p>
            </div>
            
            <div>
              <h2 className="font-bold text-lg border-l-4 border-gray-800 pl-2">Dovednosti</h2>
              <ul className="text-sm mt-1 space-y-1">
                <li>• HTML5 & Sémantické značky</li>
                <li>• CSS3 & Responsivní design</li>
                <li>• JavaScript ES6+</li>
                <li>• Three.js & WebGL</li>
                <li>• Git & Verzování</li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-bold text-lg border-l-4 border-gray-800 pl-2">Kontakt</h2>
              <div className="text-sm mt-1">
                <p>📧 vojtech.sima@example.com</p>
                <p>🌐 Portfolio: vojtech-dev.cz</p>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-800 pt-3 mt-4">
              <p className="text-xs text-gray-500 text-center">
                "Kód je poezie pro stroje"
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-white h-full">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-4 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold">VŠ</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Vojtěch Šíma
        </h2>
        <p className="text-gray-300 mb-6 text-center">Frontend Developer & Creative Coder</p>
        
        <div className="text-center space-y-3 text-gray-200 text-sm w-full max-w-sm">
          <p className="flex items-center justify-center gap-2">
            🎓 <span>Fresh absolvent IT školy</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            💻 <span>Propojuji design a technologie</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            🚀 <span>Posouvám hranice možného v prohlížeči</span>
          </p>
        </div>
        
        <div className="mt-6 w-full">
          <p className="font-semibold text-gray-300 mb-3 text-center">Technický stack:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-orange-500/30 text-orange-200 px-3 py-1 rounded-full text-xs border border-orange-400/50">HTML5</span>
            <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-xs border border-blue-400/50">CSS3</span>
            <span className="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-xs border border-yellow-400/50">JavaScript</span>
            <span className="bg-cyan-500/30 text-cyan-200 px-3 py-1 rounded-full text-xs border border-cyan-400/50">React</span>
            <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs border border-purple-400/50">Three.js</span>
          </div>
        </div>
        
        {currentSection >= 2 && (
          <div className="mt-4 text-xs text-gray-400 text-center">
            <p>Pohybuj myší pro interaktivní efekt!</p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div
      ref={cardRef}
      className={getCardStyles()}
      style={{ 
        transform: getCardTransform(),
        transformStyle: currentSection >= 2 ? 'preserve-3d' : 'flat',
        minHeight: '450px'
      }}
    >
      {renderContent()}
    </div>
  );
}