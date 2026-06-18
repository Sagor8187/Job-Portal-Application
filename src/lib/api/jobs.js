"use server"

// http://localhost:5000/api/jobs?companyId=dj1234&status=active
const baseurl = process.env.BASE_URL

export const companyjob = async(companyId,status ="active")=>{
    const res  = await fetch(`${baseurl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}