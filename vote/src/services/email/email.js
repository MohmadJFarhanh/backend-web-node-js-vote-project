import message from "./messageEmail.js";
import nodemailer from 'nodemailer';



const sendEmail = async (email,type,link,nanoId)=>{

  const emailType = {
    confirmEmail : {
    title:'confirm Email',
    caption :'Please click the button below',
    action : `<a class="buttonText " href=${link} target="_blank" style="color: #4A90E2;text-decoration: none;font-weight: normal;display: block;border: 2px solid #585858;padding: 10px 80px;font-family: Arial;">Click</a>`
  },
  
    recoverAccount : {
    title:'recover account',
    caption :'cdoe for recover your account',
    action : `<p class="buttonText "  style="color: #4A90E2;text-decoration: none;font-weight: normal;display: block;border: 2px solid #585858;padding: 10px 80px;font-family: Arial;">${nanoId}</p>`
    },
  }




    let transporter = nodemailer.createTransport({
        service :"gmail",
        auth: {
          user: process.env.EMAILSEND, // generated ethereal user
          pass: process.env.EMAILSEND_password, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `SUPERX ${process.env.EMAILSEND}`, // sender address
        to: email, // list of receivers
        subject: emailType[type].title, // Subject line
        html: message(emailType[type],link,nanoId), // html body
      });
    
    
}

export default sendEmail;
