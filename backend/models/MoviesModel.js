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

async function getShowDetails(movieId, showId) {
    try {
        const allMovies = getMovieFromDB();
        const movie = allMovies.find(movie => movie.movieId === movieId);

        if (!movie) {
            throw new Error('Movie not found');
        }

        // Find the specific show within the movie
        const show = movie.shows.find(show => show.showId === showId);

        if (!show) {
            throw new Error('Show not found');
        }

         // Get available seat numbers
         const availableSeats = show.seats.filter(seat => !seat.booked).map(seat => seat.seatNumber);

        // Return details of the show
        return {
            movieId: movie.movieId,
            showId: show.showId,
            duration: show.duration,
            availableSeats: availableSeats
        };
    } catch (error) {
        console.error('Error fetching show details:', error);
        throw error;
    }
}

module.exports = {
    getAllMovies,
    getMovieByMovieId,
    getShowDetails
}