
import userModel from './../../../../db/model/user/user.model.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../../../services/email/email.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid'
import recoverAccountTimer from './../../../services/recoverAccountTimer.js';


// sign up
export const signup = async (req,res)=>{

    try{

        const { userName,email,password } = req.body;
        // check if email exist
            const user = await userModel.findOne({email}).select('email');
            if(user)
                res.status(400).json({msg:"this email already exist"});
            else {
            // if not exist execute insert process
    
                    const addUser = await new userModel({userName,email,password});
                    const saveUser = await addUser.save();
                        if(!saveUser)
                            res.status("400").json({msg:"we have some problem.."});
                        else{
                            // token for confirm message
                            const token = jwt.sign({id:saveUser._id},process.env.EMAIL_CONFIRM,{expiresIn:'1h'});
    
                             // send confirm email message   
                            const link =`${req.protocol}://${req.headers.host}${process.env.BASE_URL}/auth/confirmEmail/${token}`;
                            sendEmail('mohmadjhad49@gmail.com','confirmEmail',link);
                            
                            res.status(201).json({msg:"sucss add user"});
                        }
            }
    }catch(error){
            res.status(406).json({msg:"catch & try handling-sign up",error:error});
    }

}

// confirm email
export const confirmEmail = async (req,res)=>{
 try{
    const { token } =req.params;
    // decode token
    const decode = jwt.verify(token,process.env.EMAIL_CONFIRM);
    // set confirmEmail true
        const user = await userModel.findByIdAndUpdate(decode.id,{confirmEmail:true});
            if(user.confirmEmail)
            res.status(400).json({msg:'account already confirmed'});
            else
            res.status(200).json({msg:"email confirmed"})
 }catch(error){
    res.status(406).json({msg:"catch & try handling-confrimEmail",error:error});

 }
}
// recover account

export const recoverAccount = async (req,res)=>{
        try{
         
            const { email } = req.body;
                 const user = await userModel.findOne({email});
                //  check if email exist
                    if(!user){
                            res.status(400).json({msg:"this email not exist"});
                    }else {
                        // the idea of this endpoint
                        // 1-create random code 
                        // 2-make codePass in document == randome code
                        // 3-send the code to user email
                        // 4- run function to do after 5 min to deleting the code random and make it == undefind for try agin and send new random code
                        
                            if(user.codePass == "undefind"){
                                // create random code
                                const nanoId = nanoid().slice(0,6);
                                // update codePass == random code
                                const userUpdate = await userModel.findOneAndUpdate({email},{codePass:nanoId});
                                // send code to email
                                sendEmail('mohmadjhad49@gmail.com','recoverAccount','',nanoId);
                                // run timer 
                              recoverAccountTimer(user._id);
                                res.status(200).json({msg:"we did send link for recover account in email"})
                            }else {
                                res.status(400).json({msg:"we already send the code in your email you most try after 5 min"})
                                
                            }
                      
                    }


        }catch(error){
            res.status(406).json({msg:"catch & try handling-recover account",error:error});
            
        }
}

// recover account  check code 

export const recoverAccountCheckCode= async (req,res)=>{
    try{
        const { code } = req.body;
        const { email } = req.headers;
    
            const user = await userModel.findOne({email});
            if(!user)
                res.status(400).json({msg:"the email not exist"});
            else{
                if(user.codePass != code)
                    res.status(400).json({msg:"code not correct"});
                else {
                    const userUpdate = await userModel.findOneAndUpdate({email},{codePass:'undefined'});
                    const token = jwt.sign({id:userUpdate._id},process.env.RECOVER_ACCOUNT_TOKEN,{expiresIn:'120s'});
                       res.status(200).json({msg:"sucss",token:token})
                }
            }
    }catch(error) {
        res.status(406).json({msg:"catch & try handling-recover account check code",error:error});
            
    }

        }

// recover account set new password 

export const recoverAccountSetNewPassword = async (req,res)=>{
    // try {
        const { token } = req.params;
        const { newPassword,confirmPassword } = req.body;
    
    const decode = jwt.verify(token,process.env.RECOVER_ACCOUNT_TOKEN);
        if(!decode) 
            res.status.json({msg:"the token not correct"});
        else {
                if(newPassword != confirmPassword) 
                    res.status(400).json({msg:"password not match"});
                    else {
                          const hashPass = await bcrypt.hash(newPassword,+process.env.BCRYPT_SALT);
                            const updateUser = await userModel.findByIdAndUpdate(decode.id,{password:hashPass});
                                
                                res.json({msg:"sucss"});
                        }
        }
               
    // }catch(error) {
    //     res.status(406).json({msg:"catch & try handling-recover account set new password",error:error});

    // }
 
                
   
    

}

// sign in
export const signin = async (req,res)=>{
    try{
        const { email,password } = req.body;
        // chick if email exist or not 
        const user = await userModel.findOne({email});
            if(!user)
                res.status(400).json({msg:"the email not exist"})
            else {
                // if email exist execute code below
                    // check if confirmEmail = true
                if (!user.confirmEmail)
                    res.status(400).json({msg:"your email not conifrm"});
                else {
                // compare password
                    const match = await bcrypt.compare(password,user.password);
                    if(!match) 
                        res.status(400).json({msg:"the password not correct"});
                    else {
                        // create token and response
                            const token = jwt.sign({id:user._id},process.env.LOIGN_TOKEN);

                                res.status(200).json({msg:"sucss login",token:token});
                    }
                }
            }
    }catch(error){
            res.status(406).json({msg:"catch & try handling-sign in",error:error});
    }
        
}

