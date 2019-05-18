const StockDisplayView = function () {

}

StockDisplayView.prototype.createStockDetail = function (stock) {
    const stockDetail = document.createElement('div');
    stockDetail.classList.add('stock-detail');
  
    const name = document.createElement('h2');
    name.textContent = stock[1].quote.companyName;
    stockDetail.appendChild(name);

    const logo = document.createElement('img');
    logo.src = stock[1].logo.url;
    stockDetail.appendChild(logo);

    const statTitle = document.createElement('h3');
    statTitle.textContent = 'Week 52 High/Low:';
    stockDetail.appendChild(statTitle)

    const stats = document.createElement('h4');
    stats.textContent = `High: ${stock[1].quote.week52High} | Low: ${stock[1].quote.week52Low}`;
    stockDetail.appendChild(stats)

    const industry = document.createElement('h4');
    industry.textContent = `Industry: ${stock[1].company.industry}`;
    stockDetail.appendChild(industry);

    return stockDetail;
}

module.exports = StockDisplayView;