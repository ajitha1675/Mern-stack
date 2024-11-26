import jwt from 'jsonwebtoken';

const authToken =  (req,res,next)=>{
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1]  //["bearer"," token"]
        console.log('token',token);

        if(!token){
            return res.status(401).json({
                message: "Provide token"
            })
        }     
        
        const decode = jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
        
        if(!decode){
            return res.status(401).json({
                message:"Unauthorized access",
                error: true,
                success: false

            })
        }

        req.userId = decode.id
        
        next()
        } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default authToken;