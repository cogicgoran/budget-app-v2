const { request } = require("express");
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
      res.json(categories);
    } catch (error) {
      console.log(error);
      // FIX: handle error accordingly
    }
  }

  #validateCategory = (req, res, next) => {
    // TODO: add validation
    console.log(req.body);
    const { name, icon_name, color_main, color_border } = req.body;
    if( name && icon_name && color_main && color_border ) {
      req.data = {
        name, icon_name, color_main, color_border
      }
      next();
    }
    next(new Error('Invalid Category Data'));
  }

  #insertCategory = async (req, res) => {
    const data = req.data;
    try {
      const result = await this.categoryService.insertCategory(data);
      res.status(201);
    } catch (error) {
      console.log(error);
      // FIX: handle error accordingly
    }
  }
}

module.exports = new CategoryController(categoryService);
