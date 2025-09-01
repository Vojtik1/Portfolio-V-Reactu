import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutCard({ currentSection }) {
  const cardRef = useRef(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [componentsExploded, setComponentsExploded] = useState(false);
  
  // Gamification states
  const [htmlElements, setHtmlElements] = useState([]);
  const [cssColor, setCssColor] = useState('#8B5CF6');
  const [magicClicks, setMagicClicks] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // React section explosion effect
  useEffect(() => {
    if (currentSection === 3) {
      const timer = setTimeout(() => {
        setComponentsExploded(true);
        const reassembleTimer = setTimeout(() => {
          setComponentsExploded(false);
          triggerSuccess();
        }, 4000);
        return () => clearTimeout(reassembleTimer);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setComponentsExploded(false);
    }
  }, [currentSection]);

  // Reset gamification states when section changes
  useEffect(() => {
    setHtmlElements([]);
    setCssColor('#8B5CF6');
    setMagicClicks(0);
    setShowSuccess(false);
  }, [currentSection]);

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // HTML Gamification: Build a webpage
  const addHtmlElement = (elementType) => {
    const newElement = {
      id: Date.now(),
      type: elementType,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20
    };
    setHtmlElements([...htmlElements, newElement]);
    
    if (htmlElements.length >= 2) {
      setTimeout(triggerSuccess, 500);
    }
  };

  // CSS Gamification: Color harmony
  const changeColor = () => {
    const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setCssColor(newColor);
    
    // Trigger success after few color changes
    if (Math.random() > 0.7) {
      setTimeout(triggerSuccess, 300);
    }
  };

  // JavaScript Gamification: Magic interactions
  const handleMagicClick = () => {
    setMagicClicks(prev => prev + 1);
    if (magicClicks >= 4) {
      triggerSuccess();
      setMagicClicks(0);
    }
  };

  // React Gamification: Manual component control
  const toggleComponentExplosion = () => {
    setComponentsExploded(!componentsExploded);
    if (!componentsExploded) {
      setTimeout(() => {
        triggerSuccess();
      }, 2000);
    }
  };

  const getCardStyles = () => {
    const base = "w-80 md:w-96 transition-all duration-700 ease-in-out relative";
    switch(currentSection) {
      case 0:
        return `${base} bg-white text-black p-6 border-2 border-gray-800 shadow-xl`;
      case 1:
        return `${base} p-8 shadow-2xl shadow-purple-500/40 text-center bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md border-2 border-transparent bg-clip-border rounded-xl`;
      case 2:
      case 3:
      case 4:
        return `${base} p-8 shadow-2xl shadow-purple-500/50 text-center bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-lg border-2 border-purple-400/30 rounded-xl cursor-pointer`;
      default:
        return base;
    }
  };

  const getCardTransform = () => {
    if (currentSection < 2) return '';
    const scale = currentSection >= 4 ? 1.05 : 1;
    return `perspective(1000px) rotateX(${cardPosition.rotateX}deg) rotateY(${cardPosition.rotateY}deg) translateZ(${currentSection >= 4 ? '30px' : '0px'}) scale(${scale}) translate3d(${cardPosition.x}px, ${cardPosition.y}px, 0)`;
  };

  const renderReactComponents = () => {
    const components = [
      {
        name: "Header",
        content: (
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold">VŠ</span>
          </div>
        ),
        explodedPosition: { x: -200, y: -150 },
        delay: 0
      },
      {
        name: "ProfileInfo",
        content: (
          <div className="bg-cyan-500/20 p-4 rounded-lg border border-cyan-400/50">
            <h2 className="text-xl font-bold text-cyan-200">Vojtěch Šíma</h2>
            <p className="text-cyan-300 text-sm">Frontend Developer</p>
          </div>
        ),
        explodedPosition: { x: 200, y: -100 },
        delay: 0.2
      },
      {
        name: "SkillsList", 
        content: (
          <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/50">
            <p className="text-green-200 text-xs font-mono">const skills = [</p>
            <p className="text-green-300 text-xs ml-2">'React', 'Three.js'</p>
            <p className="text-green-200 text-xs font-mono">];</p>
          </div>
        ),
        explodedPosition: { x: -180, y: 120 },
        delay: 0.4
      },
      {
        name: "ContactInfo",
        content: (
          <div className="bg-orange-500/20 p-3 rounded-lg border border-orange-400/50">
            <div className="text-orange-200 text-xs space-y-1">
              <p>📧 vojtech@dev.cz</p>
              <p>🌐 github.com/vojtik1</p>
            </div>
          </div>
        ),
        explodedPosition: { x: 150, y: 150 },
        delay: 0.6
      }
    ];

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {components.map((component, index) => (
            <motion.div
              key={component.name}
              className="absolute"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: componentsExploded ? component.explodedPosition.x : 0,
                y: componentsExploded ? component.explodedPosition.y : 0,
                opacity: componentsExploded ? 1 : 1,
                scale: componentsExploded ? 0.8 : 1
              }}
              transition={{
                duration: 1.5,
                delay: component.delay,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              {component.content}
              
              {/* Component label when exploded */}
              {componentsExploded && (
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-mono bg-black/50 px-2 py-1 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: component.delay + 0.5 }}
                >
                  &lt;{component.name} /&gt;
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Component tree visualization */}
        {componentsExploded && (
          <motion.div
            className="absolute top-0 left-0 text-xs text-gray-400 font-mono bg-black/70 p-3 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div>App.js</div>
            <div className="ml-2">├── Header</div>
            <div className="ml-2">├── ProfileInfo</div>
            <div className="ml-2">├── SkillsList</div>
            <div className="ml-2">└── ContactInfo</div>
          </motion.div>
        )}
        
        {/* Interactive button for explosion */}
        <motion.button
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 px-4 py-2 rounded-lg border border-cyan-400/50 text-sm transition-colors z-50"
          onClick={toggleComponentExplosion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {componentsExploded ? '🔧 Složit Komponenty' : '💥 Rozložit na Komponenty'}
        </motion.button>
      </div>
    );
  };

  const renderContent = () => {
    if (currentSection === 0) {
      return (
        <div className="space-y-4">
          <div className="border-b-2 border-gray-800 pb-3 mb-4">
            <h1 className="text-2xl font-bold">Vojtěch Šíma</h1>
            <p className="text-sm text-gray-600">Fresh IT absolvent & Frontend Developer</p>
          </div>
          
          <div className="space-y-3">
            <div>
              <h2 className="font-bold text-lg border-l-4 border-gray-800 pl-2">O mně</h2>
              <p className="text-sm mt-1">Čerstvý absolvent IT střední školy s analytickým myšlením a vášní pro finanční trhy. Spojuji technické dovednosti s business logika.</p>
            </div>
            
            <div>
              <h2 className="font-bold text-lg border-l-4 border-gray-800 pl-2">Klíčové projekty</h2>
              <ul className="text-sm mt-1 space-y-1">
                <li>📈 <strong>Alfint:</strong> Backtesting platforma pro akciové strategie</li>
                <li>🏢 <strong>Praxe:</strong> IT technik v System Servis s.r.o</li>
                <li>🌍 <strong>Cambridge FCE First:</strong> Mezinárodní komunikace</li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-bold text-lg border-l-4 border-gray-800 pl-2">Technický stack</h2>
              <ul className="text-sm mt-1 space-y-1">
                <li>• Frontend: HTML5, CSS3, JavaScript, React</li>
                <li>• 3D: Three.js, WebGL</li>
                <li>• Backend: C/C++, MySQL, Linux, Cisco</li>
              </ul>
            </div>
            
            {/* HTML Gamification */}
            <div className="border-t-2 border-gray-800 pt-3 mt-4">
              <p className="text-xs text-gray-600 mb-2 text-center">🎮 Zkus si postavit webstránku!</p>
              <div className="flex gap-2 justify-center mb-3">
                <button 
                  onClick={() => addHtmlElement('header')}
                  className="bg-orange-500/20 hover:bg-orange-500/40 px-2 py-1 rounded text-xs border border-orange-400/50 transition-colors"
                >
                  + Hlavička
                </button>
                <button 
                  onClick={() => addHtmlElement('content')}
                  className="bg-orange-500/20 hover:bg-orange-500/40 px-2 py-1 rounded text-xs border border-orange-400/50 transition-colors"
                >
                  + Obsah
                </button>
                <button 
                  onClick={() => addHtmlElement('footer')}
                  className="bg-orange-500/20 hover:bg-orange-500/40 px-2 py-1 rounded text-xs border border-orange-400/50 transition-colors"
                >
                  + Patička
                </button>
              </div>
              
              {/* Mini webpage preview */}
              <div className="relative w-32 h-24 border border-gray-600 bg-gray-200 mx-auto rounded text-xs">
                {htmlElements.map(el => (
                  <motion.div
                    key={el.id}
                    className="absolute rounded-sm"
                    style={{ 
                      left: `${el.x}%`, 
                      top: `${el.y}%`,
                      width: el.type === 'header' ? '80%' : el.type === 'footer' ? '80%' : '60%',
                      height: el.type === 'header' ? '15%' : el.type === 'footer' ? '15%' : '25%',
                      backgroundColor: el.type === 'header' ? '#E44D26' : el.type === 'footer' ? '#E44D26' : '#666'
                    }}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ))}
                {htmlElements.length === 0 && (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                    Prázdná stránka
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // React section - show component explosion with interaction
    if (currentSection === 3) {
      return (
        <div className="h-full flex items-center justify-center">
          {renderReactComponents()}
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
        <p className="text-gray-300 mb-6 text-center">Frontend Developer & Analytický Myslitel</p>
        
        <div className="text-center space-y-3 text-gray-200 text-sm w-full max-w-sm">
          <p className="flex items-center justify-center gap-2">
            🎓 <span>Fresh IT absolvent se širokým záběrem</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            💻 <span>Propojuji logiku s kreativním designem</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            📈 <span>Autor Alfint projektu pro finanční analýzy</span>
          </p>
        </div>
        
        <div className="mt-6 w-full">
          <p className="font-semibold text-gray-300 mb-3 text-center">Technický základ:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-orange-500/30 text-orange-200 px-3 py-1 rounded-full text-xs border border-orange-400/50">HTML5</span>
            <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-xs border border-blue-400/50">CSS3</span>
            <span className="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-xs border border-yellow-400/50">JavaScript</span>
            <span className="bg-cyan-500/30 text-cyan-200 px-3 py-1 rounded-full text-xs border border-cyan-400/50">React</span>
            <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs border border-purple-400/50">Three.js</span>
          </div>
        </div>
        
        {/* CSS Gamification */}
        {currentSection === 1 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 mb-2">🎨 Změň barvu karty!</p>
            <button 
              onClick={changeColor}
              className="px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105"
              style={{ 
                borderColor: cssColor, 
                backgroundColor: `${cssColor}20`,
                color: cssColor
              }}
            >
              ✨ Nová Barva
            </button>
          </div>
        )}

        {/* JavaScript Gamification */}
        {currentSection === 2 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 mb-2">🪄 Klikni pro kouzlo! ({magicClicks}/5)</p>
            <button 
              onClick={handleMagicClick}
              className="text-3xl hover:scale-110 transition-transform duration-200"
            >
              🪄
            </button>
            {[...Array(magicClicks)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}

        {/* Three.js Gamification hint */}
        {currentSection === 4 && (
          <div className="mt-4 text-xs text-gray-400 text-center">
            <p>🎮 Pohybuj myší pro ovládání 3D objektů!</p>
          </div>
        )}

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <motion.div 
                className="text-6xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                🎉
              </motion.div>
              <div className="absolute text-2xl font-bold text-green-400 mt-16">Skvěle!</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  return (
    <div
      ref={cardRef}
      className={`${getCardStyles()} z-10`}
      style={{ 
        transform: getCardTransform(),
        transformStyle: currentSection >= 2 ? 'preserve-3d' : 'flat',
        minHeight: '450px',
        backgroundColor: currentSection === 1 ? cssColor + '20' : undefined,
        borderColor: currentSection === 1 ? cssColor : undefined
      }}
    >
      {renderContent()}
    </div>
  );
}