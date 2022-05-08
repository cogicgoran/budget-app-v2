const express = require('express');

class WildcardController {
  router = express.Router();

  constructor () {
    this.#initializeRoutes();
  }

  #initializeRoutes = () => {
    this.router.get('*', this.#redirectHome);
  };

  #redirectHome = (req, res) => {
    res.redirect('/');
  }
}

module.exports = new WildcardController();