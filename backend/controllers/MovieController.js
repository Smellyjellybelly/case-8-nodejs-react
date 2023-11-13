const MovieModel = require("../models/MoviesModel");

function handleGetAllMovies(req, res) {
    const allMovies = MovieModel.getAllMovies();

    res.json(allMovies);
}

function handleGetMovieByMovieId(req, res) {
    const { movieId } = req.params;

    const foundMovie = MovieModel.getMovieByMovieId(movieId);

    if (!foundMovie) {
        return res.status(404).send("Movie not found")
    }

    res.json(foundMovie);
}

module.exports = {
    handleGetAllMovies,
    handleGetMovieByMovieId,
}