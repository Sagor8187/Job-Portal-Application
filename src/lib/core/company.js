'use server'

import { revalidatePath } from "next/cache"
import { servermutation } from "./server"

export const createcompany = async (newcompany)=>{
    return servermutation("/api/registration/company",newcompany)
}

export const updatecompany = async(id,data)=>{
    const result = await servermutation(`/api/companies/${id}`,data,"PATCH")
    revalidatePath("/dashboard/admin/companies")
    return result
}