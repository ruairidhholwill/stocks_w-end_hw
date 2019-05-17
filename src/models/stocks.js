const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Stocks = function () {
    this.stocksData = []
}

Stocks.prototype.getQuoteData = function () {
    const request = new RequestHelper('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla,bp,vz,rbs,spot,sne,msft,ko,gsk,wmt,vod,jpm,bac,tm,t,amzn,ms,ibm,gm,ul,aal,fdx,ups,mcd,nflx,sbux&types=quote')
    request.get().then((data) => {
        this.stocksData = data;
        PubSub.publish('Stocks:stocks-ready', this.stocksData);
        console.log(data)
      }); 
}

module.exports = Stocks;