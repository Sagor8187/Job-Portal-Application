import React from "react";
import { alljobs } from "@/lib/api/jobs";
import JobDashboard from "@/component/JobDashboard";


export default async function Page() {
  const jobs = await alljobs();

  return (
    <main className="min-h-screen bg-[#09090b]">
      {/* ক্লায়েন্ট কম্পোনেন্টে সার্ভার থেকে আসা ডাটা পাস করা হচ্ছে */}
      <JobDashboard initialJobs={jobs} />
    </main>
  );
}
