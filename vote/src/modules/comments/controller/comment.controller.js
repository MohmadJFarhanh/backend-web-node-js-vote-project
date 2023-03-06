
import userModel from './../../../../db/model/user/user.model.js';
import commentModel from './../../../../db/model/comment/comment.model.js';


// create comment 
export const createComment = async (req,res)=>{
    try {
        const {caption} = req.body;
        const { postId } = req.params;
          
        const user = await userModel.findById(req.userId);
            if(!user)
                res.status(400).json({msg:"we have some problem..."});
            else {
                const comment = await new commentModel({caption,userId:user._id,postId});
                const commentSave = comment.save();
                    if(!commentSave)
                        res.status(400).json({msg:"comment not add"});
                    else
                        res.status(200).json({msg:"sucss add comment"});
            }
    }catch(error){
            res.status(400).json({msg:"try and catch error - create comment",error:error});
    }
    
}


