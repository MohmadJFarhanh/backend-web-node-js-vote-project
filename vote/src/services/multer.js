import multer from 'multer';

const customeFile = {
    image : ['image/jpg','image/jpeg'],
    pdf : ['application/pdf'],
}

export const HME = (err,req,res,next)=>{
            if(err)
                    res.status(400).json({msg:"invaild file"});
            else
                     next(); 
}


export function myMulter(customeVaildation) {
    const storage = multer.diskStorage({})

        function fileFilter(req,file,cb){
                if(!customeFile[customeVaildation].includes(file.mimetype))
                    
                    cb('invalid file',false);
                else 
                    cb(null,true);
                
        }

    const upload = multer({fileFilter,storage});
        return upload
}