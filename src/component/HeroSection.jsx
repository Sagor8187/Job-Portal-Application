import React from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { BiBriefcaseAlt2 } from 'react-icons/bi';

export default function HeroSection() {
  return (
    <div className="relative min-h-[600px] w-full bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      
      {/* Subtle Background Stars/Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 bg-[#161616] border border-neutral-800 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 tracking-wider mb-8 uppercase backdrop-blur-sm shadow-inner">
          <BiBriefcaseAlt2 className="w-4 h-4 text-orange-500" />
          <span><strong className="text-white">50,000+</strong> New Jobs This Month</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 max-w-2xl leading-[1.15]">
          Find Your Dream Job Today
        </h1>

        {/* Subheading / Description */}
        <p className="text-neutral-400 text-sm md:text-base lg:text-md max-w-xl mx-auto mb-10 leading-relaxed font-light">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Responsive Search Container */}
        <div className="w-full max-w-3xl bg-[#111111] border border-neutral-800/80 rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 shadow-2xl shadow-purple-500/5">
          
          {/* Job Title / Skill Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-1">
            <FiSearch className="w-5 h-5 text-neutral-500 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
            />
          </div>

          {/* Middle Divider (Visible only on desktop/tablet) */}
          <div className="hidden md:block w-[1px] h-8 bg-neutral-800 mx-2" />

          {/* Location Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-1 border-t border-neutral-800 md:border-t-0">
            <FiMapPin className="w-5 h-5 text-neutral-500 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white p-4 md:p-3.5 rounded-xl md:rounded-full transition-all duration-200 flex items-center justify-center shadow-lg shadow-indigo-600/20 active:scale-[0.98]">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Trending Positions Section */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-3 px-2">
          <span className="text-xs text-neutral-500 mr-1">Trending Position</span>
          
          {['Product Designer', 'AI Engineering', 'Dev-ops Engineer'].map((tag) => (
            <button 
              key={tag} 
              className="text-xs text-neutral-300 bg-[#161616] hover:bg-[#222222] border border-neutral-800 px-3.5 py-1.5 rounded-full transition-colors duration-150"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}