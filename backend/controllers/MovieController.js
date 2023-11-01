const MovieModel = require("../models/MoviesModel");

function handleGetAllMovies(req, res) {
    const allMovies = MovieModel.getAllMovies();

    return res.send(allMovies);
}

module.exports = {
    handleGetAllMovies
}