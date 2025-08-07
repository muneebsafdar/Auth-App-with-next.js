import mongoose from "mongoose";

const ConnectDb= async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const conn  = mongoose.connection
        conn.on('connected',()=>{
            console.log("connected successfully")
        })

        conn.on('error',(error)=>{
            console.log("error occured when connected to database ");
            console.log(error);
            
            process.exit(1)
        })

    } catch (error) {
        console.log("something went wrong");
        console.log(error);
        
    }
}

export default ConnectDb