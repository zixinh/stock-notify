const superagent = require('superagent');

module.exports = class getStockData {
    constructor(){
    }

    async getStockData (stockName) {
        const res = await superagent.get('http://hq.sinajs.cn/list=' + stockName).buffer();
        const stockdata = res.text.split(',')[3]
        return stockdata;
    }
}