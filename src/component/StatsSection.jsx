import React from "react";
import { FiSearch, FiMapPin, FiBriefcase, FiCompass, FiUsers, FiStar } from "react-icons/fi";
import { BiBriefcaseAlt2 } from "react-icons/bi";

export default function HeroStatsSection() {
  const stats = [
    {
      icon: <FiBriefcase className="w-5 h-5 text-neutral-400" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: <FiCompass className="w-5 h-5 text-neutral-400" />,
      value: "12K",
      label: "Companies",
    },
    {
      icon: <FiUsers className="w-5 h-5 text-neutral-400" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: <FiStar className="w-5 h-5 text-neutral-400" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[800px] h-[600px] bg-gradient-to-b from-indigo-600/25 via-purple-700/10 to-transparent blur-[130px] rounded-full" />
      </div>

      {/* Globe Background Image */}
    {/* Globe Background Image */}
<div
  className="absolute inset-0 w-full  bg-no-repeat bg-center   md:bg-cover opacity-40 pointer-events-none"
  style={{
    backgroundImage: "url('/images/globe.png')",
  }}
/>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-24 pb-20">

        {/* TOP BADGE */}
        <div className="inline-flex items-center gap-2 bg-[#161616]/90 border border-neutral-800 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 mb-8 uppercase backdrop-blur-sm">
          <BiBriefcaseAlt2 className="w-4 h-4 text-orange-500" />
          <span>
            <strong className="text-white">50,000+</strong> New Jobs This Month
          </span>
        </div>

        {/* HERO TITLE */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center max-w-3xl leading-tight mb-6">
          Find Your Dream Job Today
        </h1>

        {/* SUB TITLE */}
        <p className="text-neutral-400 text-sm md:text-base max-w-xl text-center mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of opportunities and land your next role faster.
        </p>

        {/* SEARCH BOX */}
        <div className="w-full max-w-3xl bg-[#111111]/90 border border-neutral-800 rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 backdrop-blur-md">

          {/* JOB */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <FiSearch className="w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-neutral-200 focus:outline-none placeholder-neutral-500"
            />
          </div>

          {/* DIVIDER */}
          <div className="hidden md:block w-[1px] h-8 bg-neutral-800 mx-2" />

          {/* LOCATION */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-t md:border-t-0 border-neutral-800">
            <FiMapPin className="w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-neutral-200 focus:outline-none placeholder-neutral-500"
            />
          </div>

          {/* BUTTON */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 md:p-3.5 rounded-xl md:rounded-full transition active:scale-95">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* TRENDING TAGS */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-xs text-neutral-500">Trending:</span>
          {["Product Designer", "AI Engineering", "DevOps Engineer"].map((tag) => (
            <button
              key={tag}
              className="text-xs text-neutral-300 bg-[#161616] border border-neutral-800 px-3 py-1.5 rounded-full hover:bg-[#222]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* STATS SECTION */}
        <div className="mt-20 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#0b0b0f]/90 border border-neutral-800 rounded-2xl p-6 h-44 flex flex-col justify-between hover:border-neutral-700 transition"
            >
              <div>{item.icon}</div>

              <div>
                <h3 className="text-3xl font-semibold">{item.value}</h3>
                <p className="text-xs text-neutral-500 mt-1">{item.label}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}