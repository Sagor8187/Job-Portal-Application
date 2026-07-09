'use server'

import { servermutation } from "../core/server"



export const createSubcription = async (subInfo)=>{
    return servermutation("/api/subcription",subInfo)
}