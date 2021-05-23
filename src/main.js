const emailSender = require('./emailSender');
const getStockData = require('./getStockData');


async function test(stockname) {
    const dataGetter = new getStockData();
    const sender = new emailSender();
    const curPrice = await dataGetter.getStockData(stockname);

    // if current price is bigger than 23, send a notification
    if (Number(curPrice) > 23){
        sender.sendEmail([stockname, curPrice]);
    }
}

test('sz000001');
