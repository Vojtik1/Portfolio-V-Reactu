import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, GitBranch, Layout, PenTool, Users, Zap, MessageSquare, Globe, Trophy, ChevronDown, ArrowRight, Gamepad2, Monitor, Layers } from 'lucide-react';

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
    example: 'Ve školním týmu jsem často pomáhal kolegům s debugováním a vysvětloval komplexnější koncepty.'
  },
  {
    id: 'techStack',
    name: 'Technologický Přesah',
    icon: Layers,
    x: '50%',
    y: '15%',
    desc: 'Kromě webového vývoje mám široký základ i v dalších oblastech IT, což mi dává komplexní pohled na projekty.',
    example: 'Backend (Python, C/C++), Sítě (Cisco), Databáze (MySQL), 3D Grafika (Blender), Skriptování (Linux) a Automatizace (PLC).'
  }
];

const INTERESTS = [
  {
    id: 'finance',
    name: 'Finanční Trhy & Business',
    icon: Trophy,
    desc: 'Zajímám se o akciové trhy a investiční strategie. Denně analyzuji firmy a hledám nové příležitosti, což mě naučilo trpělivosti a práci s rizikem.',
    example: 'Vytvořil jsem Alfint - platformu pro testování investičních strategií. Sleduji inspirativní investory a rozvíjím analytické myšlení v oblasti financí.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'fitness',
    name: 'Cvičení & Běh',
    icon: Zap,
    desc: 'Pravidelný pohyb je pro mě důležitý pro fyzickou i mentální pohodu. Kombinuji běh s posilováním, což mi pomáhá udržet energii a soustředění při práci.',
    example: 'Běhám (nejvíce půlmaraton) a posiluji několikrát týdně. Sport mi pomáhá relaxovat a přicházet na nové nápady při programování.',
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'football',
    name: 'Fotbal',
    icon: Users,
    desc: 'Deset let jsem hrál fotbal na pozici záložníka. Sport mě naučil týmové spolupráci, disciplíně a rychlému rozhodování pod tlakem v různých situacích.',
    example: 'Díky fotbalu umím efektivně komunikovat a podporovat tým. Tyto dovednosti využívám i v IT projektech a při práci v týmu.',
    color: 'from-green-400 to-yellow-500'
  },
  {
    id: 'gaming',
    name: 'Gaming & Esports',
    icon: Gamepad2,
    desc: 'Hraní her rozvíjí mé strategické myšlení a schopnost rychle reagovat na nové výzvy. Mám zkušenost s esport úrovní ve Fortnite i s dalšími kompetitivními hrami.',
    example: 'Esport mě naučil zvládat stres a spolupracovat v týmu pod tlakem. Tyto dovednosti jsou využitelné i v práci na IT projektech.',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'music',
    name: 'Hudba & Audio',
    icon: MessageSquare,
    desc: 'Hudba je pro mě zdrojem inspirace i relaxace v každodenním životě. Poslouchám pop, elektroniku i rockové klasiky jako Linkin Park pro lepší soustředění.',
    example: 'Hudbu využívám ke koncentraci při práci a občas si zkouším i základní úpravy zvuku. Experimentuji s audio softwarem podobně jako s kódem.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'tech',
    name: 'Nové Technologie',
    icon: Monitor,
    desc: 'Sleduji trendy v AI, blockchainu a nových technologiích, které mě inspirují k dalšímu rozvoji. Rád testuji nové nástroje a přemýšlím, jak je využít v praxi.',
    example: 'Zkouším nové frameworky, sleduji vývoj AI a sdílím technologické novinky s kolegy. Technologie vnímám jako nástroj pro řešení reálných problémů.',
    color: 'from-indigo-400 to-purple-500'
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

export default function OtherSkillsChapter({ onBack, onNext }) {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS[2]); // Start with communication
  const [starShower, setStarShower] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(null);

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    // Trigger star shower effect for dopamine
    setStarShower(true);
    setTimeout(() => setStarShower(false), 1000);
  };

  const handleScroll = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY > 0 && !showInterests) {
      // Scroll down to interests
      setShowInterests(true);
    } else if (e.deltaY < 0 && showInterests) {
      // Scroll back up to skills
      setShowInterests(false);
      setSelectedInterest(null);
    }
  }, [showInterests]);

  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

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

      <AnimatePresence mode="wait">
        {!showInterests ? (
          /* SKILLS SECTION */
          <motion.div
            key="skills"
            className="w-full h-full flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
          >
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

            {/* Scroll hint */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="animate-bounce flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-2">Scroll pro osobní zájmy</p>
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* INTERESTS SECTION */
          <motion.div
            key="interests"
            className="w-full h-full flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8 }}
          >
            {/* Interests Intro */}
            <motion.div
              className="text-center mb-8 md:mb-12 z-20"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Moje Osobní Vášně
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                To, co mě motivuje mimo kód a formuje mě jako člověka a profesionála.
              </p>
            </motion.div>

            {/* Interest Cards */}
            <div className="flex flex-wrap justify-center gap-4 max-w-6xl">
              {INTERESTS.map((interest, index) => (
                <motion.div
                  key={interest.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => setSelectedInterest(interest.id === selectedInterest ? null : interest.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-72 p-5 bg-gradient-to-br ${interest.color} bg-opacity-20 backdrop-blur-md rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${interest.color} flex items-center justify-center`}>
                        <interest.icon size={20} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{interest.name}</h3>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{interest.desc}</p>

                    <AnimatePresence>
                      {selectedInterest === interest.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/20 pt-3"
                        >
                          <p className="text-white text-xs font-medium mb-2">Konkrétní příklad:</p>
                          <p className="text-gray-200 text-xs italic">{interest.example}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Next Chapter Button - MOVED HERE */}
            <motion.button
              className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors z-50 text-sm md:text-base"
              onClick={onNext}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Moje Tvorba <ArrowRight size={16} className="md:w-5 md:h-5" />
            </motion.button>

            {/* Scroll back hint */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20 rotate-180"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="animate-bounce flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-2 rotate-180">Scroll zpět na dovednosti</p>
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}