import mongoose, { Types }  from "mongoose";
const { Schema,model } = mongoose;

const postSchema = new Schema({
title: {
    type: String,
    required: true,
},
caption: {
    type: String,
    required: true,
},
images: Array,
userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'user'
},
likes: [{type: Types.ObjectId,ref: 'user',}],
unlikes: [{type: Types.ObjectId,ref: 'user',}],
},{timestamps:true});

const postModel = model('post',postSchema);

export default postModel;
