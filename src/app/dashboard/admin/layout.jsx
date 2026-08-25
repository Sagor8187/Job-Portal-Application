import { reqireRole } from "@/lib/core/getSession"

export default async function layout({children}) {
    await reqireRole('admin') 
  return  children
}
