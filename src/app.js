const Stocks = require('./models/stocks.js')

document.addEventListener('DOMContentLoaded', () => {

    const stocks = new Stocks
    stocks.getQuoteData();
})