import ConnectDb from "@/app/dbConfig/dbConfig";
import mongoose from "mongoose";
import User from '@/models/userModels'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/helpers/mailer";





ConnectDb()

export async function POST(request:NextRequest){

    try {

        const reqBody=await request.json()
        const {username,email,password}=reqBody

        if(!username || !email || !password){
            return NextResponse.json(
                {error:"All fields are required"},
                {status:400}
            )
        }

        const user= await User.findOne({email})

        if (user) {
            return NextResponse.json(
                {error:"User already exists"},
                {status:400}
            )
        }

        // hashing pasword

        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(password, salt)

        const savedUser= await User.create({
            username,
            email,
            password:HashedPassword
        })

        console.log(savedUser);
        await sendEmail({email,"emailType":"VERIFY","userId":savedUser._id})



        
        return NextResponse.json(
            {message:"User created Successfully",
            success:true,
            savedUser
            },
            {status:200}
        )


        
    } catch (error:any) {
        console.log("Error occured while signing up user: ",error.message);
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}


 