import { getUserSession } from "../core/getSession"
import { serverfetch } from "../core/server"

export const getRecruiterCompany = async(recruiterId)=>{
    return serverfetch(`/api/my/companies?recruiterId=${recruiterId}`)
}

export const getLogdinRecruiterCompany = async()=>{
    const user = await getUserSession()
    return getRecruiterCompany(user?.id)
}