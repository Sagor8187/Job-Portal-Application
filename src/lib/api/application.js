import { serverfetch, servermutation } from "../core/server"

export const jobapply = async (applicantData)=>{
    return servermutation("/api/application",applicantData)
}

export const getApplicationByApplicant = async (applicantId)=>{
    return serverfetch(`/api/application?applicantId=${applicantId}`)
}