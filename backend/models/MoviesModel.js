const { getMovieFromDB } = require("./utils");

function getAllMovies() {
    const allMovies = getMovieFromDB();

    return allMovies;
}

module.exports = {
    getAllMovies
}