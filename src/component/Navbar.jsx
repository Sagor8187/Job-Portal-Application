"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaRocket } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

// Navlinks Array of Objects
const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
];



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-800/40 bg-[#0d0d0d]/95 px-4 py-4 text-white backdrop-blur-md md:px-8">
      {/* Logo */}
      <Link href="/" className="flex cursor-pointer items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7B2CBF] to-[#9D4EDD] shadow-lg">
          <FaRocket className="text-lg text-white" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-[17px] font-bold text-white">Career</span>
          <span className="-mt-1 text-[17px] font-semibold text-gray-300">
            Launch
          </span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-6 rounded-full border border-gray-800/50 bg-[#18181b]/60 px-5 py-2 text-[14px] font-medium text-gray-400">
          {/* Dynamic Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-4 w-[1px] bg-gray-700/60"></div>

          {/* Loading / Auth state */}
          {isPending ? (
            <span className="text-gray-500">Loading...</span>
          ) : !session ? (
            <Link
              href="/signin"
              className="font-semibold text-[#5b51d8] transition-colors hover:text-[#6c63ff]"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="font-semibold text-red-400 transition-colors hover:text-red-500"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* CTA / Profile */}
        {isPending ? null : !session ? (
          <Link href="/get-started">
            <button className="rounded-xl bg-white px-5 py-2.5 text-[14px] font-semibold text-black shadow-sm transition-all hover:bg-gray-100 active:scale-95">
              Get Started
            </button>
          </Link>
        ) : (
          <Link href="/profile">
            <div className="flex cursor-pointer items-center gap-3">
              <img
                src={
                  session?.user?.image ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="Profile"
                className="h-10 w-10 rounded-full border border-gray-700 object-cover"
              />
            </div>
          </Link>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 transition-colors hover:text-white md:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full w-full overflow-hidden border-b border-gray-800 bg-[#0d0d0d] shadow-2xl transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-[500px] px-6 py-6 opacity-100"
            : "max-h-0 px-6 py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Dynamic Mobile Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="border-b border-gray-900 py-2 text-base text-gray-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          {isPending ? null : !session ? (
            <>
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="py-2 text-base font-semibold text-[#5b51d8] hover:text-[#6c63ff]"
              >
                Sign In
              </Link>

              <Link href="/get-started" onClick={() => setIsOpen(false)}>
                <button className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all hover:bg-gray-100">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 border-b border-gray-900 py-2"
              >
                <img
                  src={
                    session?.user?.image ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-gray-700 object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {session?.user?.email}
                  </p>
                </div>
              </Link>

              <button
                onClick={async () => {
                  await handleSignOut();
                  setIsOpen(false);
                }}
                className="w-full rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}