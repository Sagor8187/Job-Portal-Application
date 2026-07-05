'use client';

import Link from 'next/link';
import React from 'react';
// react-icons থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হলো
import { FaMapPin, FaBriefcase, FaDollarSign , FaArrowRightLong } from 'react-icons/fa6';


const JobCard = ({ job }) => {
  const {
    _id,
    jobTitle,
    companyName,
    location,
    jobType,
    minSalary,
    maxSalary,
    currency,
    isRemote,
    logo
  } = job;

  return (
    <div className="bg-[#121212] text-[#e0e0e0] p-6 rounded-[28px] border border-neutral-800 flex flex-col justify-between h-full transition-all hover:border-neutral-700 shadow-xl max-w-sm w-full mx-auto sm:mx-0">
      <div>
        {/* Header: Title and Logo */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h2 className="text-2xl font-semibold text-white tracking-tight leading-snug">
            {jobTitle}
          </h2>
          {logo && (
            <img 
              src={logo} 
              alt={companyName || 'Company Logo'} 
              className="w-10 h-10 rounded-xl object-contain bg-neutral-900 p-1 border border-neutral-800 shrink-0"
            />
          )}
        </div>

        {/* Company Name / Mini Subtitle */}
        <p className="text-neutral-400 text-sm mb-6 font-medium">
          {companyName ? companyName.toUpperCase() : 'UNKNOWN COMPANY'} • Showcase your commitment to diversity and inclusion by highlighting initiatives
        </p>

        {/* Badges / Tags Container */}
        <div className="flex flex-wrap gap-2 mb-8">
          {/* Location Badge */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800">
            <FaMapPin className="text-[#e0aaff] text-[13px]" />
            <span>{location || 'Remote'}</span>
          </div>

          {/* Job Type Badge */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800">
            <FaBriefcase className="text-[#e0aaff] text-[13px]" />
            <span>{isRemote ? 'Remote' : jobType || 'Full-time'}</span>
          </div>

          {/* Salary Badge */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] text-neutral-300 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800 w-full sm:w-auto">
            <FaDollarSign  className="text-[#e0aaff] text-[14px]" />
            <span>
              {currency} {Number(minSalary).toLocaleString()} - {Number(maxSalary).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Link href={`/jobs/${_id}`} className="flex items-center gap-2 text-white font-medium hover:text-neutral-300 transition-colors group text-[15px]">
          Apply Now 
          <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;