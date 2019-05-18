const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Stocks = function () {
    this.stocksData = []
    this.industries = []
}

Stocks.prototype.bindEvents = function () {
    PubSub.subscribe('SelectView:change', (event) => {
        const industryIndex = event.detail;
        this.publishStocksByIndustry(industryIndex)
    })
}


Stocks.prototype.getQuoteData = function () {
    const request = new RequestHelper('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla,bp,vz,rbs,sne,msft,ko,gsk,wmt,vod,jpm,bac,tm,t,amzn,ms,ibm,gm,ul,aal,fdx,ups,mcd,nflx,sbux&types=quote,company,logo')
    request.get().then((data) => {
        this.stocksData = data;
        PubSub.publish('Stocks:stocks-ready', this.stocksData);
        this.publishIndustryList(data)
      }); 
}

Stocks.prototype.publishIndustryList = function (data) {
    this.stocksData = data;
    this.industries = this.uniqueIndustryList();
    PubSub.publish('Stocks:industry-ready', this.industries)
}


Stocks.prototype.stockIndustryList = function () {
    const fullList = Object.entries(this.stocksData).map(stock => stock[1].company.industry);
    return fullList;
}

Stocks.prototype.uniqueIndustryList = function () {
    return this.stockIndustryList().filter((stock, index, array) => {
        return array.indexOf(stock) === index;
    })
}

Stocks.prototype.filterByIndustry = function (industryIndex) {
    const selectedIndustry = this.industries[industryIndex];
    return Object.entries(this.stocksData).filter((stock) => {
        return stock[1].company.industry === selectedIndustry
    })
}

Stocks.prototype.publishStocksByIndustry = function (industryIndex) {
    const foundStocks = this.filterByIndustry(industryIndex);
    PubSub.publish('Stocks:stocks-ready-industry-specific', foundStocks);
  };


module.exports = Stocks;