import mongoose  from "mongoose";
import bcrypt from 'bcrypt';

const { Schema,model } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age : Number,
    gender: {
        type: String,
        default: 'undefined',
        enum : ['undefined','male','female'],
    },
    confirmEmail: {
        type: Boolean,
        default: "false",
    },
    role: {
        type: String,
        default: "user",
        enum: ['admin','user','supervisor'],
    },
    codePass: {
        type: String,
        default: 'undefind',
    },
    profilePic: String,
    phone: String,
},{timestamps:true});

userSchema.pre('save',async function(){
        this.password = await bcrypt.hash(this.password,+process.env.BCRYPT_SALT);

})

const userModel = model('user',userSchema);

export default userModel;
