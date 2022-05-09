const App = require('./app');
const ReceiptsControllerInstance = require('./Controllers/receipts.controller');
const MarketplaceControllerInstance = require('./Controllers/marketplaces.controller');
const CurrencyControllerInstance = require('./Controllers/currencies.controller');
const WildcardControllerInstance = require('./Controllers/wildcard.controller');
const CategoryControllerInstance = require('./Controllers/categories.controller');


function init() {
  const app = new App([ReceiptsControllerInstance, MarketplaceControllerInstance, CurrencyControllerInstance, CategoryControllerInstance, WildcardControllerInstance], process.env.PORT || 8000);
  app.listen();
}
init();
