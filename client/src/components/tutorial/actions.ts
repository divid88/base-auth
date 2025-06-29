'use server'

import api from "@/lib/api"


export const getSubjectDetail = async(id: number) =>{
        const response = await api.get(`/v2/tutorials/subjects/${id}/`)
        console.log("server: ", response.data)
        return response.data
    }



