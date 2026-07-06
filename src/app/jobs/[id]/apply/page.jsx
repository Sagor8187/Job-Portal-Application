import { getUserSession } from "@/lib/core/getSession"
import { redirect } from "next/navigation"
import JobApply from "./JobApply"
import { getjobId } from "@/lib/api/jobs"

export default async function page({params}) {
    const {id} =await params
    const user = await getUserSession()
    if(!user?.name){
        redirect(`/signin?redirect=/jobs/${id}/apply`)
    }
   if (user?.role !== "seeker") {
  return (
   <div className="flex min-h-[60vh] items-center justify-center bg-black px-4">
  <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center shadow-2xl">
    <div className="mb-4 text-6xl">🚫</div>

    <h2 className="mb-2 text-2xl font-bold text-white">
      Application Restricted
    </h2>

    <p className="mb-6 text-gray-400">
      Only{" "}
      <span className="font-semibold text-blue-400">
        Job Seekers
      </span>{" "}
      can apply for jobs. Please switch to a seeker account to submit your
      application.
    </p>

    <button
      className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
    >
      Go Back
    </button>
  </div>
</div>
  );
}

const jobInfo = await getjobId(id)
// console.log(jobInfo)


  return (
    <div>
        <JobApply applicant={user} jobdata={jobInfo} ></JobApply>
    </div>
  )
}
