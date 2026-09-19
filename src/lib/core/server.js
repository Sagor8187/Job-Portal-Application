"use server"

import { getUserToken } from "./getSession"

const authHeader = async()=>{
    const token = await getUserToken()
//   console.log("Extracted Token:", token)
    const header =token? {
        authorization : `Bearer ${token}`
    }:{};
    return header
}

// http://localhost:5000/api/jobs?companyId=dj1234&status=active
const baseurl = process.env.BASE_URL


export const serverfetch = async(path)=>{
    const res = await fetch(`${baseurl}${path}`,{
        cache:"no-store"
  
    })
    return res.json()
}

// seceure server fetch 

export const protectedfetch = async(path)=>{
    const res = await fetch(`${baseurl}${path}`,{
        headers:{
         ...await authHeader()
        },
  
    })
    return res.json()
}


export const servermutation = async(path,data,method="POST")=>{
    const res  = await fetch(`${baseurl}${path}`,{
         method:method,
        headers:{
            "Content-Type" :'application/json',
            ...await authHeader()
        },
        body:JSON.stringify(data)
    })
    return res.json()
}