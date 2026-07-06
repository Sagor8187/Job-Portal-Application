import ApplyButton from '@/component/ApplyButton';
import { getjobId } from '@/lib/api/jobs';
import Link from 'next/link';
import React from 'react';
import { 
  FaMapPin, 
  FaBriefcase, 
  FaDollarSign, 
  FaClock, 
  FaBuilding, 
  FaChevronRight,
  FaCheckCircle
} from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io'; 



export default async function JobDetailsPage({params}) {
    const {id}=await params
    const jobDetails = await getjobId(id)


  return (
    <div className="min-h-screen bg-[#09090b] text-[#e0e0e0] font-sans antialiased selection:bg-[#e0aaff] selection:text-black">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-neutral-900 bg-[#0c0c0e]/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
          <span>Jobs</span>
          <FaChevronRight className="text-neutral-600 text-[10px]" />
          <span>{jobDetails.jobCategory}</span>
          <FaChevronRight className="text-neutral-600 text-[10px]" />
          <span className="text-[#e0aaff] truncate">{jobDetails.jobTitle}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Info Container */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-[#121214] border border-neutral-800 rounded-[28px] shadow-xl">
              <div className="flex items-center gap-4 sm:gap-6">
                {jobDetails.logo && (
                  <img src={jobDetails.logo} alt={jobDetails.companyName} className="w-14 h-14 rounded-2xl bg-neutral-900 p-2 border border-neutral-800 shrink-0 object-contain" />
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{jobDetails.jobTitle}</h1>
                  <p className="text-[#e0aaff] text-sm font-semibold uppercase mt-1 flex items-center gap-1.5"><FaBuilding /> {jobDetails.companyName}</p>
                </div>
              </div>
              <span className="bg-[#1a1a1e] text-emerald-400 border border-emerald-900/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">{jobDetails.status}</span>
            </div>

            {/* Core Info Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#121214] p-4 rounded-2xl border border-neutral-800">
                <FaMapPin className="text-[#e0aaff] text-lg mb-2" />
                <p className="text-xs text-neutral-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-white mt-0.5 capitalize">{jobDetails.location}</p>
              </div>
              <div className="bg-[#121214] p-4 rounded-2xl border border-neutral-800">
                <FaBriefcase className="text-[#e0aaff] text-lg mb-2" />
                <p className="text-xs text-neutral-500 font-medium">Job Type</p>
                <p className="text-sm font-semibold text-white mt-0.5">{jobDetails.isRemote ? 'Remote' : jobDetails.jobType}</p>
              </div>

              <div className="bg-[#121214] p-4 rounded-2xl border border-neutral-800">
                <FaDollarSign className="text-[#e0aaff] text-lg mb-2" />
                <p className="text-xs text-neutral-500 font-medium">Salary Range</p>
                <p className="text-sm font-semibold text-white mt-0.5">{jobDetails.currency} {Number(jobDetails.minSalary).toLocaleString()} - {Number(jobDetails.maxSalary).toLocaleString()}</p>
              </div>

              <div className="bg-[#121214] p-4 rounded-2xl border border-neutral-800">
                <FaClock className="text-[#e0aaff] text-lg mb-2" />
                <p className="text-xs text-neutral-500 font-medium">Deadline</p>
                <p className="text-sm font-semibold text-rose-400 mt-0.5">{jobDetails.applicationDeadline}</p>
              </div>
            </div>

            {/* Details Lists */}
            <div className="bg-[#121214] border border-neutral-800 rounded-[28px] p-6 sm:p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-[#e0aaff] pl-3">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {jobDetails.responsibilities.split('\n').map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm sm:text-[15px]">
                      <FaCheckCircle className="text-[#e0aaff] text-xs mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-[#e0aaff] pl-3">Requirements</h3>
                <ul className="space-y-3">
                  {jobDetails.requirements.split('\n').map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm sm:text-[15px]">
                      <FaCheckCircle  className="text-[#e0aaff] text-xs mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar Action Panel */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="bg-gradient-to-b from-[#18181c] to-[#121214] border border-neutral-800 rounded-[28px] p-6 text-center shadow-2xl relative overflow-hidden group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-[#e0aaff]/10 flex items-center justify-center mx-auto mb-3 border border-[#e0aaff]/20">
                  <IoMdRocket className="text-xl text-[#e0aaff]" />
                </div>
                <h2 className="text-xl font-bold text-white">Interested in this role?</h2>
                <p className="text-xs text-neutral-400 mt-1.5">Submit before the link expires.</p>
              </div>

              <div className="space-y-3.5 border-t border-b border-neutral-800/60 py-5 my-5 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Category</span>
                  <span className="text-white font-medium">{jobDetails.jobCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Location Status</span>
                  <span className="text-white font-medium">{jobDetails.isRemote ? 'Remote' : 'In-Office'}</span>
                </div>
              </div>

              {/* <ApplyButton jobTitle={jobDetails.jobTitle} deadline={jobDetails.applicationDeadline} /> */}
              <Link className='bg-white text-black hover:bg-neutral-200 shadow-white/5 font-bold p-2 rounded-md' href={`/jobs/${id}/apply`} >Apply For This Position</Link>

              <p className="text-[11px] text-neutral-500 mt-3">By applying, you agree to share your professional resume profile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}