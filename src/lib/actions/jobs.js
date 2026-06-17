"use server"


const baseurl = process.env.BASE_URL

export const createjob = async(newjobs)=>{
    const res  = await fetch(`${baseurl}/api/jobs`,{
        method:"POST",
        headers:{
            "Content-Type" :'application/json',
        },
        body:JSON.stringify(newjobs)
    })
    return res.json()
}