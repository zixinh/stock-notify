const emailSender = require('./emailSender');
const getStockData = require('./getStockData');
const promptControl = require('./promptControl');


async function server() {
    const promptController = new promptControl();
    const dataGetter = new getStockData();
    const sender = new emailSender();
    console.log('股票提醒软件已启动.....');

    promptController.askStocks();
    const stockList = promptController.getStockDB();

    while (true) {
        console.log('开始检查条件....');

        stockList.forEach(async (stock) => {
            var curPrice = await dataGetter.getStockData(stock[0]);
            if (Number(curPrice) > stock[1] && stock[3] <= 2){
                console.log(stock[0] + '价格超过上行目标价' + stock[1] + '元，发送提醒邮件......');
                sender.sendEmail(stock[0], curPrice, stock[1], stock[2]);
                stock[3] ++;
            } else if (Number(curPrice) < stock[2] && stock[3] <= 2){
                console.log(stock[0] + '价格少于下行目标价' + stock[2] + '元，发送提醒邮件......');
                sender.sendEmail(stock[0], curPrice, stock[1], stock[2]);
                stock[3] ++;
            } else if (stock[3] > 2){
                console.log(stock[0] + '触发提醒，但是已发送提醒邮件3次，请重新启动程序并设置新目标价格');
            } else {
                console.log(stock[0] + '价格处于目标价格范围内，不触发提醒');
            }
        });

        // wait 10 seconds to start next validation
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log('10秒等待完毕，准备再次检查条件....');


    }

}

server();
