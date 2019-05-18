const PubSub = require('../helpers/pub_sub.js')

const SelectView = function(element) {
    this.element = element
}

SelectView.prototype.bindEvents = function () {
    PubSub.subscribe('Stocks:industry-ready', (event) => {
        this.populateSelect(event.detail)
    });

    this.element.addEventListener('change', (event) => {
        const selectedIndex = event.target.value;
        PubSub.publish('SelectView:change', selectedIndex);
    });
}

SelectView.prototype.populateSelect = function (industries) {
    industries.forEach((industry, index) => {
        const option = this.createIndustryOption(industry, index);
        this.element.appendChild(option);
      })
}

SelectView.prototype.createIndustryOption = function (industry, index) {
    const option = document.createElement('option');
    option.textContent = industry;
    option.value = index;
    return option;
  };



module.exports = SelectView;