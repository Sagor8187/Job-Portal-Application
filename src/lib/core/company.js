'use server'

import { servermutation } from "./server"

export const createcompany = async (newcompany)=>{
    return servermutation("/api/registration/company",newcompany)
}