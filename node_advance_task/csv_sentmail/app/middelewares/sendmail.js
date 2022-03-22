const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
try{
    //MAILTRAP>>>>>
      // const transporter = nodemailer.createTransport({
      //   host: 'smtp.mailtrap.io',
      //   port: 25,
      //   auth: {
      //     user: '2faf60cde55d7d',
      //     pass: '9d66754bfaf202',
      //   }

      //GMAIL>>>>>
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secureConnction: true,
        auth: {
          user: 'hiral.jnext@gmail.com',
          pass: 'jnext@123',
        }
      });
    
      await transporter.sendMail({
        from: 'hiral.jnext@gmail.com', 
        to: email,
        subject: subject,
        text: text,
        html: "<b>HELOO...!!!</b>"
      });
      console.log("Email sent succesfully..")
}catch(error){
    console.log(error + "email not sent")
}
};
module.exports = sendEmail