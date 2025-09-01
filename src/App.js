
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import PortfolioHeader from './/PortfolioHeader';
import AboutCard from './/AboutCard';
import TechInfo from './/TechInfo';
import EffectsWrapper from './/EffectsWrapper';
import PortfolioNavigation from './/PortfolioNavigation';
import OtherSkillsChapter from './/OtherSkillsChapter';

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
    title: "React",
    subtitle: "Komponentová Architektura",
    description: "React mi ukázal sílu komponentového myšlení. Rozložení komplexní aplikace na malé, znovupoužitelné komponenty přináší eleganci, udržitelnost a škálovatelnost moderního frontendu.",
    color: "#61DAFB"
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
  const [chapter, setChapter] = useState(0); // 0 for web dev, 1 for other skills
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChapterTransition, setShowChapterTransition] = useState(false);
  const containerRef = useRef(null);
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleScroll = useCallback((e) => {
    e.preventDefault();
    if (isTransitioning || chapter === 1 || showChapterTransition) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newSection = Math.max(0, Math.min(SECTIONS_DATA.length - 1, currentSection + direction));
    
    if (newSection !== currentSection) {
      setIsTransitioning(true);
      setCurrentSection(newSection);
      setTimeout(() => setIsTransitioning(false), 1200);
    }
  }, [currentSection, isTransitioning, chapter, showChapterTransition]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('wheel', handleScroll, { passive: false });
    return () => container?.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  // Chapter transition with intro text
  const handleChapterTransition = () => {
    setShowChapterTransition(true);
    setTimeout(() => {
      setChapter(1);
      setShowChapterTransition(false);
    }, 3000);
  };

  // Easter Egg: Konami Code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let index = 0;
    const keydownHandler = (e) => {
      if (e.code === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          alert('Gratuluji! Našel jsi easter egg. Jsi na správné cestě stát se skvělým developerem!');
          document.body.style.transition = 'transform 0.5s ease-in-out';
          document.body.style.transform = 'rotate(360deg)';
          setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
          }, 500);
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-hidden relative font-sans select-none"
      style={{ 
        background: chapter === 0 && currentSection === 0 ? '#f3f4f6' : 'black',
        color: chapter === 0 && currentSection === 0 ? 'black' : 'white',
        transition: 'background-color 0.7s ease-in-out, color 0.7s ease-in-out',
        perspective: '2000px' // For the 3D book effect
      }}
    >
      <PortfolioHeader />

      {/* Chapter Transition Screen */}
      <AnimatePresence>
        {showChapterTransition && (
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center max-w-2xl px-8">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Kapitola 1: Dokončena
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                "Technologie jsou jen nástroje.<br />
                Co opravdu dělá rozdíl, je člověk za kódem..."
              </motion.p>
              <motion.div
                className="text-6xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                📖
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={chapter}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Chapter 1: Web Dev Journey */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ backfaceVisibility: 'hidden', transformOrigin: 'left' }}
            animate={{ rotateY: chapter === 1 ? -180 : 0 }}
            transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] }}
          >
            <EffectsWrapper currentSection={currentSection} isMobile={isMobile} />
      
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
              
              {/* Next Chapter Button */}
              {currentSection === SECTIONS_DATA.length - 1 && (
                <motion.button
                  className="absolute bottom-10 right-10 flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors z-50"
                  onClick={handleChapterTransition}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Další kapitola <ArrowRight size={20} />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Chapter 2: Other Skills */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ backfaceVisibility: 'hidden', transformOrigin: 'left', rotateY: 180 }}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: chapter === 1 ? 0 : 180 }}
            transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] }}
          >
             <OtherSkillsChapter onBack={() => setChapter(0)} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
