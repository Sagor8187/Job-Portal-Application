"use client";

import React, { useState, useMemo } from "react";

import { GoSearch } from "react-icons/go";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineCalendarMonth } from "react-icons/md";
import JobCard from "./JobCard";

const JobDashboard = ({ initialJobs = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortByDate, setSortByDate] = useState("all");

  // ডাইনামিক ক্যাটাগরি লিস্ট তৈরি
  const categories = useMemo(() => {
    const allCats = initialJobs.map((job) => job.jobCategory).filter(Boolean);
    return ["All", ...new Set(allCats)];
  }, [initialJobs]);

  // সার্চ, ফিল্টার এবং সর্টিং লজিক
  const filteredJobs = useMemo(() => {
    let result = [...initialJobs];

    // ১. সার্চ ফিল্টার (Title অথবা Company Name)
    if (searchQuery.trim() !== "") {
      result = result.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // ২. স্পেশাল ক্যাটাগরি ফিল্টার
    if (selectedCategory !== "All") {
      result = result.filter((job) => job.jobCategory === selectedCategory);
    }

    // ৩. ডেট ওয়াইজ সর্টিং (Recently Posted - Newest First)
    if (sortByDate === "recent") {
      result.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
    }

    return result;
  }, [initialJobs, searchQuery, selectedCategory, sortByDate]);

  return (
    <div className="text-white p-4 sm:p-8 md:p-12 font-sans max-w-7xl mx-auto">
      {/* হেডার সেকশন */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          Explore Open Roles
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Find your next opportunity from our curated tech list.
        </p>
      </div>

      {/* ফিল্টার এবং সার্চ বার কন্ট্রোল */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-8 bg-[#121214] p-4 rounded-2xl border border-neutral-800">
        {/* সার্চ ইনপুট */}
        <div className="relative flex-1">
          <GoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181b] text-white pl-11 pr-4 py-2.5 rounded-xl border border-neutral-800 focus:outline-none focus:border-neutral-700 text-sm placeholder:text-neutral-500"
          />
        </div>

        {/* ফিল্টার গ্রুপ */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* ক্যাটাগরি ড্রপডাউন */}
          <div className="flex items-center gap-2 bg-[#18181b] px-3 py-2 rounded-xl border border-neutral-800">
            <HiAdjustmentsHorizontal className="w-5 h-5 text-neutral-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer pr-4"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-[#18181b] text-white"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* ডেট সর্টিং ড্রপডাউন */}
          <div className="flex items-center gap-2 bg-[#18181b] px-3 py-2 rounded-xl border border-neutral-800">
            <MdOutlineCalendarMonth className="w-5 h-5 text-neutral-400 shrink-0" />
            <select
              value={sortByDate}
              onChange={(e) => setSortByDate(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer pr-4"
            >
              <option value="all" className="bg-[#18181b] text-white">
                All Jobs
              </option>
              <option value="recent" className="bg-[#18181b] text-white">
                Recently Posted
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* রেসপনসিভ গ্রিড লেআউট */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-stretch">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#121214] rounded-2xl border border-neutral-800 border-dashed">
          <p className="text-neutral-400 text-lg">
            No jobs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDashboard;
