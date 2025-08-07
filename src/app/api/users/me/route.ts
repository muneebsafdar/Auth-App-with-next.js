import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModels";


export async function GET(request:NextRequest) {
    
    try {
        
        const userId= await getDataFromToken(request)

        const user= await User.findById(userId).select("-password ")

        return NextResponse.json(
            {message:"User found",data:user},
            {status:200}
        )

    } catch (error:any) {
        throw new Error(error.message)
    }

}