import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{">"}</span>
              </div>

              <div className="leading-tight">
                <h2 className="text-white font-semibold">Programming</h2>
                <h2 className="text-white font-semibold">Hero</h2>
              </div>
            </div>

            <p className="text-sm text-gray-500 max-w-xs leading-6">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a className="w-9 h-9 bg-[#1a1a1a] rounded flex items-center justify-center hover:bg-purple-600 transition">
                <FaFacebookF />
              </a>
              <a className="w-9 h-9 bg-[#6C63FF] rounded flex items-center justify-center text-white">
                <FaPinterestP />
              </a>
              <a className="w-9 h-9 bg-[#1a1a1a] rounded flex items-center justify-center hover:bg-purple-600 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h3 className="text-violet-400 font-medium">Product</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link className="hover:text-white transition" href="#">Job discovery</Link>
              <Link className="hover:text-white transition" href="#">Worker AI</Link>
              <Link className="hover:text-white transition" href="#">Companies</Link>
              <Link className="hover:text-white transition" href="#">Salary data</Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-violet-400 font-medium">Navigations</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link className="hover:text-white transition" href="#">Help center</Link>
              <Link className="hover:text-white transition" href="#">Career library</Link>
              <Link className="hover:text-white transition" href="#">Contact</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h3 className="text-violet-400 font-medium">Resources</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link className="hover:text-white transition" href="#">Brand Guideline</Link>
              <Link className="hover:text-white transition" href="#">Newsroom</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">

          <p className="text-center md:text-left">
            Copyright 2024 — Programming Hero
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <Link className="hover:text-white transition" href="#">
              Terms & Policy
            </Link>
            <Link className="hover:text-white transition" href="#">
              Privacy Guideline
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}