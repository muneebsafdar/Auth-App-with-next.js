import ConnectDb from "@/app/dbConfig/dbConfig";
import User from '@/models/userModels'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'



ConnectDb()

export async function POST(request:NextRequest){


   try {
     const {email,password}=await request.json()
     const user = await User.findOne({email})
 
     if(!user){
         return NextResponse.json(
            {error:"User doesnt exists"},
            {status:400}
        )
     }
 
     if(!user.isVerified){
         return NextResponse.json(
            {error:"User is not verified"},
            {status:400}
        )
     }
 
     const isValidatePassword = await bcrypt.compare(password,user.password)
 
     if(!isValidatePassword){
         return NextResponse.json(
            {error:"Wrong credentials"},
            {status:400}
        )
     }


     const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
     }

     const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET !,{
        expiresIn:"1d"
     })

     const response = NextResponse.json(
        {message:"Login successful"},
        {status:200}
    )

    response.cookies.set("token",token,
        {httpOnly:true}
    )
 
    return response

   } catch (error :any ) {
      console.log("Error occured while loging in user: ",error.message);
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
   }
} 