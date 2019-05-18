const PubSub = require('../helpers/pub_sub.js')
const Stocks = require('../models/stocks.js')
const StockDisplayView = require('../views/stock_display_view.js')

const StockListViewIndustry = function (container) {
    this.container = container
}

StockListViewIndustry.prototype.bindEvents = function () {
    PubSub.subscribe('Stocks:stocks-ready-industry-specific', (event) => {
        this.clearList();
        this.renderStockDetailViews(event.detail);
    })
}

StockListViewIndustry.prototype.clearList = function () {
    this.container.innerHTML = '';
}

StockListViewIndustry.prototype.renderStockDetailViews = function (stocks) {
    Object.values(stocks).forEach((stock) => {
        const stockItem = this.createStockListItem(stock);
        this.container.appendChild(stockItem);
    });
};

  
StockListViewIndustry.prototype.createStockListItem = function (stock) {
    const stockDetailView = new StockDisplayView();
    const stockDetail = stockDetailView.createStockDetail(stock);
    return stockDetail;
};

module.exports = StockListViewIndustry;