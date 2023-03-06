import jwt from 'jsonwebtoken';
import userModel from './../../db/model/user/user.model.js';

const authorization = {
    createPost : ['user','admin'],
    showProfile : ['admin'],
    public: ['admin','user','...'],
    apperPost:['admin']
}


export const auth = (authoriz)=>{
        return async (req,res,next)=>{
                try {
                    const { token } = req.headers;
                    if(!token.startsWith(process.env.TOKEN_KEY))
                        res.status(200).json({msg:"token invalid"});
                    else {
                        const pureToken = token.split("__")[1];
                            const decoded = jwt.verify(pureToken,process.env.LOIGN_TOKEN);
                                if(!decoded)
                                    res.status(400).json("token invaild");
                                else {
                                    const user = await userModel.findById(decoded.id);

                                        if(!authorization[authoriz].includes(user.role))
                                            res.status(400).json({msg:"not authorization"});
                                        else{
                                            req.userId = user._id;
                                            next();
                                        }
                                }
                    }
                }catch(er) {
                        res.json({msg:"this error handling by catch and try (midlleware=>auth)",error:er});
                }
         
       
        }
}