import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTamplate from "../utils/verifyEmailTamplate.js"
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotpasswordTemp from "../utils/forgetpasswordTemp.js";
import jwt from 'jsonwebtoken';


export async function registerUserController(req,res){
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({email})

        if(user){
            return res.json({
                message: "Already registered Email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(payload)
        const save = await newUser.save()

        const verifyEmailurl = `${process.env.FRONTEND_URL}/vertify-email?code=${save._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "vertify email from binkit",
            html: verifyEmailTamplate({
                name,
                url: verifyEmailurl
                
            })
        })
        return res.json({
            message: "User registered successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(req,res){
    try {
        const code = req.body

        const user = await userModel.findOne({_id:code})

        if(!user){
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            }
            )
        }
        
        const updateUser = await userModel.updateOne({_id: code},
            {verify_email:true})

        return res.json({
            message: "Verify email done",
            success: true,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
        
    }
}

//login controller

export async function loginController(req,res){
    try {
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message: "Provide Email, Password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false
            })
        }

       if(user.status !== "Active"){
        return res.status(402).json({
            message: "Contact to Admin",
            error: true,
            success: false
        })
       }

        const checkPassword = await bcryptjs.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({
                message: "Check your password",
                error: true,
                success: false
            })
        }
   
        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookieOption ={
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken',accesstoken,cookieOption)
        res.cookie('refreshToken',refreshToken,cookieOption)

        return res.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout controller

export async function logoutController(req,res){
    try {
        const userid = req.userId //mw
        const cookieOption ={
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.clearCookie("accesstoken",cookieOption)
        res.clearCookie("refreshToken",cookieOption)

        const removeRefreshToken = await userModel.findByIdAndUpdate(userid,{
            refresh
        })

        return res.json({
            message: "Logout Successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//upload user avatar
export async function uploadAvatar(req,res){
    try {
        const image = req.file
        
        const upload = await uploadImageCloudinary(image)
        
        return res.json({
            message: "Avatar uploaded successfully",
            data: upload,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//update user details
export async function updateUserDetails(req,res){
    try {
        const userId = req.userId
        const {name, email, mobile, password} = req.body

        let hashedPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashedPassword = await bcryptjs.hash(password,salt)
        }
        

        const updateUser = await userModel.updateOne({_id : userId},{
            ...(name &&{name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password: hashedPassword})

        })

        return res.json({
            message: "Updated user successfully",
            error: false,
            success: true,
            data: updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//forget password not login
export async function forgetPasswordContoller(req,res){
    try {
        const { email} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const otp = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr

        const update = await userModel.findByIdAndDelete(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot password from binkit",
            html: forgotpasswordTemp({
                name: user.name,
                otp : otp
            })
        })

        return res.json({
            message: "check your email",
            error: false,
            success: true,
        })

        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(req,res){
    try {
        const { email, otp} = req.body

        if(!email || !otp){
            return res.status(400).json({
                message: "Provide required field email, otp.",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()

        if(user.forgot_password_expiry < currentTime ){
            return res.status(400).json({
                message: "OTP expired",
                error: true,
                success: false
            })
        }

        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            })
        }

        // if otp not expired otp===user.forgot_password_otp

        return res.json({
            message: "Verify OTP successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
   
    }
}

//reset the password
export async function resetpassword(req,res){
    try {
        const {email, newPassword, confirmPassword} = req.body
         
        if (!email || !newPassword || confirmPassword){
            return res.status(400).json({
                message: "Provide required fields email, newPassword, confirmPassword"
            })
        }

        const user  = await userModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "Newpassword and confirm password not same",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt)

        const update= await userModel.findOneAndUpdate(user._id,{
                 password: hashedPassword
        })

        return res.json({
            message: "Password updated successfully.",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//refresh token controler
export async function refreshToken(req,res){
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return res.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return res.status(401).json({
                message : "Token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return res.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
