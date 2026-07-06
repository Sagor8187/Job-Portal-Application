import { servermutation } from "../core/server"

export const jobapply = async (applicantData)=>{
    return servermutation("/api/application",applicantData)
}