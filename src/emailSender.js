const nodemailer = require('nodemailer');
require('dotenv').config();


module.exports = class emailSender{
    constructor(){
        this.email = process.env.EMAILNAME;
        this.password = process.env.EMAILPASSWORD;
    }

    sendEmail(messenge){
        const emailContent = '股票测试提醒 -- 股票：' + messenge[0] + '现在价格：' + messenge[1];

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: this.email,
                pass: this.password
            }
        });
        
        var mailOptions = {
            from: this.email,
            to: this.email,
            subject: '股票提醒',
            text: emailContent
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log('邮件发送失败：' + error);
            } else {
              console.log('邮件发送成功：' + info.response);
            }
          });
    }

}