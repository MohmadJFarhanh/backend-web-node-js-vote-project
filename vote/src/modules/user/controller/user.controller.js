
import userModel from './../../../../db/model/user/user.model.js';
import cloudinary from './../../../services/cloudinary.js';

// profile
export const profile = async (req,res)=>{
    try {
        const { userId } = req;  
        const user = await userModel.findById(userId).select("-createdAt -updatedAt -codePass -password -confirmEmail -__v");
            if(!user)
                res.status(400).json({msg:"problem in get data process"});
            else{
                res.status(200).json({msg:"sucss",user:user});
            }
    }catch(error) {
        res.status(406).json({msg:"catch & try handling-user profile",error:error});

    }
}
// profile picutre 
export const profilePic = async (req,res)=>{
        // check if file exist 

           try{
            if(!req.file)
            res.status(400).json({msg:"pl upload profile pic"});

     const {secure_url}=  await cloudinary.uploader.upload(req.file.path,{
            folder : 'user/profilePuc'
        })

    const user = await userModel.findByIdAndUpdate(req.userId,{profilePic:secure_url});
        res.status(200).json({msg:"sucss"})
           }catch(err){
                res.status(500).json({msg:"catch & try handling- upload profile user",error:error})
           }
              

        
}

export const deleteUser = async (req,res)=>{
        try {
            
            const user  = await userModel.findByIdAndDelete(req.userId);
                if(!user)
                    res.status(400).josn({msg:"somthing wrong....."});
                else 
                    res.status(200).json({msg:"sucss delete user"});
        }catch(error) {
            res.status(500).json({msg:"catch & try handling- upload profile user",error:error})

        }
}
