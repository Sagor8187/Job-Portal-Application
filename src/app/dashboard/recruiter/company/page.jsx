import { getUserSession } from "@/lib/core/getSession";
import CompanyRegistration from "./CompanyRegistration";

export default async function Registrationpage() {
  const user =await getUserSession()
  console.log(user)
  return (
    <div>
      <CompanyRegistration user= {user}></CompanyRegistration>
    </div>
  )
}
