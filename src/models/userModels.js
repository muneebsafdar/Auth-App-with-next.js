
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
    }

})


const User= mongoose.models.users || mongoose.model('User',userSchema)

export default User