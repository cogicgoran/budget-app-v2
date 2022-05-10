const express = require('express');
const marketplaceService = require('../Services/marketplaces.service');

class MarketplaceController {
  #path = `/api/marketplaces`;
  router = express.Router();

  // Dependancy injection?
  constructor(marketplaceService) {
    this.marketplaceService = marketplaceService;
    this.#initializeRoutes();
  }

  #initializeRoutes = () => {
    this.router.get(this.#path, this.#getAllMarketplaces);
    this.router.post(
      this.#path,
      this.#validateMarketplace,
      this.#insertMarketplace
    );
  };

  #insertMarketplace = async (req, res) => {
    try {
      const result = await this.marketplaceService.insertMarketplace(req.body);
      // handle response
    } catch (error) {
      // FIX: handle error accordingly
    }
  }

  #validateMarketplace = async (req, res, next) => {
    const { name, address } = req.body;
    if (
      typeof name === "string" &&
      name &&
      name.length > 0 &&
      typeof address === "string" &&
      address &&
      address.length > 0
    ) {
      return next();
    }
    return res.status(400).send("INVALID MARKETPLACE INFO");
  };

  #getAllMarketplaces = async (req, res) => {
    try {
      const marketplaces = await this.marketplaceService.getAllMarketplaces();
      res.json(marketplaces);
    } catch (error) {
      // FIX: handle error accordingly
    }
  };
}

module.exports = new MarketplaceController(marketplaceService);
