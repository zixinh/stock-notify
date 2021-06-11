const nodemailer = require('nodemailer');
require('dotenv').config();


module.exports = class emailSender{
    constructor(){
        this.email = process.env.EMAILNAME;
        this.password = process.env.EMAILPASSWORD;
        console.log(this.email);
    }

    sendEmail(stockName, curPrice, highPrice, lowPrice){
        let emailContent = '股票提醒 -- 股票：' + stockName + '实时价格：' + curPrice;

        if (curPrice > highPrice) {
          emailContent += ` 超过上行目标价: ${String(highPrice)}`
        } else if (curPrice < lowPrice) {
          emailContent += ` 低于下行目标价: ${String(lowPrice)}`
        }
        
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