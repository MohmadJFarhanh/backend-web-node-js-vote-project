
import cloudinary from './../../../services/cloudinary.js';
import userModel from './../../../../db/model/user/user.model.js';
import postModel from './../../../../db/model/post/post.model.js';
import commentModel from './../../../../db/model/comment/comment.model.js';
import { pagination } from './../../../services/pagination.js';

// create post
export const createPost = async (req,res)=>{
    try{
        const { title,caption } = req.body;
        const images = [];
        
            if(req.files){
                for( let image in req.files ){
                   const { secure_url } = await cloudinary.uploader.upload(req.files[image].path,{ floder: '/user/test', })
                    images.push({secure_url});
                }
            }
      
            if(req.file){
                const { secure_url } = await cloudinary.uploader.upload(req.file.path,{ floder: '/user/test', })
                 images.push({secure_url});
             }
         

           const user = await userModel.findById(req.userId);
       const post = await new postModel({title,caption,images,userId:user._id});
       const savePost = post.save();
               if(!savePost)
                   res.status(400).json({msg:"can't create the post"});
               else 
                   res.status(200).json({msg:"create post done"});
    }catch(error){
            res.status(400).json({msg:'try and catch -- create post',error:error})
    }
 
}



// appear post
export const appearPost = async (req,res)=>{
    try{
        const { page,size } = req.query;
        const { limit,skip } = pagination(page,size);
        const postAcomment= [];
        const posts = await postModel.find({}).populate({path : 'userId',select : 'userName email confirmEmail'})
        .limit(limit).skip(skip);
            for(let post in posts){
                const  comment = await commentModel.find({postId:posts[post]._id});
                postAcomment.push({post:posts[post],comment:comment});
            }
        if(!posts)
            res.status(400).json({msg:'we have some problem...appear posts'});
        else
            res.status(200).json({msg:"sucss",post:postAcomment});
    }catch(error){
            res.status(400).json({msg:"try and catch -appear post",error:error});
    }
    
   

}

export const likeButton = async (req,res)=>{

    try{

        const { id } = req.params;
        const user = await userModel.findById(req.userId);
            if(!user)
                res.status(400).json({msg:"this user not exist"});
            else{
                const addLike = await postModel.findByIdAndUpdate(id,
                    {$setOnInsert :{likes : user._id},
                     $pull :{unlikes : user._id}}
                    );
                    res.status(200).json({msg:"sucss add like"})
            }

    }catch(error){
            res.status(400).json({msg:"try and catch -like button",error:error});
    }
    



}

export const unlikeButton = async (req,res)=>{


    
    try{

        const { id } = req.params;
        const user = await userModel.findById(req.userId);
            if(!user)
                res.status(400).json({msg:"this user not exist"});
            else{
                const addLike = await postModel.findByIdAndUpdate(id,
                    {$setOnInsert :{unlikes: user._id},
                     $pull :{likes: user._id}}
                    );
                    res.status(200).json({msg:"sucss add unlike"})
            }

    }catch(error){
            res.status(400).json({msg:"try and catch -unlike button",error:error});
    }

}