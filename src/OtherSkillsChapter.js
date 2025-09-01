import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, GitBranch, Layout, PenTool, Users, Zap, MessageSquare, Globe, Trophy } from 'lucide-react';

const SKILLS = [
  { 
    id: 'analytical', 
    name: 'Analytické Myšlení', 
    icon: Layout, 
    x: '25%', 
    y: '20%', 
    desc: 'Moje největší síla je schopnost rozložit komplexní problémy na menší části a najít efektivní řešení. Používám ji při debugování kódu i při návrhu architektury aplikací.',
    example: 'Při vývoji Alfint projektu jsem musel analyzovat historická data akcií a navrhnout algoritmy pro backtesting.'
  },
  { 
    id: 'git', 
    name: 'Git & Verzování', 
    icon: GitBranch, 
    x: '75%', 
    y: '25%', 
    desc: 'Efektivní správa kódu a týmová spolupráce pomocí Gitu je pro mě samozřejmostí. Používám git-flow pro organizaci větví a často pracuji s merge requesty.',
    example: 'Během školních projektů jsem koordinoval verzování kódu v týmu 4 lidí s čistou historií commitů.'
  },
  { 
    id: 'communication', 
    name: 'Komunikace (EN/CZ)', 
    icon: MessageSquare, 
    x: '50%', 
    y: '40%', 
    desc: 'Dokážu srozumitelně komunikovat technické koncepty jak s developery, tak s netechnickými členy týmu. Mám Cambridge FCE First certifikát.',
    example: 'V System Servis s.r.o jsem vysvětloval technické problémy uživatelům a koordinoval opravy se senior IT techniky.'
  },
  { 
    id: 'agile', 
    name: 'Agilní Přístup', 
    icon: Zap, 
    x: '20%', 
    y: '65%', 
    desc: 'Věřím v iterativní vývoj a rychlou zpětnou vazbu. I ve školních projektech jsem aplikoval agilní principy pro lepší organizaci práce.',
    example: 'U Alfint projektu jsem použil týdenní sprinty s konkrétními milníky místo jednoho velkého deadline.'
  },
  { 
    id: 'design', 
    name: 'UI/UX Cítění', 
    icon: PenTool, 
    x: '80%', 
    y: '70%', 
    desc: 'Kombinuji technické znalosti s estetickým cítěním. Dokážu vytvořit nejen funkční, ale i vizuálně přitažlivé aplikace, které uživatele baví používat.',
    example: 'Alfint má čistý, moderní interface navržený pro rychlou analýzu dat bez vizuálního chaosu.'
  },
  { 
    id: 'teamwork', 
    name: 'Týmový Duch', 
    icon: Users, 
    x: '35%', 
    y: '80%', 
    desc: 'Jsem týmový hráč, který věří, že nejlepší výsledky vznikají díky otevřené komunikaci a vzájemné podpoře. Milujem sdílení znalostí.',
    example: 'Ve školním týmu jsem často pomáhal kolegům s debugováním a vysvetloval komplexnější koncepty.'
  },
  { 
    id: 'finance', 
    name: 'Finanční Trhy', 
    icon: Trophy, 
    x: '65%', 
    y: '50%', 
    desc: 'Hluboký zájem o akciové trhy a algoritmic trading. Tato vášeň mě vedla k vytvoření Alfint projektu pro backtesting investičních strategií.',
    example: 'Sleduji denně trhy, experimentuji s technickou analýzou a programuji automatizované trading strategie.'
  },
  { 
    id: 'english', 
    name: 'Angličtina (FCE)', 
    icon: Globe, 
    x: '50%', 
    y: '15%', 
    desc: 'Cambridge FCE First certifikát mi umožňuje efektivně komunikovat v mezinárodním prostředí a sledovat nejnovější trendy ve vývoji přímo ze zahraničních zdrojů.',
    example: 'Pravidelně čtu anglickou dokumentaci, sleduji tech podcasty a aktivně participuji v anglických dev komunitách.'
  }
];

const SkillDot = ({ skill, onSelect, isSelected }) => (
  <motion.div
    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center group z-30"
    style={{ left: skill.x, top: skill.y }}
    onClick={(e) => {
      e.stopPropagation();
      onSelect(skill);
    }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <motion.div 
      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        isSelected ? 'ring-4 ring-purple-500 bg-purple-400 shadow-lg shadow-purple-500/50' : 'bg-white/20 hover:bg-white/40 hover:shadow-lg'
      }`}
      animate={isSelected ? { 
        boxShadow: ['0 0 20px rgba(139, 92, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.8)', '0 0 20px rgba(139, 92, 246, 0.5)'] 
      } : {}}
      transition={{ duration: 1, repeat: isSelected ? Infinity : 0, repeatType: 'reverse' }}
    >
      <skill.icon size={16} className="text-white" />
    </motion.div>
    <span className="mt-2 text-xs text-gray-400 font-medium group-hover:text-white transition-colors text-center">
      {skill.name}
    </span>
  </motion.div>
);

export default function OtherSkillsChapter({ onBack }) {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS[2]); // Start with communication
  const [starShower, setStarShower] = useState(false);

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    // Trigger star shower effect for dopamine
    setStarShower(true);
    setTimeout(() => setStarShower(false), 1000);
  };

  return (
    <div className="w-full h-full bg-black p-4 md:p-8 lg:p-16 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Starfield */}
      <div className="absolute inset-0 opacity-40 z-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Star shower effect */}
      {starShower && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1.5, 0],
                rotate: 360
              }}
              transition={{ duration: 1, delay: i * 0.05 }}
            >
              ⭐
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors z-50 text-sm md:text-base"
        onClick={onBack}
      >
        <ArrowLeft size={16} className="md:w-5 md:h-5" /> Zpět na Kapitolu 1
      </button>

      {/* Chapter Intro */}
      <motion.div
        className="text-center mb-8 md:mb-12 z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Kapitola 2: Člověk Za Kódem
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
          Kód je jen začátek. Skutečná hodnota spočívá v soft skills, osobnosti a schopnosti řešit problémy.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl h-64 md:h-80 z-20">
        <div className="relative w-full h-full">
          {/* Skill Constellation */}
          {SKILLS.map(skill => (
            <SkillDot 
              key={skill.id} 
              skill={skill} 
              onSelect={handleSkillSelect} 
              isSelected={selectedSkill?.id === skill.id} 
            />
          ))}

          {/* Enhanced connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 z-10" width="100%" height="100%">
            {SKILLS.map((skill, i) => {
              const nextSkill = SKILLS[(i + 1) % SKILLS.length];
              return (
                <motion.line 
                  key={i} 
                  x1={skill.x} 
                  y1={skill.y} 
                  x2={nextSkill.x} 
                  y2={nextSkill.y} 
                  stroke="url(#gradient)" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              );
            })}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {selectedSkill && (
          <motion.div
            key={selectedSkill.id}
            className="w-full max-w-2xl mt-6 md:mt-12 p-4 md:p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center z-20"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
               <selectedSkill.icon className="text-purple-400" size={24} />
               <h3 className="text-xl md:text-2xl font-bold text-white">{selectedSkill.name}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">{selectedSkill.desc}</p>
            
            {/* Real example */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 md:p-4 rounded-lg border border-purple-400/20">
              <p className="text-purple-200 text-xs md:text-sm font-medium mb-1">Příklad z praxe:</p>
              <p className="text-gray-300 text-xs md:text-sm italic">{selectedSkill.example}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chapter completion hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <p className="text-xs text-gray-500">
          💫 Klikni na hvězdy pro prozkoumání dovedností
        </p>
      </motion.div>
    </div>
  );
}