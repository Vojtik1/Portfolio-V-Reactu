import React, { useState, useEffect, useRef, useCallback } from 'react';
import PortfolioHeader from './/PortfolioHeader';
import AboutCard from './//AboutCard';
import TechInfo from './/TechInfo';
import EffectsWrapper from './/EffectsWrapper';
import PortfolioNavigation from './/PortfolioNavigation';

const SECTIONS_DATA = [
  {
    title: "HTML",
    subtitle: "Sémantická Struktura & Obsah",
    description: "Moje cesta začala u základů - vytváření sémantické struktury webu. HTML5 mi ukázalo sílu přístupnosti a správného značkování. Každá stránka potřebuje pevné základy, které jsou viditelné i bez stylů.",
    color: "#E44D26"
  },
  {
    title: "CSS", 
    subtitle: "Vizuální Design & Animace",
    description: "CSS proměnilo holou strukturu v umělecké dílo. Naučil jsem se tvořit layouts, animace a responzivní design. Gradienty, transformace a flexbox se staly mými nejlepšími přáteli při tvorbě moderních rozhraní.",
    color: "#264DE4"
  },
  {
    title: "JavaScript",
    subtitle: "Interaktivita & Dynamické Chování", 
    description: "JavaScript vdechl stránkám život. Event listenery, manipulace s DOM, asynchronní operace - to všechno mi umožnilo vytvářet skutečně interaktivní aplikace, které reagují na uživatele v reálném čase.",
    color: "#F7DF1E"
  },
  {
    title: "Three.js",
    subtitle: "3D Grafika & WebGL",
    description: "Three.js otevřelo dveře do třetí dimenze. WebGL, shadery, 3D modely a komplexní scény v prohlížeči - technologie, která umožňuje vytvářet nevídané digitální zážitky přímo ve webovém prostředí.",
    color: "#8B5CF6"
  }
];

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = useCallback((e) => {
    e.preventDefault();
    if (isTransitioning) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newSection = Math.max(0, Math.min(SECTIONS_DATA.length - 1, currentSection + direction));
    
    if (newSection !== currentSection) {
      setIsTransitioning(true);
      setCurrentSection(newSection);
      setTimeout(() => setIsTransitioning(false), 1200);
    }
  }, [currentSection, isTransitioning]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('wheel', handleScroll, { passive: false });
    return () => container?.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  // Enhanced Easter Eggs
  useEffect(() => {
    // Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let index = 0;
    
    // Secret Developer Mode
    let devModeKeys = [];
    
    const keydownHandler = (e) => {
      // Konami Code
      if (e.code === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          document.body.style.filter = 'hue-rotate(180deg)';
          alert('🎉 KONAMI CODE! Barvy se obrátily! Pro reset refresh stránku.');
          index = 0;
        }
      } else {
        index = 0;
      }
      
      // Developer mode (type "DEV")
      devModeKeys.push(e.key.toLowerCase());
      if (devModeKeys.length > 3) devModeKeys.shift();
      
      if (devModeKeys.join('') === 'dev') {
        console.log(`
🚀 DEVELOPER MODE ACTIVATED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Portfolio Build: v2.0
Created by: Vojtěch Šíma  
Technologies: React + Three.js + WebGL
Performance: 60fps animations
Easter Eggs: 3 hidden

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tip: Try using arrow keys for navigation!
        `);
        devModeKeys = [];
      }
    };
    
    // Arrow key navigation
    const arrowNavHandler = (e) => {
      if (['ArrowDown', 'ArrowRight'].includes(e.code) && currentSection < SECTIONS_DATA.length - 1) {
        handleScroll({ preventDefault: () => {}, deltaY: 100 });
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.code) && currentSection > 0) {
        handleScroll({ preventDefault: () => {}, deltaY: -100 });
      }
    };
    
    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keydown', arrowNavHandler);
    
    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keydown', arrowNavHandler);
    };
  }, [currentSection, handleScroll]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-hidden relative font-sans select-none"
      style={{ 
        background: currentSection === 0 ? '#f3f4f6' : 'black',
        color: currentSection === 0 ? 'black' : 'white',
        transition: 'background-color 0.7s ease-in-out, color 0.7s ease-in-out'
      }}
    >
      <EffectsWrapper currentSection={currentSection} />

      <PortfolioHeader />
      
      <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-8 md:p-20">
        <TechInfo 
          section={SECTIONS_DATA[currentSection]} 
          isTransitioning={isTransitioning} 
        />
        
        <AboutCard currentSection={currentSection} />

        <PortfolioNavigation 
          sections={SECTIONS_DATA}
          currentSection={currentSection}
        />
      </div>

      {/* Hidden performance indicator */}
      <div className="absolute bottom-2 left-2 text-xs opacity-20 font-mono">
        v2.0 | {currentSection + 1}/{SECTIONS_DATA.length}
      </div>
    </div>
  );
}