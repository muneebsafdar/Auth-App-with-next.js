"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function VerifyEmailPage() {


    const [token ,setToken]=useState("")
    const [verified ,setverified]=useState(false)
    const [error,setError]=useState(false)



    useEffect(()=>{
        const URLtoken=window.location.search.split("=")[1]
        if (URLtoken) {
            console.log(URLtoken);
            setToken(URLtoken)
        }else{
            setError(true)
            console.log(URLtoken);

        }
        
    },[])

    useEffect(()=>{
        if(token.length > 0){
            console.log(token);
            verifyEmail()

        }
    },[token])


    const verifyEmail = async () => {
        try {
            console.log("munee is here");

            await axios.get("/api/users/verifyemail", {
            params: { token },
            });
            setverified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
            console.log(error.message);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
            {error ? (
                <>
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Verification Failed</h2>
                <p className="text-gray-700 mb-4">
                    The verification link is invalid or has expired.
                </p>
                </>
            ) : (
                <>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Email Verified!</h2>
                <p className="text-gray-700 mb-4">
                    Your email has been successfully verified.
                </p>
                <Link
                    href="/login"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Go to Login
                </Link>
                </>
            )}
            </div>
        </div>
        );


}