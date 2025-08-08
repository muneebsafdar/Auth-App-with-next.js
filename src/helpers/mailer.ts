import User from '@/models/userModels'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'


const sendEmail=async ({email,emailType,userId}:any)=>{
    try {
        
        const hashedToken=await bcrypt.hash(userId.toString(),10)

        if (emailType==="VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now() + 3600000
                }
            )
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now() + 3600000
                }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c8d1e8f1680e50",
            pass: "d3089533458e48"
        }
        });


        const resMail = await transport.sendMail({
            from: "safdarmuneeb95@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                    <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
                    ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                    </a>
                    <p>If you did not request this, please ignore this email.</p>
                `
            });

        return resMail

    } catch (error:any) {
        throw new Error(error.message)
    }
}


export default sendEmail