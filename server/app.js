const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

class App {
  constructor(controllers, port) {
    this.port = port;
    this.controllers = controllers
    this.app = express();
    this.#initializeMiddleware();
    this.#initializeControllers(controllers);
  }

  #initializeMiddleware = () => {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(__dirname, './client/build')));
  }

  #initializeControllers = () => {
    this.controllers.forEach((controller) => {
      this.app.use(controller.router);
    });
  }

  listen = () => {
    this.app.listen(this.port, () => console.log(`Server listening on port ${this.port}`));
  }
}

module.exports = App;