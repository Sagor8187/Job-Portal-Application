import { serverfetch } from "../core/server"

export const getRecruiterCompany = async(recruiterId)=>{
    return serverfetch(`/api/my/companies?recruiterId=${recruiterId}`)
}