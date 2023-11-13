const { getMovieFromDB } = require("./utils");

function getAllMovies() {
    const allMovies = getMovieFromDB();

    return allMovies;
}

function getMovieByMovieId(movieId) {
    const allMovies = getMovieFromDB();


    const foundMovie = allMovies.movies.find(movies => movies.movieId === parseInt(movieId));

    return foundMovie;
}


module.exports = {
    getAllMovies,
    getMovieByMovieId,
}