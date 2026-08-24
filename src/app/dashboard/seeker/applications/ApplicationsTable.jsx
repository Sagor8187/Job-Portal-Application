"use client";

import Link from "next/link";
import { Briefcase, ChevronRight } from "@gravity-ui/icons";

// Status Badge Styling Helper
const getStatusBadge = (status = "Applied") => {
  const styles = {
    Applied: "border-gray-600 bg-gray-800/40 text-gray-300",
    Review: "border-amber-500/50 bg-amber-500/10 text-amber-400",
    Shortlisted: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
    Rejected: "border-rose-500/50 bg-rose-500/10 text-rose-400",
    Offered: "border-purple-500/50 bg-purple-500/10 text-purple-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${
        styles[status] || styles.Applied
      }`}
    >
      {status}
    </span>
  );
};

// Date Formatter
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApplicationsTable({ applications = [] }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[#121214] shadow-2xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse text-left">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-neutral-800 bg-[#18181b]/80 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neutral-800/60 bg-[#121214]">
            {applications.length > 0 ? (
              applications.map((item) => {
                //with out Backend populate  fallback title 
                const jobTitle = item.jobTitle || item.job?.title || "Frontend Developer";
                const companyName = item.companyName || item.job?.company || "Tech Company";
                const jobMeta = item.experience ? `${item.experience}` : "Full-time";
                const status = item.status || "Applied";

                return (
                  <tr
                    key={item._id}
                    className="group transition-colors hover:bg-[#1a1a1e]"
                  >
                    {/* Job Title & Icon */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-[#1a1a1d] text-neutral-300 shadow-inner group-hover:border-neutral-700">
                          <Briefcase className="text-base" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                            {jobTitle}
                          </span>
                          <span className="text-xs text-neutral-400 capitalize">
                            {jobMeta}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4 text-sm text-neutral-300">
                      {companyName}
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      {formatDate(item.createdAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">{getStatusBadge(status)}</td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/seeker/applications/${item._id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
                      >
                        Details
                        <ChevronRight className="text-xs" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-neutral-500"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}