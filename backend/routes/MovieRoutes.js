const { Router } = require("express");
const MovieController = require("../controllers/MovieController");
const movieRouter = Router();

movieRouter.get("/movies", MovieController.handleGetAllMovies);
movieRouter.get("/movies/:movieId", MovieController.handleGetMovieByMovieId);


module.exports = movieRouter;