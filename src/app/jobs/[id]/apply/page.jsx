import { getUserSession } from "@/lib/core/getSession"
import { redirect } from "next/navigation"
import JobApply from "./JobApply"
import { getjobId } from "@/lib/api/jobs"
import { getApplicationByApplicant } from "@/lib/api/application"
import Link from "next/link"

const PLAN_LIMITS = {
  name: "free",
  maxApplicationsPerMonth: 3
}

export default async function Page({ params }) {
  const { id } = await params
  const user = await getUserSession()

  // 1. Authentication Guard
  if (!user?.name) {
    redirect(`/signin?redirect=/jobs/${id}/apply`)
  }

  // 2. Authorization Guard (Role Check)
  if (user?.role !== "seeker") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center shadow-2xl">
          <div className="mb-4 text-6xl">🚫</div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Application Restricted
          </h2>
          <p className="mb-6 text-gray-400">
            Only <span className="font-semibold text-blue-400">Job Seekers</span> can apply for jobs. Please switch to a seeker account to submit your application.
          </p>
          <Link
            href={`/jobs/${id}`}
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Go Back to Job
          </Link>
        </div>
      </div>
    )
  }

  // 3. Fetch Data
  const applicantData = await getApplicationByApplicant(user.id)
  const jobInfo = await getjobId(id)
  
  const currentApplicationsCount = applicantData?.result?.length || 0
  const maxLimit = PLAN_LIMITS.maxApplicationsPerMonth
  const isLimitReached = currentApplicationsCount >= maxLimit
  
  // Calculate progress percentage (capped at 100%)
  const progressPercentage = Math.min((currentApplicationsCount / maxLimit) * 100, 100)

  // 4. Main UI Render
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
        
        {/* Progress Tracker UI */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-400">Monthly Usage ({PLAN_LIMITS.name} plan)</span>
            <span className={isLimitReached ? "text-red-400 font-bold" : "text-blue-400"}>
              {currentApplicationsCount} / {maxLimit} Applications
            </span>
          </div>
          
          {/* Progress Bar Track */}
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                isLimitReached ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <hr className="border-gray-800" />

        {/* Application Logic Content */}
        {!isLimitReached ? (
          <div>
            <p className="text-sm text-gray-400 mb-4">You still have available slots this month. Fill out the form below to apply.</p>
            <JobApply applicant={user} jobdata={jobInfo} />
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="text-4xl">⚡</div>
            <h3 className="text-xl font-bold">Monthly Limit Reached</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Your free plan allows up to {maxLimit} applications per month. Please upgrade to our premium tier to unlock unlimited applications.
            </p>
            <div className="pt-2">
              <Link 
                href="/pricing" 
                className="inline-block w-full sm:w-auto rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-lg hover:shadow-amber-500/20"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}