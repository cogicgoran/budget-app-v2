const express = require("express");
const { CategoryDO } = require("../Model/categories.do");
const categoryService = require("../Services/categories.service");

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
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  #validateCategory = async (req, res, next) => {
    try {
      const categoryDO = new CategoryDO(req.body);
      await this.categoryService.validateCategory(categoryDO);
      req.data = categoryDO;
      return next();
    } catch (error) {
      next(error);
    }
  };

  #insertCategory = async (req, res, next) => {
    const category = req.data;
    try {
      const smth = await this.categoryService.insertCategory(category);
      res.sendStatus(201);
    } catch (error) {
      next(error);
      // FIX: handle error accordingly
    }
  };
}

module.exports = new CategoryController(categoryService);
