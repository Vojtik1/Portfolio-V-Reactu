import React from 'react';

export default function TechInfo({ section, isTransitioning }) {
  // Guard against undefined section
  if (!section) {
    return null;
  }

  return (
    <div className="absolute left-4 md:left-8 lg:left-20 top-1/2 transform -translate-y-1/2 max-w-xs lg:max-w-sm hidden lg:block z-0">
      <div className={`transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 transform -translate-x-10' : 'opacity-100 transform translate-x-0'}`}>
        <div className="mb-4">
          <h1 className="text-4xl lg:text-7xl font-bold mb-2 tracking-tighter" style={{ color: section.color }}>
            {section.title}
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 font-light">
            {section.subtitle}
          </p>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm">
          {section.description}
        </p>
        
        {/* Personal insight for each tech */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg border-l-4" style={{ borderColor: section.color }}>
          <p className="text-xs text-gray-300 italic">
            {section.title === "HTML" && "První kód, který jsem napsal, byla jednoduchá webstránka. Fascinovala mě síla značek vytvářet strukturu z chaosu."}
            {section.title === "CSS" && "Moment, kdy jsem poprvé vytvořil plynulou animace v CSS, mi ukázal, že kód může být krásný i funkční zároveň."}
            {section.title === "JavaScript" && "JavaScript mi otevřel oči - konečně jsem mohl vytvářet weby, které reagují a komunikují s uživatelem."}
            {section.title === "React" && "React změnil můj způsob myšlení. Najednou jsem viděl aplikace jako skládačku komponent místo monolitického kódu."}
            {section.title === "Three.js" && "Když jsem poprvé vykreslil rotující kostku v prohlížeči, věděl jsem, že chci posouvat hranice možného na webu."}
          </p>
        </div>
      </div>
    </div>
  );
}