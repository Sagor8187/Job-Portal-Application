import { serverfetch } from "../core/server"

export const getPlanId = async (planId) => {
    return serverfetch(`/api/plans?plan_id=${planId}`, {
        next: { revalidate: 0 } // প্রতি ৬০ সেকেন্ড পর পর ক্যাশ আপডেট হবে
    })
}