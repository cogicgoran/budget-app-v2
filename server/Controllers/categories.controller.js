const express = require("express");
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

  #validateCategory = (req, res, next) => {
    // TODO: add validation
    const { name, icon_name, color_main, color_border } = req.body;
    if (name && icon_name && color_main && color_border) {
      req.data = {
        name,
        icon_name,
        color_main,
        color_border,
      };
      return next();
    }
    next(new Error("Invalid Category Data"));
  };

  #insertCategory = async (req, res, next) => {
    const data = req.data;
    try {
      const smth = await this.categoryService.insertCategory(data);
      res.sendStatus(201);
    } catch (error) {
      next(error);
      // FIX: handle error accordingly
    }
  };
}

module.exports = new CategoryController(categoryService);
