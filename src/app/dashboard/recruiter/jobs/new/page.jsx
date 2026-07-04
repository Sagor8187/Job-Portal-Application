import { getLogdinRecruiterCompany } from "@/lib/api/company";
import CompanyPostForm from "./CompanyPostForm";


export default async function page() {
  const company = await getLogdinRecruiterCompany()
  console.log(company)
  return (
    <div>
      <CompanyPostForm companyinfo={company}></CompanyPostForm>
    </div>
  )
}
