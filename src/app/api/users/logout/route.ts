import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {message:"Successfully logged out"},{status:200}
        )
        response.cookies.set('token',"",{httpOnly:true,expires: new Date(0)})
        return response
    } catch (error:any) {
        return NextResponse.json({error:`Something went wrong while clearing the token ${error}`},{status:500})
    }
}