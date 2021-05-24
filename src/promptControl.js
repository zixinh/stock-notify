var prompt = require('prompt-sync')();

module.exports = class promptControl {
    constructor(){
        this.stockDB = [];
    }

    askStocks(){
        while (true){
            var bool = prompt('需要加入新的股票吗？Yes or No： ');
            if (bool.toLowerCase() == 'yes'){
                var stockName = prompt('输入新股票的代码：');
                var targetPrice = prompt('输入新股票的目标价格：');
                // [[股票名称, 目标价, 邮件发送次数]]
                this.stockDB.push([stockName.toLowerCase(), Number(targetPrice), 0]);
            } else {
                break;
            }
        }
    }

    getStockDB(){return this.stockDB;}
}