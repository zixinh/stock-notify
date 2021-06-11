var prompt = require('prompt-sync')();

module.exports = class promptControl {
    constructor(){
        this.stockDB = [];
        // 长期股票观测的股票可直接在这里加入 -- 不用每次程序启东时新加每一只股票 
        // this.stockDB = [['sz000001', 23, 0], [...], ....];
    }

    askStocks(){
        while (true){
            var bool = prompt('需要加入新的股票吗？Yes or No： ');
            if (bool.toLowerCase() == 'yes'){
                var stockName = this.askStockName();
                var targetHighPrice = this.askTargetHighPrice();
                var targetLowPrice = this.askTargetLowPrice();

                // [[股票名称, 目标上行价, 目标下行价，邮件发送次数]]
                this.stockDB.push([stockName.toLowerCase(), Number(targetHighPrice), Number(targetLowPrice), 0]);
            } else if (bool.toLowerCase() == 'no') {
                break;
            } else {
                console.log('输入错误，请重新输入');
            }
        }

        if (this.stockDB.length == 0) {
            console.error('没有输入股票, 请重新启动程序并输入股票和目标价格');
            process.exit(1);
        }
    }

    askStockName(){
        var stockName;
        while (true) {
            var inputStockName = prompt('输入新股票的代码：');
            if (inputStockName.match(/[a-z]{2}[0-9]{6}/)) {
                stockName = inputStockName;
                break;
            } else {
                console.log('输入错误，请重新输入');
            }
        }
        return stockName;
    }

    askTargetHighPrice(){
        var targetHighPrice;
        while (true) {
            var inputVal = prompt('输入新股票的上行目标价格：');
            if (inputVal.match(/[0-9]+[.]{0,1}[0-9]*/)) {
                targetHighPrice = inputVal;
                break;
            } else {
                console.log('输入错误，请重新输入');
            }
        }
        return targetHighPrice; 
    }

    askTargetLowPrice(){
        var targetLowPrice;
        while (true) {
            var inputVal = prompt('输入新股票的下行目标价格：');
            if (inputVal.match(/[0-9]+[.]{0,1}[0-9]*/)) {
                targetLowPrice = inputVal;
                break;
            } else {
                console.log('输入错误，请重新输入');
            }
        }
        return targetLowPrice; 
    }

    getStockDB(){return this.stockDB;}
}