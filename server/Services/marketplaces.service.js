const marketplaceRepository = require("../Repositories/marketplaces.respository");

class MarketplaceService {
  constructor(marketplaceRepository) {
    this.marketplaceRepository = marketplaceRepository;
  }

  getAllMarketplaces = async () => {
    const marketplaces = await this.marketplaceRepository.getAllMarketplaces();
    return marketplaces;
  };

  insertMarketplace = async (body) => {
    const marketplaces = await this.marketplaceRepository.insertMarketplace(
      body
    );
    return marketplaces;
  };
}

module.exports = new MarketplaceService(marketplaceRepository);
