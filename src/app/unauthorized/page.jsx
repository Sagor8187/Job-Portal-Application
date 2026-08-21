"use client";

import Link from "next/link";
import { Lock, ArrowLeft, House, ShieldExclamation } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0d0d0d] px-4 py-12 text-white overflow-hidden">
      {/* Background Ambient Glow Effect */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#7B2CBF]/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex max-w-md w-full flex-col items-center text-center rounded-2xl border border-gray-800/80 bg-[#141417]/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Icon with Glowing Badge */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-inner">
          <Lock className="text-3xl" />
          <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#141417] border border-red-500/30 text-red-400">
            <ShieldExclamation className="text-sm" />
          </div>
        </div>

        {/* Error Code & Title */}
        <span className="mb-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-red-400 uppercase">
          401 - Unauthorized
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Access Denied
        </h1>

        {/* Subtext */}
        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          You don't have permission to access this page. Please sign in with an authorized account or return to the home page.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <Link href="/" className="w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-800 bg-[#1f1f23] px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-gray-700 hover:bg-[#28282d] hover:text-white active:scale-[0.98]">
              <House className="text-base" />
              Go Home
            </button>
          </Link>

          <Link href="/signin" className="w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]">
              <ArrowLeft className="text-base rotate-180" />
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}