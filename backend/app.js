const express = require("express");
const path = require("path");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const MovieRoutes = require("./routes/MovieRoutes");

const app = express();

//make it possible to serve other apps on the same computer
app.use(cors());

// in order to receive json data in req.body
app.use(express.json());


app.use(UserRoutes);
app.use(MovieRoutes);

const PORT = 3123;

// Define an API endpoint to serve the movie data
app.get("/api/movies", (req, res) => {
    const movieData = require("./db/movies.json"); 
    res.json(movieData);
});

app.get("/api/shows", (req, res) => {
    const showsData = require("./db/shows.json");
    res.json(showsData);
});

app.get("/api/bookings", (req, res) => {
    const bookingsData = require("./db/bookings.json");
    res.json(bookingsData);
})



app.listen(PORT, () => console.log(`Server is listening on port ${PORT} `));