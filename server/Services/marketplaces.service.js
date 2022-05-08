const marketplaceRepository = require('../Repositories/marketplaces.respository');

class MarketplaceService {
  // Dependancy injection
  constructor(marketplaceRepository) {
    this.marketplaceRepository = marketplaceRepository;
  }

  getAllMarketplaces = async () => {
    try {
      const marketplaces = await this.marketplaceRepository.getAllMarketplaces();
      return marketplaces;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }

  insertMarketplace = async (body) => {
    try {
      const marketplaces = await this.marketplaceRepository.insertMarketplace(body);
      return marketplaces;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }
}

module.exports = new MarketplaceService(marketplaceRepository);