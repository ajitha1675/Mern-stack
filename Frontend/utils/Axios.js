import axios from "axios";
import SummaryApi, {baseURL} from "../Common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

//sending access token in the header
Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accesstoken')

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//extend the life span of access token with the help refresh

Axios.interceptors.response.use(
      (response)=>{
        return response
      },
      async (error) => {
           let originalRequest = error.config

           if(errror.response.status === 401 && !originalRequest.retry){
               originalRequest.retry = true

               const refreshToken = localStorage.getItem("refreshToken")

               if(refreshToken){
                   const newAccessToken = await refreshAccessToken(refreshToken)
                   
                   if(newAccessToken){
                      originalRequest.headers.Authorization = `${newAccessToken}`
                      return Axios(originalRequest)
                   }
                }
           }

           return Promise.reject(error)
      }
)

const refreshAccessToken = async(refreshAccessToken)=>{
       try {
           const response = await Axios({
            ...SummaryApi.refreshToken,
            headers : {
               Authorization : `Bearer ${refreshToken}`
            }
           })
           
           const accessToken = response.data.data.accessToken
           localStorage.setItem('accesstoken', accessToken)
           return accessToken
           
          
       } catch (error) {
            console.log(error);
            
       }
}

export default Axios;