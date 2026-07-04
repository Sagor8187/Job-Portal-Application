import { getUserSession } from "@/lib/core/getSession";
import CompanyRegistration from "./CompanyRegistration";
import { getRecruiterCompany } from "@/lib/api/company";

export default async function Registrationpage() {
  const user =await getUserSession()
  // console.log(user)
  const company =await getRecruiterCompany(user?.id)
  // console.log(company)

  return (
    <div>
      <CompanyRegistration RecruiterCompany = {company} user= {user}></CompanyRegistration>
    </div>
  )
}
