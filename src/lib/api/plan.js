import { serverfetch } from "../core/server"

export const getPlanId = async(planId)=>{
    return serverfetch(`/api/plans?plan_id${planId}`)
}
