import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- HTML Document Structure Background ---
const HtmlBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-gray-50">
    {/* Document outline */}
    <div className="absolute top-10 left-10 text-gray-600 font-mono text-sm opacity-60">
      <div className="space-y-1">
        <div>&lt;!DOCTYPE html&gt;</div>
        <div>&lt;html lang="cs"&gt;</div>
        <div className="ml-4">&lt;head&gt;</div>
        <div className="ml-8">&lt;meta charset="UTF-8"&gt;</div>
        <div className="ml-8">&lt;title&gt;Vojtěch Šíma - Portfolio&lt;/title&gt;</div>
        <div className="ml-4">&lt;/head&gt;</div>
        <div className="ml-4">&lt;body&gt;</div>
      </div>
    </div>
    
    {/* Semantic HTML elements around */}
    <div className="absolute top-20 right-10 border-2 border-gray-400 border-dashed p-4 bg-white/80">
      <div className="text-gray-700 font-mono text-xs">
        <div>&lt;header&gt;</div>
        <div className="ml-2">&lt;nav&gt;</div>
        <div className="ml-2">&lt;/nav&gt;</div>
        <div>&lt;/header&gt;</div>
      </div>
    </div>
    
    <div className="absolute bottom-20 left-10 border-2 border-gray-400 border-dashed p-4 bg-white/80">
      <div className="text-gray-700 font-mono text-xs">
        <div>&lt;footer&gt;</div>
        <div className="ml-2">&lt;p&gt;&copy; 2024&lt;/p&gt;</div>
        <div>&lt;/footer&gt;</div>
      </div>
    </div>
    
    <div className="absolute bottom-10 right-10 text-gray-600 font-mono text-sm opacity-60">
      <div className="space-y-1 text-right">
        <div>&lt;/body&gt;</div>
        <div>&lt;/html&gt;</div>
      </div>
    </div>
    
    {/* HTML5 semantic badges */}
    <div className="absolute top-1/2 left-5 space-y-2">
      <div className="bg-orange-500/20 text-orange-800 px-2 py-1 rounded text-xs">article</div>
      <div className="bg-orange-500/20 text-orange-800 px-2 py-1 rounded text-xs">section</div>
      <div className="bg-orange-500/20 text-orange-800 px-2 py-1 rounded text-xs">aside</div>
    </div>
  </div>
);

// --- CSS Floating Shapes and Animations ---
const CssBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900">
    {/* CSS Properties floating around */}
    <div className="absolute top-20 left-20 bg-blue-500/20 p-3 rounded-lg backdrop-blur-sm border border-blue-400/50">
      <div className="text-blue-200 font-mono text-xs">
        <div>background: linear-gradient();</div>
        <div>transform: rotate(45deg);</div>
        <div>box-shadow: 0 20px 40px;</div>
      </div>
    </div>
    
    <div className="absolute bottom-32 right-20 bg-pink-500/20 p-3 rounded-lg backdrop-blur-sm border border-pink-400/50">
      <div className="text-pink-200 font-mono text-xs">
        <div>animation: fadeIn 2s ease;</div>
        <div>transition: all 0.3s;</div>
        <div>filter: blur(10px);</div>
      </div>
    </div>
    
    {/* Animated geometric shapes */}
    {[...Array(8)].map((_, i) => {
      const size = Math.random() * 80 + 30;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      const color = ['purple', 'pink', 'blue', 'indigo'][Math.floor(Math.random() * 4)];
      
      return (
        <div
          key={i}
          className={`absolute bg-${color}-600/30 rounded-full animate-float backdrop-blur-sm border border-${color}-400/50`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    })}
    
    {/* CSS Grid demo */}
    <div className="absolute top-1/2 left-10 grid grid-cols-3 gap-2 opacity-30">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-8 h-8 bg-purple-400/50 rounded border border-purple-300/50 animate-pulse" 
             style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  </div>
);

// --- JS Interactive Particles ---
const JsBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const mouse = { x: null, y: null };

        const handleMouseMove = (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            
            for (let i = 0; i < 3; i++) {
                particlesArray.push(new Particle(
                    mouse.x + (Math.random() - 0.5) * 20,
                    mouse.y + (Math.random() - 0.5) * 20,
                    Math.random() * 3 + 1,
                    `hsl(${280 + Math.random() * 40}, 70%, 60%)`,
                    (Math.random() - 0.5) * 2
                ));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x; this.y = y; this.size = size; this.color = color; this.weight = weight;
        this.life = 1.0; this.decay = Math.random() * 0.02 + 0.005;
    }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.restore();
            }
            update() {
        this.size *= 0.99;
        this.life -= this.decay;
        this.y += this.weight;
        this.x += Math.sin(this.y * 0.01) * 0.5;
        // The splice logic is removed from here
    }
        }

        const codeSnippets = [
            "const magic = () => {",
            "  return awesome();",
            "}",
            "addEventListener('click')",
            "document.querySelector()",
            "Math.random()",
            "setTimeout(() => {})"
        ];

        function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 
    ctx.fillStyle = 'rgba(255, 193, 7, 0.1)';
    ctx.font = '12px monospace';
    codeSnippets.forEach((snippet, i) => {
        ctx.fillText(snippet, 50, 100 + i * 25);
        ctx.fillText(snippet, canvas.width - 200, 200 + i * 30);
    });
    
    for (let i = particlesArray.length - 1; i >= 0; i--) {
        // Update and draw the particle
        particlesArray[i].update();
        particlesArray[i].draw();
    }
            particlesArray = particlesArray.filter(particle => particle.life > 0 && particle.size > 0.1);        

            requestAnimationFrame(animate);
        }

        animate();
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900">
            <canvas ref={canvasRef} className="absolute inset-0" />
            
            <div className="absolute top-20 right-20 bg-yellow-500/10 p-4 rounded-lg backdrop-blur-sm border border-yellow-400/50">
                <div className="text-yellow-200 font-mono text-xs">
                    <div className="text-yellow-400">// Interactive Magic</div>
                    <div>mouse.addEventListener(...) creates particles</div>
                    <div>requestAnimationFrame(animate) loops animation</div>
                </div>
            </div>
        </div>
    );
};

