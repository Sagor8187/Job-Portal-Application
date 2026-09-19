import { protectedfetch, serverfetch } from "@/lib/core/server";
import CompanyTableClient from "./CompanyTableClient";




export default async function AdminCompanyPage() {
  const initialCompanies = await protectedfetch("/api/allcompanies")

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Company Approvals</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Manage and review registered recruiter companies.
        </p>

        {/* Server Component -> Client Component */}
        <CompanyTableClient initialCompanies={initialCompanies} />
      </div>
    </div>
  );
}