"use server"

// http://localhost:5000/api/jobs?companyId=dj1234&status=active
const baseurl = process.env.BASE_URL

export const servermutation = async(path,data)=>{
    const res  = await fetch(`${baseurl}${path}`,{
         method:"POST",
        headers:{
            "Content-Type" :'application/json',
        },
        body:JSON.stringify(data)
    })
    return res.json()
}