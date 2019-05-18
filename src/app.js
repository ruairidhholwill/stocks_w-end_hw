const Stocks = require('./models/stocks.js')
const StockListView = require('./views/stock_list_view.js')
const StockListViewIndustry = require('./views/industry_specific_stock_list_view.js')
const SelectView = require('./views/select_view.js')
const Highcharts = require('highcharts/highstock');

document.addEventListener('DOMContentLoaded', () => {

    const listContainerIndustry = document.querySelector('div#stocks-list')
    const stockListViewIndustry = new StockListViewIndustry(listContainerIndustry)
    stockListViewIndustry.bindEvents();

    const selectViewElement = document.querySelector('select#industry-select')
    const selectView = new SelectView(selectViewElement);
    selectView.bindEvents();

    const listContainer = document.querySelector('div#stocks-list')
    const stockListView = new StockListView(listContainer)
    stockListView.bindEvents();

    const stocks = new Stocks
    stocks.bindEvents();
    stocks.getQuoteData();
    
})