
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Monitor, Code, Briefcase, TrendingUp, Shield, Gamepad2 } from 'lucide-react';
import * as THREE from 'three';

const PROJECTS_DATA = {
  alfint: {
    id: 'alfint',
    name: 'Alfint',
    type: 'Backtesting Platforma',
    description: 'Aplikace pro zpětné testování akcií na základě uživatelsky definovaných parametrů a kvartálních výsledků společností.',
    fullDescription: 'Umožňuje uživatelům zvolit si klíčové finanční ukazatele a strategie, které chtějí otestovat na historických datech. Cílem je zefektivnit analýzu investičních strategií.',
    features: [
      'Zpětné testování akcií na základě historických dat podle výběrů ukazatelů',
      'Vizuální zobrazení výkonnosti strategie',
      'Možnost úpravy a optimalizace vstupních parametrů',
      'Generování reportů s výsledky zpětného testování',
      'Vytvoření portfolia a sdílení s ostatními uživateli',
      'Všechny finanční ukazatelе dané společnosti (současné i historické)',
      'Možnost přehrát na graf ceny také graf ukazatele',
      'Vytvoření grafu z akcií v portfoliu',
      'Vyhledávání akcií podle různých kritérií'
    ],
    technologies: ['React', 'Node.js', 'Python', 'Financial APIs', 'Chart.js'],
    github: 'https://github.com/Vojtik1/Alfint',
    icon: TrendingUp,
    color: '#10B981',
    angle: 0
  },
  practice: {
    id: 'practice',
    name: 'IT Praxe',
    type: 'System Servis s.r.o',
    description: 'Praktická zkušenost na pozici IT technika se zaměřením na síťové technologie a správu IT infrastruktury.',
    fullDescription: 'Během praxe jsem zajišťoval instalaci, konfiguraci a údržbu počítačů, tiskáren a dalších periferií na školách a vzdělávacích institucích.',
    features: [
      'Práce se síťovými prvky (MikroTik, Aruba, switche)',
      'NAS servery Synology a zálohování dat pomocí Acronis',
      'Montáž a rozšíření hardwaru (RAM, disky)',
      'Opravy Apple zařízení (Mac, iPad)',
      'Instalace VR headsetů a specializovaného vybavení',
      'Kompletní instalace počítačových učeben',
      'Nastavení e-mailových schránek a síťového připojení',
      'Řešení problémů s OS i aplikacemi',
      'Opravy síťové infrastruktury'
    ],
    technologies: ['Cisco', 'MikroTik', 'Aruba', 'Synology', 'Acronis', 'Windows', 'macOS'],
    icon: Briefcase,
    color: '#3B82F6',
    angle: Math.PI / 2
  },
  jsGame: {
    id: 'jsGame',
    name: 'JavaScript Hra',
    type: 'Interaktivní Hra',
    description: 'Vlastní interaktivní JavaScript hra, kde uživatel hraje za lišku a musí překonávat hordu neprátel.',
    fullDescription: 'Hra demonstruje moje znalosti JavaScript, Canvas API a herního vývoje v prohlížeči s důrazem na plynulé animace a gameplay.',
    features: [
      'Plynulé animace a pohyb postavy lišky',
      'Kolizní detekce s nepřáteli',
      'Postupně se zvyšující obtížnost',
      'Responsivní ovládání pomocí klávesnice',
      'Retro pixel art styl s moderními efekty',
      'Score systém a power-upy',
      'Zvukové efekty a background hudba'
    ],
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API'],
    github: 'https://vojtik1.github.io/JS-Vlastni-hra/',
    icon: Gamepad2,
    color: '#F59E0B',
    angle: Math.PI
  },
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Kyberbezpečnost',
    type: 'WordPress Web',
    description: 'WordPress stránka zaměřená na kyberbezpečnost s články a návody pro začátečníky.',
    fullDescription: 'Projekt kombinuje moje znalosti webových technologií s důležitou problematikou kybernetické bezpečnosti a vzdělávání uživatelů.',
    features: [
      'Responzivní WordPress téma optimalizované pro čtení',
      'SEO optimalizace pro lepší viditelnost',
      'Bezpečnostní články a step-by-step návody',
      'Komentářový systém pro diskuzi',
      'Newsletter integrace pro pravidelné updatey',
      'Kategorizace obsahu podle obtížnosti',
      'Vyhledávání v článcích'
    ],
    technologies: ['WordPress', 'PHP', 'MySQL', 'CSS', 'JavaScript'],
    github: 'https://vojtik1.github.io/Kyberbezpecnost/',
    icon: Shield,
    color: '#EF4444',
    angle: 3 * Math.PI / 2
  }
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <project.icon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <p className="text-gray-400">{project.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-300 mb-4">{project.description}</p>
        <p className="text-gray-400 mb-6">{project.fullDescription}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Klíčové Funkce:</h3>
          <ul className="space-y-2">
            {project.features.map((feature, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="text-purple-400 mr-2">&bull;</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Technologie:</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.github && (
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const HoloCockpit3D = ({ onProjectClick }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const projectCardsRef = useRef([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const hoveredCardRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    camera.position.set(0, 0, 8);

    // === NOVÉ POZADÍ: Digitální síť s datovými toky ===
    
    // Grid/síť pozadí
    const gridGeometry = new THREE.BufferGeometry();
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.1 
    });

    const gridSize = 50;
    const gridPoints = [];
    
    // Horizontální čáry
    for (let i = -gridSize; i <= gridSize; i += 2) {
      gridPoints.push(-gridSize, i, 0, gridSize, i, 0);
    }
    // Vertikální čáry
    for (let i = -gridSize; i <= gridSize; i += 2) {
      gridPoints.push(i, -gridSize, 0, i, gridSize, 0);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3));
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    grid.position.z = -20;
    scene.add(grid);

    // Pulzující datové toky
    const dataFlowGeometry = new THREE.BufferGeometry();
    const dataFlowMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });

    const dataPoints = [];
    for (let i = 0; i < 1000; i++) {
      dataPoints.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50 - 25
      );
    }
    dataFlowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dataPoints, 3));
    const dataFlow = new THREE.Points(dataFlowGeometry, dataFlowMaterial);
    scene.add(dataFlow);

    // === HOLOGRAFICKÉ KRUHY ===
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.RingGeometry(5 + i * 3, 5.2 + i * 3, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + i * 0.1, 1, 0.5),
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.z = -10 - i * 5;
      scene.add(ring);
    }

    // === VYLEPŠENÉ 3D Holografické karty projektů ===
    const projectCards = [];
    const projects = Object.values(PROJECTS_DATA);
    const radius = 6;

    projects.forEach((project, index) => {
      // Vytvořím panel geometrii
      const cardGeometry = new THREE.PlaneGeometry(2.8, 4);
      
      // Vytvořím canvas pro generování textury karty
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 712;
      const ctx = canvas.getContext('2d');

      // Vygeneruji gradient pozadí podle barvy projektu
      const gradient = ctx.createLinearGradient(0, 0, 512, 712);
      gradient.addColorStop(0, project.color + '30');
      gradient.addColorStop(0.5, project.color + '15');
      gradient.addColorStop(1, project.color + '08');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 712);

      // Přidám border glow
      ctx.strokeStyle = project.color;
      ctx.lineWidth = 3;
      ctx.strokeRect(3, 3, 506, 706);

      // Vnitřní border pro hloubku
      ctx.strokeStyle = project.color + '60';
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, 496, 696);

      // === NOVÝ: Velká ikona projektu ===
      // Vytvořím jednoduché SVG-like ikony pomocí canvas paths
      ctx.fillStyle = project.color;
      ctx.strokeStyle = project.color;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Ikona podle typu projektu
      if (project.id === 'alfint') {
        // Ikona grafu (TrendingUp)
        ctx.beginPath();
        ctx.moveTo(180, 180);
        ctx.lineTo(220, 140);
        ctx.lineTo(260, 160);
        ctx.lineTo(300, 120);
        ctx.lineTo(340, 100);
        ctx.stroke();
        
        // Přidám body na graf
        [180, 220, 260, 300, 340].forEach((x, i) => {
          const y = [180, 140, 160, 120, 100][i];
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (project.id === 'practice') {
        // Ikona brašny (Briefcase)
        ctx.strokeRect(200, 150, 112, 80);
        ctx.fillRect(200, 150, 112, 80);
        ctx.strokeRect(220, 130, 72, 20);
        ctx.fillRect(220, 130, 72, 20);
        // Handle
        ctx.beginPath();
        ctx.arc(256, 120, 8, 0, Math.PI, true);
        ctx.stroke();
      } else if (project.id === 'jsGame') {
        // Ikona gamepadu (Gamepad2)
        ctx.fillRect(180, 170, 152, 60);
        ctx.beginPath();
        ctx.arc(180, 200, 30, Math.PI/2, 3*Math.PI/2);
        ctx.arc(332, 200, 30, 3*Math.PI/2, Math.PI/2);
        ctx.fill();
        
        // Tlačítka
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(220, 190, 8, 0, Math.PI * 2);
        ctx.arc(240, 190, 8, 0, Math.PI * 2);
        ctx.arc(280, 190, 8, 0, Math.PI * 2);
        ctx.arc(300, 190, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (project.id === 'cybersecurity') {
        // Ikona štítu (Shield)
        ctx.beginPath();
        ctx.moveTo(256, 120);
        ctx.lineTo(200, 150);
        ctx.lineTo(200, 200);
        ctx.quadraticCurveTo(200, 240, 256, 260);
        ctx.quadraticCurveTo(312, 240, 312, 200);
        ctx.lineTo(312, 150);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Zámek uprostřed
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(240, 180, 32, 24);
        ctx.beginPath();
        ctx.arc(256, 180, 10, Math.PI, 2*Math.PI);
        ctx.stroke();
      }

      // === TEXTY ===
      // Název projektu
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(project.name, 256, 320);
      
      // Typ projektu
      ctx.font = '22px Arial';
      ctx.fillStyle = '#cccccc';
      ctx.fillText(project.type, 256, 350);

      // === NOVÝ: Krátký popis ===
      ctx.font = '18px Arial';
      ctx.fillStyle = '#aaaaaa';
      ctx.textAlign = 'center';
      
      // Rozdělím popis na řádky (max ~35 znaků na řádek)
      const words = project.description.split(' ');
      const lines = [];
      let currentLine = '';
      
      words.forEach(word => {
        if ((currentLine + word).length > 35 && currentLine.length > 0) { // Check currentLine.length > 0 to avoid empty lines
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine += word + ' ';
        }
      });
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
      }
      
      // Vykreslím popis (max 4 řádky)
      lines.slice(0, 4).forEach((line, index) => {
        ctx.fillText(line.trim(), 256, 390 + index * 25);
      });

      // === DEKORATIVNÍ PRVKY ===
      // Rohové trojúhelníky
      ctx.fillStyle = project.color + '20';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(40, 0);
      ctx.lineTo(0, 40);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(512, 0);
      ctx.lineTo(472, 0);
      ctx.lineTo(512, 40);
      ctx.closePath();
      ctx.fill();

      // Vytvořím texturu z canvasu
      const texture = new THREE.CanvasTexture(canvas);
      
      // Holografický materiál
      const cardMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });

      const card = new THREE.Mesh(cardGeometry, cardMaterial);
      
      // Umístím karty v kruhu
      const angle = (index / projects.length) * Math.PI * 2;
      card.position.x = Math.cos(angle) * radius;
      card.position.z = Math.sin(angle) * radius;
      card.position.y = 0;
      
      // Otočím kartu směrem ke středu
      card.lookAt(0, 0, 0);
      
      // Uložím původní pozici a referenci na projekt
      card.userData = {
        originalPosition: card.position.clone(),
        originalRotation: card.rotation.clone(),
        project: project,
        angle: angle,
        isHovered: false
      };
      
      scene.add(card);
      projectCards.push(card);
    });

    projectCardsRef.current = projectCards;

    // Osvětlení
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // === EVENT LISTENERS ===
    
    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(projectCards);
      
      if (intersects.length > 0) {
        const clickedCard = intersects[0].object;
        onProjectClick(clickedCard.userData.project);
      }
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('click', handleClick);

    // === ANIMAČNÍ SMYČKA ===
    
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animace pozadí
      grid.rotation.z = time * 0.05;
      
      dataFlow.rotation.y = time * 0.1;
      const positions = dataFlow.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.1;
        if (positions[i + 2] > 25) {
          positions[i + 2] = -25;
        }
      }
      dataFlow.geometry.attributes.position.needsUpdate = true;

      // Raycasting pro hover efekt
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(projectCards);

      // Reset všech karet
      projectCards.forEach(card => {
        if (!card.userData.isHovered) {
          // Plynulý návrat na původní pozici
          card.position.lerp(card.userData.originalPosition, 0.05);
          card.rotation.copy(card.userData.originalRotation);
          card.material.opacity = 0.85; // Keep updated opacity
          card.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        }
        card.userData.isHovered = false;
      });

      // Hover efekt
      if (intersects.length > 0) {
        const hoveredCard = intersects[0].object;
        hoveredCard.userData.isHovered = true;
        hoveredCardRef.current = hoveredCard;

        // Přiblížení a zvýraznění
        const targetPosition = camera.position.clone().add(
          new THREE.Vector3(0, 0, -4)
        );
        hoveredCard.position.lerp(targetPosition, 0.1);
        hoveredCard.lookAt(camera.position);
        hoveredCard.material.opacity = 1.0;
        hoveredCard.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        hoveredCardRef.current = null;
      }

      // Jemné rotování karet kolem osy
      projectCards.forEach((card, index) => {
        if (!card.userData.isHovered) {
          const baseAngle = (index / projectCards.length) * Math.PI * 2;
          const newAngle = baseAngle + time * 0.1;
          const newX = Math.cos(newAngle) * radius;
          const newZ = Math.sin(newAngle) * radius;
          
          card.userData.originalPosition.set(newX, 0, newZ);
          card.userData.originalRotation.y = -newAngle + Math.PI / 2; // Adjust rotation to face outwards
          card.position.x = newX;
          card.position.z = newZ;
        }
      });

      // Jemný pohyb kamery podle myši
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [onProjectClick]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default function ProjectsChapter({ onBack }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Holografický kokpit */}
      <HoloCockpit3D onProjectClick={setSelectedProject} />

      {/* Back Button */}
      <motion.button
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-colors z-50 text-sm md:text-base"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ArrowLeft size={16} className="md:w-5 md:h-5" /> Zpět na Kapitolu 2
      </motion.button>

      {/* Chapter Title - POSUNUTÝ NAHORU */}
      <motion.div
        className="text-center mb-4 md:mb-6 z-10 pointer-events-none absolute top-12 left-1/3 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
          Kapitola 3: Tvorba & Zkušenosti
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Najeďte myší na projekty a klikněte pro detail
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-xs md:text-sm text-gray-400">
          🖱️ Projekty se otáčejí kolem vás • Najeďte myší pro přiblížení • Klikněte pro detail
        </p>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
