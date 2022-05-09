const express = require("express");
const categoryService = require('../Services/categories.service');

class CategoryController {
  #path = `/api/categories`;
  router = express.Router();

  constructor(categoryService) {
    this.#initializeRoutes();
    this.categoryService = categoryService;
  }

  #initializeRoutes = () => {
    this.router.get(this.#path, this.#getAllCategories);
    this.router.post(this.#path, this.#validateCategory, this.#insertCategory);
  };

  #getAllCategories = async (req, res) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json({categories});
    } catch (error) {
      console.log(error);
      // FIX: handle error accordingly
    }
  }

  #validateCategory = (req, res, next) => {
    // TODO: add validation
    next();
  }

  #insertCategory = async (req, res) => {
    const data = req.body;
    try {
      const result = await this.categoryService.insertCategory(req.body);
      res.status(201);
    } catch (error) {
      // FIX: handle error accordingly
    }
  }
}

module.exports = new CategoryController(categoryService);
