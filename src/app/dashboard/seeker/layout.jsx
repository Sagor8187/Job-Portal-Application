import { reqireRole } from "@/lib/core/getSession"

export default async function Seekerlayout({children}) {
    await reqireRole('seeker')
  return children
}
