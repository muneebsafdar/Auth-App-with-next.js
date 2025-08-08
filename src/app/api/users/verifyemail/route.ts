import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/app/dbConfig/dbConfig";
import User from "@/models/userModels";

ConnectDb(); // Connect to the database

export async function GET(request: NextRequest) {

    
    
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("Received token:", token);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    console.log(user);
    
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
