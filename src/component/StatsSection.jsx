import React from 'react';
import { FiBriefcase, FiCompass, FiUsers, FiStar } from 'react-icons/fi';

export default function StatsSection() {
  const stats = [
    {
      icon: <FiBriefcase className="w-5 h-5 text-neutral-400" />,
      value: '50K',
      label: 'Active Jobs',
    },
    {
      icon: <FiCompass className="w-5 h-5 text-neutral-400" />,
      value: '12K',
      label: 'Companies',
    },
    {
      icon: <FiUsers className="w-5 h-5 text-neutral-400" />,
      value: '2M',
      label: 'Job Seekers',
    },
    {
      icon: <FiStar className="w-5 h-5 text-neutral-400" />,
      value: '97%',
      label: 'Satisfaction Rate',
    },
  ];

  return (
    <div className="relative w-full bg-black text-white py-20 px-4 md:px-8 overflow-hidden select-none flex flex-col items-center">
      
      {/* Background Container for Globe & Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-80 mix-blend-screen">
        {/* Top Purple/Blue Glow Aura */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-gradient-to-b from-indigo-600/30 via-purple-700/10 to-transparent rounded-full blur-[100px]" />
        
        {/* The Globe Image */}
        <div 
          className="absolute inset-x-0 top-0 w-full h-[450px] bg-top bg-no-repeat bg-contain opacity-40"
          style={{ backgroundImage: "url('/images/globe.png')" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* Section Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-normal tracking-tight text-neutral-300 max-w-2xl leading-snug mb-16 px-4">
          Assisting over <span className="text-white font-medium">15,000 job seekers</span> <br className="hidden sm:inline" /> 
          find their dream positions.
        </h2>

        {/* Responsive Grid Layout for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-[#0D0D0D]/90 border border-neutral-800/60 rounded-2xl p-6 flex flex-col justify-between items-start h-44 backdrop-blur-md transition-all duration-300 hover:border-neutral-700 hover:bg-[#121212] group"
            >
              {/* Icon Slot */}
              <div className="p-2 bg-neutral-900/50 border border-neutral-800/40 rounded-xl transition-colors duration-300 group-hover:border-neutral-700">
                {stat.icon}
              </div>

              {/* Text Group */}
              <div className="flex flex-col gap-1 mt-auto">
                <span className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-neutral-500 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}