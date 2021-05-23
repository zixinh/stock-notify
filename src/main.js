const emailSender = require('./emailSender');
const getStockData = require('./getStockData');


async function server() {
    const dataGetter = new getStockData();
    const sender = new emailSender();
    console.log('股票提醒软件已启动.....');

    while (true) {
        console.log('开始检查条件....');
        const curPrice = await dataGetter.getStockData('sz000001');

        // if current price is bigger than 23, send a notification
        if (Number(curPrice) > 23){
            console.log('条件满足，发送提醒邮件......');
            sender.sendEmail(['sz000001', curPrice]);
        } else {
            console.log('条件不满足，不发送提醒邮件.....');
        }

        console.log('等候10秒再次检查条件.....');
        // wait 10 seconds to start next validation
        await new Promise(resolve => setTimeout(resolve, 10000));

    }

}

server();
