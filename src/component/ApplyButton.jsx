'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ApplyButton({ jobTitle, deadline }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
    
    // ডার্ক অ্যান্ড প্রিমিয়াম থিম ম্যাচিং টোস্ট নোটিফিকেশন
    toast.success(`Successfully applied for ${jobTitle}!`, {
      duration: 4000,
      style: {
        border: '1px solid #262626',
        padding: '16px',
        color: '#ffffff',
        background: '#121214',
        borderRadius: '14px',
        fontSize: '14px',
      },
      iconTheme: {
        primary: '#e0aaff',
        secondary: '#000000',
      },
    });
  };

  return (
    <button
      disabled={isApplied}
      onClick={handleApply}
      className={`w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
        isApplied 
          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700' 
          : 'bg-white text-black hover:bg-neutral-200 shadow-white/5 font-bold'
      }`}
    >
      {isApplied ? 'Application Submitted' : 'Apply For This Position'}
    </button>
  );
}