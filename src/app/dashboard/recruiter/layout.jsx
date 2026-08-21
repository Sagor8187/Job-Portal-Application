import { reqireRole } from "@/lib/core/getSession"

export default async function Recruiterlayout({children}) {
    await reqireRole('recruiter') 
  return children;
}
