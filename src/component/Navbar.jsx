"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md text-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-gray-800/40">

      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-9 h-9 bg-gradient-to-tr from-[#7B2CBF] to-[#9D4EDD] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-extrabold text-xl select-none">
            
          </span>
        </div>

        <div className="flex flex-col leading-tight font-sans tracking-tight">
          <span className="text-[17px] font-bold text-white">
            Programming
          </span>
          <span className="text-[17px] font-semibold text-gray-300 -mt-1">
            Hero
          </span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <div className="bg-[#18181b]/60 border border-gray-800/50 rounded-full px-5 py-2 flex items-center gap-6 text-[14px] text-gray-400 font-medium">
          <Link href="/jobs" className="hover:text-white transition-colors">
            Browse Jobs
          </Link>

          <Link href="/company" className="hover:text-white transition-colors">
            Company
          </Link>

          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>

          <div className="h-4 w-[1px] bg-gray-700/60"></div>

          <Link
            href="/signin"
            className="text-[#5b51d8] hover:text-[#6c63ff] font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>

        <Link href="/get-started">
          <button className="bg-white text-black font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-sm">
            Get Started
          </button>
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-300 hover:text-white transition-colors"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-gray-800 shadow-2xl overflow-hidden transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-[500px] opacity-100 py-6 px-6"
            : "max-h-0 opacity-0 py-0 px-6"
        }`}
      >
        <div className="flex flex-col gap-4">
          <Link
            href="/jobs"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-base py-2 border-b border-gray-900"
          >
            Browse Jobs
          </Link>

          <Link
            href="/company"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-base py-2 border-b border-gray-900"
          >
            Company
          </Link>

          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white text-base py-2 border-b border-gray-900"
          >
            Pricing
          </Link>

          <Link
            href="/signin"
            onClick={() => setIsOpen(false)}
            className="text-[#5b51d8] hover:text-[#6c63ff] font-semibold text-base py-2"
          >
            Sign In
          </Link>

          <Link href="/get-started" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-white text-black font-semibold text-sm py-3 rounded-xl hover:bg-gray-100 transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}