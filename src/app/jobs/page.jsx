import React from "react";
import { alljobs } from "@/lib/api/jobs";
import JobDashboard from "@/component/JobDashboard";


export default async function Page() {
  const jobs = await alljobs();

  return (
    <main className="min-h-screen bg-[#09090b]">
      {/* data pass in client component form server */}
      <JobDashboard initialJobs={jobs} />
    </main>
  );
}
