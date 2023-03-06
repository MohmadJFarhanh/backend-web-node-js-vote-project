import mongoose  from "mongoose";

 const connect = _=>{
        return mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
        .then( res=>{
                console.log("connect to data base...");
        } )
        .catch( er=>{
                console.log("problem .. connect db");
        } )
}

export default connect;
