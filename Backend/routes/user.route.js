import {Router} from 'express';
import { forgetPasswordContoller, loginController, logoutController, refreshToken, registerUserController, resetpassword, updateUserDetails, uploadAvatar, userDetails, verifyEmailController, verifyForgotPasswordOtp } from '../controllers/user.controller.js';
import authToken from '../middleware/authToken.js';
import upload from '../middleware/multer.js';

const userRouter = Router ()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController )
userRouter.post('/login',loginController)
userRouter.get('/logout',authToken,logoutController)
userRouter.put('/upload-avatar',authToken,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',authToken,updateUserDetails)
userRouter.put('/forgot-password',forgetPasswordContoller)
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetpassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('./user-details', auth,userDetails)


export default userRouter;