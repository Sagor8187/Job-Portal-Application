import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/getSession";
import ApplicationsTable from "./ApplicationsTable";

export default async function ApplicationsPage() {
  const user = await getUserSession();
  const applicantData = await getApplicationByApplicant(user?.id);
  const applications = applicantData?.result || [];

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-4 text-white sm:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Track and manage your submitted job applications
          </p>
        </div>

        {/* Client Table Component */}
        <ApplicationsTable applications={applications} />
      </div>
    </div>
  );
}