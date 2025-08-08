
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password  : {
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

    verifyToken:String,
    verifyTokenExpiry:Date,
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date
})


const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User