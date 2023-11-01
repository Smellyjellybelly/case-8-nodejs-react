const { Router } = require("express");
const MovieController = require("../controllers/MovieController");
const movieRouter = Router();

movieRouter.get("/movies", MovieController.handleGetAllMovies);

module.exports = movieRouter;