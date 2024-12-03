import ResetPassword from "../src/pages/ResetPassword"

export const baseURL = "http://localhost:8081"

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login:{
        url:'/api/user/login',
        method: 'post'
    },
    forgetpassword:{
        url:'/api/user/forgot-password',
        method: 'put'
    },
    forgot_password_otp_verification:{
        url:'/api/user/verify-forgot-password-otp',
        method: 'put'
    },
    resetPassword :{
        url:'/api/user/reset-password',
        method: 'put'
    }
}

export default SummaryApi