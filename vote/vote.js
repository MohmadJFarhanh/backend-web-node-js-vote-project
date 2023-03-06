// import
import express from 'express';
import dotenv from 'dotenv';
import connect from './db/serverConnection.js';
import * as indexRouter from './src/modules/index.router.js';

// 
const app = express();
app.use(express.json());
dotenv.config({path:'./config/.env'});



// database connection
connect();

// api 
const baseUrl = process.env.BASE_URL;
    
// auth
app.use(`${baseUrl}/auth`,indexRouter.authRouter);
// post
app.use(`${baseUrl}/post`,indexRouter.postRouter);
// user
app.use(`${baseUrl}/user`,indexRouter.userRouter);
// comment 
app.use(`${baseUrl}/comment`,indexRouter.commentRouter);


// ..page not found
app.use("*",(req,res)=>{
        res.status(404).json({msg:"page not found"});
})



// -----------------
// port & connection message
const port = process.env.SERVER_PORT;
// message 
const serverMessage = _=> console.log(`SERVER WORKING .... PORT ${3000}`);
// listen
app.listen(port,serverMessage);