// --- Three.js 3D Scene with floating objects ---
const ThreeJsBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Enhanced particle system
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ 
            color: 0x8B5CF6, 
            size: 1.2,
            transparent: true,
            opacity: 0.8
        });
        const starVertices = [];
        for (let i = 0; i < 15000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Main floating objects group
        const objectsGroup = new THREE.Group();
        
        // Create multiple geometric objects
        const geometries = [
            new THREE.IcosahedronGeometry(1.5, 0),
            new THREE.OctahedronGeometry(1.8),
            new THREE.DodecahedronGeometry(1.2),
            new THREE.TetrahedronGeometry(2),
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x8B5CF6, wireframe: true, transparent: true, opacity: 0.7 }),
            new THREE.MeshPhongMaterial({ color: 0xEC4899, wireframe: false, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x06B6D4, wireframe: true, transparent: true, opacity: 0.6 }),
            new THREE.MeshPhongMaterial({ color: 0xF59E0B, wireframe: false, transparent: true, opacity: 0.7 }),
        ];
        
        const objects = [];
        for (let i = 0; i < 4; i++) {
            const mesh = new THREE.Mesh(geometries[i], materials[i]);
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            objects.push(mesh);
            objectsGroup.add(mesh);
        }
        scene.add(objectsGroup);
        
        // Enhanced lighting
        const ambientLight = new THREE.AmbientLight(0x8B5CF6, 0.3);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xEC4899, 1, 100);
        pointLight.position.set(-5, -5, -5);
        scene.add(pointLight);
        
        camera.position.z = 15;

        const mouse = new THREE.Vector2();
        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = function () {
            requestAnimationFrame(animate);
            
            // Rotate star field
            stars.rotation.x += 0.0002;
            stars.rotation.y += 0.0003;
            
            // Animate individual objects
            objects.forEach((obj, index) => {
                obj.rotation.x += 0.01 * (index + 1);
                obj.rotation.y += 0.008 * (index + 1);
                obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
                obj.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.008;
            });
            
            // Rotate main group
            objectsGroup.rotation.y += 0.003;
            
            // Mouse interaction
            camera.position.x += (mouse.x * 3 - camera.position.x) * 0.03;
            camera.position.y += (mouse.y * 3 - camera.position.y) * 0.03;
            camera.lookAt(scene.position);
            
            // Pulse point light
            pointLight.intensity = 1 + Math.sin(Date.now() * 0.002) * 0.3;

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
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (mount.contains(renderer.domElement)) {
               mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900">
            <div ref={mountRef} className="absolute inset-0 z-0" />
            
            {/* Three.js info panels */}
            <div className="absolute top-20 left-20 bg-purple-500/10 p-4 rounded-lg backdrop-blur-sm border border-purple-400/50">
                <div className="text-purple-200 font-mono text-xs">
                    <div className="text-purple-400">// WebGL Renderer</div>
                    <div>scene.add(geometry);</div>
                    <div>camera.position.set();</div>
                    <div>renderer.render();</div>
                </div>
            </div>
            
            <div className="absolute bottom-20 right-20 bg-pink-500/10 p-4 rounded-lg backdrop-blur-sm border border-pink-400/50">
                <div className="text-pink-200 font-mono text-xs">
                    <div className="text-pink-400">// 3D Mathematics</div>
                    <div>matrix.multiplyMatrices();</div>
                    <div>quaternion.setFromEuler();</div>
                    <div>vector3.normalize();</div>
                </div>
            </div>
        </div>
    );
};

export default function EffectsWrapper({ currentSection }) {
    return (
        <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSection === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <HtmlBackground />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSection === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <CssBackground />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSection === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <JsBackground />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSection === 3 ? 'opacity-100' : 'opacity-0'}`}>
                <ThreeJsBackground />
            </div>
        </div>
    );
}