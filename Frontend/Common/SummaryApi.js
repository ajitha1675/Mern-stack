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
    forgot_password_otp:{
        url:'/api/user/forgot-password-otp',
        method: 'put'
    }
}

export default SummaryApi