
import userModel from './../../db/model/user/user.model.js';





const recoverAccountTimer = (id)=>{
 let counter = 300;
       let timer = setInterval( async() => {
            if(counter == 0){
                clearInterval(timer)  
            const user = await userModel.findByIdAndUpdate(id,{ codePass:"undefind" })
            }
            counter--;
         
        }, 1000);
}

export default recoverAccountTimer;
