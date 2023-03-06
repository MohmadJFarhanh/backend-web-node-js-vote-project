import mongoose, { Types }  from "mongoose";
import bcrypt from 'bcrypt';

const { Schema,model } = mongoose;

const commentSchema = new Schema({
  caption: {
    type: String,
    required: true,
  },
  userId:  {
     type: Types.ObjectId,
     required: true,
     ref: 'user',
  },
  postId: {
    type: Types.ObjectId,
    required: true,
    ref: 'post'
  }
},{timestamps:true});


const commentModel = model('comment',commentSchema);

export default commentModel;
