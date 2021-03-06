const PubSub = require('../helpers/pub_sub.js')
const Stocks = require('../models/stocks.js')
const StockDisplayView = require('../views/stock_display_view.js')

const StockListView = function (container) {
    this.container = container
}

StockListView.prototype.bindEvents = function () {
    PubSub.subscribe('Stocks:stocks-ready', (event) => {
        this.clearList();
        this.renderStockDetailViews(event.detail);
    })

//     this.container.addEventListener('click', (event) => {
//         const selectedIndex = event.target.value;
//        console.log("Hello World!");
//     });
}

StockListView.prototype.clearList = function () {
    this.container.innerHTML = '';
}

StockListView.prototype.renderStockDetailViews = function (stocks) {
    Object.entries(stocks).forEach((stock) => {
        const stockItem = this.createStockListItem(stock);
        this.container.appendChild(stockItem);
    });
};

  
StockListView.prototype.createStockListItem = function (stock) {
    const stockDetailView = new StockDisplayView();
    const stockDetail = stockDetailView.createStockDetail(stock);
    return stockDetail;
};

module.exports = StockListView;